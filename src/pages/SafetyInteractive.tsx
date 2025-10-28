import { useEffect, useState } from "react";
import { GoogleMap, HeatmapLayer, useJsApiLoader } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, MapPin, AlertTriangle, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "50vh",
};

const SafetyInteractive = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBNM8_ChJa3dZK3D063NQT0c2srefe6gwY",
    libraries: ["visualization"],
  });

  // Ask for live location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("✅ Got location:", pos.coords);
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("❌ Location error:", err);
        setError("Please allow location access in your browser.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Manual safety status controls for testing
  const handleManualStatusUpdate = (status: string) => {
    const statusData = {
      status: status,
      message: status === 'safe' ? 'All systems normal - Area safe' : 
               status === 'caution' ? 'Exercise caution in this area' :
               status === 'danger' ? 'High risk area detected' :
               'EMERGENCY - Immediate attention required',
      location: position ? `Lat: ${position.lat.toFixed(4)}, Lng: ${position.lng.toFixed(4)}` : 'Keezhakottaiyur',
      timestamp: Date.now(),
      reason: 'Manual safety assessment'
    };

    // Save to localStorage
    localStorage.setItem('safetyStatus', JSON.stringify(statusData));
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
    
    alert(`✅ Safety status updated to: ${status.toUpperCase()}\n\nGo back to homepage to see the Safety Status widget update!`);
  };

  // Example heatmap points (danger zones)
  const heatmapData = [
    new google.maps.LatLng(28.6139, 77.2090),
    new google.maps.LatLng(28.7041, 77.1025),
    new google.maps.LatLng(28.5355, 77.3910),
    new google.maps.LatLng(28.4595, 77.0266),
  ];

  if (!isLoaded) return <div>Loading map...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Smart Safety Tracker
          </h1>
          <p className="text-muted-foreground">Real-time location safety assessment</p>
        </div>
      </div>

      {/* TEST BUTTONS SECTION - Added to your existing design */}
      <div className="bg-blue-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-blue-600" />
            Test Safety Status Updates
          </h3>
          <p className="text-sm text-blue-700 mb-2">
            Click to test how the Safety Status widget updates on homepage:
          </p>
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => handleManualStatusUpdate('safe')}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
            >
              🟢 Safe
            </button>
            <button 
              onClick={() => handleManualStatusUpdate('caution')}
              className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
            >
              🟡 Caution
            </button>
            <button 
              onClick={() => handleManualStatusUpdate('danger')}
              className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors"
            >
              🟠 Danger
            </button>
            <button 
              onClick={() => handleManualStatusUpdate('emergency')}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
            >
              🔴 Emergency
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {position ? (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={position}
                    zoom={13}
                  >
                    <HeatmapLayer 
                      data={heatmapData}
                      options={{
                        radius: 20,
                        opacity: 0.6,
                      }}
                    />
                  </GoogleMap>
                ) : (
                  <div className="p-6 text-center">📍 Fetching your location...</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Safety Info */}
          <div className="space-y-6">
            {/* Area Safety Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>Area Safety Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Keezhakottaiyur</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sm text-muted-foreground">Safety Score</span>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Lighting</p>
                    <p className="font-semibold">2%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Crowd Density</p>
                    <p className="font-semibold">3%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Transport</p>
                    <p className="font-semibold">3%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Police</p>
                    <p className="font-semibold">3%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Emergency</p>
                    <p className="font-semibold">3%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Safety Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>Limited lighting at night</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span>Be cautious after dark</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <span>1 police station(s) in vicinity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5"></div>
                    <span>Variable crowd density</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5"></div>
                    <span>Moderate crime area - maintain awareness</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyInteractive;