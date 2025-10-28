import { serve } from "https://deno.land/std@0.168.0/http/server.ts";


const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Received message:', message);

    // Call Lovable AI Gateway with empathetic system prompt
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are Sakhi, an emotionally intelligent and empathetic AI companion for women of all ages. Your purpose is to:

1. Listen with compassion and validate emotions
2. Provide emotional support and encouragement
3. Offer gentle guidance and coping strategies
4. Recognize signs of distress and suggest professional help when needed
5. Be warm, understanding, and non-judgmental

Communication style:
- Use warm, supportive language
- Acknowledge feelings before offering advice
- Ask follow-up questions to understand better
- Share affirmations and encouragement
- Suggest mindfulness exercises or self-care when appropriate
- Use emojis sparingly but warmly (💜, 🌸, ✨)

For serious concerns (mentions of self-harm, abuse, severe depression):
- Express care and concern
- Strongly encourage professional help
- Provide crisis hotline information
- Stay supportive but clear about limitations

Keep responses concise (2-4 sentences usually) unless deeper explanation is needed.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI response:', aiResponse);

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in sakhi-chat:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        response: "I'm having a moment of trouble connecting. Please try again. Remember, you're not alone, and I'm here for you. 💜"
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});