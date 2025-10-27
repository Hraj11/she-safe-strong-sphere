import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pill, Smile, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function HealthDashboard() {
  const emotionScore = 82;

  return (
    <motion.div
      className="p-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Medication & Appointments */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="font-semibold flex items-center gap-2">
          <Pill className="text-purple-400" /> Medication & Appointments
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Never miss a dose or checkup.</p>
          <ul className="list-disc ml-4 mt-2 text-sm">
            <li>Iron tablets - 8:00 AM daily</li>
            <li>Doctor visit - 10th Nov, 4:00 PM</li>
          </ul>
          <Button className="mt-3">Add Reminder</Button>
        </CardContent>
      </Card>

      {/* Emotional Health */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="font-semibold flex items-center gap-2">
          <Smile className="text-yellow-500" /> Emotional Health
        </CardHeader>
        <CardContent>
          <p>Emotional Health Score: {emotionScore}/100</p>
          <Progress value={emotionScore} className="my-2" />
          <p className="text-sm text-gray-500">
            {emotionScore > 75
              ? "You seem emotionally balanced today!"
              : "Try relaxation or journaling to uplift your mood."}
          </p>
        </CardContent>
      </Card>

      {/* PCOS/PCOD Guides */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="font-semibold flex items-center gap-2">
          <Moon className="text-indigo-500" /> PCOS/PCOD & Lifestyle Guides
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="diet">
            <TabsList>
              <TabsTrigger value="diet">Diet</TabsTrigger>
              <TabsTrigger value="exercise">Exercise</TabsTrigger>
              <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            </TabsList>
            <TabsContent value="diet">
              <ul className="list-disc ml-4 text-sm">
                <li>Eat whole grains, leafy greens, and omega-3s.</li>
                <li>Avoid refined sugars and processed snacks.</li>
              </ul>
            </TabsContent>
            <TabsContent value="exercise">
              <ul className="list-disc ml-4 text-sm">
                <li>Try yoga, brisk walks, or light strength training.</li>
                <li>Avoid overexertion; consistency matters most.</li>
              </ul>
            </TabsContent>
            <TabsContent value="lifestyle">
              <ul className="list-disc ml-4 text-sm">
                <li>Maintain a sleep schedule.</li>
                <li>Track your stress levels through journaling.</li>
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
