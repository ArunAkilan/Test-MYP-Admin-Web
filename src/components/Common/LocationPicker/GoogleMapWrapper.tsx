import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";

// 👇 Declare libraries array once at module level (outside component)
const libraries: (
  | "places"
  | "geometry"
  | "drawing"
  | "visualization"
  | "maps"
)[] = ["places", "geometry", "maps"];

const GoogleMapsWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries, // use the constant here
  });

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return <>{children}</>;
};

export default GoogleMapsWrapper;
