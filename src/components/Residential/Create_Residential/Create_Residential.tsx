import React from "react";
 import Sidebar from "../../Common/Sidebar/Sidebar";
import "../Create_Residential/Create_Residential.scss";
import { BorderAll } from "@mui/icons-material";
import type {
  ResidentialProperty,
  Owner,
  Contact,
} from "./Create_Residential.model";
import InputField from "./input";
import GenericButton from "../../Common/Button/button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export const CreateResidential = () => {
  return (
  
      <div className="container-fluid px-3 px-md-5">
         
           {/* Main Content */}
          <div  > {/* ✅ Fixed for mobile */}
            {/* Breadcrumbs */}
            <div className="breadcrumbs d-flex flex-row align-items-start gap-2 mb-3">
              <p className="breadcrumbs-p">Residential</p>
              <img src="src/assets/_.svg" alt="" className="img-fluid" />
              <div className="newPage">
                <p className="breadcrumbs-p1 mb-0">Create New Listing</p>
              </div>
            </div>

            {/* Owner Details */}
            <p>Owner Details</p>
            <div className="row mb-3">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <InputField label="Enter First Name" type="text" id="Name" />
              </div>
              <div className="col-12 col-md-6">
                <InputField label="Enter Last Name" type="text" id="lname" />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <InputField label="Enter Email" type="text" id="lemail" />
              </div>
              <div className="col-12 col-md-6">
                <InputField label="Enter Phone Number" type="text" id="lphonenum" />
              </div>
            </div>

            {/* Property Details */}
            <p>Property Details</p>
            <div className="mb-3">
              {/* <p>Property Type</p> */}
              <label htmlFor="">Property Type</label>
              <InputField
                type="dropdown"
                dropdownOptions={["1", "2", "3"]}
                id="rent"
                Selected="Rent"
              />
            </div>

            {/* Map + Property Info */}
            <div className="row mb-3">
            <label htmlFor="">Location</label>
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <div className="ratio ratio-16x9">
                  
                  <iframe
                    src="https://www.google.com/maps/place/Sumisa+Technologies/@11.24016,78.8638479,17z/data=!3m1!4b1!4m6!3m5!1s0x3bab1b005e91277d:0x2aa83d7e402eb0bc!8m2!3d11.24016!4d78.8664228!16s%2Fg%2F11m5ksv5sx?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <InputField label="Property Name" type="text" id="pName" />
                <InputField
                  label="Rent Amount(Per Month)"
                  type="text"
                  id="rentAmountPM"
                />
                <InputField label="Rent Amount" type="text" id="rentAmount" />
              </div>
            </div>

            {/* Address + Category */}
            <div className="row mb-3">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <InputField label="Address" type="text" id="rentAmount" />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="">Residential Category</label>
                <InputField
                  type="radio"
                  radioOptions={["House", "Apartment", "Villa"]}
                  id="radio"
                  Selected="Options"
                />
              </div>
              <div className="col-12 mt-3">
                <label htmlFor="">Property Images</label>
                <div className="d-flex flex-column flex-md-row gap-3 mt-3 mb-2 align-items-start">
                  <div>
                    <p className="image-p">No image chosen</p>
                  </div>
                  <div>
                    <Button variant="contained" startIcon={<FileUploadOutlinedIcon />}>
                      Choose image
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Area and Layout Details */}
            <div className="mt-4">
              <label htmlFor="">Area and Layout Details</label>
              <div className="row mb-3">
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                  <InputField label="Total Area" type="text" id="pName" />
                </div>
                <div className="col-12 col-md-6">
                  <InputField
                    label="Built Up Area"
                    type="text"
                    id="rentAmountPM"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                  <InputField label="Carpet Area" type="text" id="rentAmount" />
                </div>
                <div className="col-12 col-md-6">
                  <InputField label="Facing" type="text" id="rentAmount" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                  <InputField label="Total Floors" type="text" id="rentAmount" />
                </div>
                <div className="col-12 col-md-6">
                  <InputField label="Property on" type="text" id="rentAmount" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                  <InputField
                    label="Furnished Type"
                    type="text"
                    id="rentAmount"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <InputField label="Rooms" type="text" id="rentAmount" />
                </div>
              </div>
            </div>
            <p>Amenities</p>
            <div className="mb-3">
              {/* <p>Property Type</p> */}
              <label htmlFor="">Nearby Amenities (Select that apply to the proprty)</label>
              <InputField
                type="dropdown"
                dropdownOptions={["1", "2", "3"]}
                id="rent"
                label=""
                Selected="Select all that apply"
              />
            </div>
            <p>Property Details</p>
            <div className="mb-3">
              {/* <p>Property Type</p> */}
              <label htmlFor="">Select accessibility that applies</label>
              <InputField
                type="dropdown"
                dropdownOptions={["1", "2", "3"]}
                id="rent"
                label=""
                Selected="Select all that apply"
              />
            </div>
            {/* Buttons */}
            <div className="d-flex flex-column flex-md-row justify-content-end gap-3 gap-md-4 mt-4 mb-4">
              <div>
                <Button variant="outlined" startIcon={<CloseIcon />}>
                  discard changes
                </Button>
              </div>
              <div>
                <Button variant="contained" startIcon={<DoneIcon />}>
                  Create new listing
                </Button>
              </div>
            </div>
          </div>
        </div>
 
  
  );
};
