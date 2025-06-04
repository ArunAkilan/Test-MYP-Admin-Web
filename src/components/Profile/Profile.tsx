import React, { useState } from "react";
import locateMe from "../../../public/mingcute_location-line.svg";
import "./profile.scss";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import GenericButton from "../Common/Button/button";
import "./Profile.model";
import axios from "axios";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { InputField } from "../Residential/Create_Residential/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadImageField from "../Common/UploadButton/UploadButton";
import type { FormDataInterface } from "./Profile.model";

const GOOGLE_MAPS_API_KEY = "AIzaSyBkd62F4-RAtFP8w4rNd0qeQfycp1vokpo";

const defaultCenter = {
  lat: 11.2342,
  lng: 78.8688,
};

const Profile: React.FC = () => {
  const [imageData, setImageData] = useState<File | null>(null);
  const imageSrc =
    typeof imageData === "string"
      ? imageData
      : imageData instanceof File
      ? URL.createObjectURL(imageData)
      : undefined;
  const [formData, setFormData] = useState<FormDataInterface>({
    firstName: "",
    lastName: "",
    phone: "",
    secondaryPhone: "",
    email: "",
    bio: "",
    address: "",
    gender: "",
    longitude: null,
    latitude: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [location, setLocation] = useState(defaultCenter);

  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const saveChanges = async () => {
    const profileInformation1 = {
      profileInformation: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
      },
      contactInformation: {
        email: formData.email,
        primaryPhone: formData.phone,
        secondaryPhone: formData.secondaryPhone,
      },
      location: {
        map: {
          longitude: formData.longitude,
          latitude: formData.latitude,
        },
        address: formData.address,
      },
      profilePicture: imageData?.name || "",
      role: "User",
      description: formData.bio,
    };

    try {
      const response = await axios.post(
        "http://192.168.1.70:3001/api/profile/create",
        profileInformation1
      );
      console.log("User added:", response.data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setLocation({ lat, lng });
       setFormData(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
    }
    
  };
  

  console.log(imageData, "image");

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";

    const lon = formData.longitude;
    console.log("lon", lon);

    const lat = formData.latitude;

    if (lon === null || lon.toString().trim() === "") {
      newErrors.longitude = "Longitude is required";
    } else if (isNaN(lon)) {
      newErrors.longitude = "Longitude must be a number";
    }

    if (lat === null || lat.toString().trim() === "") {
      newErrors.latitude = "Latitude is required";
    } else if (isNaN(lat)) {
      newErrors.latitude = "Latitude must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Collected Form Data:", formData);
      toast.success("Profile updated successfully!");
      saveChanges();
      // Reset form fields to empty values
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        secondaryPhone: "",
        email: "",
        bio: "",
        address: "",
        gender: "",
        longitude: null,
        latitude: null,
      });

      setErrors({});
    } else {
      toast.error("Please Fill All Required Info");
    }
  };

