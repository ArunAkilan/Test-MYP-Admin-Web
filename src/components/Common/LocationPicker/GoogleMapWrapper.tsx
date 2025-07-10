// src/components/GoogleMapsWrapper.tsx
import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const GoogleMapsWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places", "geometry", "maps"], // include all you need
  });

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return <>{children}</>; // show children once loaded
};

export default GoogleMapsWrapper;
