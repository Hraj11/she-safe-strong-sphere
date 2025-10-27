import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CycleData {
  startDate: string;
  periodLength: number;
  cycleLength: number;
}

export default function HealthCycle() {
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const [startDate, setStartDate] = useState("");
  const [periodLength, setPeriodLength] = useState("");
  const [cycleLength, setCycleLength] = useState("");
  const [predictions, setPredictions] = useState<any>(null);

  // 🔹 Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("menstrualCycleData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setCycleData(parsed);
      calculatePredictions(parsed);
    }
  }, []);

  // 🔹 Save to localStorage when updated
  useEffect(() => {
    if (cycleData) {
      localStorage.setItem("menstrualCycleData", JSON.stringify(cycleData));
    }
  }, [cycleData]);

  const calculatePredictions = (data: CycleData) => {
    const start = new Date(data.startDate);
    if (isNaN(start.getTime())) return;

    const nextPeriodStart = new Date(
      start.getTime() + data.cycleLength * 24 * 60 * 60 * 1000
    );
    const fertileStart = new Date(
      nextPeriodStart.getTime() - 14 * 24 * 60 * 60 * 1000
    );
    const fertileEnd = new Date(
      fertileStart.getTime() + 5 * 24 * 60 * 60 * 1000
    );

    setPredictions({
      nextPeriod: nextPeriodStart,
      fertileWindow: [fertileStart, fertileEnd],
    });
  };

  const handleSave = () => {
    if (!startDate || !periodLength || !cycleLength) return;
    const newData = {
      startDate,
      periodLength: parseInt(periodLength),
      cycleLength: parseInt(cycleLength),
    };
    setCycleData(newData);
    calculatePredictions(newData);
  };

  const handleReset = () => {
    localStorage.removeItem("menstrualCycleData");
    setCycleData(null);
    setPredictions(null);
    setStartDate("");
    setPeriodLength("");
    setCycleLength("");
  };

  // 🔹 Highlight calendar days
  const tileClassName = ({ date, view }: any) => {
    if (view === "month" && cycleData && predictions) {
      const start = new Date(cycleData.startDate);
      const end = new Date(
        start.getTime() + cycleData.periodLength * 24 * 60 * 60 * 1000
      );
      const fertileStart = predictions.fertileWindow[0];
      const fertileEnd = predictions.fertileWindow[1];

      if (date >= start && date <= end) return "bg-red-200 rounded-full";
      if (date >= fertileStart && date <= fertileEnd)
        return "bg-green-200 rounded-full";
      if (
        predictions.nextPeriod &&
        date.toDateString() === predictions.nextPeriod.toDateString()
      )
        return "bg-pink-300 rounded-full";
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">
        🌸 Menstrual Cycle Tracker
      </h2>

      {/* Input Section */}
      <Card className="p-4">
        <CardContent className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col w-full">
            <label>Period Start Date:</label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Period Length (days):</label>
            <Input
              type="number"
              placeholder="e.g. 5"
              value={periodLength}
              onChange={(e) => setPeriodLength(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Cycle Length (days):</label>
            <Input
              type="number"
              placeholder="e.g. 28"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
            />
          </div>

          <Button onClick={handleSave}>Save</Button>
          <Button variant="destructive" onClick={handleReset}>
            Reset
          </Button>
        </CardContent>
      </Card>

      {/* Calendar Section */}
      {predictions && (
        <Card className="p-4 text-center">
          <h3 className="font-semibold mb-3">🗓️ Your Cycle Calendar</h3>
          <div className="flex justify-center">
            <Calendar tileClassName={tileClassName} />
          </div>

          <div className="mt-4 space-y-1">
            <p>
              <strong>Next Period:</strong>{" "}
              {predictions.nextPeriod.toDateString()}
            </p>
            <p>
              <strong>Fertile Window:</strong>{" "}
              {predictions.fertileWindow[0].toDateString()} →{" "}
              {predictions.fertileWindow[1].toDateString()}
            </p>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            <p>🩸 Red = Period Days</p>
            <p>🌿 Green = Fertile Window</p>
            <p>💗 Pink = Next Predicted Period</p>
          </div>
        </Card>
      )}
    </div>
  );
}
