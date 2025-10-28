import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface HydrationSleepData {
  date: string;
  waterIntake: number;
  sleepHours: number;
}

interface MoodEntry {
  date: string;
  mood: string;
}

interface CycleData {
  startDate: string;
  endDate: string;
  cycleLength: number;
  nextPeriodPrediction: string;
}

interface ChatMessage {
  sender: "ai" | "user";
  text: string;
}

const HealthInsights: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const typeMessage = async (text: string) => {
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 800));
    setMessages((prev) => [...prev, { sender: "ai", text }]);
    setIsTyping(false);
  };

  const generateInsights = (
    hydration: HydrationSleepData[],
    moods: MoodEntry[],
    cycle: CycleData | null
  ) => {
    const insights: string[] = [];
    const avgWater =
      hydration.length > 0
        ? hydration.reduce((a, b) => a + b.waterIntake, 0) / hydration.length
        : 0;
    const avgSleep =
      hydration.length > 0
        ? hydration.reduce((a, b) => a + b.sleepHours, 0) / hydration.length
        : 0;
    const happyDays = moods.filter((m) => ["😊", "😄", "😁"].includes(m.mood)).length;
    const moodScore = (happyDays / moods.length) * 100 || 0;

    insights.push("Hey Gorgeous!! 👋 I’ve analyzed your recent health logs!");
    if (avgWater < 2)
      insights.push("🚰 You’re drinking less than 2L of water daily. Try keeping a bottle near your desk!");
    else insights.push("💧 Great hydration habits! You’re keeping yourself refreshed and energized.");

    if (avgSleep < 6)
      insights.push("😴 Looks like your sleep is below 6 hours. Try setting a bedtime alarm ⏰");
    else if (avgSleep >= 7 && avgSleep <= 9)
      insights.push("🌙 You’re sleeping really well — around 7–9 hours. That’s the perfect range!");
    else insights.push("🛌 A bit more sleep discipline might help your energy levels stabilize.");

    if (moodScore < 50)
      insights.push("💔 You’ve had a few low mood days. Journaling or a quick walk can lift your spirits!");
    else insights.push("🌸 You’ve been in a positive mood lately — keep spreading good vibes!");

    if (cycle) {
      insights.push(
        `📅 Your next period is expected around ${cycle.nextPeriodPrediction}. Your average cycle is ${cycle.cycleLength} days.`
      );
      if (cycle.cycleLength < 25)
        insights.push("⚠️ Your cycle seems a bit short — if it continues, consider checking in with a doctor.");
      else if (cycle.cycleLength > 35)
        insights.push("🔍 Your cycle is longer than 35 days — might be worth tracking for consistency.");
    }

    if (avgSleep < 6 && moodScore < 50)
      insights.push("🤖 AI Insight: Lack of sleep might be lowering your mood. Try a 10pm digital detox 😌");
    if (avgWater < 1.5 && cycle && cycle.cycleLength > 35)
      insights.push("💡 AI Suggestion: Hydration may help regulate hormonal balance. Sip throughout the day!");

    insights.push("✨ Overall, you’re doing great — small habits lead to big results 💪");

    return insights;
  };

  const loadInsights = async () => {
    setMessages([]);
    const hydrationData = JSON.parse(localStorage.getItem("hydrationSleepData") || "[]");
    const moodData = JSON.parse(localStorage.getItem("moodData") || "[]");
    const cycleData = JSON.parse(localStorage.getItem("cycleData") || "null");

    const insights = generateInsights(hydrationData, moodData, cycleData);
    for (const tip of insights) {
      await typeMessage(tip);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">🤖 AI Health Coach</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 h-[420px] overflow-y-auto border border-gray-200">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "ai" ? "justify-start" : "justify-end"
                } mb-3`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                    msg.sender === "ai"
                      ? "bg-blue-100 text-gray-800"
                      : "bg-green-100 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-400">
                <Loader2 className="h-4 w-4 animate-spin" /> <span>AI is thinking...</span>
              </div>
            )}
          </div>

          <Button onClick={loadInsights} className="w-full mt-4">
            🔄 Ask for More Insights
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthInsights;
