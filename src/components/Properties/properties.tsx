import { useState } from "react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputField } from "../Common/input"; // Assuming InputField supports error props
import GenericButton from "../Common/Button/button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Avatar } from "@mui/material";
import "./createProperties/createProperty.scss";
import { DynamicBreadcrumbs } from "../Common/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AxiosError } from "axios";
import type { ResidentialProperty, ResidentialFormState, UploadedImage, PlainObject} from "./createProperties/createProperty.model";



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
      //@ts-ignore
      current = current[key];
    }
  });
}

// Build payload dynamically based on form state
function buildPayloadDynamic(formState: ResidentialFormState): ResidentialProperty {

  const payload: Partial<ResidentialProperty> = {};

  setNested(payload, "owner.firstName", formState.firstName.trim());
  setNested(payload, "owner.lastName", formState.lastName.trim());
  setNested(payload, "owner.contact.phone1", formState.phone1.trim());
  setNested(payload, "owner.contact.email", formState.email.trim());
  setNested(payload, "owner.contact.getUpdates", false);

  setNested(payload, "propertyType", formState.propertyType);
  setNested(payload, "rent.rentAmount", parseFloat(formState.rent));
  setNested(payload, "rent.negotiable", true);
  setNested(payload, "rent.advanceAmount", parseFloat(formState.advanceAmount));

  setNested(payload, "location.landmark", "Near Green Park");
  if (formState.latitude)
    setNested(payload, "location.map.latitude", parseFloat(formState.latitude));
  if (formState.longitude)
    setNested(
      payload,
      "location.map.longitude",
      parseFloat(formState.longitude)
    );
  setNested(payload, "location.address", formState.address);

  setNested(payload, "area.totalArea", `${formState.totalArea} sqft`);
  setNested(payload, "area.length", "50 ft");
  setNested(payload, "area.width", "30 ft");

  // Add other fields similarly
  setNested(
    payload,
    "images",
    (formState.images as UploadedImage[]).map((file) => file.url)
  );
  setNested(payload, "title", formState.title);
  setNested(payload, "residentialType", formState.residentialType);
  setNested(payload, "facingDirection", formState.facingDirection);
  setNested(payload, "rooms", formState.rooms);
  setNested(payload, "totalFloors", formState.totalFloors ? parseInt(formState.totalFloors) : 0);
  setNested(payload, "propertyFloor", formState.propertyFloor ? parseInt(formState.propertyFloor) : 0);
  setNested(payload, "furnishingType", formState.furnishingType);
  setNested(payload, "description", formState.description);
  //@ts-ignore
  return payload;
}


