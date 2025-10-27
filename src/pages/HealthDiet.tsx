import { motion } from "framer-motion";
import { ArrowLeft, Apple, HeartPulse } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HealthDiet = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-rose-400 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <Link to="/health" className="text-white/80 hover:text-white mb-2 inline-block">
            ← Back to Health
          </Link>
          <h1 className="font-display text-4xl font-bold flex items-center gap-3">
            <Apple className="w-10 h-10" />
            Diet & Nutrition
          </h1>
          <p className="text-white/90 mt-2">Healthy eating made simple and delicious</p>
        </div>
      </header>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-8"
      >
        <Card className="p-8 shadow-xl mb-8">
          <h2 className="font-display text-2xl font-bold mb-4 text-pink-600">Balanced Nutrition</h2>
          <p className="text-muted-foreground mb-4">
            A balanced diet provides your body with the nutrients it needs to function correctly.
            Focus on including a variety of fruits, vegetables, lean proteins, and whole grains.
          </p>
          <Button className="bg-gradient-to-r from-pink-500 to-rose-400 text-white">
            Explore Meal Plans
          </Button>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <HeartPulse className="text-pink-500" />
              Heart-Healthy Foods
            </h3>
            <p className="text-muted-foreground">
              Include more foods rich in omega-3 fatty acids like salmon, walnuts, and flaxseeds.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              🥦 Vegetables First
            </h3>
            <p className="text-muted-foreground">
              Eating vegetables first helps control blood sugar and keeps you fuller for longer.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default HealthDiet;
