// components/MapWithRouting.tsx
import { useState, useEffect } from 'react';
import { geocodeAddress } from '../utils/geocoding';

export default function MapWithRouting() {
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [destination, setDestination] = useState<{lat: number, lng: number} | null>(null);
  const [destinationInput, setDestinationInput] = useState('');
  const [route, setRoute] = useState<any>(null);

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  const handleSetDestination = async () => {
    if (!destinationInput.trim()) return;

    const coords = await geocodeAddress(destinationInput);
    
    if (coords) {
      setDestination(coords);
      calculateRoute(currentLocation, coords);
    } else {
      alert('Location not found. Please try: "New York, NY" or "Eiffel Tower, Paris"');
    }
  };

  const calculateRoute = async (start: any, end: any) => {
    if (!start || !end) return;

    try {
      // Use your routing service (OSRM, Google Directions, etc.)
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
      );
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        setRoute(data.routes[0]);
      }
    } catch (error) {
      console.error('Routing error:', error);
    }
  };

  return (
    <div className="map-container">
      <div className="destination-input">
        <input
          type="text"
          value={destinationInput}
          onChange={(e) => setDestinationInput(e.target.value)}
          placeholder="Enter destination address..."
          onKeyPress={(e) => e.key === 'Enter' && handleSetDestination()}
        />
        <button onClick={handleSetDestination}>
          Set Destination
        </button>
      </div>

      {/* Your map component here */}
      <div className="map" style={{ height: '500px', width: '100%' }}>
        {/* Render map with current location, destination, and route */}
      </div>

      {destination && (
        <div className="destination-info">
          <p>Destination set to: {destinationInput}</p>
          <p>Coordinates: {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
}