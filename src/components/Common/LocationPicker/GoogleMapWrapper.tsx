// GoogleMapsWrapper.tsx
import { useJsApiLoader } from "@react-google-maps/api";

const GoogleMapsWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"], // or ["marker"] if needed
  });

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return <>{children}</>;
};

export default GoogleMapsWrapper;
