import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputField, DynamicBreadcrumbs } from "../Common/input"; // Assuming InputField supports error props
import GenericButton from "../Common/Button/button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
// import { Button, Avatar, Alert, IconButton, Backdrop, CircularProgress,} from "@mui/material";
import { Avatar, Alert, IconButton, Backdrop, CircularProgress, } from "@mui/material";
import "./createProperties/createProperty.scss"; // Your styling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AxiosError } from "axios";
import type {
  ResidentialProperty,
  ResidentialFormState,
  UploadedImage,
  PlainObject,
} from "./createProperties/createProperty.model";
import type { Restrictions } from "../AdminResidencial/AdminResidencial.model";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import Tooltip from "@mui/material/Tooltip";

//cropping code starts here

import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { Button as MuiButton, Modal, Slider } from "@mui/material";
// import { GOOGLE_MAP_OPTIONS } from "./googleMapsConfig";
import { GOOGLE_MAP_OPTIONS } from "../Common/googleMapsConfig"


//cropping code ends here




const defaultCenter = { lat: 11.2419968, lng: 78.8063549 };
// const GOOGLE_LIBRARIES: (
//   | "places"
//   | "geometry"
//   | "drawing"
//   | "visualization"
// )[] = ["places", "geometry"];

// Utility function to set nested value dynamically
function setNested(obj: PlainObject, path: string, value: unknown) {
  const keys = path.split(".");
  let current = obj;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key] || typeof current[key] !== "object") {
        current[key] = {};
      }

      current = current[key] as PlainObject;
    }
  });
}

// Flatten nested objects to key-value pairs with dot notation keys
function flattenObject(
  obj: PlainObject,
  parentKey = "",
  result: Record<string, string> = {}
): Record<string, string> {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    if (
      value !== null &&
      typeof value === "object" &&
      !(value instanceof File)
    ) {
      flattenObject(value as PlainObject, fullKey, result);
    } else {
      result[fullKey] = String(value);
    }
  }
  return result;
}

// Map chips strings to Restrictions object
const mapChipsToRestrictions = (chips: string[]): Restrictions => {
  return {
    guestAllowed: chips.includes("Guests Not Allowed"),
    petsAllowed: chips.includes("No Pets Allowed"),
    bachelorsAllowed: chips.includes("No Bachelors Allowed"),
  };
};

// Build payload dynamically based on form state
function buildPayloadDynamic(formState: ResidentialFormState): ResidentialProperty {
  const payload: Partial<ResidentialProperty> = {};

  // Owner info (keep unchanged)
  setNested(payload, "propertyOwner.firstName", (formState.firstName ?? "").trim());
  setNested(payload, "propertyOwner.lastName", (formState.lastName ?? "").trim());
  setNested(payload, "propertyOwner.contact.phone1", (formState.phone1 ?? "").trim());
  setNested(payload, "propertyOwner.contact.email", (formState.email ?? "").trim());
  setNested(payload, "propertyOwner.contact.getUpdates", false);

  setNested(payload, "propertyType", formState.propertyType || "Rent");

  // Conditional amount handling based on property type
  if (formState.propertyType === "Rent") {
    const rentAmount = parseFloat(formState.rent);
    setNested(payload, "rent.rentAmount", isNaN(rentAmount) ? 0 : rentAmount);
    setNested(payload, "rent.negotiable", !!formState.negotiable);
    const advance = parseFloat(formState.advanceAmount);
    setNested(payload, "rent.advanceAmount", isNaN(advance) ? 0 : advance);
    setNested(payload, "rent.agreementTiming", formState.leaseTenure || "");
  } else if (formState.propertyType === "Lease") {
    const leaseAmount = parseFloat(formState.rent);
    setNested(payload, "lease.leaseAmount", isNaN(leaseAmount) ? 0 : leaseAmount);
    setNested(payload, "lease.negotiable", !!formState.negotiable);
    setNested(payload, "lease.leaseTenure", formState.leaseTenure || "");
  } else if (formState.propertyType === "Sale") {
    const saleAmount = parseFloat(formState.rent);
    setNested(payload, "sale.saleAmount", isNaN(saleAmount) ? 0 : saleAmount);
    setNested(payload, "sale.negotiable", !!formState.negotiable);
  }

  setNested(payload, "location.landmark", formState.landmark || "");
  if (formState.latitude) setNested(payload, "location.map.latitude", parseFloat(formState.latitude));
  if (formState.longitude) setNested(payload, "location.map.longitude", parseFloat(formState.longitude));
  setNested(payload, "location.address", formState.address);
  setNested(payload, "area.totalArea", formState.totalArea || "0");
  setNested(payload, "area.builtUpArea", formState.builtUpArea || "0");
  setNested(payload, "area.carpetArea", formState.carpetArea || "0");

  setNested(payload, "title", formState.title);
  setNested(payload, "residentialType", formState.residentialType || "House");
  setNested(payload, "facingDirection", formState.facingDirection || "East");
  setNested(payload, "rooms", `${formState.rooms || "1"} BHK`);
  setNested(payload, "totalFloors", formState.totalFloors ? parseInt(formState.totalFloors) : 0);
  setNested(payload, "propertyFloor", formState.propertyFloor ? parseInt(formState.propertyFloor) : 0);
  setNested(payload, "furnishingType", formState.furnishingType?.replace("-", " "));
  setNested(payload, "description", formState.description);
  setNested(payload, "restrictions", mapChipsToRestrictions(formState.selectedChips));

  // ✅ Dynamic values with CORRECT backend field names:

  // Dynamic availability.transport - match backend schema
  if (formState.selectedChips.includes("Near Bus Stop")) {
    setNested(payload, "availability.transport.nearbyBusStop", true);
  }
  if (formState.selectedChips.includes("Near Airport")) {
    setNested(payload, "availability.transport.nearbyAirport", true);
  }
  if (formState.selectedChips.includes("Near Metro")) {
    setNested(payload, "availability.transport.nearbyPort", true);
  }

  // Dynamic availability - match backend schema
  if (formState.selectedChips.includes("Broadband Connection")) {
    setNested(payload, "availability.broadband", true);
  }
  if (formState.selectedChips.includes("Security")) {
    setNested(payload, "availability.securities", true);
  }

  // ✅ Dynamic facility with CORRECT field names (maintenance, drainage - not maintainance, drinage)
  if (formState.selectedChips.includes("Regular Maintenance Included")) {
    setNested(payload, "facility.maintenance", true);  // ✅ Correct: maintenance
  }
  if (formState.selectedChips.includes("Water Supply Available")) {
    setNested(payload, "facility.waterFacility", true);
  }
  if (formState.selectedChips.includes("Good Road Access")) {
    setNested(payload, "facility.roadFacility", true);
  }
  if (formState.selectedChips.includes("Sewage Connection Available")) {
    setNested(payload, "facility.drainage", true);  // Correct: drainage
  }
  if (formState.selectedChips.includes("Dedicated Parking Available")) {
    setNested(payload, "facility.parking", true);
  }
  if (formState.selectedChips.includes("Private Balcony Included")) {
    setNested(payload, "facility.balcony", true);
  }
  if (formState.selectedChips.includes("Terrace Access")) {
    setNested(payload, "facility.terrace", true);
  }

  // Dynamic accessibility - match backend schema
  if (formState.selectedChips.includes("Ramp Access")) {
    setNested(payload, "accessibility.ramp", true);
  }
  if (formState.selectedChips.includes("Only via Stairs")) {
    setNested(payload, "accessibility.steps", true);
  }
  if (formState.selectedChips.includes("Lift Access")) {
    setNested(payload, "accessibility.lift", true);
  }

  // Dynamic amenities - match backend schema
  if (formState.selectedChips.includes("Separate Electricity Billing")) {
    setNested(payload, "amenities.separateEBConnection", true);
  }
  if (formState.selectedChips.includes("Public Park")) {
    setNested(payload, "amenities.nearbyMarket", true);
  }
  if (formState.selectedChips.includes("Gym")) {
    setNested(payload, "amenities.nearbyGym", true);
  }
  if (formState.selectedChips.includes("Movie Theater")) {
    setNested(payload, "amenities.nearbyTurf", true);
  }
  if (formState.selectedChips.includes("Sports Arena")) {
    setNested(payload, "amenities.nearbyArena", true);
  }
  if (formState.selectedChips.includes("Shopping Mall")) {
    setNested(payload, "amenities.nearbyMall", true);
  }

  return payload as ResidentialProperty;
}


