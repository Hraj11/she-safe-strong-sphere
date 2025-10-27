import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Heart, Utensils, Dumbbell, Moon } from "lucide-react";

const HealthLifestyle: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        className="text-3xl font-bold text-center text-pink-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🌸 Nutrition & PCOS/PCOD Lifestyle Guide
      </motion.h1>

      <p className="text-gray-600 text-center max-w-2xl mx-auto">
        Living with PCOS/PCOD can be challenging, but with the right nutrition, habits, and mindset,
        you can regain hormonal balance, energy, and confidence. Let’s explore how real women did it —
        and how you can too.
      </p>

      {/* --- Section 1: Nutrition --- */}
      <Card className="shadow-lg border-pink-200">
        <CardHeader
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("nutrition")}
        >
          <CardTitle className="flex items-center gap-2 text-pink-700">
            <Utensils className="text-pink-600" /> Nutrition Tips 🍎
          </CardTitle>
          {openSection === "nutrition" ? <ChevronUp /> : <ChevronDown />}
        </CardHeader>
        {openSection === "nutrition" && (
          <CardContent className="space-y-3">
            <p>
              🍽️ <strong>Focus on whole foods:</strong> Eat high-fiber vegetables, lean proteins,
              and healthy fats (like avocado, nuts, and olive oil).
            </p>
            <p>
              🚫 <strong>Avoid:</strong> processed sugars, refined carbs, and junk food — these spike
              insulin levels.
            </p>
            <p>
              💧 <strong>Hydrate:</strong> Aim for 2.5–3L of water daily to support metabolism.
            </p>
            <div className="bg-pink-50 p-3 rounded-xl mt-3">
              <strong>Real Story:</strong> Priya (26) from Delhi balanced her PCOS symptoms in 4 months
              by replacing sugary snacks with fruit and yogurt bowls. “I didn’t diet — I nourished myself.”
            </div>
          </CardContent>
        )}
      </Card>

      {/* --- Section 2: Exercise --- */}
      <Card className="shadow-lg border-pink-200">
        <CardHeader
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("exercise")}
        >
          <CardTitle className="flex items-center gap-2 text-pink-700">
            <Dumbbell className="text-pink-600" /> Exercise & Movement 💪
          </CardTitle>
          {openSection === "exercise" ? <ChevronUp /> : <ChevronDown />}
        </CardHeader>
        {openSection === "exercise" && (
          <CardContent className="space-y-3">
            <p>
              🧘‍♀️ <strong>Moderate workouts:</strong> Try yoga, Pilates, or brisk walking 4–5 times a week.
            </p>
            <p>
              🚴‍♀️ <strong>Strength training:</strong> Helps improve insulin sensitivity and burn fat sustainably.
            </p>
            <p>
              🚶‍♀️ Even a <strong>10-minute walk</strong> after meals reduces sugar spikes.
            </p>
            <div className="bg-pink-50 p-3 rounded-xl mt-3">
              <strong>Real Story:</strong> Meera (21) reversed irregular cycles by dancing 30 minutes daily.
              “I stopped fearing workouts — I started enjoying movement.”
            </div>
          </CardContent>
        )}
      </Card>

      {/* --- Section 3: Sleep & Stress --- */}
      <Card className="shadow-lg border-pink-200">
        <CardHeader
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("sleep")}
        >
          <CardTitle className="flex items-center gap-2 text-pink-700">
            <Moon className="text-pink-600" /> Sleep & Stress 🌙
          </CardTitle>
          {openSection === "sleep" ? <ChevronUp /> : <ChevronDown />}
        </CardHeader>
        {openSection === "sleep" && (
          <CardContent className="space-y-3">
            <p>
              💤 Aim for <strong>7–8 hours</strong> of quality sleep. Irregular sleep worsens hormone imbalance.
            </p>
            <p>
              🌿 Try <strong>meditation or journaling</strong> to reduce cortisol (stress hormone).
            </p>
            <p>
              ☕ Limit caffeine after 5 PM to prevent sleep disruption.
            </p>
            <div className="bg-pink-50 p-3 rounded-xl mt-3">
              <strong>Real Story:</strong> Aastha (24) improved her mood swings just by fixing her
              sleep routine and journaling every night. “Peace became my medicine.”
            </div>
          </CardContent>
        )}
      </Card>

      {/* --- Section 4: Motivation --- */}
      <Card className="shadow-lg border-pink-200 text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-pink-700">
            <Heart className="text-pink-600" /> You’re Stronger Than PCOS 💖
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>
            🌼 Every small change — skipping soda, taking a walk, or sleeping on time — builds your
            strength. Healing is not a race, it’s a rhythm. Your rhythm. 🌙
          </p>
          <Button className="bg-pink-500 hover:bg-pink-600">
            Start Your Self-Care Journey 🌸
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthLifestyle;
