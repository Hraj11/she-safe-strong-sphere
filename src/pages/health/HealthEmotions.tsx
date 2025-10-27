import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface MoodEntry {
  date: string;
  emoji: string;
  mood: string;
}

const HealthEmotional: React.FC = () => {
  const moods = [
    { emoji: "😊", mood: "Happy" },
    { emoji: "😢", mood: "Sad" },
    { emoji: "😌", mood: "Relaxed" },
    { emoji: "😠", mood: "Angry" },
    { emoji: "😴", mood: "Tired" },
    { emoji: "😰", mood: "Anxious" },
    { emoji: "🤩", mood: "Excited" },
    { emoji: "❤️", mood: "Loved" },
  ];

  const moodScale: Record<string, number> = {
    "Happy": 8,
    "Relaxed": 7,
    "Loved": 8,
    "Excited": 9,
    "Sad": 3,
    "Tired": 4,
    "Angry": 2,
    "Anxious": 5,
  };

  const moodAdvice: Record<string, string> = {
    "Happy": "Keep spreading positivity 🌞! Do something kind for yourself today.",
    "Sad": "It’s okay to feel sad 💧. Try journaling or talking to a loved one.",
    "Relaxed": "Stay in the flow 🌿. Enjoy the calm with a short meditation.",
    "Angry": "Take a deep breath 😤. Step away and stretch for a few minutes.",
    "Tired": "You deserve rest 😴. Sleep early or take a nap.",
    "Anxious": "Pause and breathe 🌬️. Focus on one task at a time.",
    "Excited": "Channel your energy 🔥! Do something creative today.",
    "Loved": "You are surrounded by love ❤️. Express gratitude to your people.",
  };

  const quotes = [
    "You are doing your best, and that’s enough 💖",
    "Take things one step at a time 🌿",
    "It’s okay to not be okay 🌧️",
    "Be proud of how far you’ve come 🌸",
    "Self-love is the best kind of love 💕",
  ];

  const [selectedMood, setSelectedMood] = useState<MoodEntry | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [quote, setQuote] = useState<string>("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("moodHistory");
    if (saved) setMoodHistory(JSON.parse(saved));
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
  }, [moodHistory]);

  // Add new mood
  const handleAddMood = (emoji: string, mood: string) => {
    const newEntry: MoodEntry = {
      date: new Date().toLocaleDateString(),
      emoji,
      mood,
    };
    setSelectedMood(newEntry);
    setMoodHistory([...moodHistory, newEntry]);
  };

  // Prepare weekly chart data
  const chartData = moodHistory
    .slice(-7)
    .map((entry) => ({
      date: entry.date,
      moodScore: moodScale[entry.mood] || 5,
      mood: entry.mood,
      emoji: entry.emoji,
    }));

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-pink-700">💖 Emotional Health</h1>
      <p className="text-lg mb-6 text-center max-w-xl italic">“{quote}”</p>

      {/* Mood Selector */}
      <div className="bg-white p-5 rounded-2xl shadow-md w-full max-w-md mb-8 text-center">
        <h2 className="text-xl font-semibold mb-3 text-pink-600">🌤️ How are you feeling today?</h2>
        <div className="grid grid-cols-4 gap-4 justify-center">
          {moods.map((item) => (
            <button
              key={item.mood}
              onClick={() => handleAddMood(item.emoji, item.mood)}
              className={`text-4xl transition transform hover:scale-125 ${
                selectedMood?.emoji === item.emoji ? "scale-125 bg-pink-100 rounded-xl" : ""
              }`}
              title={item.mood}
            >
              {item.emoji}
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="mt-4 text-pink-600 font-medium">
            <p>
              You’re feeling <span className="font-semibold">{selectedMood.mood}</span> today {selectedMood.emoji}
            </p>
            <p className="text-sm text-gray-600 mt-2 italic">
              {moodAdvice[selectedMood.mood]}
            </p>
          </div>
        )}
      </div>

      {/* Mood History */}
      <div className="bg-white p-5 rounded-2xl shadow-md w-full max-w-md mb-8">
        <h2 className="text-xl font-semibold mb-3 text-pink-600">🗓️ Mood History</h2>
        {moodHistory.length === 0 ? (
          <p className="text-gray-500 text-sm">No moods logged yet.</p>
        ) : (
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {moodHistory
              .slice()
              .reverse()
              .map((entry, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-1 text-gray-700"
                >
                  <span>{entry.date}</span>
                  <span className="text-lg">
                    {entry.emoji} <span className="text-sm">{entry.mood}</span>
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Weekly Mood Chart */}
      <div className="bg-white p-5 rounded-2xl shadow-md w-full max-w-md mb-8">
        <h2 className="text-xl font-semibold mb-3 text-pink-600">📊 Weekly Mood Chart</h2>
        {chartData.length === 0 ? (
          <p className="text-gray-500 text-sm">No mood data yet to display.</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} hide />
              <Tooltip
                formatter={(value, name, props) => [`${props.payload.mood} ${props.payload.emoji}`, "Mood"]}
              />
              <Line
                type="monotone"
                dataKey="moodScore"
                stroke="#ec4899"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Breathing Exercise */}
      <div className="bg-pink-100 p-6 rounded-2xl shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-3 text-pink-600">🧘 Breathing Exercise</h2>
        <p className="mb-3">Inhale 4s → Hold 4s → Exhale 4s</p>
        <div className="w-24 h-24 bg-pink-300 rounded-full animate-pulse mx-auto"></div>
      </div>

      <footer className="mt-8 text-sm text-gray-600 text-center">
        Your emotions matter 💕 — every feeling tells a story 🌈
      </footer>
    </div>
  );
};

export default HealthEmotional;
