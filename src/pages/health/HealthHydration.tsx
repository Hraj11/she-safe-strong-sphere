// src/pages/health/HealthHydration.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DayLog {
  date: string;
  waterIntake: number;
  sleepHours: number;
}

const HealthHydration: React.FC = () => {
  const [waterInput, setWaterInput] = useState("");
  const [sleepInput, setSleepInput] = useState("");
  const [log, setLog] = useState<DayLog[]>([]);
  const [goalWater, setGoalWater] = useState(2000); // ml
  const [goalSleep, setGoalSleep] = useState(8); // hrs

  // Load existing log from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("hydrationSleepLog");
    if (saved) setLog(JSON.parse(saved));
  }, []);

  // Save log to localStorage
  useEffect(() => {
    localStorage.setItem("hydrationSleepLog", JSON.stringify(log));
  }, [log]);

  // Add daily entry
  const addEntry = () => {
    if (!waterInput || !sleepInput) return;

    const today = new Date().toLocaleDateString("en-GB");
    const existing = log.find((entry) => entry.date === today);

    if (existing) {
      // update existing entry
      setLog((prev) =>
        prev.map((e) =>
          e.date === today
            ? {
                ...e,
                waterIntake: Number(waterInput),
                sleepHours: Number(sleepInput),
              }
            : e
        )
      );
    } else {
      setLog((prev) => [
        ...prev,
        {
          date: today,
          waterIntake: Number(waterInput),
          sleepHours: Number(sleepInput),
        },
      ]);
    }

    setWaterInput("");
    setSleepInput("");
  };

  // Compute average
  const avgWater =
    log.length > 0
      ? (log.reduce((sum, e) => sum + e.waterIntake, 0) / log.length).toFixed(0)
      : 0;
  const avgSleep =
    log.length > 0
      ? (log.reduce((sum, e) => sum + e.sleepHours, 0) / log.length).toFixed(1)
      : 0;

  // Personalized suggestions
  const getSuggestions = () => {
    const suggestions: string[] = [];

    if (Number(avgWater) < goalWater)
      suggestions.push("💧 Drink more water to stay hydrated.");
    else
      suggestions.push("✅ Great! You’re meeting your hydration goal.");

    if (Number(avgSleep) < goalSleep)
      suggestions.push("😴 Try to get a bit more sleep for optimal recovery.");
    else
      suggestions.push("🌙 Awesome! You’re sleeping enough.");

    if (Number(avgSleep) > 9)
      suggestions.push("⚠️ Oversleeping may affect energy balance — monitor your routine.");

    if (Number(avgWater) > 4000)
      suggestions.push("⚠️ You might be overhydrating; avoid excessive water intake.");

    return suggestions;
  };

  const suggestions = getSuggestions();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        💧 Hydration & Sleep Tracker
      </h1>

      {/* Input Section */}
      <Card className="p-6 shadow-md border-blue-200">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-500 text-center">
            Log Today’s Data
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              type="number"
              placeholder="Water intake (ml)"
              value={waterInput}
              onChange={(e) => setWaterInput(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Sleep hours"
              value={sleepInput}
              onChange={(e) => setSleepInput(e.target.value)}
            />
            <Button onClick={addEntry}>Add Entry</Button>
          </div>
        </CardContent>
      </Card>

      {/* Graph Section */}
      <Card className="p-6 shadow-md border-green-200">
        <CardContent>
          <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
            📊 Weekly Trends
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={log}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="waterIntake"
                stroke="#3b82f6"
                name="Water (ml)"
              />
              <Line
                type="monotone"
                dataKey="sleepHours"
                stroke="#9333ea"
                name="Sleep (hrs)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card className="p-6 shadow-md border-purple-200">
        <CardContent className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-purple-600 mb-2">
            📈 Summary
          </h2>
          <p>
            Average Water Intake: <b>{avgWater} ml</b> (Goal: {goalWater} ml)
          </p>
          <p>
            Average Sleep: <b>{avgSleep} hrs</b> (Goal: {goalSleep} hrs)
          </p>
        </CardContent>
      </Card>

      {/* Suggestions Section */}
      <Card className="p-6 shadow-md border-pink-200">
        <CardContent>
          <h2 className="text-xl font-semibold text-pink-600 mb-3 text-center">
            💡 Personalized Suggestions
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthHydration;
