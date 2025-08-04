// GoogleMapWrapper.tsx
import { memo } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const GoogleMapsWrapper = memo(({ children }: { children: React.ReactNode }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places", "geometry"], // Include all libraries needed
    id: "google-map-script", // Fixed ID
  });
  
  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;
  
  return <>{children}</>;
});

export default GoogleMapsWrapper;