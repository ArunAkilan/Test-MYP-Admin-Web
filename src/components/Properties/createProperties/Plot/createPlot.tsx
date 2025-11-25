import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InputField, DynamicBreadcrumbs } from "../../../Common/input";
import GenericButton from "../../../Common/Button/button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
//import { Button, Avatar, Alert, IconButton, Backdrop, CircularProgress, } from "@mui/material";
import { Avatar, Alert, IconButton, Backdrop, CircularProgress, } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./createPlot.scss";
import axios, { AxiosError } from "axios";
import type {
  PropertyType,
  PlotType,
  FacingDirection,
  PlotFormState,
  UploadedImage,
} from "./createPlot.modal";
// import type { Restrictions } from "../../../AdminResidencial/AdminResidencial.model";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import Tooltip from "@mui/material/Tooltip";
import type { PlainObject } from "../createProperty.model";
import { GOOGLE_MAP_OPTIONS } from "../../../Common/googleMapsConfig";
//cropping code starts here

import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { Button as MuiButton, Modal, Slider } from "@mui/material";

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
// const mapChipsToRestrictions = (chips: string[]): Restrictions => {
//   return {
//     guestAllowed: chips.includes("Guests Not Allowed"),
//     petsAllowed: chips.includes("No Pets Allowed"),
//     bachelorsAllowed: chips.includes("No Bachelors Allowed"),
//   };
// };

// Build payload dynamically based on form state
function buildPayloadDynamic(formState: PlotFormState): PlotFormState {
  const payload: Partial<PlotFormState> = {};
  const chips = formState.selectedChips || [];

  // owner
  setNested(payload, "propertyOwner.firstName", formState.propertyOwner.firstName.trim());
  setNested(payload, "propertyOwner.lastName", formState.propertyOwner.lastName.trim());
  setNested(payload, "propertyOwner.contact.phone1", formState.propertyOwner.contact.phone1.trim());
  setNested(payload, "propertyOwner.contact.email", formState.propertyOwner.contact.email?.trim() ?? "");
  setNested(payload, "propertyOwner.contact.getUpdates", true);

  // property
  setNested(payload, "propertyType", formState.propertyType);
  setNested(payload, "title", formState.title);
  setNested(payload, "plotType", formState.plotType);
  setNested(payload, "facingDirection", formState.facingDirection);

  // rent / lease / sale
  if (formState.propertyType === "Rent") {
    setNested(
      payload,
      "rent.rentAmount",
      Number(formState.rent.rentAmount) || 0
    );
    setNested(payload, "rent.negotiable", formState.rent.negotiable);
    setNested(
      payload,
      "rent.advanceAmount",
      Number(formState.rent.advanceAmount) || 0
    );
    setNested(payload, "rent.agreementTiming", formState.rent.agreementTiming);
  } else if (formState.propertyType === "Lease") {
    setNested(
      payload,
      "lease.leaseAmount",
      Number(formState.lease.leaseAmount) || 0
    );
    setNested(payload, "lease.negotiable", formState.lease.negotiable);
    setNested(payload, "lease.leaseTenure", formState.lease.leaseTenure);
  } else if (formState.propertyType === "Sale") {
    setNested(
      payload,
      "sale.saleAmount",
      Number(formState.sale.saleAmount) || 0
    );
    setNested(payload, "sale.negotiable", formState.sale.negotiable);
  }
  // location
  setNested(payload, "location.address", formState.location.address);
  if (formState.location.map?.latitude)
    setNested(
      payload,
      "location.map.latitude",
      Number(formState.location.map?.latitude)
    );
  if (formState.location.map?.longitude)
    setNested(
      payload,
      "location.map.longitude",
      Number(formState.location.map?.longitude)
    );

  // area
  setNested(
    payload,
    "location.area.totalArea",
    `${formState.location.area?.totalArea ?? ""} sqft`
  );
  setNested(
    payload,
    "location.area.length",
    formState.location.area?.length ?? ""
  );
  setNested(
    payload,
    "location.area.width",
    `${formState.location.area?.width ?? ""} sqft`
  );
  setNested(payload, "location.area.acre", formState.location.area?.acre || 0);

  // floors
  // setNested(payload, "totalFloors", Number(formState.totalFloors) || 0);
  // setNested(payload, "propertyFloor", Number(formState.propertyFloor) || 0);
  // setNested(payload, "acre", Number(formState.acre) || 0);



  // images
  // const imageUrls = formState.uploadedImages.map((img) => img.name);
  // setNested(payload, "images", imageUrls);

  // accessibility – map selected chips → boolean object
  // const restrictions = mapChipsToRestrictions(formState.selectedChips);
  // setNested(payload, "restrictions", restrictions);
  // setNested(payload, "selectedChips", formState.selectedChips || []);

  // Dynamic facility - only set if chips are selected
  if (chips.includes("Well")) {
    setNested(payload, "facility.hasWell", true);
  }
  if (chips.includes("Bore Well")) {
    setNested(payload, "facility.hasBorewell", true);
  }
  if (chips.includes("EB Connection")) {
    setNested(payload, "facility.hasEBConnection", true);
  }
  if (chips.includes("Motor")) {
    setNested(payload, "facility.hasMotor", true);
  }

  // misc
  setNested(payload, "status", "Pending");
  // setNested(payload, "hasWell", formState.hasWell || false);
  // setNested(payload, "hasMotor", formState.hasMotor || false);
  // setNested(payload, "hasEBConnection", formState.hasEBConnection || false);
  // setNested(payload, "hasBorewell", formState.hasBorewell || false);
  // setNested(payload, "uploadedImages", formState.uploadedImages || []);
  // setNested(payload, "isActive", true);
  // setNested(payload, "isVerified", false);
  // setNested(payload, "isFeatured", false);
  // setNested(payload, "isDraft", false);
  // setNested(payload, "isPublished", false);
  // setNested(payload, "isArchived", false);
  setNested(payload, "isDeleted", false);
  setNested(payload, "description", formState.description ?? "");

  return payload as PlotFormState;
}

