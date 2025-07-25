// Define Library type locally since @react-google-maps/api does not export it
export type Library = "places" | "geometry" | "drawing" | "visualization";

export const GOOGLE_MAP_OPTIONS = {
  id: "google-map-script",
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  libraries: ["places", "geometry"] as Library[],
};