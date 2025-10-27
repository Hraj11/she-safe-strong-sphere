import { motion } from "framer-motion";
import { ArrowLeft, Dumbbell, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HealthExercise = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-rose-400 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <Link to="/health" className="text-white/80 hover:text-white mb-2 inline-block">
            ← Back to Health
          </Link>
          <h1 className="font-display text-4xl font-bold flex items-center gap-3">
            <Dumbbell className="w-10 h-10" />
            Exercise & Fitness
          </h1>
          <p className="text-white/90 mt-2">Move your body, boost your energy</p>
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
          <h2 className="font-display text-2xl font-bold mb-4 text-pink-600">Daily Movement Goals</h2>
          <p className="text-muted-foreground mb-4">
            Regular exercise improves both physical and mental well-being. Set achievable goals
            and track your daily movement to stay consistent.
          </p>
          <Button className="bg-gradient-to-r from-pink-500 to-rose-400 text-white">
            Start Workout Plan
          </Button>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Activity className="text-pink-500" />
              Morning Stretch Routine
            </h3>
            <p className="text-muted-foreground">
              Gentle stretching in the morning increases flexibility and wakes up your muscles.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              💃 Fun Fitness
            </h3>
            <p className="text-muted-foreground">
              Turn fitness into fun — try dance workouts, cycling, or yoga with friends.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default HealthExercise;
