import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const defaultWeek = [
  { day: "Mon", water: 0, sleep: 0 },
  { day: "Tue", water: 0, sleep: 0 },
  { day: "Wed", water: 0, sleep: 0 },
  { day: "Thu", water: 0, sleep: 0 },
  { day: "Fri", water: 0, sleep: 0 },
  { day: "Sat", water: 0, sleep: 0 },
  { day: "Sun", water: 0, sleep: 0 },
];

export default function HealthHydration() {
  const [weekData, setWeekData] = useState(defaultWeek);
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem("healthWeekData");
    if (savedData) {
      setWeekData(JSON.parse(savedData));
    }
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem("healthWeekData", JSON.stringify(weekData));
  }, [weekData]);

  const handleSave = () => {
    const updated = weekData.map((d) =>
      d.day === selectedDay
        ? {
            ...d,
            water: parseFloat(water) || 0,
            sleep: parseFloat(sleep) || 0,
          }
        : d
    );
    setWeekData(updated);
    setWater("");
    setSleep("");
  };

  const avgWater =
    weekData.reduce((sum, d) => sum + d.water, 0) / weekData.length;
  const avgSleep =
    weekData.reduce((sum, d) => sum + d.sleep, 0) / weekData.length;

  const waterFeedback =
    avgWater >= 2 ? "💧 Great hydration level!" : "⚠️ Drink more water!";
  const sleepFeedback =
    avgSleep >= 7 ? "😴 Healthy sleep pattern!" : "⚠️ Try to get more rest!";

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🧘 Hydration & Sleep Tracker (Weekly)
      </h2>

      {/* Input Section */}
      <Card className="p-4">
        <CardContent className="flex flex-col md:flex-row items-center gap-4">
          <select
            className="border p-2 rounded w-full md:w-32"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {weekData.map((d) => (
              <option key={d.day} value={d.day}>
                {d.day}
              </option>
            ))}
          </select>

          <Input
            type="number"
            placeholder="Water (litres)"
            value={water}
            onChange={(e) => setWater(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Sleep (hours)"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
          />
          <Button onClick={handleSave}>Save</Button>
        </CardContent>
      </Card>

      {/* Graph Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-2 text-center">💧 Water Intake</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="water" stroke="#007BFF" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-2 text-center">😴 Sleep Hours</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="sleep" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Section */}
      <Card className="p-4 text-center space-y-2">
        <h3 className="font-semibold">Weekly Summary</h3>
        <p>Average Water Intake: {avgWater.toFixed(1)} L</p>
        <p>Average Sleep: {avgSleep.toFixed(1)} hrs</p>
        <p className="text-blue-600">{waterFeedback}</p>
        <p className="text-green-600">{sleepFeedback}</p>
      </Card>
    </div>
  );
}
