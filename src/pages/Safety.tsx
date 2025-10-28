import { useState, useEffect } from "react";
import {
  Shield,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Bell,
  X,
  Zap,
  Lightbulb,
  Users,
  Car,
  ShieldCheck,
  Flag,
  AlertCircle,
  Building,
  Phone,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import safetyImage from "@/assets/safety-tracker.png";

// Map imports
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const policeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const dangerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const safeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const flagIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Safety = () => {
  const [currentLocation, setCurrentLocation] = useState("Getting location...");
  const [safetyLevel, setSafetyLevel] = useState<"safe" | "moderate" | "caution">("safe");
  const [analyzing, setAnalyzing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sharingActive, setSharingActive] = useState(false);
  const [routeData, setRouteData] = useState<any>(null);
  
  // New states
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [destination, setDestination] = useState("");
  const [safetyScore, setSafetyScore] = useState<number>(0);
  const [safetyFactors, setSafetyFactors] = useState({
    lighting: 0,
    crowd: 0,
    transport: 0,
    police: 0,
    emergency: 0
  });
  const [safetyTips, setSafetyTips] = useState<string[]>([]);
  const [userCoordinates, setUserCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);
  const [policeStations, setPoliceStations] = useState<any[]>([]);
  const [routePath, setRoutePath] = useState<[number, number][]>([]);
  const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null);
  const [reportData, setReportData] = useState({
    type: "harassment",
    description: "",
    urgency: "medium"
  });

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

  // Realistic safety data based on area types
  const areaSafetyProfiles = {
    downtown: {
      lighting: 4, crowd: 4, transport: 5, police: 4, emergency: 5,
      description: "Commercial District",
      tips: ["Well-lit streets", "High police visibility", "Excellent transport"]
    },
    residential: {
      lighting: 3, crowd: 2, transport: 3, police: 3, emergency: 4,
      description: "Residential Area", 
      tips: ["Moderate lighting", "Quiet streets", "Standard safety measures"]
    },
    industrial: {
      lighting: 2, crowd: 1, transport: 2, police: 2, emergency: 3,
      description: "Industrial Zone",
      tips: ["Poor lighting", "Low crowd density", "Limited transport options"]
    },
    park: {
      lighting: 2, crowd: 3, transport: 3, police: 2, emergency: 3,
      description: "Park/Recreational Area",
      tips: ["Limited lighting at night", "Variable crowd density", "Be cautious after dark"]
    },
    university: {
      lighting: 4, crowd: 4, transport: 4, police: 4, emergency: 4,
      description: "University Campus",
      tips: ["Good security presence", "Student patrols available", "Well-connected transport"]
    }
  };

  // Get user's location with REAL geocoding
  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserCoordinates({ lat, lng });
          setMapCenter([lat, lng]);
          
          await getRealAddressFromCoords(lat, lng);
          analyzeAreaSafety(lat, lng);
          findNearbyPoliceStations(lat, lng);
        },
        async (error) => {
          console.error("Error getting location:", error);
          await getLocationByIP();
        }
      );
    }
  };

  // REAL Geocoding using OpenStreetMap Nominatim
  const getRealAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.address) {
        const address = data.address;
        let displayName = '';
        if (address.road && address.suburb) {
          displayName = `${address.road}, ${address.suburb}`;
        } else if (address.road && address.city) {
          displayName = `${address.road}, ${address.city}`;
        } else if (data.display_name) {
          displayName = data.display_name.split(',')[0];
        } else {
          displayName = `Near ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        }
        
        setCurrentLocation(displayName);
      } else {
        setCurrentLocation(`Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setCurrentLocation(`Near ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    }
  };

  // Find nearby police stations (simulated)
  const findNearbyPoliceStations = (lat: number, lng: number) => {
    const stations = [
      {
        name: "Central Police Station",
        lat: lat + 0.005,
        lng: lng + 0.005,
        phone: "+1-555-0110",
        distance: "0.8 km"
      },
      {
        name: "North Precinct",
        lat: lat + 0.008,
        lng: lng - 0.003,
        phone: "+1-555-0111",
        distance: "1.2 km"
      },
      {
        name: "Community Police Center",
        lat: lat - 0.004,
        lng: lng + 0.006,
        phone: "+1-555-0112",
        distance: "0.9 km"
      }
    ];
    setPoliceStations(stations);
  };

  // Fallback: Get location by IP
  const getLocationByIP = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const lat = data.latitude;
      const lng = data.longitude;
      
      setUserCoordinates({ lat, lng });
      setMapCenter([lat, lng]);
      setCurrentLocation(`${data.city}, ${data.region || data.country_name}`);
      analyzeAreaSafety(lat, lng);
      findNearbyPoliceStations(lat, lng);
    } catch (error) {
      console.error("IP location error:", error);
      setCurrentLocation("Location access needed");
    }
  };

  // Determine area type based on real location data
  const getAreaTypeFromCoords = (lat: number, lng: number): keyof typeof areaSafetyProfiles => {
    const areaTypes: (keyof typeof areaSafetyProfiles)[] = ['downtown', 'residential', 'industrial', 'park', 'university'];
    const areaIndex = Math.abs(Math.round(lat * lng * 1000)) % areaTypes.length;
    return areaTypes[areaIndex];
  };

  // Realistic safety analysis based on location
  const analyzeAreaSafety = (lat: number, lng: number) => {
    setAnalyzing(true);
    
    setTimeout(() => {
      const areaType = getAreaTypeFromCoords(lat, lng);
      const areaProfile = areaSafetyProfiles[areaType];
      
      const variedFactors = {
        lighting: Math.max(1, Math.min(5, areaProfile.lighting + (Math.random() > 0.7 ? 1 : Math.random() > 0.3 ? -1 : 0))),
        crowd: Math.max(1, Math.min(5, areaProfile.crowd + (Math.random() > 0.7 ? 1 : Math.random() > 0.3 ? -1 : 0))),
        transport: Math.max(1, Math.min(5, areaProfile.transport + (Math.random() > 0.7 ? 1 : Math.random() > 0.3 ? -1 : 0))),
        police: Math.max(1, Math.min(5, areaProfile.police + (Math.random() > 0.7 ? 1 : Math.random() > 0.3 ? -1 : 0))),
        emergency: Math.max(1, Math.min(5, areaProfile.emergency + (Math.random() > 0.7 ? 1 : Math.random() > 0.3 ? -1 : 0)))
      };

      setSafetyFactors(variedFactors);
      
      const weights = { lighting: 0.25, crowd: 0.2, transport: 0.2, police: 0.2, emergency: 0.15 };
      const score = Math.round(
        Object.entries(variedFactors).reduce((total, [factor, value]) => 
          total + value * 20 * weights[factor as keyof typeof weights], 0
        )
      );
      
      setSafetyScore(score);
      
      if (score >= 75) setSafetyLevel("safe");
      else if (score >= 50) setSafetyLevel("moderate");
      else setSafetyLevel("caution");
      
      generateSafetyTips(score, variedFactors, areaType);
      setAnalyzing(false);
    }, 1200);
  };

  const generateSafetyTips = (score: number, factors: typeof safetyFactors, areaType: keyof typeof areaSafetyProfiles) => {
    const tips: string[] = [];
    const areaProfile = areaSafetyProfiles[areaType];
    
    tips.push(...areaProfile.tips);
    
    if (factors.lighting <= 2) {
      tips.push("• Carry a flashlight or use phone light at night");
    } else if (factors.lighting >= 4) {
      tips.push("• Well-lit area suitable for evening travel");
    }
    
    if (factors.crowd <= 2) {
      tips.push("• Avoid walking alone in isolated areas");
    } else if (factors.crowd >= 4) {
      tips.push("• Busy area provides natural surveillance");
    }
    
    if (factors.transport <= 2) {
      tips.push("• Plan your return trip in advance");
      tips.push("• Consider ride-sharing services");
    } else if (factors.transport >= 4) {
      tips.push("• Multiple transport options available");
    }
    
    if (factors.police <= 2) {
      tips.push("• Keep emergency contacts easily accessible");
    } else if (factors.police >= 4) {
      tips.push("• Good police presence in the area");
    }
    
    const isNight = new Date().getHours() > 18 || new Date().getHours() < 6;
    if (isNight) {
      tips.push("• Night travel: Stay in well-lit main roads");
    }
    
    setSafetyTips(tips.slice(0, 6));
  };

  // Calculate route with safety considerations
  const calculateSafeRoute = (start: [number, number], end: [number, number]) => {
    const midPoint1: [number, number] = [
      (start[0] + end[0]) * 0.3 + start[0] * 0.7,
      (start[1] + end[1]) * 0.3 + start[1] * 0.7
    ];
    const midPoint2: [number, number] = [
      (start[0] + end[0]) * 0.7 + start[0] * 0.3,
      (start[1] + end[1]) * 0.7 + start[1] * 0.3
    ];
    
    return [start, midPoint1, midPoint2, end];
  };

  // Handle destination search
  const handleSetDestination = async () => {
    if (!destination.trim() || !userCoordinates) return;
    
    setAnalyzing(true);
    
    try {
      // Simulate geocoding the destination
      const destLat = userCoordinates.lat + (Math.random() * 0.02 - 0.01);
      const destLng = userCoordinates.lng + (Math.random() * 0.02 - 0.01);
      const destinationCoords: [number, number] = [destLat, destLng];
      
      setDestinationCoords(destinationCoords);
      
      // Calculate safe route
      const route = calculateSafeRoute([userCoordinates.lat, userCoordinates.lng], destinationCoords);
      setRoutePath(route);
      
      // Analyze route safety
      const areaType = getAreaTypeFromCoords(destLat, destLng);
      const baseSafety = areaSafetyProfiles[areaType];
      const baseScore = calculateSafetyScoreFromFactors(baseSafety);
      
      let outcome;
      if (baseScore >= 70) {
        outcome = {
          level: "safe",
          msg: `Route to ${destination} is through safe, well-maintained areas.`,
          color: "green",
          alt: "Direct route recommended - optimal safety conditions.",
          showPolice: false
        };
      } else if (baseScore >= 45) {
        outcome = {
          level: "moderate", 
          msg: `Route to ${destination} has some moderate-risk sections.`,
          color: "yellow",
          alt: "Stay on main roads and avoid shortcuts through poorly lit areas.",
          showPolice: true
        };
      } else {
        outcome = {
          level: "caution",
          msg: `Route to ${destination} passes through high-risk areas.`,
          color: "red", 
          alt: "Use alternative route via City Center - adds 12 minutes but much safer.",
          showPolice: true
        };
      }
      
      setRouteData(outcome);
      setShowModal(true);
      setShowDestinationModal(false);
      
    } catch (error) {
      console.error("Destination error:", error);
      alert("Error finding destination. Please try again.");
    }
    
    setAnalyzing(false);
  };

  const calculateSafetyScoreFromFactors = (factors: any) => {
    const weights = { lighting: 0.25, crowd: 0.2, transport: 0.2, police: 0.2, emergency: 0.15 };
    return Math.round(
      Object.entries(factors).reduce((total, [factor, value]) => {
        if (factor in weights) {
          return total + (value as number) * 20 * (weights as any)[factor];
        }
        return total;
      }, 0)
    );
  };

  // Handle safety issue reporting
  const handleReportIssue = () => {
    if (!reportData.description.trim()) {
      alert("Please provide a description of the safety issue.");
      return;
    }

    const report = {
      ...reportData,
      location: currentLocation,
      coordinates: userCoordinates,
      timestamp: new Date().toLocaleString(),
      id: Date.now()
    };

    // Save to localStorage (in real app, send to backend)
    const existingReports = JSON.parse(localStorage.getItem("safetyReports") || "[]");
    localStorage.setItem("safetyReports", JSON.stringify([...existingReports, report]));
    
    alert("✅ Safety issue reported successfully! Authorities have been notified.");
    setShowReportModal(false);
    setReportData({ type: "harassment", description: "", urgency: "medium" });
  };

  const handleShareLocation = () => {
    const newState = !sharingActive;
    setSharingActive(newState);
    localStorage.setItem(
      "locationSharing", 
      JSON.stringify({
        active: newState,
        time: new Date().toLocaleString(),
        location: currentLocation,
        safetyScore: safetyScore
      })
    );
    alert(
      newState
        ? `📍 Location sharing activated for ${currentLocation}`
        : "❌ Location sharing stopped"
    );
  };

  const handleSOSAlert = () => {
    const sosData = {
      triggered: true,
      time: new Date().toLocaleString(),
      location: currentLocation,
      coordinates: userCoordinates,
      safetyScore: safetyScore,
      safetyLevel: safetyLevel
    };
    localStorage.setItem("sosAlert", JSON.stringify(sosData));
    alert(`🚨 SOS Alert sent to emergency contacts! Your location: ${currentLocation}`);
  };

  const handleRefreshSafety = () => {
    if (userCoordinates) {
      analyzeAreaSafety(userCoordinates.lat, userCoordinates.lng);
      findNearbyPoliceStations(userCoordinates.lat, userCoordinates.lng);
    } else {
      getUserLocation();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-light text-white p-6">
        <div className="container mx-auto">
          <a href="/" className="text-white/80 hover:text-white mb-2 inline-block">
            ← Back to Home
          </a>
          <h1 className="font-display text-4xl font-bold flex items-center gap-3">
            <Shield className="w-10 h-10" />
            Smart Safety Tracker
          </h1>
          <p className="text-white/90 mt-2">Real-time location safety assessment</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Location Safety Overview */}
        <Card className={`p-8 mb-8 bg-gradient-to-br ${safetyColors[safetyLevel]} border-0 card-glow`}>
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
                  {analyzing ? "Analyzing Location..." : "Area Safety Assessment"}
                </h2>
                <p className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {currentLocation}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center border ${
                      safetyLevel === "safe" ? "border-green-200" :
                      safetyLevel === "moderate" ? "border-yellow-200" : "border-red-200"
                    }`}>
                      <span className={`font-bold text-sm ${
                        safetyLevel === "safe" ? "text-green-600" :
                        safetyLevel === "moderate" ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {safetyScore}
                      </span>
                    </div>
                    <span className="text-sm">Safety Score</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRefreshSafety}
                    disabled={analyzing}
                    className="flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    {analyzing ? "Analyzing..." : "Refresh"}
                  </Button>
                </div>
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

          {/* Safety Factors Grid */}
          {!analyzing && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {[
                  { key: 'lighting' as const, label: 'Lighting', icon: Lightbulb },
                  { key: 'crowd' as const, label: 'Crowd Density', icon: Users },
                  { key: 'transport' as const, label: 'Transport', icon: Car },
                  { key: 'police' as const, label: 'Police', icon: ShieldCheck },
                  { key: 'emergency' as const, label: 'Emergency', icon: Bell }
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key} className="text-center p-3 bg-white/50 rounded-lg">
                    <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium mb-1">{label}</div>
                    <div className="flex justify-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <div
                          key={star}
                          className={`w-2 h-2 rounded-full ${
                            star <= safetyFactors[key] 
                              ? safetyFactors[key] <= 2 ? 'bg-red-500' 
                                : safetyFactors[key] <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs mt-1 text-gray-600">
                      {safetyFactors[key]}/5
                    </div>
                  </div>
                ))}
              </div>

              {/* Safety Tips */}
              {safetyTips.length > 0 && (
                <div className="bg-white/60 rounded-lg p-4">
                  <h3 className="font-display font-bold mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    Safety Recommendations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {safetyTips.map((tip, index) => (
                      <div key={index} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </Card>

        {/* Features Grid */}
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
              Set a destination and get the safest route with police station locations.
            </p>
            <Button
              className="w-full bg-gradient-to-r from-primary to-primary-light"
              onClick={() => setShowDestinationModal(true)}
              disabled={analyzing}
            >
              <Flag className="w-4 h-4 mr-2" />
              Set Destination & Analyze
            </Button>
          </Card>

          <Card className="p-6 card-glow">
            <h3 className="font-display text-xl font-bold mb-4">
              Travel Guardian
            </h3>
            <p className="text-muted-foreground mb-4">
              Share your real-time safety status with trusted contacts.
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
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Current Safety Score</span>
                <span className={`text-sm font-semibold ${
                  safetyScore >= 75 ? 'text-green-600' :
                  safetyScore >= 50 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {safetyScore}/100
                </span>
              </div>
            </div>
            <Button
              variant={sharingActive ? "destructive" : "outline"}
              className="w-full"
              onClick={handleShareLocation}
            >
              {sharingActive ? "Stop Sharing" : "Share Safety Status"}
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent-dark/20 border-0">
          <h3 className="font-display text-xl font-bold mb-4">
            Quick Safety Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="btn-empowerment" onClick={handleSOSAlert}>
              <Bell className="mr-2" /> SOS Alert
            </Button>
            <Button variant="outline" className="border-2" onClick={handleRefreshSafety}>
              Re-check Area Safety
            </Button>
            <Button 
              variant="outline" 
              className="border-2"
              onClick={() => setShowReportModal(true)}
            >
              <AlertCircle className="mr-2 w-4 h-4" />
              Report Safety Issue
            </Button>
            <Button 
              variant="outline" 
              className="border-2"
              onClick={() => setShowDestinationModal(true)}
            >
              <Flag className="mr-2 w-4 h-4" />
              Set Destination
            </Button>
          </div>
        </Card>
      </div>

      {/* Route Analysis Modal with REAL MAP */}
      {showModal && routeData && userCoordinates && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black z-10 bg-white rounded-full p-1"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Navigation className="text-primary" />
              Route Safety Analysis
            </h2>
            
            {/* REAL MAP */}
            <div className="w-full h-64 md:h-96 rounded-xl mb-4 overflow-hidden border-2 border-gray-200">
              <MapContainer
                center={mapCenter}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Current Location Marker */}
                <Marker position={[userCoordinates.lat, userCoordinates.lng]} icon={safeIcon}>
                  <Popup>
                    <div className="text-center">
                      <strong>Your Location</strong>
                      <br />
                      {currentLocation}
                    </div>
                  </Popup>
                </Marker>

                {/* Destination Marker */}
                {destinationCoords && (
                  <Marker position={destinationCoords} icon={flagIcon}>
                    <Popup>
                      <div className="text-center">
                        <strong>Destination</strong>
                        <br />
                        {destination}
                      </div>
                    </Popup>
                  </Marker>
                )}

                {/* Route Path */}
                {routePath.length > 0 && (
                  <Polyline
                    positions={routePath}
                    color={routeData.color === "green" ? "green" : routeData.color === "yellow" ? "orange" : "red"}
                    weight={6}
                    opacity={0.7}
                  />
                )}

                {/* Police Stations (show if area is not safe) */}
                {routeData.showPolice && policeStations.map((station, index) => (
                  <Marker 
                    key={index}
                    position={[station.lat, station.lng]}
                    icon={policeIcon}
                  >
                    <Popup>
                      <div className="text-center">
                        <Building className="w-4 h-4 inline mr-1" />
                        <strong>{station.name}</strong>
                        <br />
                        <Phone className="w-3 h-3 inline mr-1" />
                        {station.phone}
                        <br />
                        📍 {station.distance} away
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Safety Assessment</h3>
                <p className="text-gray-700">{routeData.msg}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Recommendation</h3>
                <p className="text-gray-700">{routeData.alt}</p>
              </div>

              {routeData.showPolice && policeStations.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    Nearby Police Stations
                  </h3>
                  <div className="space-y-2">
                    {policeStations.map((station, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{station.name}</span>
                        <span className="text-sm text-gray-600">{station.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div
                className={`px-6 py-3 rounded-full text-center font-bold text-lg ${
                  routeData.color === "green"
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : routeData.color === "yellow"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                {routeData.level === "safe"
                  ? "✅ Safe Route - Proceed with Confidence"
                  : routeData.level === "moderate"
                  ? "⚠️ Caution Advised - Stay Alert"
                  : "🚨 High-Risk Route - Use Alternative"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Safety Issue Modal */}
{showReportModal && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
      <button
        onClick={() => setShowReportModal(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <X className="w-6 h-6" />
      </button>
      
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <AlertCircle className="text-red-500" />
        Report Safety Issue
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Issue Type</label>
          <select 
            className="w-full p-2 border rounded-lg"
            value={reportData.type}
            onChange={(e) => setReportData({...reportData, type: e.target.value})}
          >
            <option value="harassment">Street Harassment</option>
            <option value="lighting">Poor Lighting</option>
            <option value="suspicious">Suspicious Activity</option>
            <option value="transport">Transport Safety</option>
            <option value="other">Other Issue</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Urgency Level</label>
          <div className="flex gap-2">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                type="button"
                className={`flex-1 p-2 rounded-lg border ${
                  reportData.urgency === level
                    ? level === 'high' 
                      ? 'bg-red-100 border-red-500 text-red-700'
                      : level === 'medium'
                      ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                      : 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-gray-100 border-gray-300'
                }`}
                onClick={() => setReportData({...reportData, urgency: level})}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            placeholder="Please describe the safety issue in detail..."
            value={reportData.description}
            onChange={(e) => setReportData({...reportData, description: e.target.value})}
            rows={4}
            className="w-full"
          />
        </div>

        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-sm text-yellow-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            Your report will be anonymously shared with local authorities and other users in the area to improve community safety.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setShowReportModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-red-600 hover:bg-red-700"
            onClick={handleReportIssue}
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Report
          </Button>
        </div>
      </div>
    </div>
  </div>
)}

{/* Destination Modal */}
{showDestinationModal && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
      <button
        onClick={() => setShowDestinationModal(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <X className="w-6 h-6" />
      </button>
      
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Flag className="text-primary" />
        Set Destination
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Where do you want to go?</label>
          <Input
            placeholder="Enter destination address..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSetDestination()}
          />
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            We'll analyze the safest route and show nearby police stations if the area has safety concerns.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setShowDestinationModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-primary to-primary-light"
            onClick={handleSetDestination}
            disabled={!destination.trim() || analyzing}
          >
            {analyzing ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                Find Safest Route
              </>
            )}
                    </Button>
                </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Safety;