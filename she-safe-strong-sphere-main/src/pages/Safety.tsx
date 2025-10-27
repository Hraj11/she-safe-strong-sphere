import { useState } from "react";
import { Shield, MapPin, AlertTriangle, CheckCircle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import safetyImage from "@/assets/safety-tracker.png";

const Safety = () => {
  const [currentLocation] = useState("Downtown Area");
  const [safetyLevel] = useState<"safe" | "moderate" | "caution">("safe");

  const safetyColors = {
    safe: "from-green-400/20 to-green-600/20",
    moderate: "from-yellow-400/20 to-yellow-600/20",
    caution: "from-red-400/20 to-red-600/20"
  };

  const safetyIcons = {
    safe: CheckCircle,
    moderate: AlertTriangle,
    caution: AlertTriangle
  };

  const SafetyIcon = safetyIcons[safetyLevel];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-light text-white p-6">
        <div className="container mx-auto">
          <a href="/" className="text-white/80 hover:text-white mb-2 inline-block">← Back to Home</a>
          <h1 className="font-display text-4xl font-bold flex items-center gap-3">
            <Shield className="w-10 h-10" />
            Smart Safety Tracker
          </h1>
          <p className="text-white/90 mt-2">Your intelligent travel companion</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Current Location Status */}
        <Card className={`p-8 mb-8 bg-gradient-to-br ${safetyColors[safetyLevel]} border-0 card-glow`}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <SafetyIcon className={`w-8 h-8 ${
                  safetyLevel === 'safe' ? 'text-green-600' : 
                  safetyLevel === 'moderate' ? 'text-yellow-600' : 
                  'text-red-600'
                }`} />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold mb-1">Current Location</h2>
                <p className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {currentLocation}
                </p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full font-semibold ${
              safetyLevel === 'safe' ? 'bg-green-100 text-green-800' :
              safetyLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {safetyLevel === 'safe' ? 'Safe Zone' : 
               safetyLevel === 'moderate' ? 'Use Caution' : 
               'High Alert'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Crime Rate</p>
              <p className="font-bold text-lg">Low</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Traffic Level</p>
              <p className="font-bold text-lg">Moderate</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Lighting</p>
              <p className="font-bold text-lg">Well-Lit</p>
            </div>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 card-glow">
            <div className="w-full h-48 mb-4 rounded-xl overflow-hidden">
              <img src={safetyImage} alt="Safety tracking" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2 flex items-center gap-2">
              <Navigation className="text-primary" />
              Route Safety Analysis
            </h3>
            <p className="text-muted-foreground mb-4">
              Get real-time safety predictions for your planned routes with alternative suggestions.
            </p>
            <Button className="w-full bg-gradient-to-r from-primary to-primary-light">
              Analyze Route
            </Button>
          </Card>

          <Card className="p-6 card-glow">
            <h3 className="font-display text-xl font-bold mb-4">Travel Guardian</h3>
            <p className="text-muted-foreground mb-4">
              Share your location with trusted contacts. We'll monitor your journey and alert them if anything unusual is detected.
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Location Sharing</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Emergency Contacts</span>
                <span className="text-sm font-semibold">3 Added</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Manage Contacts
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent-dark/20 border-0">
          <h3 className="font-display text-xl font-bold mb-4">Quick Safety Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="btn-empowerment">
              Share My Location
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
    </div>
  );
};

export default Safety;
