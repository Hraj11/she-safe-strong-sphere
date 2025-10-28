import { useState, useEffect, useRef } from "react";
import { Heart, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import sakhiImage from "@/assets/sakhi-chat.png";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Sakhi = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello beautiful soul! 💜 I'm Sakhi, your empathetic companion. I'm here to listen, support, and uplift you. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('sakhi-chat', {
        body: { message: input }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again in a moment. Your wellbeing is important to me. 💜",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-secondary to-secondary-dark text-foreground p-6 shadow-md">
        <div className="container mx-auto">
          <a href="/" className="text-muted-foreground hover:text-foreground mb-2 inline-block">← Back to Home</a>
          <div className="flex items-center gap-4">
            <img src={sakhiImage} alt="Sakhi" className="w-16 h-16 rounded-full" />
            <div>
              <h1 className="font-display text-4xl font-bold flex items-center gap-3">
                Sakhi
              </h1>
              <p className="text-muted-foreground">Your empathetic companion</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-4xl">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card className={`max-w-[80%] p-4 ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-primary to-primary-light text-white' 
                  : 'bg-gradient-to-br from-secondary/40 to-secondary-dark/40'
              }`}>
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="font-semibold text-sm">Sakhi</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </Card>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] p-4 bg-gradient-to-br from-secondary/40 to-secondary-dark/40">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-pulse text-primary" />
                  <span className="text-sm">Sakhi is thinking...</span>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <Card className="p-4 bg-gradient-to-r from-muted/50 to-muted">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="flex-1 border-2 focus:border-primary"
              disabled={isLoading}
            />
            <Button 
              onClick={sendMessage} 
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-primary to-primary-light"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Support Resources */}
        <Card className="mt-4 p-4 bg-accent/20">
          <p className="text-sm text-center text-muted-foreground">
            💜 Need immediate help? <button className="underline font-semibold text-foreground">Contact Crisis Support</button>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Sakhi;