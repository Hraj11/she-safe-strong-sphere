import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import HealthTrendsChart from "@/components/HealthTrendsChart";
import AchievementBadges from "@/components/AchievementBadges";
import ShareProgress from "@/components/ShareProgress";
import NotificationManager from "@/components/NotificationManager";

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
  const [activeTab, setActiveTab] = useState<"ai-coach" | "analytics" | "achievements">("ai-coach");

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
    
    // Use the new mood data from emotion picker
    const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    const happyDays = moodHistory.filter((m: any) => m.emotion === 'Great' || m.emotion === 'Good').length;
    const moodScore = (happyDays / Math.max(moodHistory.length, 1)) * 100 || 0;

    // Get health score from new system
    const healthScore = parseInt(localStorage.getItem('healthScore') || '85');
    const streak = parseInt(localStorage.getItem('checkInStreak') || '0');

    insights.push("Hey Gorgeous!! 👋 I've analyzed your wellness journey!");
    insights.push(`💖 Your current health score is ${healthScore}%`);
    
    if (streak > 0) {
      insights.push(`🔥 Amazing ${streak}-day check-in streak!`);
    }

    if (avgWater < 2)
      insights.push("🚰 You're drinking less than 2L of water daily. Try keeping a bottle near your desk!");
    else insights.push("💧 Great hydration habits! You're keeping yourself refreshed and energized.");

    if (avgSleep < 6)
      insights.push("😴 Looks like your sleep is below 6 hours. Try setting a bedtime alarm ⏰");
    else if (avgSleep >= 7 && avgSleep <= 9)
      insights.push("🌙 You're sleeping really well — around 7–9 hours. That's the perfect range!");
    else insights.push("🛌 A bit more sleep discipline might help your energy levels stabilize.");

    if (moodScore < 50)
      insights.push("💔 You've had a few low mood days. Journaling or a quick walk can lift your spirits!");
    else if (moodScore >= 75) 
      insights.push("🌸 You've been in such a positive mood lately — keep spreading good vibes!");
    else 
      insights.push("💛 Your mood has been stable. Consistency is key to wellbeing!");

    if (cycle) {
      insights.push(
        `📅 Your next period is expected around ${cycle.nextPeriodPrediction}. Your average cycle is ${cycle.cycleLength} days.`
      );
      if (cycle.cycleLength < 25)
        insights.push("⚠️ Your cycle seems a bit short — if it continues, consider checking in with a doctor.");
      else if (cycle.cycleLength > 35)
        insights.push("🔍 Your cycle is longer than 35 days — might be worth tracking for consistency.");
    }

    // New insights based on the emotion tracking system
    if (healthScore < 60) 
      insights.push("📉 Your health score could use a boost! Try some self-care activities today.");
    else if (healthScore >= 90)
      insights.push("🏆 Wow! You're crushing your wellness goals! Keep up the amazing work!");

    if (moodHistory.length >= 7) {
      const recentMoods = moodHistory.slice(-7);
      const greatDays = recentMoods.filter((m: any) => m.emotion === 'Great').length;
      if (greatDays >= 5) {
        insights.push("🌟 Incredible! You've had 5+ great days this week! What's your secret?");
      }
    }

    insights.push("✨ Overall, you're doing great — small habits lead to big results 💪");

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
    if (activeTab === "ai-coach") {
      loadInsights();
    }
  }, [activeTab]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Health Insights & Analytics</h1>
        <p className="text-muted-foreground">Your complete wellness dashboard</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg max-w-md mx-auto">
        {[
          { id: "ai-coach", label: "🤖 AI Coach" },
          { id: "analytics", label: "📊 Analytics" },
          { id: "achievements", label: "🏆 Achievements" }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className="flex-1"
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* AI Coach Tab */}
      {activeTab === "ai-coach" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-lg h-full">
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

                <Button onClick={loadInsights} className="w-full">
                  🔄 Ask for More Insights
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <NotificationManager />
            <ShareProgress />
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HealthTrendsChart />
          <Card>
            <CardHeader>
              <CardTitle>Wellness Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span>Current Health Score</span>
                  <span className="text-2xl font-bold text-green-600">
                    {localStorage.getItem('healthScore') || '85'}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span>Check-in Streak</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {localStorage.getItem('checkInStreak') || '0'} days
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span>Total Check-ins</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {JSON.parse(localStorage.getItem('moodHistory') || '[]').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === "achievements" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AchievementBadges />
          <Card>
            <CardHeader>
              <CardTitle>Progress Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-4xl mb-2">🎯</div>
                  <h3 className="font-semibold mb-2">Your Wellness Journey</h3>
                  <p className="text-sm text-muted-foreground">
                    Keep up the great work! Every check-in brings you closer to your goals.
                  </p>
                </div>
                <ShareProgress />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HealthInsights;