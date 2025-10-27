import { useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EmergencyButton = () => {
  const [showCancel, setShowCancel] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const handleEmergency = () => {
    setShowCancel(true);
    let counter = 10;
    
    const timer = setInterval(() => {
      counter -= 1;
      setCountdown(counter);
      
      if (counter === 0) {
        clearInterval(timer);
        triggerEmergency();
        setShowCancel(false);
        setCountdown(10);
      }
    }, 1000);

    // Store timer ID for potential cancellation
    (window as any).emergencyTimer = timer;
  };

  const cancelEmergency = () => {
    clearInterval((window as any).emergencyTimer);
    setShowCancel(false);
    setCountdown(10);
    toast.info("Emergency alert cancelled");
  };

  const triggerEmergency = () => {
    toast.error("🚨 EMERGENCY ALERT SENT", {
      description: "Your location and alert have been sent to emergency contacts and authorities."
    });
    // In production, this would trigger actual emergency protocols
  };

  if (showCancel) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <div className="bg-destructive text-destructive-foreground px-6 py-4 rounded-2xl shadow-2xl pulse-glow">
          <p className="font-bold text-lg mb-1">Emergency Alert in {countdown}s</p>
          <p className="text-sm opacity-90">Sending location to emergency contacts...</p>
        </div>
        <Button 
          onClick={cancelEmergency}
          variant="outline"
          className="bg-white"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel Emergency
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleEmergency}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-destructive hover:bg-destructive/90 shadow-2xl pulse-glow"
      title="Emergency SOS"
    >
      <AlertCircle className="w-8 h-8" />
    </Button>
  );
};

export default EmergencyButton;
