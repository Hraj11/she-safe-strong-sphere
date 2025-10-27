import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Heart, Droplets, Moon, Apple, Bell, Brain, Activity } from "lucide-react";

const HealthDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-700 drop-shadow-md">
        🌸 Your Personal Health Dashboard
      </h1>

      {/* CARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Menstrual Tracker */}
        <Link to="/health/cycle">
          <Card className="bg-white hover:bg-pink-50 shadow-xl hover:shadow-2xl transition-all rounded-3xl p-4 cursor-pointer border border-pink-200">
            <CardHeader className="flex flex-col items-center">
              <Heart className="h-8 w-8 text-pink-500 mb-2" />
              <CardTitle className="text-lg font-semibold text-pink-700">
                Menstrual Cycle Tracker
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-center">
              <p>Track your cycles, fertility windows, and get predictions.</p>
              <Button className="mt-3 bg-pink-500 hover:bg-pink-600 text-white">
                Track Now
              </Button>
            </CardContent>
          </Card>
        </Link>

        {/* Hydration & Sleep */}
        <Card className="bg-white hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all rounded-3xl p-4 border border-blue-200">
          <CardHeader className="flex flex-col items-center">
            <Droplets className="h-8 w-8 text-blue-500 mb-2" />
            <CardTitle className="text-lg font-semibold text-blue-700">
              Hydration & Sleep Log
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 text-center">
            <p>Water intake: 2.5L / 3L</p>
            <Progress value={83} className="mt-3" />
            <p className="mt-3">Sleep: 7h 45m last night</p>
            <Button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white">
              Update Log
            </Button>
          </CardContent>
        </Card>

        {/* Nutrition Plans */}
        <Link to="/health/diet">
          <Card className="bg-white hover:bg-green-50 shadow-xl hover:shadow-2xl transition-all rounded-3xl p-4 cursor-pointer border border-green-200">
            <CardHeader className="flex flex-col items-center">
              <Apple className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle className="text-lg font-semibold text-green-700">
                Nutrition & PCOS/PCOD Guides
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-center">
              <p>Personalized plans and lifestyle recommendations.</p>
              <div className="flex gap-2 justify-center mt-3">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Diet
                </Button>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  Exercise
                </Button>
                <Button className="bg-lime-500 hover:bg-lime-600 text-white">
                  Lifestyle
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Medication & Appointments */}
        <Card className="bg-white hover:bg-purple-50 shadow-xl hover:shadow-2xl transition-all rounded-3xl p-4 border border-purple-200">
          <CardHeader className="flex flex-col items-center">
            <Bell className="h-8 w-8 text-purple-500 mb-2" />
            <CardTitle className="text-lg font-semibold text-purple-700">
              Medication & Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 text-center">
            <ul className="text-left mx-auto w-fit list-disc">
              <li>Iron tablets – 8:00 AM daily</li>
              <li>Doctor visit – 10th Nov, 4:00 PM</li>
            </ul>
            <Button className="mt-3 bg-purple-500 hover:bg-purple-600 text-white">
              Add Reminder
            </Button>
          </CardContent>
        </Card>

        {/* Emotional Health */}
        <Card className="bg-white hover:bg-rose-50 shadow-xl hover:shadow-2xl transition-all rounded-3xl p-4 border border-rose-200">
          <CardHeader className="flex flex-col items-center">
            <Brain className="h-8 w-8 text-rose-500 mb-2" />
            <CardTitle className="text-lg font-semibold text-rose-700">
              Emotional Health
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            <p>Emotional Health Score: <b>82 / 100</b></p>
            <Progress value={82} className="mt-3" />
            <p className="mt-3 italic">You seem emotionally balanced today 💖</p>
          </CardContent>
        </Card>

        {/* AI Health Predictions */}
        <Card className="bg-white hover:bg-yellow-50 shadow-xl hover:shadow-2xl transition-all rounded-3xl p-4 border border-yellow-200">
          <CardHeader className="flex flex-col items-center">
            <Activity className="h-8 w-8 text-yellow-500 mb-2" />
            <CardTitle className="text-lg font-semibold text-yellow-700">
              AI Health Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 text-center">
            <p>
              TensorFlow Lite predicts your stress and fatigue levels using
              Google Fit data.
            </p>
            <Button className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white">
              View Insights
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-500 text-sm mt-10">
        Synced with Google Fit | Powered by Firebase | AI by TensorFlow Lite
      </p>
    </div>
  );
};

export default HealthDashboard;