export const CreateProperty = () => {
  // State for form data
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone1, setPhone1] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [title, setTitle] = useState("");
  const [rent, setRent] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [leaseTenure, setLeaseTenure] = useState("");
  const [residentialType, setResidentialType] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]); // For file upload
  const [totalArea, setTotalArea] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [facingDirection, setfacingDirection] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [propertyFloor, setPropertyFloor] = useState("");
  const [furnishingType, setFurnishingType] = useState("");
  const [rooms, setRoomCount] = useState("");
  const [description, setPropertyDescription] = useState("");
  const [legalDocuments, setLegalDocsAvailable] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const location = useLocation();
  console.log("propertyData%%%%%%%", location);

  // Validation errors state
  interface Errors {
    [key: string]: string;
  }

  const [errors, setErrors] = useState<Errors>({});

  // Validation function
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    // Owner Information Validation
    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required.";
      isValid = false;
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }
    // if (!ephone.trim()) {
    //   newErrors.phone = "Phone Number is required.";
    //   isValid = false;
    // } else if (!/^\d{10}$/.test(phone)) {
    //   newErrors.phone = "Phone number must be 10 digits.";
    //   isValid = false;
    // }

    // Property Overview Validation
    if (!propertyType) {
      newErrors.propertyType = "Property Type is required.";
      isValid = false;
    }
    if (!title.trim()) {
      newErrors.title = "Property Title is required.";
      isValid = false;
    }
    if (!rent.trim()) {
      newErrors.rent = "Monthly Rent is required.";
      isValid = false;
    } else if (isNaN(parseFloat(rent)) || parseFloat(rent) <= 0) {
      newErrors.rent = "Monthly Rent must be a positive number.";
      isValid = false;
    }
    if (!advanceAmount.trim()) {
      newErrors.advanceDeposit = "Advance Deposit is required.";
      isValid = false;
    } else if (
      isNaN(parseFloat(advanceAmount)) ||
      parseFloat(advanceAmount) < 0
    ) {
      newErrors.advanceAmount =
        "Advance Deposit must be a non-negative number.";
      isValid = false;
    }
    if (!leaseTenure.trim()) {
      newErrors.leaseTenure = "Tenure is required.";
      isValid = false;
    } else if (isNaN(parseFloat(leaseTenure)) || parseInt(leaseTenure) <= 0) {
      newErrors.leaseTenure = "Tenure must be a positive number of years.";
      isValid = false;
    }
    if (!residentialType) {
      newErrors.residentialType = "Property Category is required.";
      isValid = false;
    }

    // Location & Address Validation
    // For property images, check if a file has been selected (simplified for now)
    if (!images) {
      newErrors.propertyImages = "At least one property image is required.";
      isValid = false;
    }
    // You might want to validate address, latitude, and longitude if they are crucial
    // For example:
    // if (!address.trim()) {
    //   newErrors.address = "Full Address is required.";
    //   isValid = false;
    // }
    // if (!latitude.trim() || isNaN(latitude)) {
    //   newErrors.latitude = "Valid Latitude is required.";
    //   isValid = false;
    // }
    // if (!longitude.trim() || isNaN(longitude)) {
    //   newErrors.longitude = "Valid Longitude is required.";
    //   isValid = false;
    // }

    // Property Layout Validation
    if (!totalArea.trim()) {
      newErrors.totalArea = "Total Area is required.";
      isValid = false;
    } else {
      const totalAreaNum = parseFloat(totalArea);
      if (isNaN(totalAreaNum) || totalAreaNum <= 0) {
        newErrors.totalArea = "Total Area must be a positive number.";
        isValid = false;
      }
    }

    if (!builtUpArea.trim()) {
      newErrors.builtUpArea = "Built Up Area is required.";
      isValid = false;
    } else {
      const builtUpAreaNum = parseFloat(builtUpArea);
      if (isNaN(builtUpAreaNum) || parseFloat(builtUpArea) <= 0) {
        newErrors.builtUpArea = "Built Up Area must be a positive number.";
        isValid = false;
      }
    }

    if (!carpetArea.trim()) {
      newErrors.carpetArea = "Carpet Area is required.";
      isValid = false;
    } else {
      const carpetAreaNum = parseFloat(carpetArea);
      if (isNaN(carpetAreaNum) || parseFloat(carpetArea) <= 0) {
        newErrors.carpetArea = "Carpet Area must be a positive number.";
        isValid = false;
      }
    }

    // Facing can be optional or have specific valid values if it's a text input
    // if (!facing) {
    //     newErrors.facing = "Facing direction is required.";
    //     isValid = false;
    // }
    // if (!totalFloors.trim()) {
    //   newErrors.totalFloors = "Total Floors is required.";
    //   isValid = false;
    // } else {
    //   const totalFloorsNum = parseFloat(totalFloors);
    //   if (isNaN(totalFloorsNum) || parseInt(totalFloors) < 0) {
    //     newErrors.totalFloors = "Total Floors must be a non-negative integer.";
    //     isValid = false;
    //   }
    // }

    // if (!propertyFloor.trim()) {
    //   newErrors.propertyFloor = "Property on Floor is required.";
    //   isValid = false;
    // } else {
    //   const propertyFloorNum = parseFloat(propertyFloor);
    //   if (isNaN(propertyFloorNum) || parseInt(propertyFloor) < 0) {
    //     newErrors.propertyFloor =
    //       "Property on Floor must be a non-negative integer.";
    //     isValid = false;
    //   }
    // }

    // Furnished type could have validation for specific options if it's a dropdown/radio
    // if (!furnishingType) {
    //     newErrors.furnishingType = "Furnished Type is required.";
    //     isValid = false;
    // }

    if (!phone1.trim()) {
      newErrors.phone1 = "Phone Number is required.";
      isValid = false;
    }

    if (!rooms.trim()) {
      newErrors.rooms = "Carpet Area is required.";
      isValid = false;
    } else {
      const roomsNum = parseFloat(rooms);
      if (isNaN(roomsNum) || parseFloat(rooms) <= 0) {
        newErrors.rooms = "Room Count must be a positive integer.";
        isValid = false;
      }
    }

    // Additional Information Validation (Property Description is optional, but you could add max length)
    // if (description.length > 500) {
    //   newErrors.description = "Description cannot exceed 500 characters.";
    //   isValid = false;
    // }

    // Legal Documents Validation
    // if (!legalDocuments) {
    //   newErrors.legalDocuments =
    //     "Legal Documents availability is required.";
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  // Run logic once when the component mounts - useEffect
  // Remember if you've already run the logic - useRef
  const hasFetched = useRef(false);

  // useEffect(() => {
  //   if (hasFetched.current) return;
  //   hasFetched.current = true;

  //   fetch(`${import.meta.env.VITE_FRONTEND}/api/residential`)
  //     .then((res) => res.json())
  //     .then((data) => console.log("Fetched:", data)) // Already fetched? Exit.
  //     .catch((err) => console.error("Error:", err)); // Mark as fetched.
  // }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const isValid = validateForm();

    if (isValid) {
      // Form is valid, proceed with submission
      const formState = {
        firstName,
        lastName,
        email,
        phone1,
        propertyType,
        title,
        rent,
        advanceAmount,
        leaseTenure,
        residentialType,
        address,
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
        legalDocuments,
      };

      const payload = buildPayloadDynamic(formState);

      console.log("Payload being sent to backend:", payload);

      try {
        // Send POST request
        const response = await axios.post(
          `${import.meta.env.VITE_BackEndUrl}/api/residential/create`,
          payload
        );

        toast.success("Property created successfully!");

        // TODO: Send data to backend
        // Redirect after a short delay (so toast is visible)
        setTimeout(() => {
          navigate("/", {
            state: { data: response.data },
          });
        }, 2000);
      } catch (err) {
        const error = err as AxiosError<{ message?: string; error?: string }>;

        console.error("Submission error:", error.response || error);

        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Something went wrong!";

        toast.error(`Failed to create property: ${errorMessage}`);
      }
    } else {
      console.log("Form has validation errors.");
      toast.error("Please correct the highlighted errors before submitting.");
    }
  };
  //clear All Errors

  return (
    <form onSubmit={handleSubmit}>
      <div className="createProperty container row">
        <div className="col-12 col-md-3">{/* Sidebar placeholder */}</div>
        <div className="col-12">
          <div className="container-fluid px-3 px-md-5">
            <div className="ContentArea container">
              {/* Breadcrumb */}
              <div className="muiBreadcrumbs">
                <DynamicBreadcrumbs />
                {/* Rest of your page content */}
              </div>
              {/* Owner Information Section */}
              <section className="OwnerDetails mb-4">
                <div className="ownerTitle">
                  <h6>Owner Information</h6>
                  <p>Enter the contact details of the property owner</p>
                </div>

                <div className="ownerInputField container row mb-3 p-0">
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
                        Email <span className="star">*</span>
                      </label>
                      <InputField
                        type="email"
                        id="ownerEmail"
                        placeholder="Enter Owner’s Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
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

                <div className="OwnerInputField row mb-3">
                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      <label className="TextLabel" htmlFor="propertyType">
                        Property Type <span className="star">*</span>
                      </label>
                      <InputField
                        type="dropdown"
                        id="propertyType"
                        dropdownOptions={["Select", "Rent", "Lease", "Sale"]}
                        value={propertyType || "Select"}
                        onChange={(e) => setPropertyType(e.target.value)}
                        error={!!errors.propertyType}
                        helperText={errors.propertyType}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
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
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      <label className="TextLabel" htmlFor="monthlyRent">
                        Monthly Rent (₹) <span className="star">*</span>
                      </label>
                      <InputField
                        type="text"
                        id="monthlyRent"
                        placeholder="Enter Amount in Rupees (₹)"
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                        error={!!errors.rent}
                        helperText={errors.rent}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-3">
                      <label className="TextLabel" htmlFor="advanceDeposit">
                        Advance Deposit (₹) <span className="star">*</span>
                      </label>
                      <InputField
                        type="text"
                        id="advanceDeposit"
                        placeholder="Enter Deposit"
                        value={advanceAmount}
                        onChange={(e) => setAdvanceAmount(e.target.value)}
                        error={!!errors.advanceDeposit}
                        helperText={errors.advanceAmount}
                      />
                    </div>
                    <div className="col-12 col-md-3 mb-3">
                      <label className="TextLabel" htmlFor="tenure">
                        Tenure (Years) <span className="star">*</span>
                      </label>
                      <InputField
                        type="text"
                        id="tenure"
                        placeholder="Enter Tenure in Years"
                        value={leaseTenure}
                        onChange={(e) => setLeaseTenure(e.target.value)}
                        error={!!errors.leaseTenure}
                        helperText={errors.leaseTenure}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <label className="TextLabel" htmlFor="propertyCategory">
                        Property Category <span className="star">*</span>
                      </label>
                      <div className="d-flex flex-wrap gap-3">
                        <InputField
                          type="radio"
                          radioOptions={["House", "Apartment", "Villa"]}
                          id="propertyCategory"
                          value={residentialType || "House"}
                          onChange={(e) => setResidentialType(e.target.value)}
                          error={!!errors.propertyCategory}
                          helperText={errors.propertyCategory}
                        />
                      </div>
                    </div>
                  </div>
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
                    <div
                      className="Map ratio-16x9"
                      style={{
                        width: "100%",
                        height: "360px",
                        gap: "16px",
                        borderRadius: "6px",
                        borderWidth: "1px",
                        padding: "8px",
                        borderStyle: "solid",
                        borderColor: "#D3DDE7",
                      }}
                    >
                      <iframe
                        title="property-location-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31108.98652428826!2d78.80635493583208!3d11.241996832614563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf6bc93dc3bc9%3A0xe3637b7e3eabedb2!2sSumisa%20Technologies!5e0!3m2!1sen!2sin!4v1686162920212!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                    <div className="ResidentialCategory mt-3">
                      <p>
                        Upload Property Images <span className="star">*</span>
                      </p>

                      <div className="BtnFrame d-flex mt-3 mb-2 align-items-start gap-3">
                        <p className="image-p">
                          {/* {propertyImages
                          ? propertyImages.name : "No image chosen"} */}
                          {images && images.length > 0
                            ? `${images.length} image(s) selected`
                            : "No image chosen"}
                        </p>
                        <input
                          type="file"
                          id="propertyImageUpload"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            if (e.target.files) {
                              const files = Array.from(e.target.files);
                              const uploaded = files.map((file) => ({
                                file,
                                url: URL.createObjectURL(file),
                              }));
                              setImages(uploaded);

                              // setImages(Array.from(e.target.files)); // Save all selected files as array
                            }
                          }}
                          accept="image/*"
                          multiple // Enable multi-selection

                          // setPropertyImages(e.target.files[0])}
                          // accept="image/*"
                        />
                        <Button
                          variant="contained"
                          startIcon={<FileUploadOutlinedIcon />}
                          id="Choosebtn"
                          onClick={() =>
                            document
                              .getElementById("propertyImageUpload")
                              ?.click()
                          }
                        >
                          Choose image
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label className="TextLabel" htmlFor="address">
                          Full Address
                        </label>
                        <InputField
                          type="text"
                          id="address"
                          placeholder="Enter Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          // Add error handling if address is mandatory
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

                    <div className="informationCard">
                      <label htmlFor="" className="labelName">
                        Nearby Transportation
                      </label>

                      <div className="container">
                        <div className="row">
                          <div className="col-6 col-md-6 mb-3">
                            <div className="transportCard d-flex gap-2">
                              <img
                                src="/src/assets/createProperty/Icon_Bus.svg"
                                alt="Bus"
                              />
                              <div>
                                <span className="transportInfoText">
                                  Bus Stand
                                  <br />- Kms
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-md-6 mb-3">
                            <div className="transportCard d-flex gap-2">
                              <img
                                src="/src/assets/createProperty/ph_airplane-in-flight.svg"
                                alt="Airport"
                              />
                              <div>
                                <span className="transportInfoText">
                                  Airport
                                  <br />- Kms
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-6 col-md-6 mb-3">
                            <div className="transportCard d-flex gap-2">
                              <img
                                src="/src/assets/createProperty/hugeicons_metro.svg"
                                alt="Metro"
                              />
                              <div>
                                <span className="transportInfoText">
                                  Metro
                                  <br />- Kms
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-md-6 mb-3">
                            <div className="transportCard d-flex gap-2">
                              <img
                                src="/src/assets/createProperty/material-symbols-light_train-outline.svg"
                                alt="Railway"
                              />
                              <div>
                                <span className="transportInfoText">
                                  Railway
                                  <br />- Kms
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Property Layout Section */}
              <section className="PropertyLayoutDetails mb-4">
                <div className="ownerTitle">
                  <h6>Property Dimensions & Layout</h6>
                  <p>Enter the size and structure of the property</p>
                </div>

                <div className="OwnerDetailTextField mt-3 row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="totalArea">
                      Total Area <span className="star">*</span>
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
                      Built Up Area <span className="star">*</span>
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
                      Carpet Area <span className="star">*</span>
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
                        "South",
                        "East",
                        "West",
                        "Select Direction Facing",
                      ]}
                      value={facingDirection || "Select Direction Facing"}
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
                      type="text" // Assuming this will become a dropdown or radio
                      id="furnishedType"
                      placeholder="Select Furnished Type"
                      value={furnishingType}
                      onChange={(e) => setFurnishingType(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="roomCount">
                      Rooms <span className="star">*</span>
                    </label>
                    <InputField
                      type="text"
                      id="roomCount"
                      placeholder="Number of Rooms"
                      value={rooms}
                      onChange={(e) => setRoomCount(e.target.value)}
                      error={!!errors.rooms}
                      helperText={errors.rooms}
                    />
                  </div>
                </div>
              </section>

              {/* Amenities Section - No direct validation needed unless you have min/max selections */}
              <section className="container AmenitiesSection mb-4">
                <div className="ownerTitle mb-3">
                  <h6>Nearby Services & Essentials</h6>
                  <p>
                    Select the important places or services available near this
                    property
                  </p>
                </div>

                <div className="chipField row g-3">
                  <div
                    className="chipcard d-flex gap-4 col-6 col-md-3 mb-3"
                    style={{ padding: "31px" }}
                  >
                    <InputField
                      className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex"
                      type="chip"
                      label="Separate Electricity Billing"
                      icon={
                        <Avatar
                          alt="Separate Electricity Billing"
                          src="/src/assets/createProperty/mage_electricity.svg"
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
                      className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex"
                      type="chip"
                      label="Public Park"
                      icon={
                        <Avatar
                          alt="Public Park"
                          src="/src/assets/createProperty/material-symbols_park-outline-rounded.svg"
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
                      className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex"
                      type="chip"
                      label="Gym"
                      icon={
                        <Avatar
                          alt="Gym"
                          src="/src/assets/createProperty/hugeicons_equipment-gym-03.svg"
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
                      className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex"
                      type="chip"
                      label="Movie Theater"
                      icon={
                        <Avatar
                          alt="Movie Theater"
                          src="/src/assets/createProperty/mingcute_movie-line.svg"
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
                      className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex"
                      type="chip"
                      label="Shopping Mall"
                      icon={
                        <Avatar
                          alt="Shopping Mall"
                          src="/src/assets/createProperty/material-symbols_local-mall-outline.svg"
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

                <div className="chipField row">
                  <div
                    className="chipcard d-flex gap-4 col-6 col-md-3 mb-3"
                    style={{ padding: "31px" }}
                  >
                    <InputField
                      type="chip"
                      label="Lift Access"
                      icon={
                        <Avatar
                          alt="Lift Access"
                          src="/src/assets/createProperty/Icon_Lift.svg"
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
                      label="Ramp Access"
                      icon={
                        <Avatar
                          alt="Ramp Access"
                          src="/src/assets/createProperty/guidance_ramp-up.svg"
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
                      label="Only via Stairs"
                      icon={
                        <Avatar
                          alt="Only via Stairs"
                          src="/src/assets/createProperty/tabler_stairs.svg"
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
                  <div className="chipcard " style={{ padding: "31px" }}>
                    <div className="firstRow d-flex gap-4">
                      <InputField
                        type="chip"
                        label="Regular Maintenance Included"
                        icon={
                          <Avatar
                            alt="Regular Maintenance Included"
                            src="/src/assets/createProperty/Icon_Cleaning.svg"
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
                        label="Water Supply Available"
                        icon={
                          <Avatar
                            alt="Water Supply Available"
                            src="/src/assets/createProperty/material-symbols_water-full-outline.svg"
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
                        label="Good Road Access"
                        icon={
                          <Avatar
                            alt="Good Road Access"
                            src="/src/assets/createProperty/Icon_Road.svg"
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
                        label="Sewage Connection Available"
                        icon={
                          <Avatar
                            alt="Sewage Connection Available"
                            src="/src/assets/createProperty/Icon_restroom.svg"
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
                        label="Dedicated Parking Available"
                        icon={
                          <Avatar
                            alt="Dedicated Parking Available"
                            src="/src/assets/createProperty/Icon_Parking.svg"
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
                        label="Private Balcony Included"
                        icon={
                          <Avatar
                            alt="Private Balcony Included"
                            src="/src/assets/createProperty/Icon_Balcony.svg"
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

              {/* Restrictions Section - No direct validation needed */}
              <section className="RestrictionsSection mb-4">
                <div className="ownerTitle">
                  <h6>
                    Occupancy Restrictions <span className="star">*</span>
                  </h6>
                  <p>
                    Select any rules about who can stay or live in this property
                  </p>
                </div>

                <div className="chipField row">
                  <div
                    className="chipcard d-flex gap-4 col-6 col-md-3 mb-3"
                    style={{ padding: "31px" }}
                  >
                    <InputField
                      type="chip"
                      label="Guests Not Allowed"
                      icon={
                        <Avatar
                          alt="Guests Not Allowed"
                          src="/src/assets/createProperty/solar_user-linear.svg"
                          className="avatarImg"
                          sx={{ width: 18, height: 18 }}
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
                      label="No Pets Allowed"
                      icon={
                        <Avatar
                          alt="No Pets Allowed"
                          src="/src/assets/createProperty/streamline_pets-allowed.svg"
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
                      label="No Bachelors Allowed"
                      icon={
                        <Avatar
                          alt="No Bachelors Allowed"
                          src="/src/assets/createProperty/Icon_Lift (1).svg"
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

              {/* Additional Information Section */}
              <section className="AdditionalInfoSection mb-4">
                <div className="ownerTitle">
                  <h6>Additional Information</h6>
                  <p>Provide any other relevant details about the property </p>
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

              {/* Legal Documents Section */}
              <section className="LegalDocsSection mb-4">
                <div className="ownerTitle">
                  <h6>Legal Documentation</h6>
                  <p>
                    Specify whether the property has legal paperwork available
                  </p>
                </div>
              </section>

              <div className="col-12">
                <label className="TextLabel" htmlFor="legalDocsAvailable">
                  Are Legal Documents Available? <span className="star">*</span>
                </label>
                <div className="d-flex flex-wrap gap-3">
                  <InputField
                    type="radio"
                    radioOptions={["Yes", "No"]} // Corrected "NO" to "No" for consistency
                    id="legalDocsAvailable"
                    value={legalDocuments || "Yes"}
                    onChange={(e) => setLegalDocsAvailable(e.target.value)}
                    // error={!!errors.legalDocuments}
                    // helperText={errors.legalDocuments}
                  />
                </div>
              </div>

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
                    // Implement discard logic here, e.g., reset all states
                    window.location.reload(); // Simple reload for demonstration
                  }}
                />
                <div>
                  {/* Your form and other JSX */}
                  <GenericButton
                    label="Create New Property"
                    icon={<DoneIcon />}
                    className="createNP btn btn-primary"
                    type="submit"
                    // onClick={() => navigate("/createResidential", { state: { mode: "create" } })}
                  />

                  {/* This must be rendered */}
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProperty;
