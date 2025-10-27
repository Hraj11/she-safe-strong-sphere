import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Droplet,
  Heart,
  Moon,
  Salad,
  Pill,
  Brain,
  Activity,
} from "lucide-react";

const HealthDashboard: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Menstrual Cycle Tracker",
      icon: <Heart className="h-8 w-8 text-pink-500" />,
      description:
        "Track your periods, predict cycles, and get reminders for upcoming dates.",
      button: "Track Now",
      action: () => navigate("/health/cycle"),
      color: "bg-pink-100",
    },
    {
      title: "Hydration & Sleep Log",
      icon: <Droplet className="h-8 w-8 text-blue-500" />,
      description:
        "Monitor your daily water intake and sleep quality for balanced health.",
      button: "Update Log",
      action: () => navigate("/health/hydration"),
      color: "bg-blue-100",
    },
    {
      title: "Nutrition & PCOS/PCOD Guides",
      icon: <Salad className="h-8 w-8 text-green-500" />,
      description:
        "Access personalized diet, exercise, and lifestyle plans designed for hormonal balance.",
      buttons: [
        { text: "Diet", path: "/health/diet" },
        { text: "Exercise", path: "/health/exercise" },
        { text: "Lifestyle", path: "/health/lifestyle" },
      ],
      color: "bg-green-100",
    },
    {
      title: "Medication & Appointments",
      icon: <Pill className="h-8 w-8 text-purple-500" />,
      description:
        "Set medication reminders and manage doctor appointments seamlessly.",
      button: "Add Reminder",
      action: () => navigate("/health/reminders"),
      color: "bg-purple-100",
    },
    {
      title: "Emotional Health",
      icon: <Brain className="h-8 w-8 text-amber-500" />,
      description:
        "View your emotional health score based on your Sakhi app interactions.",
      button: "View Details",
      action: () => navigate("/health/emotions"),
      color: "bg-amber-100",
    },
    {
      title: "AI Health Insights",
      icon: <Activity className="h-8 w-8 text-rose-500" />,
      description:
        "Get personalized diet and exercise suggestions using TensorFlow Lite & Google Fit data.",
      button: "View Insights",
      action: () => navigate("/health/insights"),
      color: "bg-rose-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50 p-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-10 text-pink-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🌸 Health & Wellness Dashboard
      </motion.h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card
              className={`shadow-xl rounded-2xl border-2 border-white hover:shadow-2xl transition-all duration-300 ${feature.color}`}
            >
              <CardHeader className="flex flex-col items-center">
                <div className="mb-3">{feature.icon}</div>
                <CardTitle className="text-lg font-semibold text-center">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-700">
                <p className="mb-4">{feature.description}</p>

                {/* Handle single or multiple buttons */}
                {feature.buttons ? (
                  <div className="flex flex-wrap justify-center gap-2">
                    {feature.buttons.map((btn, i) => (
                      <Button
                        key={i}
                        onClick={() => navigate(btn.path)}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        {btn.text}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Button
                    onClick={feature.action}
                    className="bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    {feature.button}
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12 text-center text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>
          Connected with <b>Google Fit API</b> • Data stored on{" "}
          <b>Firebase</b> • AI analysis via <b>TensorFlow Lite</b>
        </p>
      </motion.div>
    </div>
  );
};

export default HealthDashboard;
