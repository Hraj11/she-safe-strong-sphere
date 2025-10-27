import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Navigation, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix missing marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const SafetyInteractive = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [status, setStatus] = useState("Requesting location...");

  useEffect(() => {
    console.log("🧭 useEffect triggered — starting geolocation check...");

    if (!navigator.geolocation) {
      console.log("❌ Geolocation not supported by your browser.");
      setStatus("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("✅ User location received:", pos.coords.latitude, pos.coords.longitude);
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setStatus("Location acquired!");
      },
      (err) => {
        console.error("❌ Geolocation error:", err);
        setStatus("Unable to get location. Please allow location access.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="bg-gradient-to-r from-primary to-primary-light text-white p-6 rounded-lg mb-6">
        <h1 className="font-display text-4xl font-bold flex items-center gap-3">
          <Shield className="w-10 h-10" />
          Real-Time Safety Map
        </h1>
        <p className="text-white/90 mt-2">Track your safety and current location in real-time</p>
      </header>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" /> Current Location
        </h2>
        <p className="text-sm mb-2">{status}</p>

        {position ? (
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={true}
            style={{
              height: "400px",
              width: "100%",
              borderRadius: "12px",
              zIndex: 1,
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={position}>
              <Popup>You are here 📍</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p className="text-muted-foreground">Fetching your location...</p>
        )}
      </Card>

      <Button
        className="w-full bg-gradient-to-r from-primary to-primary-light"
        onClick={() => {
          alert("Analyzing route safety (demo mode)...");
        }}
      >
        <Navigation className="w-4 h-4 mr-2" />
        Analyze Route
      </Button>
    </div>
  );
};

export default SafetyInteractive;