export const CreateProperty = () => {

  //cropping code starts here 
  // ===== Cropping & Image Upload State =====
  const MIN_WIDTH = 800;
  const MIN_HEIGHT = 600;
  const MAX_WIDTH = 1024;
  const MAX_HEIGHT = 768;
  const MAX_IMAGES = 12;

  //const [images, setImages] = useState<UploadedImage[]>([]);
  //const [_errors, setErrors] = useState<{ images?: string }>({});

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [fileToCrop, setFileToCrop] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Handle file input change & open crop modal
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrors({});

    if (!file.type.startsWith("image/")) {

      toast.error(`Invalid file type: ${file.name}`);
      e.target.value = "";
      return;
    }

    if (images.length >= MAX_IMAGES) {
      setErrors({ images: `Maximum ${MAX_IMAGES} images allowed.` });
      e.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setFileToCrop(file);
    setImageSrc(objectUrl);
    setCropModalOpen(true);
    e.target.value = "";
  };

  // Cropper callback to get cropped area pixels
  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // Crop the image, generate cropped file & add to images array
  const cropImage = async () => {
    if (!imageSrc || !croppedAreaPixels || !fileToCrop) return;

    const image = new Image();
    image.src = imageSrc;
    await image.decode();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const TARGET_WIDTH = 1024;
    const TARGET_HEIGHT = 768;
    canvas.width = TARGET_WIDTH;
    canvas.height = TARGET_HEIGHT;

    if (ctx) {
      ctx.filter = "brightness(1.05) contrast(1.1)";
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        TARGET_WIDTH,
        TARGET_HEIGHT
      );

      canvas.toBlob((blob) => {
        if (!blob) return;

        const croppedFile = new File([blob], fileToCrop.name, {
          type: "image/jpeg",
        });
        const previewUrl = URL.createObjectURL(blob);

        setImages((prev) => [
          ...prev,
          // { file: croppedFile, url: previewUrl, name: croppedFile.name },
          { file: croppedFile, url: previewUrl, name: previewUrl }

        ]);

        // Reset crop modal state
        setCropModalOpen(false);
        setImageSrc(null);
        setFileToCrop(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
      }, "image/jpeg", 0.95);
    }
  };

  // Remove image from preview list
  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    setImages((prev) => {
      const newImages = [...prev];
      const [draggedImage] = newImages.splice(draggedIndex, 1);
      newImages.splice(dropIndex, 0, draggedImage);
      return newImages;
    });
    setDraggedIndex(null);
  };

  // State for form data
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone1, setPhone1] = useState("");
  const [propertyType, setPropertyType] = useState("Rent");
  const [title, setTitle] = useState("");
  const [rent, setRent] = useState("");
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [leaseTenure, setLeaseTenure] = useState("");
  const [residentialType, setResidentialType] = useState("House");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]); // For file upload

  const [totalArea, setTotalArea] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [facingDirection, setfacingDirection] = useState("East");
  const [totalFloors, setTotalFloors] = useState("");
  const [propertyFloor, setPropertyFloor] = useState("");
  const [furnishingType, setFurnishingType] = useState("Unfurnished");
  const [rooms, setRoomCount] = useState("1");
  const [description, setPropertyDescription] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTopInfo, setShowTopInfo] = useState(false);
  const center = {
    lat: 11.2333,
    lng: 78.8667,
  };
  const [markerPosition, setMarkerPosition] = useState(center);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [mapAutocomplete, setMapAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const location = useLocation();
  const isEditMode = location.state?.mode === "edit";
  const editData = location.state?.data;
  const editId = location.state?.data?._id;

  // Update state when in edit mode
  useEffect(() => {
    if (isEditMode && editData) {
      // const expectedPath = `/admin/residential/update/${editId}`;
      // if (window.location.pathname !== expectedPath) {
      //   window.history.replaceState(null, "", expectedPath);
      // }

      // Set basic property data (keep existing code)
      setFirstName(editData.propertyOwner?.firstName || "");
      setLastName(editData.propertyOwner?.lastName || "");
      setEmail(editData.propertyOwner?.contact?.email || "");
      setPhone1(editData.propertyOwner?.contact?.phone1 || "");
      setTitle(editData.title || "");
      setPropertyType(editData.propertyType || "Rent");
      setAddress(editData.location?.address || "");
      setLandmark(editData.location?.landmark || "");
      setLatitude(editData.location?.map?.latitude?.toString() || "");
      setLongitude(editData.location?.map?.longitude?.toString() || "");

      // Load amounts based on property type
      if (editData.propertyType === "Rent") {
        setRent(editData.rent?.rentAmount?.toString() || "");
        setAdvanceAmount(editData.rent?.advanceAmount?.toString() || "");
        setLeaseTenure(editData.rent?.agreementTiming || "");
        setNegotiable(editData.rent?.negotiable || false);
      } else if (editData.propertyType === "Lease") {
        setRent(editData.lease?.leaseAmount?.toString() || "");
        setLeaseTenure(editData.lease?.leaseTenure || "");
        setNegotiable(editData.lease?.negotiable || false);
        setAdvanceAmount(""); // Clear advance for lease
      } else if (editData.propertyType === "Sale") {
        setRent(editData.sale?.saleAmount?.toString() || "");
        setNegotiable(editData.sale?.negotiable || false);
        setAdvanceAmount(""); // Clear advance for sale
        setLeaseTenure(""); // Clear tenure for sale
      }


      setResidentialType(editData.residentialType || "House");
      setfacingDirection(editData.facingDirection || "East");
      setRoomCount(editData.rooms?.replace(" BHK", "") || "1");
      setFurnishingType(editData.furnishingType || "Unfurnished");
      setTotalArea(editData.area?.totalArea || "0");
      setBuiltUpArea(editData.area?.builtUpArea || "0");
      setCarpetArea(editData.area?.carpetArea || "0");
      setTotalFloors(editData.totalFloors?.toString() || "");
      setPropertyFloor(editData.propertyFloor?.toString() || "");
      setPropertyDescription(editData.description || "");

      // ✅ FIXED: Map backend data back to chips properly
      const chips: string[] = [];

      // Map restrictions back to chips
      if (editData.restrictions) {
        if (editData.restrictions.guestAllowed === false) chips.push("Guests Not Allowed");
        if (editData.restrictions.petsAllowed === false) chips.push("No Pets Allowed");
        if (editData.restrictions.bachelorsAllowed === false) chips.push("No Bachelors Allowed");
      }

      // ✅ Map availability back to chips
      if (editData.availability) {
        if (editData.availability.broadband === true) chips.push("Broadband Connection");
        if (editData.availability.securities === true) chips.push("Security");

        // Map transport back to chips
        if (editData.availability.transport) {
          if (editData.availability.transport.nearbyBusStop === true) chips.push("Near Bus Stop");
          if (editData.availability.transport.nearbyAirport === true) chips.push("Near Airport");
          if (editData.availability.transport.nearbyPort === true) chips.push("Near Metro");
        }
      }

      // ✅ Map facility back to chips  
      if (editData.facility) {
        if (editData.facility.maintenance === true) chips.push("Regular Maintenance Included");
        if (editData.facility.waterFacility === true) chips.push("Water Supply Available");
        if (editData.facility.roadFacility === true) chips.push("Good Road Access");
        if (editData.facility.drainage === true) chips.push("Sewage Connection Available");
        if (editData.facility.parking === true) chips.push("Dedicated Parking Available");
        if (editData.facility.balcony === true) chips.push("Private Balcony Included");
        if (editData.facility.terrace === true) chips.push("Terrace Access");
      }

      // ✅ Map accessibility back to chips
      if (editData.accessibility) {
        if (editData.accessibility.ramp === true) chips.push("Ramp Access");
        if (editData.accessibility.steps === true) chips.push("Only via Stairs");
        if (editData.accessibility.lift === true) chips.push("Lift Access");
      }

      // ✅ Map amenities back to chips
      if (editData.amenities) {
        if (editData.amenities.separateEBConnection === true) chips.push("Separate Electricity Billing");
        if (editData.amenities.nearbyMarket === true) chips.push("Public Park");
        if (editData.amenities.nearbyGym === true) chips.push("Gym");
        if (editData.amenities.nearbyTurf === true) chips.push("Movie Theater");
        if (editData.amenities.nearbyArena === true) chips.push("Sports Arena");
        if (editData.amenities.nearbyMall === true) chips.push("Shopping Mall");
      }

      setSelectedChips(chips); // ✅ Now includes all mapped chips

      setImages(editData.images?.map((img: string) => ({ name: img })) || []);

      setMarkerPosition({
        lat: editData.location?.map?.latitude || defaultCenter.lat,
        lng: editData.location?.map?.longitude || defaultCenter.lng,
      });

      // Fetch nearby transport info if lat/lng are available
      if (editData.location?.map?.latitude && editData.location?.map?.longitude) {
        fetchNearbyTransport(editData.location.map.latitude, editData.location.map.longitude);
      }
    }
  }, [isEditMode, editData]);


  // const [nearbyTransport, setNearbyTransport] = useState<
  //   Record<string, string>
  // >({ "BUS STAND": "0 KM", AIRPORT: "0 KM", METRO: "0 KM", RAILWAY: "0 KM" });

  // // Google Maps API loader
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", // put your API key in .env file
  //   libraries: GOOGLE_LIBRARIES,
  // });

  const { isLoaded } = useJsApiLoader(GOOGLE_MAP_OPTIONS);

  // pass the map instance or the map div to PlacesService
  const fetchNearbyTransport = async (lat: number, lng: number) => {
    const types = [
      { type: "bus_station", label: "BUS STAND" },
      { type: "airport", label: "AIRPORT" },
      { type: "subway_station", label: "METRO" },
      { type: "train_station", label: "RAILWAY" },
    ];

    const info: Record<string, string> = {};
    const location = new google.maps.LatLng(lat, lng);
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    // Fetch nearby transport info
    await Promise.all(
      types.map(
        ({ type, label }) =>
          new Promise<void>((resolve) => {
            service.nearbySearch(
              { location, radius: 10000, type },
              (results, status) => {
                if (
                  status === google.maps.places.PlacesServiceStatus.OK &&
                  results &&
                  results[0]
                ) {
                  const nearest = results[0].geometry!.location!;
                  const dist =
                    google.maps.geometry.spherical.computeDistanceBetween(
                      location,
                      nearest
                    );
                  info[label] = `${(dist / 1000).toFixed(2)} KM`;
                } else {
                  console.error(`NearbySearch ${label}:`, status);
                  info[label] = "N/A";
                }
                resolve();
              }
            );
          })
      )
    );

    // setNearbyTransport(info);
  };

  // Handle map click to place marker and update lat/lng inputs
  const geocodeLatLng = (lat: number, lng: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          resolve(results[0].formatted_address);
        } else {
          reject(`Geocoder failed: ${status}`);
        }
      });
    });
  };

  const onMapClick = useCallback(async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setLatitude(lat.toFixed(6));
    setLongitude(lng.toFixed(6));
    setMarkerPosition({ lat, lng });

    try {
      const address = await geocodeLatLng(lat, lng);
      setAddress(address);
      setErrors((prev) => ({ ...prev, address: "" }));
    } catch (err) {
      console.error(err);
      setAddress("");
      setErrors((prev) => ({ ...prev, address: "Geocoder failed" }));
    }

    fetchNearbyTransport(lat, lng);
  }, []);



  // Validation function
  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    // Owner Information Validation
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!phone1.trim()) newErrors.phone1 = "Phone number is required";
    if (!propertyType.trim())
      newErrors.propertyType = "Property type is required";
    if (!address.trim()) newErrors.address = "Address is required";

    if (!images.length) {
      newErrors.images = "Upload at least one image";
    }


    if (!rooms.trim() || isNaN(parseInt(rooms)))
      newErrors.rooms = "Valid rooms number is required";

    if (!selectedChips.length) {
      newErrors.selectedChips = "Select at least one occupancy restriction.";
    }

    setErrors(newErrors);
    // setShowTopAlert(!isValid);

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Backdrop

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Fill all required fields.");
      setLoading(false); // Don't forget to reset loading here
      return;
    }

    // Form is valid, proceed with submission
    const formState: ResidentialFormState = {
      firstName,
      lastName,
      email,
      phone1,
      propertyType,
      title,
      rent,
      negotiable,
      advanceAmount,
      leaseTenure,
      residentialType,
      address,
      landmark,
      latitude,
      longitude,
      images,
      totalArea,
      builtUpArea,
      carpetArea,
      facingDirection,
      totalFloors,
      propertyFloor,
      furnishingType,
      rooms,
      description,
      selectedChips,
    };

    // Convert payload to object
    const payload = buildPayloadDynamic(formState);

    // Build FormData (for multipart/form-data)
    const formData = new FormData();

    const flatPayload = flattenObject(payload);

    Object.entries(flatPayload).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const MAX_FILE_SIZE_MB = 5; // or whatever max size you want, in megabytes

    //Append images with MIME type handling & debug logging
    images.forEach((img) => {
      if (img.file instanceof File) {
        if (
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            img.file.type
          )
        ) {
          if (img.file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
            formData.append("images", img.file);
          } else {
            toast.error(
              `${img.name} exceeds ${MAX_FILE_SIZE_MB}MB size limit.`
            );
          }
        } else {
          console.warn(`Skipped invalid image: ${img.name}`);
          toast.error(
            `Invalid file type: ${img.name}. Only JPEG, PNG, or WEBP allowed.`
          );
        }
      } else if (typeof img.name === "string") {
        // Existing image URLs from edit mode, append them so backend knows to keep them
        formData.append("existingImages", img.name);
      }
    });

    try {
      const token = localStorage.getItem("token"); // Safely retrieve the auth token

      const url = isEditMode
        ? `${import.meta.env.VITE_BackEndUrl}/api/residential/${editId}`
        : `${import.meta.env.VITE_BackEndUrl}/api/residential/create`;

      const method = isEditMode ? "put" : "post";
      // Send POST request
      const response = await axios[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),

        },
      });

      setLoading(false); // Hide Backdrop FIRST

      setTimeout(() => {
        toast.success(
          isEditMode
            ? "Property updated successfully!"
            : "Property created successfully!"
        );
        // Wait until backdrop is gone
        setTimeout(() => {
          const plotId = response?.data?._id;

          if (plotId) {
            navigate(`/residential/view/${plotId}`);
          } else {
            navigate("/residential", {
              state: { data: response.data, showLoading: true },
            });
          }
        }, 1000); // Wait 1 second before redirecting
      }, 100); // Show success toast
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;

      console.error("Submission error:", error.response || error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong!";
      console.error("Submission Error:", error);

      toast.error(
        `Failed to ${isEditMode ? "update" : "create"
        } property: ${errorMessage}`
      );
    } finally {
      setLoading(false); // <- Hide backdrop on error
    }
  };

  //TopOfCenter MUIAlertToast
  useEffect(() => {
    // Show only once when the page opens
    setShowTopInfo(true);
  }, []);

  const isFormReadyToSubmit =
    firstName.trim() &&
    lastName.trim() &&
    phone1.trim() &&
    title.trim() &&
    address.trim() &&
    images.length > 0 &&
    rooms.trim() &&
    selectedChips.length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <div className="createProperty  row">
        <div className="col-12 col-md-3">{/* Sidebar placeholder */}</div>
        <div className="col-12">
          <div className=" px-3 px-md-5">
            <div className="ContentArea ">
              {/* Breadcrumb */}
              <div className="muiBreadcrumbs">
                {/* Breadcrumb */}
                <div className="muiBreadcrumbs">
                  <DynamicBreadcrumbs />
                  {/* Rest of your page content */}
                </div>

                <ToastContainer />
                {/* Rest of your page content */}

                {showTopInfo && (
                  <Alert
                    className="topInfoAlert"
                    severity="error"
                    variant="outlined"
                    icon={false}
                    sx={{ mt: 2 }}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => setShowTopInfo(false)}
                      >
                        <CloseIcon sx={{ color: "black" }} />
                      </IconButton>
                    }
                  >
                    <img
                      src="/src/assets/createProperty/mdi_required.png"
                      alt=""
                    />

                    <p className="topInfoAlertP">
                      Required Fields – 5 fields must be filled before
                      submitting the form.
                    </p>
                  </Alert>
                )}
                {/* Backdrop while submitting */}
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
              {/* Owner Information Section */}
              <section className="OwnerDetails mb-4">
                <div className="ownerTitle">
                  <h6>Owner Information</h6>
                  <p>Enter the contact details of the property owner</p>
                </div>

                <div className="ownerInputField row mb-3 p-0">
                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      <label className="textLabel" htmlFor="ownerFirstName">
                        First Name <span className="star">*</span>
                      </label>
                      <InputField
                        type="text"
                        id="ownerFirstName"
                        placeholder="Enter Owner's First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label className="TextLabel" htmlFor="ownerLastName">
                        Last Name <span className="star">*</span>
                      </label>
                      <InputField
                        type="text"
                        id="ownerLastName"
                        placeholder="Enter Owner's Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      <label className="TextLabel" htmlFor="email">
                        Email
                      </label>
                      <InputField
                        type="email"
                        id="Email"
                        placeholder="Enter Owner’s Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label className="TextLabel" htmlFor="phone1">
                        Phone Number <span className="star">*</span>
                      </label>
                      <InputField
                        type="phone"
                        id="phone"
                        placeholder="Enter Owner’s Phone Number"
                        value={phone1}
                        onPhoneChange={setPhone1}
                        error={!!errors.phone1}
                        helperText={errors.phone1}
                      />
                    </div>
                  </div>
                </div>
              </section>
              {/* Property Overview Section */}
              <section className="OwnerPropertyOverview mb-4">
                <div className="ownerTitle">
                  <h6>Property Overview</h6>
                  <p>Provide basic details about the property</p>
                </div>
                <div className="OwnerInputField  row mb-3">
                  <div className="d-flex flex-d-row gap-3 p-0 ">
                    <div className="col-12 col-md-6 mb-3">
                      <label className="TextLabel" htmlFor="propertyType">
                        Property Type
                      </label>
                      <InputField
                        type="dropdown"
                        id="propertyType"
                        dropdownOptions={["Rent", "Lease", "Sale"]}
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label className="TextLabel" htmlFor="residentialType">
                        Residential Type
                      </label>
                      <InputField
                        type="dropdown"
                        id="residentialType"
                        placeholder="Select Residential Type"
                        dropdownOptions={["House", "Apartment", "Villa", "Rooms"]}
                        value={residentialType || "House"}
                        onChange={(e) => setResidentialType(e.target.value)}
                      />
                    </div>
                  </div>

                  {propertyType === "Rent" && (
                    <>
                      <div className="OwnerInputField row mb-3">
                        <div className="d-flex flex-d-row gap-4 p-0">
                          <div className="col-12 col-md-6 mb-3">
                            <label className="TextLabel" htmlFor="monthlyRent">
                              Monthly Rent (₹)
                            </label>
                            <InputField
                              type="text"
                              id="monthlyRent"
                              placeholder="Enter Monthly Rent (₹)"
                              value={rent}
                              onChange={(e) => setRent(e.target.value)}
                            />
                          </div>
                          <div className="col-12 mb-3">
                            <label className="TextLabel" htmlFor="negotiable">
                              Negotiable
                            </label>
                            <div className="d-flex flex-wrap gap-3">
                              <InputField
                                type="radio"
                                radioOptions={["Yes", "No"]}
                                id="negotiable"
                                value={negotiable ? "Yes" : "No"}
                                onChange={(e) =>
                                  setNegotiable(e.target.value === "Yes")
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                          <label className="TextLabel" htmlFor="advanceDeposit">
                            Advance Deposit (₹)
                          </label>
                          <InputField
                            type="text"
                            id="advanceDeposit"
                            placeholder="Enter Deposit"
                            value={advanceAmount}
                            onChange={(e) => setAdvanceAmount(e.target.value)}
                          // error={!!errors.advanceDeposit}
                          // helperText={errors.advanceAmount}
                          />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                          <label className="TextLabel" htmlFor="agreementTime">
                            Agreement Timings (Years)
                          </label>
                          <InputField
                            type="text"
                            id="agreementTime"
                            placeholder="No. of Years"
                            value={leaseTenure}
                            onChange={(e) => setLeaseTenure(e.target.value)}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {propertyType === "Lease" && (
                    <>
                      <div className="OwnerInputField mb-3">
                        <div className="row  p-0">
                          <div className="col-6 mb-3">
                            <label className="TextLabel" htmlFor="leaseAmount">
                              Lease Amount (₹)
                            </label>
                            <InputField
                              type="text"
                              id="leaseAmount"
                              placeholder="Enter Lease Amount (₹)"
                              value={rent}
                              onChange={(e) => setRent(e.target.value)}
                            />
                          </div>
                          <div className="col-6">
                            <label
                              className="TextLabel"
                              htmlFor="negotiableLease"
                            >
                              Negotiable
                            </label>
                            <div className="d-flex flex-wrap gap-3">
                              <InputField
                                type="radio"
                                radioOptions={["Yes", "No"]}
                                id="negotiableLease"
                                value={negotiable ? "Yes" : "No"}
                                onChange={(e) =>
                                  setNegotiable(e.target.value === "Yes")
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="TextLabel" htmlFor="tenure">
                            Tenure (Years)
                          </label>
                          <InputField
                            type="text"
                            id="tenure"
                            placeholder="No. of Years"
                            value={leaseTenure}
                            onChange={(e) => setLeaseTenure(e.target.value)}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {propertyType === "Sale" && (
                    <>
                      <div className="col-6 mb-3">
                        <label className="TextLabel" htmlFor="salePrice">
                          Sale Price (₹)
                        </label>
                        <InputField
                          type="text"
                          id="salePrice"
                          placeholder="Enter Sale Price (₹)"
                          value={rent}
                          onChange={(e) => setRent(e.target.value)}
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="TextLabel" htmlFor="negotiableSale">
                          Negotiable
                        </label>
                        <div className="d-flex flex-wrap gap-3">
                          <InputField
                            type="radio"
                            radioOptions={["Yes", "No"]}
                            id="negotiableSale"
                            value={negotiable ? "Yes" : "No"}
                            onChange={(e) =>
                              setNegotiable(e.target.value === "Yes")
                            }
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Location Details Section */}
              <section className="LocationDetails mb-4">
                <div className="ownerTitle">
                  <h6>Location & Address</h6>
                  <p>Set the location and enter the property address</p>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <div className="position-relative" style={{ height: '379px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                      {isLoaded ? (
                        <>
                          {/* Search Bar Overlay */}
                          <div className="position-absolute" style={{ top: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                            <Autocomplete
                              onLoad={(autoC) => setMapAutocomplete(autoC)}
                              onPlaceChanged={async () => {
                                if (mapAutocomplete) {
                                  const place = mapAutocomplete.getPlace();
                                  const lat = place.geometry?.location?.lat();
                                  const lng = place.geometry?.location?.lng();
                                  
                                  if (lat && lng) {
                                    setLatitude(lat.toFixed(6));
                                    setLongitude(lng.toFixed(6));
                                    setMarkerPosition({ lat, lng });
                                    fetchNearbyTransport(lat, lng);
                                  }

                                  if (place.address_components) {
                                    const components = place.address_components;
                                    const doorNo = components.find(c => c.types.includes('street_number'))?.long_name ||
                                                 components.find(c => c.types.includes('premise'))?.long_name || '';
                                    const street = components.find(c => c.types.includes('route'))?.long_name ||
                                                 components.find(c => c.types.includes('sublocality'))?.long_name || '';
                                    const city = components.find(c => c.types.includes('locality'))?.long_name ||
                                               components.find(c => c.types.includes('postal_town'))?.long_name || '';
                                    const pincode = components.find(c => c.types.includes('postal_code'))?.long_name || '';
                                    
                                    const addressParts = [doorNo, street, city, pincode].filter(Boolean);
                                    setAddress(addressParts.join(', '));
                                    setErrors({ ...errors, address: "" });
                                  } else {
                                    setAddress(place.formatted_address || "");
                                  }
                                }
                              }}
                            >
                              <div
                                className="d-flex align-items-center bg-white"
                                style={{
                                  width: '320px',
                                  height: '48px',
                                  paddingLeft: '12px',
                                  paddingRight: '12px',
                                  borderRadius: '16px',
                                  boxShadow: '0px 3px 6px rgba(0,0,0,0.1), 0px 10px 20px rgba(0,0,0,0.15)',
                                  border: '1px solid #FFFFFF'
                                }}
                              >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-2">
                                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#757575"/>
                                </svg>
                                <input
                                  type="text"
                                  placeholder="Search location..."
                                  className="flex-grow-1 border-0 outline-0"
                                  style={{ color: '#757575', fontSize: '14px' }}
                                />
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="ms-2">
                                  <circle cx="11" cy="11" r="8" stroke="#757575" strokeWidth="2"/>
                                  <path d="m21 21-4.35-4.35" stroke="#757575" strokeWidth="2"/>
                                </svg>
                              </div>
                            </Autocomplete>
                          </div>

                          {/* Google Map */}
                          <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            center={markerPosition}
                            zoom={14}
                            onClick={onMapClick}
                          >
                            <Marker position={markerPosition} />
                          </GoogleMap>
                        </>
                      ) : (
                        <div className="d-flex justify-content-center align-items-center h-100">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading map...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <div className="row">
                      {/* Address Autocomplete */}
                      <div className="col-12 mb-3">
                        {isLoaded ? (
                          <Autocomplete
                            onLoad={(autoC) => setAutocomplete(autoC)}
                            onPlaceChanged={async () => {
                              if (autocomplete) {
                                const place = autocomplete.getPlace();
                                const lat = place.geometry?.location?.lat();
                                const lng = place.geometry?.location?.lng();
                                
                                if (lat && lng) {
                                  setLatitude(lat.toFixed(6));
                                  setLongitude(lng.toFixed(6));
                                  setMarkerPosition({ lat, lng });
                                  fetchNearbyTransport(lat, lng);
                                }

                                // Parse address components according to requirements
                                if (place.address_components) {
                                  const components = place.address_components;
                                  
                                  // Door No: street_number or premise
                                  const doorNo = components.find(c => c.types.includes('street_number'))?.long_name ||
                                               components.find(c => c.types.includes('premise'))?.long_name || '';
                                  
                                  // Street: route or sublocality
                                  const street = components.find(c => c.types.includes('route'))?.long_name ||
                                               components.find(c => c.types.includes('sublocality'))?.long_name || '';
                                  
                                  // City: locality or postal_town
                                  const city = components.find(c => c.types.includes('locality'))?.long_name ||
                                             components.find(c => c.types.includes('postal_town'))?.long_name || '';
                                  
                                  // Pincode: postal_code
                                  const pincode = components.find(c => c.types.includes('postal_code'))?.long_name || '';
                                  
                                  // Construct proper address
                                  const addressParts = [doorNo, street, city, pincode].filter(Boolean);
                                  setAddress(addressParts.join(', '));
                                  setErrors({ ...errors, address: "" });
                                } else {
                                  setAddress(place.formatted_address || "");
                                }
                              }
                            }}
                          >
                            <div>
                              <label className="TextLabel" htmlFor="address">
                                Full Address <span className="star">*</span>
                              </label>
                              <InputField
                                type="text"
                                id="address"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                error={!!errors.address}
                                helperText={errors.address}
                              />
                            </div>
                          </Autocomplete>
                        ) : (
                          <p>Loading autocomplete...</p>
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <label className="TextLabel" htmlFor="landmark">
                          Landmark
                        </label>
                        <InputField
                          type="text"
                          id="landmark"
                          placeholder="Enter Nearby Landmark"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                        />
                      </div>

                      <div className="col-6 mb-3">
                        <label className="TextLabel" htmlFor="latitude">
                          Latitude
                        </label>
                        <InputField
                          type="text"
                          id="latitude"
                          placeholder="Latitude"
                          value={latitude}
                          onChange={(e) => setLatitude(e.target.value)}
                        // Add error handling if latitude is mandatory
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="TextLabel" htmlFor="longitude">
                          Longitude
                        </label>
                        <InputField
                          type="text"
                          id="longitude"
                          placeholder="Longitude"
                          value={longitude}
                          onChange={(e) => setLongitude(e.target.value)}
                        // Add error handling if longitude is mandatory
                        />
                      </div>
                    </div>

                    {/* <div className="informationCard">
                      <label htmlFor="" className="labelName">
                        Nearby Transportation
                      </label>

                      <div className="">
                        <div className="row">
                          <div className="col-6 col-md-6 mb-3">
                            <span className="transportTitles">BUS STAND</span>
                            <div className="transportCard d-flex gap-2">
                              <img
                                src={`${import.meta.env.VITE_BASE_URL}/createProperty/Icon_Bus.svg`}
                                alt="Bus"
                                className="transportImg"
                              />
                              <div>
                                <span className="transportInfoText">
                                  {nearbyTransport["BUS STAND"] || "0 KM"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="col-6 col-md-6 mb-3">
                            <span className="transportTitles">AIRPORT</span>
                            <div className="transportCard d-flex gap-2">
                              <img
                                src={`${import.meta.env.VITE_BASE_URL}/createProperty/ph_airplane-in-flight.svg`}
                                alt="Bus"
                                className="transportImg"
                              />
                              <div>
                                <span className="transportInfoText">
                                  {nearbyTransport["AIRPORT"] || "0 KM"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-6 col-md-6 mb-3">
                            <span className="transportTitles">METRO</span>
                            <div className="transportCard d-flex gap-2">
                              <img
                                src={`${import.meta.env.VITE_BASE_URL}/createProperty/hugeicons_metro.svg`}
                                alt="Bus"
                                className="transportImg"
                              />
                              <div>
                                <span className="transportInfoText">
                                  {nearbyTransport["METRO"] || "0 KM"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-md-6 mb-3">
                            <span className="transportTitles">RAILWAY</span>
                            <div className="transportCard d-flex gap-2">
                              <img
                                src={`${import.meta.env.VITE_BASE_URL}/createProperty/material-symbols-light_train-outline.svg`}
                                alt="Bus"
                                className="transportImg"
                              />
                              <div>
                                <span className="transportInfoText">
                                  {nearbyTransport["RAILWAY"] || "0 KM"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </section>

              {/*new code for cropping functionalities*/}
              <section>
                <div className="ResidentialCategory mt-3">
                  <p>
                    Upload Property Images <span className="star">*</span>
                  </p>
                </div>

                <div className={`image-upload-wrapper ${errors.images ? "error-border" : ""}`}>
                  <div className="preview-images d-flex gap-3 mt-2 image-scroll-container">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="choosedImages position-relative"
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        style={{
                          opacity: draggedIndex === index ? 0.5 : 1,
                          cursor: 'grab',
                          transition: 'opacity 0.2s'
                        }}
                      >
                        <img src={img.name} alt={`preview-${index}`} className="preview-img" style={{ cursor: 'pointer' }}
                          onClick={() => setPreviewImage(img.name ?? null)} />
                        <div
                          className="image-name mt-1 text-truncate"
                          title={img.name}
                          style={{
                            fontSize: "12px",
                            color: "#333",
                            maxWidth: "100%",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {/* <img src={img.name} alt={img.name} /> */}
                        </div>
                        <button type="button" onClick={() => removeImage(index)} className="remove-btn">
                          <img src={`${import.meta.env.VITE_BASE_URL}/createProperty/material-symbols_close-rounded.svg`} alt="Remove" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`BtnFrame d-flex mt-3 mb-2 align-items-start gap-3 ${images.length > 0 ? "with-gap" : ""
                      }`}
                  >
                    <p className="image-p">
                      {images.length > 0
                        ? `${images.length} image${images.length > 1 ? "s" : ""} chosen`
                        : "No image chosen"}
                    </p>

                    <input
                      type="file"
                      id="propertyImageUpload"
                      style={{ display: "none" }}
                      accept="image/*"

                      onChange={handleFileChange}
                    />

                    <MuiButton
                      className="chooseBtn"
                      variant="contained"
                      startIcon={<FileUploadOutlinedIcon />}
                      onClick={() => document.getElementById("propertyImageUpload")?.click()}
                    >
                      <span className="btnC">Choose image</span>
                    </MuiButton>

                    <p className="imageDesc">Max. {MAX_IMAGES} Images</p>
                  </div>

                  {errors.images && (
                    <div className="text-danger mt-1" style={{ fontSize: "14px" }}>
                      {errors.images}
                    </div>
                  )}
                </div>

                <Modal open={cropModalOpen} onClose={() => setCropModalOpen(false)}>
                  <div
                    style={{
                      background: "#fff",
                      padding: 20,
                      margin: "5% auto",
                      width: "90%",
                      maxWidth: 600,
                    }}
                  >
                    {imageSrc && (
                      <>
                        <div style={{ position: "relative", width: "100%", height: 400 }}>
                          <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                          />
                        </div>
                        <div style={{ marginTop: 20 }}>
                          <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            onChange={(_, value) => setZoom(value as number)}
                          />
                          <div style={{ marginTop: 10 }}>
                            <button onClick={cropImage}>Crop</button>
                            <button
                              onClick={() => setCropModalOpen(false)}
                              style={{ marginLeft: 10 }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>

                      </>
                    )}

                  </div>
                </Modal>
              </section>

              {previewImage && (
                <Modal open={true} onClose={() => setPreviewImage(null)}>
                  <div
                    style={{
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: '#fff',
                      padding: 20,
                      maxWidth: '90%',
                      maxHeight: '90%',
                      overflow: 'auto',
                      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                      zIndex: 1300,
                    }}
                  >
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{
                        maxWidth: `${MAX_WIDTH}px`,
                        maxHeight: `${MAX_HEIGHT}px`,
                        minWidth: `${MIN_WIDTH}px`,
                        minHeight: `${MIN_HEIGHT}px`,
                        objectFit: 'contain'
                      }}
                    />
                    <button onClick={() => setPreviewImage(null)} style={{ marginTop: 10 }}>
                      Close Preview
                    </button>
                  </div>
                </Modal>
              )}


              {/*new code for cropping functionalities ends here */}
              {/* <div>
                  <div className="ResidentialCategory mt-3">
                    <p>
                      Upload Property Images <span className="star">*</span>
                    </p>
                  </div>
                  
                  <div
                    className={`image-upload-wrapper ${
                      errors.images ? "error-border" : ""
                    }`}
                  >
                    <div className="preview-images d-flex gap-3 mt-2 image-scroll-container">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className="choosedImages position-relative"
                        >
                          <img
                            src={img.url}
                            alt={`preview-${index}`}
                            className="preview-img"
                          />

                          <div
                            className="image-name mt-1 text-truncate"
                            title={img.name}
                            style={{
                              fontSize: "12px",
                              color: "#333",
                              maxWidth: "100%",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {img.name}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setImages((prevImages) =>
                                prevImages.filter((_, i) => i !== index)
                              )
                            }
                            className="remove-btn"
                          >
                            <img
                              src="/src/assets/createProperty/material-symbols_close-rounded.svg"
                              alt=""
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    
                    <div
                      className={`BtnFrame d-flex mt-3 mb-2 align-items-start gap-3 ${
                        images.length > 0 ? "with-gap" : ""
                      }`}
                    >
                      <p className="image-p">
                        // * {propertyImages
                        // ? propertyImages.name : "No image chosen"} 
                        {images && images.length > 0
                          ? `${images.length} image${
                              images.length > 1 ? "s" : ""
                            } choosen`
                          : "No image choosen"}
                      </p>
                      <input
                        type="file"
                        id="propertyImageUpload"
                        style={{ display: "none" }}
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          if (!e.target.files) return;

                          const allowedMimeTypes = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                            "image/webp",
                          ];

                          const newFiles = Array.from(e.target.files);
                          const remainingSlots = 12 - images.length;

                          const validImages: UploadedImage[] = newFiles
                            .filter((file) => {
                              const isValid = allowedMimeTypes.includes(
                                file.type
                              );

                              // const isValid = file.type.startsWith("image/");
                              if (!isValid) {
                                toast.error(`Invalid file type: ${file.name}`);
                              }
                              return isValid;
                            })
                            .slice(0, remainingSlots)
                            .map((file) => ({
                              // file: file as File,
                              file,
                              url: URL.createObjectURL(file),
                              name: file.name,
                            }));

                          if (validImages.length === 0) return;

                          if (newFiles.length > remainingSlots) {
                            toast.info(
                              `Only ${remainingSlots} more image${
                                remainingSlots > 1 ? "s" : ""
                              } can be added.`
                            );
                          }

                          setImages((prev) => [...prev, ...validImages]);
                          e.target.value = ""; // allow re-selection of same file
                        }}
                      />

                      <Button
                        className="chooseBtn"
                        variant="contained"
                        startIcon={<FileUploadOutlinedIcon />}
                        id="Choosebtn"
                        onClick={() =>
                          document
                            .getElementById("propertyImageUpload")
                            ?.click()
                        }
                      >
                        <span className="btnC">Choose image</span>
                      </Button>
                      <p className="imageDesc">Max. 12 Images</p>
                    </div>
                    // Display validation error below upload block 
                    {errors.images && (
                      <div
                        className="text-danger mt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {errors.images}
                      </div>
                    )}
                  </div>
                </div>
              */ }


              {/* Property Layout Section */}
              <section className="PropertyLayoutDetails mb-4">
                <div className="ownerTitle">
                  <h6>Property Dimensions & Layout</h6>
                  <p>Enter the size and structure of the property</p>
                </div>

                <div className="OwnerDetailTextField mt-3 row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="totalArea">
                      Total Area 
                    </label>
                    <InputField
                      type="text"
                      id="totalArea"
                      placeholder="Enter Total Area (sq.ft)"
                      value={totalArea}
                      onChange={(e) => setTotalArea(e.target.value)}
                      error={!!errors.totalArea}
                      helperText={errors.totalArea}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="builtUpArea">
                      Built Up Area 
                    </label>
                    <InputField
                      type="text"
                      id="builtUpArea"
                      placeholder="Enter Built-Up Area (sq.ft)"
                      value={builtUpArea}
                      onChange={(e) => setBuiltUpArea(e.target.value)}
                      error={!!errors.builtUpArea}
                      helperText={errors.builtUpArea}
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="carpetArea">
                      Carpet Area 
                    </label>
                    <InputField
                      type="text"
                      id="carpetArea"
                      placeholder="Enter Carpet Area (sq.ft)"
                      value={carpetArea}
                      onChange={(e) => setCarpetArea(e.target.value)}
                      error={!!errors.carpetArea}
                      helperText={errors.carpetArea}
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="facing">
                      Facing
                    </label>
                    <InputField
                      type="dropdown"
                      id="facing"
                      placeholder="Select Direction Facing"
                      dropdownOptions={[
                        "North",
                        "East",
                        "West",
                        "South",
                        "North East",
                        "North West",
                        "South East",
                        "South West",
                      ]}
                      value={facingDirection || "East"}
                      onChange={(e) => setfacingDirection(e.target.value)}
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="totalFloors">
                      Total Floors
                    </label>
                    <InputField
                      type="text"
                      id="totalFloors"
                      placeholder="Enter Total Number of Floors"
                      value={totalFloors}
                      onChange={(e) => setTotalFloors(e.target.value)}
                      error={!!errors.totalFloors}
                      helperText={errors.totalFloors}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="propertyOnFloor">
                      Property on
                    </label>
                    <InputField
                      type="text"
                      id="propertyOnFloor"
                      placeholder="Enter Floor Number"
                      value={propertyFloor}
                      onChange={(e) => setPropertyFloor(e.target.value)}
                      error={!!errors.propertyFloor}
                      helperText={errors.propertyFloor}
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="furnishedType">
                      Furnished Type
                    </label>
                    <InputField
                      type="dropdown"
                      id="furnishedType"
                      dropdownOptions={[
                        "Fully Furnished",
                        "Semi Furnished",
                        "Unfurnished",
                      ]}
                      value={furnishingType || "Unfurnished"}
                      onChange={(e) => setFurnishingType(e.target.value)}
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="roomCount">
                      Rooms <span className="star">*</span>
                    </label>
                    <InputField
                      type="dropdown"
                      id="roomCount"
                      dropdownOptions={["1", "2", "3", "4", "5+"]}
                      value={rooms || "1"}
                      onChange={(e) => setRoomCount(e.target.value)}
                      error={!!errors.rooms}
                      helperText={errors.rooms}
                    />
                  </div>
                </div>
              </section>

              {/* Amenities Section - No direct validation needed unless you have min/max selections */}
              <section className="AmenitiesSection mb-4">
                <div className="ownerTitle mb-3">
                  <h6>Nearby Services & Essentials</h6>
                  <p>
                    Select the important places or services available near this property
                  </p>
                </div>

                <div className="chipField">
                  <div className="d-flex flex-wrap gap-3">
                    <InputField
                      type="chip"
                      label="Separate Electricity Billing"
                      icon={
                        <Avatar
                          alt="Separate Electricity Billing"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/mage_electricity.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) => {
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        );
                      }}
                    />

                    <InputField
                      type="chip"
                      label="Public Park"
                      icon={
                        <Avatar
                          alt="Public Park"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/material-symbols_park-outline-rounded.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) => {
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        );
                      }}
                    />

                    <InputField
                      type="chip"
                      label="Gym"
                      icon={
                        <Avatar
                          alt="Gym"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/hugeicons_equipment-gym-03.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) => {
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        );
                      }}
                    />

                    <InputField
                      type="chip"
                      label="Movie Theater"
                      icon={
                        <Avatar
                          alt="Movie Theater"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/mingcute_movie-line.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) => {
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        );
                      }}
                    />

                    <InputField
                      type="chip"
                      label="Shopping Mall"
                      icon={
                        <Avatar
                          alt="Shopping Mall"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/material-symbols_local-mall-outline.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) => {
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        );
                      }}
                    />
                  </div>
                </div>
              </section>


              {/* Accessibility Section - No direct validation needed */}
              <section className="AccessibilitySection mb-4">
                <div className="ownerTitle">
                  <h6>Move-In Accessibility</h6>
                  <p>
                    Choose how easy it is to access and move into the property
                  </p>
                </div>

                <div className="chipField">
                  <div className="d-flex flex-wrap gap-3">
                    <InputField
                      type="chip"
                      className="input-field"
                      label="Lift Access"
                      icon={
                        <Avatar
                          alt="Lift Access"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/Icon_Lift.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) => {
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        );
                      }}
                    />

                    <InputField
                      type="chip"
                      className="input-field"
                      label="Ramp Access"
                      icon={
                        <Avatar
                          alt="Ramp Access"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/guidance_ramp-up.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) => {
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        );
                      }}
                    />

                    <InputField
                      type="chip"
                      className="input-field"
                      label="Only via Stairs"
                      icon={
                        <Avatar
                          alt="Only via Stairs"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/tabler_stairs.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) => {
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        );
                      }}
                    />
                  </div>
                </div>
              </section>


              <section className="AccessibilitySection mb-4">
                <div className="ownerTitle">
                  <h6>Connectivity & Security Features</h6>
                  <p>
                    Highlight the connectivity options and security services
                    included with this property
                  </p>
                </div>

                <div className="chipField">
                  <div className="d-flex flex-wrap gap-3">
                    <InputField
                      type="chip"
                      className="input-field"
                      label="Broadband Connection"
                      icon={
                        <Avatar
                          alt="Broadband Connection"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/Group.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) => {
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        );
                      }}
                    />

                    <InputField
                      type="chip"
                      className="input-field"
                      label="Security"
                      icon={
                        <Avatar
                          alt="Security"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/mingcute_user-security-line.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) => {
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        );
                      }}
                    />
                  </div>
                </div>
              </section>


              {/* Utilities Section - No direct validation needed */}
              <section className="UtilitiesSection ">
                <div className="ownerTitle">
                  <h6>Infrastructure & Utilities</h6>
                  <p>
                    Select the facilities or utilities included with this
                    property{" "}
                  </p>
                </div>

                <div className="chipField">
                  <div className="chipcard d-flex flex-wrap w-100 gap-4 mb-3" style={{ padding: "31px" }}>
                    <div className="firstRow d-flex gap-4">
                      <InputField
                        type="chip"
                        className="input-field"
                        label="Regular Maintenance Included"
                        icon={
                          <Avatar
                            alt="Regular Maintenance Included"
                            src={`${import.meta.env.VITE_BASE_URL}/createProperty/Icon_Cleaning.svg`}
                            className="avatarImg"
                          />
                        }
                        selectedChips={selectedChips}
                        onChipToggle={(label) => {
                          setSelectedChips((prev) =>
                            prev.includes(label)
                              ? prev.filter((chip) => chip !== label)
                              : [...prev, label]
                          );
                        }}
                      />

                      <InputField
                        type="chip"
                        className="input-field"
                        label="Water Supply Available"
                        icon={
                          <Avatar
                            alt="Water Supply Available"
                            src={`${import.meta.env.VITE_BASE_URL}/createProperty/material-symbols_water-full-outline.svg`}
                            className="avatarImg"
                          />
                        }
                        selectedChips={selectedChips}
                        onChipToggle={(label) => {
                          setSelectedChips((prev) =>
                            prev.includes(label)
                              ? prev.filter((chip) => chip !== label)
                              : [...prev, label]
                          );
                        }}
                      />

                      <InputField
                        type="chip"
                        className="input-field"
                        label="Good Road Access"
                        icon={
                          <Avatar
                            alt="Good Road Access"
                            src={`${import.meta.env.VITE_BASE_URL}/createProperty/Icon_Road.svg`}
                            className="avatarImg"
                          />
                        }
                        selectedChips={selectedChips}
                        onChipToggle={(label) => {
                          setSelectedChips((prev) =>
                            prev.includes(label)
                              ? prev.filter((chip) => chip !== label)
                              : [...prev, label]
                          );
                        }}
                      />
                    </div>

                    <div className="secondRow d-flex gap-4">
                      <InputField
                        type="chip"
                        className="input-field"
                        label="Sewage Connection Available"
                        icon={
                          <Avatar
                            alt="Sewage Connection Available"
                            src={`${import.meta.env.VITE_BASE_URL}/createProperty/Icon_restroom.svg`}
                            className="avatarImg"
                          />
                        }
                        selectedChips={selectedChips}
                        onChipToggle={(label) => {
                          setSelectedChips((prev) =>
                            prev.includes(label)
                              ? prev.filter((chip) => chip !== label)
                              : [...prev, label]
                          );
                        }}
                      />
                      <InputField
                        type="chip"
                        className="input-field"
                        label="Dedicated Parking Available"
                        icon={
                          <Avatar
                            alt="Dedicated Parking Available"
                            src={`${import.meta.env.VITE_BASE_URL}/createProperty/Icon_Parking.svg`}
                            className="avatarImg"
                          />
                        }
                        selectedChips={selectedChips}
                        onChipToggle={(label) => {
                          setSelectedChips((prev) =>
                            prev.includes(label)
                              ? prev.filter((chip) => chip !== label)
                              : [...prev, label]
                          );
                        }}
                      />
                      <InputField
                        type="chip"
                        className="input-field"
                        label="Private Balcony Included"
                        icon={
                          <Avatar
                            alt="Private Balcony Included"
                            src={`${import.meta.env.VITE_BASE_URL}/createProperty/Icon_Balcony.svg`}
                            className="avatarImg"
                          />
                        }
                        selectedChips={selectedChips}
                        onChipToggle={(label) => {
                          setSelectedChips((prev) =>
                            prev.includes(label)
                              ? prev.filter((chip) => chip !== label)
                              : [...prev, label]
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Restrictions Section - Only show for Rent and Lease properties */}
              {propertyType !== "Sale" && (
                <section className="RestrictionsSection mb-4">
                  <div className="ownerTitle">
                    <h6>
                      Occupancy Restrictions <span className="star">*</span>
                    </h6>
                    <p>
                      Select any rules about who can stay or live in this property
                    </p>
                    {errors.selectedChips && (
                      <p className="text-danger">{errors.selectedChips}</p>
                    )}
                  </div>

                  <div className="chipField">
                    <div className="d-flex flex-wrap gap-3">
                      <InputField
                        type="chip"
                        className="input-field"
                        label="Guests Not Allowed"
                        icon={
                          <Avatar
                            alt="Guests Not Allowed"
                            src={`${import.meta.env.VITE_BASE_URL}/createProperty/solar_user-linear.svg`}
                            className="avatarImg"
                          // sx={{ width: 18, height: 18 }}
                          />
                        }
                        selectedChips={selectedChips}
                        onChipToggle={(label) => {
                          setSelectedChips((prev) =>
                            prev.includes(label)
                              ? prev.filter((chip) => chip !== label)
                              : [...prev, label]
                          );
                        }}
                      />

                      <InputField
                        type="chip"
                        className="input-field"
                        label="No Pets Allowed"
                        icon={
                          <Avatar
                            alt="No Pets Allowed"
                            src={`${import.meta.env.VITE_BASE_URL}/createProperty/streamline_pets-allowed.svg`}
                            className="avatarImg"
                          />
                        }
                        selectedChips={selectedChips}
                        onChipToggle={(label) => {
                          setSelectedChips((prev) =>
                            prev.includes(label)
                              ? prev.filter((chip) => chip !== label)
                              : [...prev, label]
                          );
                        }}
                      />

                      <InputField
                        type="chip"
                        className="input-field"
                        label="No Bachelors Allowed"
                        icon={
                          <Avatar
                            alt="No Bachelors Allowed"
                            src={`${import.meta.env.VITE_BASE_URL}/createProperty/Icon_Lift (1).svg`}
                            className="avatarImg"
                          />
                        }
                        selectedChips={selectedChips}
                        onChipToggle={(label) => {
                          setSelectedChips((prev) =>
                            prev.includes(label)
                              ? prev.filter((chip) => chip !== label)
                              : [...prev, label]
                          );
                        }}
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* Additional Information Section */}
              <section className="AdditionalInfoSection mb-4">
                <div className="ownerTitle">
                  <h6>Additional Information</h6>
                  <p>Provide any other relevant details about the property </p>
                </div>
                <div className=" ">
                  <label className="TextLabel" htmlFor="propertyTitle">
                    Property Title <span className="star">*</span>
                  </label>
                  <InputField
                    type="text"
                    id="propertyTitle"
                    placeholder="Enter Property Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={!!errors.title}
                    helperText={errors.title}
                  />
                </div>
                <label htmlFor="propertyDescription">
                  Property Description
                </label>
                <textarea
                  className="form-control"
                  rows={4}
                  id="propertyDescription"
                  placeholder="Add a brief description of the property, including highlights, unique features, or nearby landmarks"
                  value={description}
                  onChange={(e) => setPropertyDescription(e.target.value)}
                ></textarea>
              </section>

              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-3 justify-content-end my-4">
                <GenericButton
                  label="Discard changes"
                  icon={<CloseIcon />}
                  className="DiscardC btn-outline-secondary"
                  onClick={() => {
                    toast.info(
                      ({ closeToast }) => (
                        <div>
                          <p>Are you sure you want to discard changes?</p>
                          <div className="d-flex justify-content-end gap-2 mt-2">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                closeToast?.();
                                // Implement discard logic here, e.g., reset all states
                                window.location.reload(); // Simple reload for demonstration
                              }}
                            >
                              Yes
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={closeToast}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ),
                      {
                        position: "top-center",
                        closeOnClick: false,
                        autoClose: false,
                        closeButton: false,
                        draggable: false,
                      }
                    );
                  }}
                />

                <Tooltip
                  title={
                    !isFormReadyToSubmit
                      ? "Please complete all required fields"
                      : ""
                  }
                >
                  <div>
                    {/* Your form and other JSX */}
                    <GenericButton
                      label={
                        loading
                          ? "Saving..."
                          : isEditMode
                            ? "Update Property"
                            : "Create New Property"
                      }
                      icon={
                        loading ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          <DoneIcon />
                        )
                      }
                      className="createNP btn btn-primary"
                      type="submit"
                      disabled={loading}
                    />

                    {/* This must be rendered */}
                    <ToastContainer />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProperty;