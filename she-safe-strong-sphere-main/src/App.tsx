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
          <Route path="/health" element={<HealthDashboard />} />
<Route path="/health/diet" element={<HealthDiet />} />
<Route path="/health/exercise" element={<HealthExercise />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
