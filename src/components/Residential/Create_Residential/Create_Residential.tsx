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
import { Search } from "@mui/icons-material";

export const CreateResidential = () => {
  return (
    <div className="container-fluid px-3 px-md-5">
      {/* Main Content */}
      <div>
        {" "}
        {/*  Fixed for mobile */}
        {/* Breadcrumbs */}
        {/* <div className="breadcrumb d-flex flex-row align-items-start gap-2 mb-3">
          <p className="breadcrumb-item">Residential</p>
          <img src="src/assets/_.svg" alt="" className="img-brd img-fluid" />
          <div className="newPage">
            <p className="breadcrumb-item active" aria-current="page" >Create New Listing</p>
          </div>
        </div> */}

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb no-decoration">
            <li class="breadcrumb-item"><a href="#">Residential</a></li>
            <li class="breadcrumb-item"><img src="src/assets/_.svg" alt="" className="img-brd img-fluid" /></li>
            <li class="breadcrumb-item active text-custom-blue" aria-current="page">Create New Listing</li>
          </ol>
        </nav>

        {/* Owner Details */}
        <section className="OwnerDetailsn">
          <p>Owner Details</p>
          <div className="OwnerDetailTextField">
            <div className=" container row mb-1">
              <div className=" col-12 col-md-6 mb-3 p-0">
                <label htmlFor="">First Name</label>
                <InputField type="text" id="Name" />
              </div>
              <div className=" col-12 col-md-6">
                <label htmlFor="">Last Name</label>
                <InputField type="text" id="lname" />
              </div>
            </div>

            <div className=" container row mb-2 p-0">
              <div className=" col-12 col-md-6 mb-3 ">
                <label htmlFor="">Email</label>
                <InputField type="text" id="lemail" />
              </div>
              <div className=" col-12 col-md-6">
                <label htmlFor="">Phone Number</label>
                <InputField type="text" id="lphonenum" />
              </div>
            </div>
          </div>
        </section>
        {/* Property Details */}
        <div className="PropertDetails">
          <p>Property Details</p>
          <div className="InputField">
            <div className="SelectionInput mb-3">
              {/* <p>Property Type</p> */}
              <label htmlFor="">Property Type</label>
              <InputField
                type="dropdown"
                dropdownOptions={["1", "2", "3"]}
                id="rent"

                // Selected="Rent"
              />
            </div>

            {/* Map + Property Info */}
            <div className="PropertyDetails">
              <div className="Propert_Location row mb-3">
                <label htmlFor="">Location</label>
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                  <div className="Map ratio-16x9">
                    <iframe
                      src="https://www.google.com/maps/place/Sumisa+Technologies/@11.24016,78.8638479,17z/data=!3m1!4b1!4m6!3m5!1s0x3bab1b005e91277d:0x2aa83d7e402eb0bc!8m2!3d11.24016!4d78.8664228!16s%2Fg%2F11m5ksv5sx?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="col-12 col-md-12 mb-3 mb-md-0">
                  <label htmlFor="">Address</label>
                  <InputField type="text" id="rentAmount" />
                </div>
              </div>

              {/* Address + Category */}
              <div className="Propert_Details row mb-3">
                <div className="TextInput col-12 col-md-6">
                  <label htmlFor="">Property Name</label>
                  <InputField
                    // label="Enter Property Name"
                    type="text"
                    id="pName"
                  />
                </div>

                <div className="TextInput col-12 col-md-6">
                  <label htmlFor="">Rent Amount(Per Month)</label>
                  <InputField
                    // label="Enter Amount in Rupees (₹)"
                    type="text"
                    id="pName"
                  />
                </div>

                <div className="Frame1">
                  <div className="TextInput col-12 col-md-6">
                    <label htmlFor="">Advance Amount</label>
                    <InputField type="text" id="pName" />
                  </div>
                  <div className="TextInput col-12 col-md-6">
                    <label htmlFor="">Tenure Years</label>
                    <InputField type="text" id="pName" />
                  </div>
                </div>

                <div className="Frame2 col-12 col-md-6">
                  <label htmlFor="">Residential Category</label>
                  <div className="radio">
                    <InputField
                      type="radio"
                      radioOptions={["House", "Apartment", "Villa"]}
                      id="radio"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="ResidentialCategory col-12 mt-3">
              <label htmlFor="">Property Images</label>
              <div className="d-flex flex-column flex-md-row gap-3 mt-3 mb-2 align-items-start">
                <div>
                  <p className="image-p">No image chosen</p>
                </div>
                <div>
                  <Button
                    variant="contained"
                    startIcon={<FileUploadOutlinedIcon />}
                  >
                    Choose image
                  </Button>
                </div>
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
              <InputField label="Built Up Area" type="text" id="rentAmountPM" />
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
              <InputField label="Furnished Type" type="text" id="rentAmount" />
            </div>
            <div className="col-12 col-md-6">
              <InputField label="Rooms" type="text" id="rentAmount" />
            </div>
          </div>
        </div>
        <div className="container ">
          <div>
            <p>Nearby Services & Essentials</p>
          </div>
          <div className="mb-3">
            {/* <p>Property Type</p> */}
            <label htmlFor="">Select the important places or services near this property</label>
            <div className="container d-flex flex-d-row gap-2">
              <InputField
                type="chip"
                id="rent"
                label="Separate Electricity Billing"
                icon={<Search />}
              />
              <InputField
                type="chip"
                id="rent"
                label="Grocery / Local Market"
                icon={<Search />}
              />
              <InputField
                type="chip"
                id="rent"
                label="Public Park"
                icon={<Search />}
              />
              <InputField type="chip" id="rent" label="Gym" icon={<Search />} />
              <InputField
                type="chip"
                id="rent"
                label="Movie Theater"
                icon={<Search />}
              />
              <InputField
                type="chip"
                id="rent"
                label="Shopping Mall"
                icon={<Search />}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="container ">
          <div>
            <p>Move-In Accessibility</p>
          </div>
          <div className="mb-3">
            {/* <p>Property Type</p> */}
            <label htmlFor="">Choose how easy it is to access and move into the property</label>
            <div className="container d-flex flex-d-row gap-2">
              <InputField
                type="chip"
                id="rent"
                label="Lift Access"
                icon={<Search />}
              />
              <InputField
                type="chip"
                id="rent"
                label="Ramp Access"
                icon={<Search />}
              />
              <InputField
                type="chip"
                id="rent"
                label="Only via Stairs"
                icon={<Search />}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="container ">
          <div>
            <p>Infrastructure & Utilities</p>
          </div>
          <div className="mb-3">
            {/* <p>Property Type</p> */}
            <label htmlFor="">Select the facilities or utilities included with the property</label>
            <div className="container d-flex flex-d-row gap-2">
              <InputField
                type="chip"
                id="rent"
                label="Maintenance Services"
                icon={<Search />}
              />
              <InputField
                type="chip"
                id="rent"
                label="Water Supply Available"
                icon={<Search />}
              />
              <InputField
                type="chip"
                id="rent"
                label="Road Access"
                icon={<Search />}
              />
              <InputField
                type="chip"
                id="rent"
                label="Sewage System"
                icon={<Search />}
              />
              <InputField
                type="chip"
                id="rent"
                label="Parking Space"
                icon={<Search />}
              />
              <InputField
                type="chip"
                id="rent"
                label="Private Balcony"
                icon={<Search />}
              />
              
            </div>
          </div>
        </div>
        <br />
        <div className="container ">
          <div>
            <p>Occupancy Restrictions</p>
          </div>
          <div className="mb-3">
            {/* <p>Property Type</p> */}
            <label htmlFor="">Select any rules about who can stay or live in this property.</label>
            <div className="container d-flex flex-d-row gap-2">
              <InputField
                type="chip"
                id="rent"
                label="Guests Not Allowed"
                icon={<Search />}
              />
              <InputField
                type="chip"
                id="rent"
                label="No Pets Allowed"
                icon={<Search />}
              />
              <InputField
                type="chip"
                id="rent"
                label="No Bachelors Allowed"
                icon={<Search />}
              />
          
            </div>
          </div>
        </div>
        <div>
          <p>Nearby Services & Essentials</p>
        </div>
        <div className="mb-3">
          {/* <p>Property Type</p> */}
          <label htmlFor="">
            Nearby Amenities (Select that apply to the proprty)
          </label>
          <InputField
            type="dropdown"
            dropdownOptions={["1", "2", "3"]}
            id="rent"
            label=""
            Selected="Select all that apply"
          />
        </div>
      </div>
      <p>Property Details</p>
      <div className="mb-3">
        {/* <p>Property Type</p> */}
        <label htmlFor="">Select accessibility that applies</label>
        <InputField type="chip" id="rent" label="hi" icon={<Search />} />
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
  );
};
