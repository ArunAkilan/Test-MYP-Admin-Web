import { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

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

const center = {
  lat: 13.0827,
  lng: 80.2707,
};

function MapComponent() {
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  return (
    <div style={wrapperStyle}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition || center}
        zoom={14}
        onClick={handleMapClick}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default MapComponent;
