import { useState, useEffect } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api"; // use MarkerF, not Marker

const wrapperStyle = {
  width: "558px",
  height: "280px",
  padding: "8px",
  border: "1px solid #D3DDE7",
  borderRadius: "6px",
  boxSizing: "border-box" as const,
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const DEFAULT_POSITION = { lat: 13.0827, lng: 80.2707 }; // Chennai

interface MapComponentProps {
  latitude?: number | null;
  longitude?: number | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
  const safeLat = typeof latitude === "number" && !isNaN(latitude) ? latitude : DEFAULT_POSITION.lat;
  const safeLng = typeof longitude === "number" && !isNaN(longitude) ? longitude : DEFAULT_POSITION.lng;

  const [markerPosition, setMarkerPosition] = useState({ lat: safeLat, lng: safeLng });

  useEffect(() => {
    setMarkerPosition({ lat: safeLat, lng: safeLng });
  }, [latitude, longitude]);

  return (
    <div style={wrapperStyle}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={14}
      >
        <MarkerF position={markerPosition} />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
