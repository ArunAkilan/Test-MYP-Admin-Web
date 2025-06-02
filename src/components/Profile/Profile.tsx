import React, { useState } from "react";
import profilePicture from "../../../public/ProPic.svg";
import imagemap from "../../../public/imap.png";
import locateMe from "../../../public/mingcute_location-line.svg";
import "./profile.scss";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import GenericButton from "../Common/Button/button";
import { InputField } from "../Residential/Create_Residential/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageField from "../Common/Button/uploadbtn";


const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    secondaryPhone: "",
    email: "",
    bio: "",
    address: "",
    gender: "",
    longitude: "",
    latitude: "",
    Image: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";

    const lon = parseFloat(formData.longitude);
    const lat = parseFloat(formData.latitude);

    if (!formData.longitude.trim())
      newErrors.longitude = "Longitude is required";
    else if (isNaN(lon)) newErrors.longitude = "Longitude must be a number";

    if (!formData.latitude.trim()) newErrors.latitude = "Latitude is required";
    else if (isNaN(lat)) newErrors.latitude = "Latitude must be a number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Collected Form Data:", formData);
      toast.success("Profile updated successfully!");
     
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
      longitude: "",
      latitude: "",
      Image: "",
    });

    // Also clear errors if needed
    setErrors({}); 
    
    } else {
      toast.error("Please Fill All Required Info");
    }
  };

  return (
    <div className="container profile-wrapper py-4">
      <div className="row">
        <div className="col-12 col-md-4 mb-4 account-manage">
          <h3>Account Management</h3>
          <img
            src={profilePicture}
            className="img-fluid profile-img"
            alt="profile"
          />
          <ToastContainer position="top-right" autoClose={3000} />
          <div className="edit-view d-flex flex-column gap-2 mt-3">
            <button className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2">
              <img src="ICON_Edit.svg" alt="edit" /> Edit Photo
            </button>
            <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2">
              <img src="ICON_Eye.svg" alt="view" /> View Profile
            </button>
          </div>
        </div>
        <div>
          <ImageField />
        </div>

        <div className="col-12 col-md-8 profileinfo-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="profile-info profile-cmn mb-4">
              <h3>Profile Information</h3>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>First Name <span className="star">*</span></label>
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
                  <label>Last Name <span className="star">*</span></label>
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
              <InputField type="text" 
              name="email" 
              placeholder="Your email" 
              value={formData.email}
              onChange={handleChange}
              />

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Primary Phone Number <span className="star">*</span></label>
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
                  <img
                    src={imagemap}
                    className="img-fluid map-class"
                    alt="Map"
                  />
                  <span className="d-block mt-2">
                    Vadakku mathavi road, Perambalur
                  </span>
                  <span className="text-primary d-flex align-items-center gap-1 mt-1">
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
                  <label>Longitude <span className="star">*</span></label>
                  <InputField
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="Longitude"
                    error={!!errors.longitude}
                    helperText={errors.longitude}
                  />
                  <label>Latitude <span className="star">*</span></label>
                  <InputField
                    type="text"
                    name="latitude"
                    value={formData.latitude}
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