export const CreatePlotProperty = () => {

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
          // { file: croppedFile, url: previewUrl, name: croppedFile.name, imageSize: croppedFile.size, }
          { file: croppedFile, url: previewUrl, name: previewUrl, imageSize: 0 }
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

  //cropping code ends here

  // State for form data
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone1, setPhone1] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType>("Rent");

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const [editable, setEditable] = useState(true);


  const [rentAmount, setRentAmount] = useState<string>("");
  const [leaseAmount, setLeaseAmount] = useState<string>("");
  const [saleAmount, setSaleAmount] = useState<string>("");
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [leaseTenure, setLeaseTenure] = useState("");
  const [plotType, setPlotType] = useState("None" as PlotType);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [totalArea, setTotalArea] = useState("");
  const [facingDirection, setFacingDirection] =
    useState<FacingDirection>("East");
  const [totalFloors, setTotalFloors] = useState("");
  const [propertyFloor, setPropertyFloor] = useState("");
  const [acre, setAcre] = useState("");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  const sanitizedTotalArea = totalArea.trim() ? `${totalArea.trim()} sqft` : "";
  const sanitizedLength = length.trim() ? length.trim() : "";
  const sanitizedWidth = width.trim() ? width.trim() : "";
  
  const [description, setPropertyDescription] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTopInfo, setShowTopInfo] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [mapAutocomplete, setMapAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const location = useLocation();
  const isEditMode = location.state?.mode === "edit";
  const editData = location.state?.data;
  const editId = location.state?.data?._id;


  useEffect(() => {
    if (isEditMode && editData) {
      console.log("editData (create plot):", editData);
  
      // Infer propertyType fallback
      const inferredType =
        editData.propertyType ||
        (editData.rent ? "Rent" : editData.lease ? "Lease" : editData.sale ? "Sale" : "Rent");
      setPropertyType(inferredType as PropertyType);
  
      setFirstName(editData?.propertyOwner?.firstName ?? "");
      setLastName(editData?.propertyOwner?.lastName ?? "");
      setEmail(editData?.propertyOwner?.contact?.email ?? "");
      setPhone1(editData?.propertyOwner?.contact?.phone1 ?? "");
      setTitle(editData?.title ?? "");
  
      // Set rent, lease, sale amounts
      setRentAmount(String(editData?.rent?.rentAmount ?? ""));
      setNegotiable(editData?.rent?.negotiable ?? false);
      setAdvanceAmount(String(editData?.rent?.advanceAmount ?? ""));
      setLeaseAmount(String(editData?.lease?.leaseAmount ?? ""));
      setLeaseTenure(editData?.lease?.leaseTenure ?? "");
      setSaleAmount(String(editData?.sale?.saleAmount ?? ""));
  
      // Sanitize and set area fields
      setTotalArea(editData.location?.area?.totalArea?.replace(" sqft", "") ?? "");
      setLength(editData.location?.area?.length?.replace(" ft", "") ?? "");
      setWidth(editData.location?.area?.width?.replace(" ft", "") ?? "");
      setAcre(String(editData.location?.area?.acre ?? ""));
  
      setPlotType(editData?.plotType ?? "None");
      setAddress(editData?.location?.address ?? "");
      if (editData.location?.map) {
        setLatitude(String(editData.location.map.latitude ?? ""));
        setLongitude(String(editData.location.map.longitude ?? ""));
      }
  
      setImages(
        (editData.images?.map((img: string) => ({ name: img })) as UploadedImage[]) ?? []
      );
  
      setFacingDirection(editData?.facingDirection ?? "East");
      setTotalFloors(String(editData?.totalFloors ?? ""));
      setPropertyFloor(String(editData?.propertyFloor ?? ""));
  
      // Chips (facilities and restrictions)
      const chips: string[] = [];
      if (editData.restrictions) {
        if (editData.restrictions.guestAllowed === false) chips.push("Guests Not Allowed");
        if (editData.restrictions.petsAllowed === false) chips.push("No Pets Allowed");
        if (editData.restrictions.bachelorsAllowed === false) chips.push("No Bachelors Allowed");
      }
      if (editData.facility) {
        if (editData.facility.hasWell === true) chips.push("Well");
        if (editData.facility.hasBorewell === true) chips.push("Bore Well");
        if (editData.facility.hasEBConnection === true) chips.push("EB Connection");
        if (editData.facility.hasMotor === true) chips.push("Motor");
      }
      setSelectedChips(chips);
  
      setPropertyDescription(editData?.description ?? "");
    }
  }, [isEditMode, editData]);
  
  // ...existing code...

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

  const fetchNearbyTransport = async (lat: number, lng: number) => {
    const types = [
      { type: "bus_station", label: "BUS STAND" },
      { type: "airport", label: "AIRPORT" },
      { type: "subway_station", label: "METRO" },
      { type: "train_station", label: "RAILWAY" },
    ];
    const info: Record<string, string> = {};
    for (const t of types) {
      try {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=${t.type
          }&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const dist =
            window.google.maps.geometry.spherical.computeDistanceBetween(
              new window.google.maps.LatLng(lat, lng),
              new window.google.maps.LatLng(
                data.results[0].geometry.location.lat,
                data.results[0].geometry.location.lng
              )
            );
          info[t.label] = `${(dist / 1000).toFixed(2)} KM`;
        } else {
          info[t.label] = "N/A";
        }
      } catch (error) {
        console.error(`Failed to fetch ${t.label}:`, error);

        info[t.label] = "N/A";
      }
    }
    // setNearbyTransport(info);
  };

  // Geocode function to get address from coordinates
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

  // Handle map click to place marker and update lat/lng inputs
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
      setErrors({ ...errors, address: "" });
    } catch (err) {
      console.error(err);
      setAddress("");
      setErrors({ ...errors, address: "Geocoder failed" });
    }

    fetchNearbyTransport(lat, lng);
  }, [errors]);

  // Validation function
  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    // Owner Information Validation
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!phone1.trim()) {
      newErrors.phone1 = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone1)) {
      newErrors.phone1 = "Please enter a 10-digit phone number";
    }

    if (!propertyType.trim())
      newErrors.propertyType = "Property type is required";
    if (!address.trim()) newErrors.address = "Address is required";

    if (!images.length) {
      newErrors.images = "Upload at least one image";
    }

    // if (!totalArea.trim() || isNaN(parseFloat(totalArea)))
    //   newErrors.totalArea = "Valid total area is required";

    // if (!selectedChips.length) {
    //   newErrors.selectedChips = "Select at least one occupancy restriction.";
    // }

    setErrors(newErrors);
    // setShowTopAlert(!isValid);

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Backdrop
    setEditable(false);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      setEditable(true);

      toast.error("Fill all required fields.", {
        autoClose: false,
      });

      return;
    }


    // Form is valid, proceed with submission
    const formState: PlotFormState = {
      propertyOwner: {
        firstName,
        lastName,
        contact: { phone1, email },
      },
      propertyType,
      title,
      plotType,
      facingDirection,
      rent: {
        rentAmount: Number(rentAmount) || 0,
        negotiable,
        advanceAmount: Number(advanceAmount) || 0,
        agreementTiming: leaseTenure,
      },
      lease: {
        leaseAmount: Number(leaseAmount) || 0,
        negotiable,
        leaseTenure,
      },
      sale: {
        saleAmount: Number(saleAmount) || 0,
        negotiable,
      },

      location: {
        address,
        landmark: "",
        map: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
        area: {
          totalArea: sanitizedTotalArea,
          length: sanitizedLength,
          width: sanitizedWidth,
          acre: Number(acre) || 0,
        },
      },
      images: images.map((img) => img.file),
      uploadedImages: images,
      totalFloors: Number(totalFloors) || 0,
      propertyFloor: Number(propertyFloor) || 0,
      acre: Number(acre),
      selectedChips,
      status: "Pending",
      description,
      hasWell: false,
      hasMotor: false,
      hasEBConnection: false,
      hasBorewell: false,
      isDeleted: false,
    };

    // Convert payload to object
    const payload = buildPayloadDynamic(formState);

    // Build FormData (for multipart/form-data)
    const formData = new FormData();

    const flatPayload = flattenObject(payload as unknown as PlainObject);

    Object.entries(flatPayload).forEach(([key, value]) => {
      if (key !== "images") {
        formData.append(key, value);
      }
    });

    //Append images with MIME type handling & debug logging
    const MAX_FILE_SIZE_MB = 5;

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
            toast.error(`${img.name} exceeds ${MAX_FILE_SIZE_MB}MB size limit.`);
          }
        } else {
          // console.warn(`Skipped invalid image: ${img.name}`);
          // toast.error(
          //   `Invalid file type: ${img.name}. Only JPEG, PNG, or WEBP allowed.`
          // );
        }
      } else if (typeof img.name === "string") {
        // Existing image URLs from edit mode, append them so backend knows to keep them
        formData.append("existingImages", img.name);
      }
    });

    try {
      const token = localStorage.getItem("token"); // Retrieve token

      const url = isEditMode
        ? `${import.meta.env.VITE_BackEndUrl}/api/plot/${editId}`
        : `${import.meta.env.VITE_BackEndUrl}/api/plot/create`;
      const method = isEditMode ? "put" : "post";
      const response = await axios[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, //  Add token here

        },
      });

      // Keep loading true until toast closes
      // So DO NOT setLoading(false) here immediately!

      toast.success(isEditMode ? "Property updated successfully!" : "Property created successfully!", {
        onClose: () => {
          setLoading(false);
          setEditable(true);


          // Navigate after loading hidden and editing enabled
          const plotId = response?.data?._id;
          if (plotId) {
            navigate(`/plot/view/${plotId}`);
          } else {
            navigate("/plot", {
              state: { data: response.data, showLoading: true },
            });
          }
        },
      });
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong!";
      console.error("Submission Error:", error);

      toast.error(`Failed to ${isEditMode ? "update" : "create"} property: ${errorMessage}`, {
        onClose: () => {
          setLoading(false);
          setEditable(false);
        },
      });
    }
    finally {
      setLoading(false); // <- Hide backdrop on error
    }
  };

  //TopOfCenter MUIAlertToast
  useEffect(() => {
    setShowTopInfo(true);
  }, [editData]);

  const isFormReadyToSubmit =
    firstName.trim() &&
    lastName.trim() &&
    phone1.trim() &&
    title.trim() &&
    address.trim() &&
    images.length > 0;
  // totalArea.trim();
  // selectedChips.length > 0

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
                  <DynamicBreadcrumbs
                  //  title={isEditMode ? "Update" : "Create"} 
                  />
                  {/* Rest of your page content */}
                </div>

                <ToastContainer
                />
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
                        disabled={!editable}
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
                        disabled={!editable}
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
                        disabled={!editable}
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
                  <div className="d-flex flex-d-row gap-3">
                    {/* Property Type */}
                    <div className="col-md-6 mb-3">
                      <label className="TextLabel" htmlFor="propertyType">
                        Property Type
                      </label>
                      <InputField
                        type="dropdown"
                        id="propertyType"
                        dropdownOptions={["Rent", "Lease", "Sale"]}
                        value={propertyType}
                        onChange={(e) =>
                          setPropertyType(e.target.value as PropertyType)
                        }
                      />
                    </div>

                    {/* Plot Type */}
                    <div className="col-md-6 mb-3">
                      <label className="TextLabel" htmlFor="plotType">
                        Plot Type
                      </label>
                      <InputField
                        type="dropdown"
                        id="plotType"
                        placeholder="None"
                        dropdownOptions={[
                          "Agriculture",
                          "Business Use",
                          "Commercial Use",
                          "Industrial Use",
                          "Personal Use",
                          "Parking",
                          "Shed/Storage",
                          "Poultry or Livestock",
                          "Events or Functions",
                          "Investment Purpose",
                          "Renewable Energy Projects",
                          "Timber/Tree Plantation",
                          "Nursery/Gardening Business",
                          "Telecom Towers",
                          "None",
                        ]}
                        value={plotType || "None"}
                        onChange={(e) =>
                          setPlotType(e.target.value as PlotType)
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* -------- Dynamic Inputs based on propertyType --------- */}
                {/* Rent/Lease/Sale Specific Fields */}
                {propertyType === "Rent" && (
                  <>
                    <div className="OwnerInputField row mb-3">
                      <div className=" d-flex flex-d-row gap-3">
                        <div className="col-md-6 mb-3">
                          <label className="TextLabel" htmlFor="rentAmount">
                            Rent Amount(₹)
                          </label>
                          <InputField
                            type="text"
                            id="rentAmount"
                            placeholder="Enter Amount in Rupees (₹)"
                            value={rentAmount}
                            onChange={(e) =>
                              // keep only digits, store as string
                              setRentAmount(e.target.value.replace(/[^\d]/g, ""))
                            } />
                        </div>
                        <div className="row">
                          <div className="col-12">
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
                      </div>

                      <div className="d-flex flex-d-row gap-3">
                        <div className="col-6 mb-3">
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
                        <div className="col-6 mb-3">
                          <label className="TextLabel" htmlFor="tenure">
                            Agreement Timings (Years){" "}
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
                    </div>
                  </>
                )}


                {propertyType === "Lease" && (
                  <>
                    <div className="OwnerInputField row mb-3">
                      <div className="d-flex flex-d-row gap-3">
                        <div className="col-md-6 mb-3">
                          <label className="TextLabel" htmlFor="leaseAmount">
                            Lease Amount(₹)
                          </label>
                          <InputField
                            type="text"
                            id="leaseAmount"
                            placeholder="Enter Amount in Rupees (₹)"
                            value={leaseAmount}
                            onChange={(e) =>
                              setLeaseAmount(e.target.value.replace(/[^\d]/g, ""))
                            }
                          />
                        </div>
                        <div className="row">
                          <div className="col-12">
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
                    <div className="OwnerInputField row mb-3">
                      <div className="d-flex flex-d-row gap-3">
                        <div className="col-md-6 mb-3">
                          <label className="TextLabel" htmlFor="saleAmount">
                            Sale Amount(₹)
                          </label>
                          <InputField
                            type="text"
                            id="saleAmount"
                            placeholder="Enter Amount in Rupees (₹)"
                            value={saleAmount}
                            onChange={(e) =>
                              setSaleAmount(e.target.value.replace(/[^\d]/g, ""))
                            }
                          />
                        </div>
                        <div className="row">
                          <div className="col-12">
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
                      </div>
                    </div>
                  </>
                )}
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
                                console.log('Plot Map Autocomplete triggered!');
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

                                  console.log('Plot Map - Place object:', place);
                                  console.log('Plot Map - Address components:', place.address_components);
                                  
                                  if (place.address_components) {
                                    const components = place.address_components;
                                    components.forEach((comp, idx) => {
                                      console.log(`Plot Map Component ${idx}:`, comp.long_name, comp.types);
                                    });
                                    
                                    const doorNo = components.find(c => c.types.includes('street_number'))?.long_name ||
                                                 components.find(c => c.types.includes('premise'))?.long_name || '';
                                    const street = components.find(c => c.types.includes('route'))?.long_name ||
                                                 components.find(c => c.types.includes('sublocality'))?.long_name || '';
                                    const city = components.find(c => c.types.includes('locality'))?.long_name ||
                                               components.find(c => c.types.includes('postal_town'))?.long_name ||
                                               components.find(c => c.types.includes('administrative_area_level_3'))?.long_name || '';
                                    const pincode = components.find(c => c.types.includes('postal_code'))?.long_name || '';
                                    
                                    console.log('Plot Map Parsed:', { doorNo, street, city, pincode });
                                    
                                    const addressParts = [doorNo, street, city, pincode].filter(Boolean);
                                    setAddress(addressParts.join(', ') || place.formatted_address || '');
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
                            zoom={15}
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
                            onPlaceChanged={() => {
                              console.log('Plot Address Autocomplete triggered!');
                              if (autocomplete) {
                                const place = autocomplete.getPlace();
                                const lat = place.geometry?.location?.lat();
                                const lng = place.geometry?.location?.lng();

                                console.log('Plot Address - Place object:', place);
                                console.log('Plot Address - Address components:', place.address_components);
                                
                                if (place.address_components) {
                                  const components = place.address_components;
                                  components.forEach((comp, idx) => {
                                    console.log(`Plot Address Component ${idx}:`, comp.long_name, comp.types);
                                  });
                                  
                                  const doorNo = components.find(c => c.types.includes('street_number'))?.long_name ||
                                               components.find(c => c.types.includes('premise'))?.long_name || '';
                                  const street = components.find(c => c.types.includes('route'))?.long_name ||
                                               components.find(c => c.types.includes('sublocality'))?.long_name || '';
                                  const city = components.find(c => c.types.includes('locality'))?.long_name ||
                                             components.find(c => c.types.includes('postal_town'))?.long_name ||
                                             components.find(c => c.types.includes('administrative_area_level_3'))?.long_name || '';
                                  const pincode = components.find(c => c.types.includes('postal_code'))?.long_name || '';
                                  
                                  console.log('Plot Address Parsed:', { doorNo, street, city, pincode });
                                  
                                  const addressParts = [doorNo, street, city, pincode].filter(Boolean);
                                  // If we only have city and pincode, use formatted_address instead
                                  if (addressParts.length <= 2 && !doorNo && !street) {
                                    setAddress(place.formatted_address || addressParts.join(', '));
                                  } else {
                                    setAddress(addressParts.join(', '));
                                  }
                                } else {
                                  setAddress(place.formatted_address || "");
                                }
                                if (lat && lng) {
                                  setLatitude(lat.toFixed(6));
                                  setLongitude(lng.toFixed(6));
                                  setMarkerPosition({ lat, lng });
                                  fetchNearbyTransport(lat, lng); // optional if you use this
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
                                disabled={!editable}
                              />
                            </div>
                          </Autocomplete>
                        ) : (
                          <p>Loading autocomplete...</p>
                        )}
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
                      <div key={index} className="choosedImages position-relative">
                        <img src={img.name} alt={`preview-${index}`} className="preview-img" style={{ cursor: 'pointer' }}
                          onClick={() => setPreviewImage(img.name)} />
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


              { /* <div>
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

                    // {/* Upload Button and Text 
                    <div
                      className={`BtnFrame d-flex mt-3 mb-2 align-items-start gap-3 ${
                        images.length > 0 ? "with-gap" : ""
                      }`}
                    >
                      <p className="image-p">
                    //     {propertyImages
                     //     ? propertyImages.name : "No image chosen"} 
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

                          const newFiles = Array.from(e.target.files);
                          const remainingSlots = 12 - images.length;

                          const validImages: UploadedImage[] = newFiles
                            .filter((file) => {
                              const isValid = file.type.startsWith("image/");
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
                              uploadedAt: new Date(),
                              imageSize: file.size,
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
              </section>

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
                    // error={!!errors.totalArea}
                    // helperText={errors.totalArea}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="builtUpArea">
                      Facing
                    </label>
                    <InputField
                      type="dropdown"
                      id="facingDirection"
                      placeholder="None"
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
                      onChange={(e) =>
                        setFacingDirection(e.target.value as FacingDirection)
                      }
                    />
                  </div>
                  <div className="d-flex flex-wrap flex-md-nowrap gap-3">
                    <div className="col-12 col-md-6 mb-3">
                      <label className="TextLabel" htmlFor="totalFloors">
                        Length
                      </label>
                      <InputField
                        type="text"
                        id="length"
                        placeholder="Enter Length (Ft)"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        error={!!errors.length}
                        helperText={errors.length}
                        disabled={!editable}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label className="TextLabel" htmlFor="propertyOnFloor">
                        Width
                      </label>
                      <InputField
                        type="text"
                        id="width"
                        placeholder="Enter Width (Ft)"
                        value={width}       // use width state
                        onChange={(e) => setWidth(e.target.value)}  // update width state
                        error={!!errors.width}
                        helperText={errors.width}
                        disabled={!editable}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="propertyOnFloor">
                      Acre
                    </label>
                    <InputField
                      type="text"
                      id="acre"
                      placeholder="Enter Length (Ft)"
                      value={acre}
                      onChange={(e) => setAcre(e.target.value)}
                      error={!!errors.acre}
                      helperText={errors.acre}
                      disabled={!editable}
                    />
                  </div>
                </div>
              </section>

              <section className="ownerFacilitiess mb-4">
                <div className="ownerTitle">
                  <h6>Facilities Provided</h6>
                  <p>Specify the amenities and utilities available in the plot</p>
                </div>

                <div className="chipField">
                  <div className="d-flex flex-wrap gap-3">
                    <InputField
                      type="chip"
                      label="Well"
                      icon={
                        <Avatar
                          alt="Well"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/material-symbols_water-full-outline.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) =>
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        )
                      }
                    />
                    <InputField
                      type="chip"
                      label="Bore Well"
                      icon={
                        <Avatar
                          alt="Bore Well"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/fa6-solid_bore-hole.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) =>
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        )
                      }
                    />
                    <InputField
                      type="chip"
                      label="EB Connection"
                      icon={
                        <Avatar
                          alt="EB Connection"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/mage_electricity.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) =>
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        )
                      }
                    />
                    <InputField
                      type="chip"
                      label="Motor"
                      icon={
                        <Avatar
                          alt="Motor"
                          src={`${import.meta.env.VITE_BASE_URL}/createProperty/tabler_stairs.svg`}
                          className="avatarImg"
                        />
                      }
                      selectedChips={selectedChips}
                      onChipToggle={(label) =>
                        setSelectedChips((prev) =>
                          prev.includes(label)
                            ? prev.filter((chip) => chip !== label)
                            : [...prev, label]
                        )
                      }
                    />
                  </div>
                </div>
              </section>
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
                    disabled={!editable}
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
                      label={loading ? "Saving..." : isEditMode ? "Update Property" : "Create New Property"}
                      icon={loading ? <CircularProgress size={16} color="inherit" /> : <DoneIcon />}
                      className="createNP btn btn-primary"
                      type="submit"
                      disabled={loading}

                    // onClick={() => navigate("/createCommercial", { state: { mode: "create" } })}
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

export default CreatePlotProperty;