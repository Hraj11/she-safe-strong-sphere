import { useState } from "react";
import {
  Shield,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Bell,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import safetyImage from "@/assets/safety-tracker.png";

const Safety = () => {
  const [currentLocation] = useState("Downtown Area");
  const [safetyLevel, setSafetyLevel] = useState<
    "safe" | "moderate" | "caution"
  >("safe");
  const [analyzing, setAnalyzing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sharingActive, setSharingActive] = useState(false);
  const [routeData, setRouteData] = useState<any>(null);

  const safetyColors = {
    safe: "from-green-400/20 to-green-600/20",
    moderate: "from-yellow-400/20 to-yellow-600/20",
    caution: "from-red-400/20 to-red-600/20",
  };

  const safetyIcons = {
    safe: CheckCircle,
    moderate: AlertTriangle,
    caution: AlertTriangle,
  };

  const SafetyIcon = safetyIcons[safetyLevel];

  // --- Simulate Route Analysis ---
  const handleAnalyzeRoute = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const outcomes = [
        {
          level: "safe",
          msg: "The route is well-lit and secure. Minimal risk detected.",
          color: "green",
          alt: "No alternate route needed.",
        },
        {
          level: "moderate",
          msg: "Some areas have moderate safety concerns. Stay alert.",
          color: "yellow",
          alt: "Consider using Central Avenue instead of Hill Street.",
        },
        {
          level: "caution",
          msg: "High-risk zones detected. Try an alternate route!",
          color: "red",
          alt: "Safer alternate via City Bypass (adds 5 min).",
        },
      ];
      const random = outcomes[Math.floor(Math.random() * outcomes.length)];
      setSafetyLevel(random.level as "safe" | "moderate" | "caution");
      setRouteData(random);
      setShowModal(true);
      setAnalyzing(false);

      // Store fake analysis in localStorage
      localStorage.setItem(
        "lastSafetyCheck",
        JSON.stringify({
          location: currentLocation,
          safetyLevel: random.level,
          message: random.msg,
          time: new Date().toLocaleString(),
        })
      );
    }, 1200);
  };

  const handleShareLocation = () => {
    const newState = !sharingActive;
    setSharingActive(newState);
    localStorage.setItem(
      "locationSharing",
      JSON.stringify({
        active: newState,
        time: new Date().toLocaleString(),
      })
    );
    alert(
      newState
        ? "📡 Location sharing activated with trusted contacts."
        : "❌ Location sharing stopped."
    );
  };

  const handleSOSAlert = () => {
    const sosData = {
      triggered: true,
      time: new Date().toLocaleString(),
      location: currentLocation,
    };
    localStorage.setItem("sosAlert", JSON.stringify(sosData));
    alert("🚨 SOS Alert sent to emergency contacts!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-light text-white p-6">
        <div className="container mx-auto">
          <a
            href="/"
            className="text-white/80 hover:text-white mb-2 inline-block"
          >
            ← Back to Home
          </a>
          <h1 className="font-display text-4xl font-bold flex items-center gap-3">
            <Shield className="w-10 h-10" />
            Smart Safety Tracker
          </h1>
          <p className="text-white/90 mt-2">Your intelligent travel companion</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Location Safety Overview */}
        <Card
          className={`p-8 mb-8 bg-gradient-to-br ${safetyColors[safetyLevel]} border-0 card-glow`}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <SafetyIcon
                  className={`w-8 h-8 ${
                    safetyLevel === "safe"
                      ? "text-green-600"
                      : safetyLevel === "moderate"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold mb-1">
                  Current Location
                </h2>
                <p className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {currentLocation}
                </p>
              </div>
            </div>
            <span
              className={`px-4 py-2 rounded-full font-semibold ${
                safetyLevel === "safe"
                  ? "bg-green-100 text-green-800"
                  : safetyLevel === "moderate"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {safetyLevel === "safe"
                ? "Safe Zone"
                : safetyLevel === "moderate"
                ? "Use Caution"
                : "High Alert"}
            </span>
          </div>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 card-glow">
            <div className="w-full h-48 mb-4 rounded-xl overflow-hidden">
              <img
                src={safetyImage}
                alt="Safety tracking"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-display text-xl font-bold mb-2 flex items-center gap-2">
              <Navigation className="text-primary" />
              Route Safety Analysis
            </h3>
            <p className="text-muted-foreground mb-4">
              Get simulated route safety ratings and suggested alternate paths.
            </p>
            <Button
              className="w-full bg-gradient-to-r from-primary to-primary-light"
              onClick={handleAnalyzeRoute}
              disabled={analyzing}
            >
              {analyzing ? "Analyzing..." : "Analyze Route"}
            </Button>
          </Card>

          <Card className="p-6 card-glow">
            <h3 className="font-display text-xl font-bold mb-4">
              Travel Guardian
            </h3>
            <p className="text-muted-foreground mb-4">
              Share your location with trusted contacts. We’ll monitor your
              journey and alert them if needed.
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Location Sharing</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    sharingActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {sharingActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Emergency Contacts</span>
                <span className="text-sm font-semibold">3 Added</span>
              </div>
            </div>
            <Button
              variant={sharingActive ? "destructive" : "outline"}
              className="w-full"
              onClick={handleShareLocation}
            >
              {sharingActive ? "Stop Sharing" : "Share My Location"}
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent-dark/20 border-0">
          <h3 className="font-display text-xl font-bold mb-4">
            Quick Safety Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="btn-empowerment" onClick={handleSOSAlert}>
              <Bell className="mr-2" /> SOS Alert
            </Button>
            <Button variant="outline" className="border-2">
              Find Safe Places Nearby
            </Button>
            <Button variant="outline" className="border-2">
              Report Unsafe Area
            </Button>
          </div>
        </Card>
      </div>

      {/* 🔵 Route Analysis Modal */}
      {showModal && routeData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] md:w-[500px] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <Navigation className="text-primary" />
              Route Analysis Result
            </h2>
            <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500">
              🗺️ Simulated Map View
            </div>
            <p className="text-lg font-medium mb-2">{routeData.msg}</p>
            <p className="text-sm text-muted-foreground mb-3">
              Alternate Suggestion: <span className="font-semibold">{routeData.alt}</span>
            </p>
            <div
              className={`px-4 py-2 rounded-full text-center font-bold ${
                routeData.color === "green"
                  ? "bg-green-100 text-green-800"
                  : routeData.color === "yellow"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {routeData.level === "safe"
                ? "Safe Route"
                : routeData.level === "moderate"
                ? "Caution Advised"
                : "High-Risk Route"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Safety;
