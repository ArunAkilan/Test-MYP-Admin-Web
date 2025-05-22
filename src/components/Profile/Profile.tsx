import React from "react";
// import type ProfileForm from './Profile.module'
import profilePicture from "../../../public/ProPic.svg";
import imagemap from "../../../public/imap.png";
import "./profile.scss";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import verifiedProfile from "../../../public/ICON_Verified.svg";
import locateMe from "../../../public/mingcute_location-line.svg";
import GenericButton from "../Common/Button/button";
import SaveIcon from "@mui/icons-material/Save";

const Profile: React.FC = () => {
  return (
    <div className="profile-wrapper">
      <div className="row ">
        <div className="col-md-4 account-manage">
          <h3>Account management</h3>
          <img
            src={profilePicture}
            className="profile-img"
            alt="profile image"
          ></img>
          <div className="edit-view">
            <button className="edit-photo">
              <img src="ICON_Edit.svg" alt="edit img" />
              Edit Photo
            </button>
            <button className="view-profile">
              <img src="ICON_Eye.svg" alt="edit img" />
              View Profile
            </button>
          </div>
        </div>
        <div className="col-md-8 profileinfo-wrapper">
          <div className="profile-info profile-cmn">
            <h3>Profile Information</h3>
            <div className="row">
              <div className="col-md-6 right-align firstname name">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
              </div>
              <div className="col-md-6 left-align lastname name">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>
          <div className="gender profile-cmn">
            <label htmlFor="gender">Gender</label>
            <div>
              <FormControl sx={{ pb: 2 }} fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select labelId="gender-label" id="gender" label="Gender">
                  <MenuItem>male</MenuItem>
                  <MenuItem>Female</MenuItem>
                  <MenuItem>Others</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="contact-info profile-cmn">
            <h3>Contact Information</h3>
            <div className="email-div">
              <div className="email-verify">
                <label htmlFor="email">Email</label>
                <p>Verify</p>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
              />
            </div>
            <div className="row">
              <div className="col-md-6 right-align">
                <div className="phone-verify">
                  <label htmlFor="phone">Primary Phone Number</label>
                  <img src={verifiedProfile} alt="verfied image" />
                </div>
                <input
                  type="tel"
                  id="primaryPhone"
                  name="primaryPhone"
                  placeholder="123-45-678"
                />
              </div>
              <div className="col-md-6 left-align">
                <label htmlFor="secondaryphone">Secondary Phone Number</label>
                <input
                  type="tel"
                  id="secondaryPhone"
                  name="secondaryPhone"
                  placeholder="123-45-678"
                />
              </div>
            </div>
          </div>
          <div className="about-user profile-cmn">
            <h3>About the User</h3>
            <div className="description-div">
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description">
                Enter the description here
              </textarea>
            </div>
          </div>
          <div className="location profile-cmn">
            <h3>Location</h3>
            <div className="row">
              <div className="col-md-6 right-align">
                <label htmlFor="longitude">Longitude</label>
                <input
                  type="text"
                  id="longitude"
                  name="longitude"
                  placeholder="8.23213414432"
                />
              </div>
              <div className="col-md-6 left-align">
                <label htmlFor="latitude">Latitude</label>
                <input
                  type="text"
                  id="latitude"
                  name="latitude"
                  placeholder="11.129387377"
                />
              </div>
            </div>
            <label htmlFor="location">Your Location</label>
            <div className="map-detail">
              <img src={imagemap} className="map-class" alt="imap img" />
              <div className="address-locate">
                <span id="address">Vadakku mathavi road,Perambalur</span>
                <span className="locate-me">
                  <img src={locateMe} alt="LOCATE ICON" />
                  Locate me
                </span>
              </div>
            </div>
          </div>
          <div className="login-otherway profile-cmn">
            <h3>Other Ways to Login</h3>
            <div className="google">
              <p>
                <img src="LOGO_Google.svg" alt="google svg" />
                google
              </p>
              <div className="connect">
                <p>Not Connected</p>
                <button className="google-btn link">Link</button>
              </div>
            </div>
            <div className="facebook">
              <p>
                <img src="LOGO_FB.svg" alt="facebook svg" />
                Facebook
              </p>
              <div className="connect">
                <p>Connected</p>
                <button className="fb-btn unlink">Unlink</button>
              </div>
            </div>
          </div>
          <div id="discard-save" className="discard-save">
            <button className="discard">Discard Changes</button>
            <GenericButton
              onClick={() => alert("Data saved!")}
              variant="primary"
              icon={<SaveIcon />}
              iconPosition="left"
              label={"Save"}
              className="genericSaveBtnStyles"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