const handleLocateMe = () => {
 if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation({lat,lng});

        setFormData( prev => ({
          ...prev,
          latitude : lat,
          longitude : lng
        }));
      },
      (error) => {
        toast.error("failed to get your location");
        console.error(error);
      }
    );
  } else {
    toast.error("geolocation is not supported by the browser.");
  }
};

  return (
    <div className="container profile-wrapper py-4">
      <div className="row">
        <div className="col-12 col-md-4 mb-4 account-manage">
          <h3>Account Management</h3>
          {/* <img
            src={imageData ? imageData : profilePicture}
            className="img-fluid profile-img"
            alt="profile"
          /> */}
          {imageSrc && (
            <img
              src={imageSrc}
              className="img-fluid profile-img"
              alt="profile"
            />
          )}
          <ToastContainer position="top-right" autoClose={3000} />
          <div className="edit-view d-flex flex-column gap-2 mt-3">
            <div className="profile-button-div">
              <UploadImageField setImageData={setImageData} />
            </div>
            <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2">
              <img src="ICON_Eye.svg" alt="view" /> Preview My public Profile
            </button>
          </div>
        </div>
        <div></div>

        <div className="col-12 col-md-8 profileinfo-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="profile-info profile-cmn mb-4">
              <h3>Profile Information</h3>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>
                    First Name <span className="star">*</span>
                  </label>
                  <InputField
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>
                    Last Name <span className="star">*</span>
                  </label>
                  <InputField
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </div>
              </div>
            </div>

            <div className="gender profile-cmn mb-4">
              <label htmlFor="gender">Gender</label>
              <InputField
                type="dropdown"
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                dropdownOptions={["Male", "Female", "Others"]}
                Selected="Select Gender"
              />
            </div>

            <div className="contact-info profile-cmn mb-4">
              <h3>Contact Information</h3>
              <label>Email</label>
              <InputField
                type="text"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
              />

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>
                    Primary Phone Number <span className="star">*</span>
                  </label>
                  <InputField
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Secondary Phone Number</label>
                  <InputField
                    type="text"
                    name="secondaryPhone"
                    placeholder="Optional"
                    value={formData.secondaryPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="about-user profile-cmn mb-4">
              <h3>About Me</h3>
              <label>Short Bio</label>
              <InputField
                name="bio"
                type="textarea"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <div className="location profile-cmn mb-4">
              <h3>Location & Address</h3>
              <div className="d-flex flex-column flex-md-row gap-4">
                <div className="map-detail">
                  <div>
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "300px" }}
                      center={defaultCenter}
                      zoom={10}
                      onClick={handleMapClick}
                    >
                      <Marker position={location} />
                    </GoogleMap>
                  </div>

                  <span className="d-block mt-2">
                    Vadakku mathavi road, Perambalur
                  </span>
                  <span
                    className="text-primary d-flex align-items-center gap-1 mt-1"
                    style={{ cursor: "pointer" }}
                    onClick={handleLocateMe}
                  >
                    <img src={locateMe} alt="Locate" /> Locate me
                  </span>
                </div>
                <div className="w-100">
                  <label>Address</label>
                  <InputField
                    type="text"
                    name="address"
                    placeholder="Your address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <label>
                    Longitude <span className="star">*</span>
                  </label>
                  <InputField
                    type="text"
                    name="longitude"
                 
                    value={
                      formData.longitude != null
                        ? formData.longitude.toString()
                        : ""
                    }
                    onChange={handleChange}
                    placeholder="Longitude"
                    error={!!errors.longitude}
                    helperText={errors.longitude}
                  />
                  <label>
                    Latitude <span className="star">*</span>
                  </label>
                  <InputField
                    type="text"
                    name="latitude"
              
                    value={
                      formData.latitude != null
                        ? formData.latitude.toString()
                        : ""
                    }
                    onChange={handleChange}
                    placeholder="Latitude"
                    error={!!errors.latitude}
                    helperText={errors.latitude}
                  />
                </div>
              </div>
            </div>

            <div className="login-otherway profile-cmn mb-4">
              <h3>Other Ways to Login</h3>
              <div className="d-flex justify-content-between align-items-center mb-3 google">
                <p className="d-flex align-items-center gap-2">
                  <img src="LOGO_Google.svg" alt="Google" /> Google
                </p>
                <div className="connect d-flex align-items-center gap-2">
                  <p className="mb-0">Not Connected</p>
                  <button className="btn btn-outline-primary">Link</button>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center facebook">
                <p className="d-flex align-items-center gap-2">
                  <img src="LOGO_FB.svg" alt="Facebook" /> Facebook
                </p>
                <div className="connect d-flex align-items-center gap-2">
                  <p className="mb-0">Connected</p>
                  <button className="btn btn-outline-danger">Unlink</button>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-end gap-3 mt-4">
              <GenericButton
                onClick={() => alert("Changes discarded!")}
                variant="secondary"
                icon={<CloseIcon />}
                iconPosition="left"
                label="Discard Changes"
                className="genericdiscardchangeStyles"
              />
              <GenericButton
                // onClick={() => handleSubmit}
                type="submit"
                variant="primary"
                icon={<DoneIcon />}
                iconPosition="left"
                label="Save Profile"
                className="genericSaveBtnStyles"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
