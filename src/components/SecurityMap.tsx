import React from "react";



// Define the incident structure
export interface Incident {
  id: number;
  location: string;
  description: string;
  date: string;
}

// Define the props expected by SecurityMap
export interface SecurityMapProps {
  incidents: Incident[];
}

const SecurityMap: React.FC<SecurityMapProps> = ({ incidents }) => {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
      <h3 className="text-lg font-semibold text-purple-700 mb-4">
        🔍 Security Map Simulation
      </h3>

      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-4 text-gray-800">
        <p className="mb-3">
          This is a simulated map view showing local safety reports.
        </p>
        <ul className="space-y-2">
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <li
                key={incident.id}
                className="bg-white shadow-sm border border-purple-100 rounded-lg p-3"
              >
                <strong className="text-purple-700">{incident.location}</strong>
                <p className="text-sm text-gray-600">{incident.description}</p>
                <span className="text-xs text-gray-500">{incident.date}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No incidents to display.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SecurityMap;
