import { useEffect, useState } from "react";
import { GoogleMap, HeatmapLayer, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const SafetyInteractive = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBNM8_ChJa3dZK3D063NQT0c2srefe6gwY",
    libraries: ["visualization"], // Required for heatmap
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

  // Example heatmap points
  const heatmapData = [
    new google.maps.LatLng(28.6139, 77.2090), // Delhi
    new google.maps.LatLng(28.7041, 77.1025),
    new google.maps.LatLng(28.5355, 77.3910),
    new google.maps.LatLng(28.4595, 77.0266),
  ];

  if (!isLoaded) return <div>Loading map...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {position ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={13}
        >
          {/* 🔥 Heatmap Example */}
          <HeatmapLayer data={heatmapData} />
        </GoogleMap>
      ) : (
        <div className="p-6 text-center">📍 Fetching your location...</div>
      )}
    </div>
  );
};

export default SafetyInteractive;
