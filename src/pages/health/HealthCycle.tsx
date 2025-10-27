import React, { useState } from "react";
import { addDays, format, differenceInDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

const HealthCycle: React.FC = () => {
  const [lastPeriod, setLastPeriod] = useState<Date | undefined>(undefined);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [predictedNext, setPredictedNext] = useState<Date | null>(null);
  const [fertileStart, setFertileStart] = useState<Date | null>(null);
  const [fertileEnd, setFertileEnd] = useState<Date | null>(null);

  const handlePredict = () => {
    if (!lastPeriod || !cycleLength) return;

    const nextPeriod = addDays(lastPeriod, cycleLength);
    const fertileWindowStart = addDays(lastPeriod, cycleLength - 14 - 2);
    const fertileWindowEnd = addDays(lastPeriod, cycleLength - 14 + 2);

    setPredictedNext(nextPeriod);
    setFertileStart(fertileWindowStart);
    setFertileEnd(fertileWindowEnd);
  };

  return (
    <div className="flex justify-center p-6 bg-gradient-to-br from-pink-50 to-rose-100 min-h-screen">
      <Card className="max-w-lg w-full shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-pink-700">
            Health Cycle Tracker 💖
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Fields */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700">
              Last Period Start Date:
            </label>
            <Calendar
              mode="single"
              selected={lastPeriod}
              onSelect={setLastPeriod}
              className="rounded-md border shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700">
              Average Cycle Length (days):
            </label>
            <Input
              type="number"
              value={cycleLength}
              min={20}
              max={40}
              onChange={(e) => setCycleLength(Number(e.target.value))}
            />
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handlePredict}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg"
            >
              Predict Cycle
            </Button>
          </div>

          {/* Predictions */}
          {predictedNext && (
            <div className="p-4 bg-pink-100 rounded-lg border border-pink-200 space-y-2">
              <h3 className="text-lg font-semibold text-pink-800">
                Prediction Results 🌸
              </h3>
              <p>
                <strong>Next Period:</strong>{" "}
                {format(predictedNext, "dd MMM yyyy")}
              </p>
              <p>
                <strong>Fertile Window:</strong>{" "}
                {format(fertileStart!, "dd MMM")} -{" "}
                {format(fertileEnd!, "dd MMM yyyy")}
              </p>
              <p className="text-sm text-gray-600">
                Your cycle length is approximately {cycleLength} days.
              </p>
            </div>
          )}

          {/* Calendar Summary */}
          {lastPeriod && (
            <div className="mt-4">
              <h3 className="font-medium mb-2 text-gray-800">
                Calendar Overview 📅
              </h3>
              <Calendar
                mode="single"
                selected={predictedNext || lastPeriod}
                className="rounded-md border shadow-sm"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthCycle;