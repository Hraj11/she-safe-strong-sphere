import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Safety from "./pages/Safety";
import Sakhi from "./pages/Sakhi";
import Stem from "./pages/Stem";
import NotFound from "./pages/NotFound";
import HealthDashboard from "./pages/HealthDashboard";
import HealthDiet from "./pages/HealthDiet";
import HealthExercise from "./pages/HealthExercise";
import HealthCycle from "./pages/health/HealthCycle";
import HealthHydration from "./pages/health/HealthHydration";
import HealthLifestyle from "./pages/health/HealthLifestyle";
import HealthReminders from "./pages/health/HealthReminders";
import HealthInsights from "./pages/health/HealthInsights";
import HealthEmotions from "./pages/health/HealthEmotions";
import SafetyInteractive from "./pages/SafetyInteractive";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/sakhi" element={<Sakhi />} />
          <Route path="/stem" element={<Stem />} />
          <Route path="/health" element={<HealthDashboard />} />
<Route path="/health/diet" element={<HealthDiet />} />
<Route path="/health/exercise" element={<HealthExercise />} />
          <Route path="/health/cycle" element={<HealthCycle />} />
          <Route path="/health/hydration" element={<HealthHydration />} />
<Route path="/health/diet" element={<HealthDiet />} />
<Route path="/health/emotions" element={<HealthEmotions />} />
<Route path="/health/exercise" element={<HealthExercise />} />
<Route path="/health/lifestyle" element={<HealthLifestyle />} />
<Route path="/health/reminders" element={<HealthReminders />} />
<Route path="/health/insights" element={<HealthInsights />} />

<Route path="/safety" element={<SafetyInteractive />} />


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
