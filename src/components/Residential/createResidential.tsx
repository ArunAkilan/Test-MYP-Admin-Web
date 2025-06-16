// import Sidebar from "../../Common/Sidebar/Sidebar";
import { InputField } from "../Common/input";
import GenericButton from "../Common/Button/button";


import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import VerticalTabs from "../Common/Sidebar/Sidebar";

export const CreateResidential = () => {
  // const sidebarData = [
  //   { id: 1, name: "Dashboard", icon: PersonIcon },
  //   { id: 2, name: "Commercial", icon: EditNoteIcon },
  //   { id: 3, name: "Residential", icon: StarIcon },
  //   { id: 4, name: "Plots", icon: StarIcon },
  // ];

  return (
    <div className="row">
      <div className="col-12 col-md-3">
        {/* <VerticalTabs sidebarData={sidebarData} /> */}
        <VerticalTabs />
      </div>
      <div className="col-12 col-md-9">
        <div className="container-fluid px-3 px-md-5">
          <div className="ContentArea container">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-3">
              <ol className="breadcrumb no-decoration">
                <li className="breadcrumb-item">
                  <a href="#">Residential</a>
                </li>
                <li className="breadcrumb-item">
                  <img
                    src="src/assets/_.svg"
                    alt=""
                    className="img-brd img-fluid"
                  />
                </li>
                <li
                  className="breadcrumb-item active text-custom-blue"
                  aria-current="page"
                >
                  Create New Listing
                </li>
              </ol>
            </nav>

            {/* Owner Information Section */}
            <section className="OwnerDetails mb-4">
              <h6>Owner Information</h6>
              <p>Enter the contact details of the property owner</p>
              <div className="OwnerInputField container row mb-3 p-0">
                <div className="col-12 col-md-6 mb-3">
                  <label className="TextLabel" htmlFor="ownerFirstName">
                    First Name <span className="star">*</span>
                  </label>
                  <InputField
                    type="text"
                    id="ownerFirstName"
                    placeholder="Enter Owner's First Name"
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
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="TextLabel" htmlFor="ownerEmail">
                    Email <span className="star">*</span>
                  </label>
                  <InputField
                    type="email"
                    id="ownerEmail"
                    placeholder="Enter Owner’s Email Address"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="TextLabel" htmlFor="ownerPhone">
                    Phone Number <span className="star">*</span>
                  </label>
                  <InputField
                    type="tel"
                    id="ownerPhone"
                    placeholder="Enter Owner’s Contact Number"
                  />
                </div>
              </div>
            </section>

            {/* Property Overview Section */}
            <section className="OwnerPropertyOverview mb-4">
              <h6>Property Overview</h6>
              <p>Provide basic details about the property</p>

              <div className="OwnerInputField container row mb-3">
                <div className="col-12 col-md-6 mb-3">
                  <label className="TextLabel" htmlFor="propertyType">
                    Property Type <span className="star">*</span>
                  </label>
                  <InputField
                    type="dropdown"
                    id="propertyType"
                    dropdownOptions={["House", "Apartment", "Villa"]}
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="TextLabel" htmlFor="propertyTitle">
                    Property Title
                  </label>
                  <InputField
                    type="text"
                    id="propertyTitle"
                    placeholder="Enter Property Title"
                  />
                </div>

                <div className="col-12 col-md-4 mb-3">
                  <label className="TextLabel" htmlFor="monthlyRent">
                    Monthly Rent (₹) <span className="star">*</span>
                  </label>
                  <InputField
                    type="number"
                    id="monthlyRent"
                    placeholder="Enter Amount in Rupees (₹)"
                  />
                </div>

                <div className="col-12 col-md-4 mb-3">
                  <label className="TextLabel" htmlFor="advanceDeposit">
                    Advance Deposit (₹) <span className="star">*</span>
                  </label>
                  <InputField
                    type="number"
                    id="advanceDeposit"
                    placeholder="Enter Deposit"
                  />
                </div>

                <div className="col-12 col-md-4 mb-3">
                  <label className="TextLabel" htmlFor="tenure">
                    Tenure (Years) <span className="star">*</span>
                  </label>
                  <InputField
                    type="number"
                    id="tenure"
                    placeholder="Enter Tenure in Years"
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="TextLabel" htmlFor="propertyCategory">
                    Property Category <span className="star">*</span>
                  </label>
                  <div className="radio d-flex gap-3">
                    <InputField
                      type="radio"
                      radioOptions={["House", "Apartment", "Villa"]}
                      id="propertyCategory"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Location Details Section */}
            <section className="LocationDetails mb-4">
              <h6>Location & Address</h6>
              <p>Set the location and enter the property address</p>

              <div className="row mb-3">
                <div className="col-12 col-md-6 mb-3">
                  <label className="TextLabel" htmlFor="address">
                    Address
                  </label>
                  <InputField
                    type="text"
                    id="address"
                    placeholder="Enter Address"
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="TextLabel" htmlFor="latitude">
                    Latitude
                  </label>
                  <InputField
                    type="text"
                    id="latitude"
                    placeholder="Latitude"
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="TextLabel" htmlFor="longitude">
                    Longitude
                  </label>
                  <InputField
                    type="text"
                    id="longitude"
                    placeholder="Longitude"
                  />
                </div>
              </div>

              <div className="Map ratio-16x9 mb-3" style={{ height: "300px" }}>
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

              <div className="ResidentialCategory">
                <p>
                  Upload Property Images <span className="star">*</span>
                </p>
                <div className="BtnFrame d-flex mt-3 mb-2 align-items-start gap-3">
                  <p className="image-p">No image chosen</p>
                  <Button
                    variant="contained"
                    startIcon={<FileUploadOutlinedIcon />}
                    id="Choosebtn"
                  >
                    Choose image
                  </Button>
                </div>
              </div>
            </section>

            {/* Property Layout Section */}
            <section className="PropertyLayoutDetails mb-4">
              <h6>Property Dimensions & Layout</h6>
              <p>Enter the size and structure of the property</p>

              <div className="OwnerDetailTextField mt-3">
                <div className="row mb-3">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="totalArea">
                      Total Area <span className="star">*</span>
                    </label>
                    <InputField
                      type="text"
                      id="totalArea"
                      placeholder="Enter Total Area (sq.ft)"
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
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="carpetArea">
                      Carpet Area <span className="star">*</span>
                    </label>
                    <InputField
                      type="text"
                      id="carpetArea"
                      placeholder="Enter Carpet Area (sq.ft)"
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="TextLabel" htmlFor="facing">
                      Facing Direction <span className="star">*</span>
                    </label>
                    <InputField
                      type="dropdown"
                      id="facing"
                      dropdownOptions={["North", "South", "East", "West"]}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Amenities Section */}
            <section className="AmenitiesSection mb-4">
              <h6>Amenities</h6>
              <p>Check available amenities</p>

              <div className="container">
                <div className="row">
                  <div className="col-6 col-md-3 mb-3">
                    <label className="checkbox-container">
                      Lift
                      <InputField type="checkbox" id="amenityLift" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <label className="checkbox-container">
                      Parking
                      <InputField type="checkbox" id="amenityParking" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <label className="checkbox-container">
                      Swimming Pool
                      <InputField type="checkbox" id="amenityPool" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <label className="checkbox-container">
                      Security
                      <InputField type="checkbox" id="amenitySecurity" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Accessibility Section */}
            <section className="AccessibilitySection mb-4">
              <h6>Accessibility</h6>
              <p>Accessibility features for the property</p>

              <div className="container">
                <div className="row">
                  <div className="col-6 col-md-3 mb-3">
                    <label className="checkbox-container">
                      Ramp Access
                      <InputField type="checkbox" id="accessRamp" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <label className="checkbox-container">
                      Elevator
                      <InputField type="checkbox" id="accessElevator" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Utilities Section */}
            <section className="UtilitiesSection mb-4">
              <h6>Utilities</h6>
              <p>Utilities available at the property</p>

              <div className="container">
                <div className="row">
                  <div className="col-6 col-md-3 mb-3">
                    <label className="checkbox-container">
                      Electricity
                      <InputField type="checkbox" id="utilityElectricity" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <label className="checkbox-container">
                      Water
                      <InputField type="checkbox" id="utilityWater" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Restrictions Section */}
            <section className="RestrictionsSection mb-4">
              <h6>Restrictions</h6>
              <p>Any restrictions related to the property</p>

              <div className="container">
                <div className="row">
                  <div className="col-6 col-md-3 mb-3">
                    <label className="checkbox-container">
                      No Pets
                      <InputField type="checkbox" id="restrictNoPets" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <label className="checkbox-container">
                      No Smoking
                      <InputField type="checkbox" id="restrictNoSmoking" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional Information Section */}
            <section className="AdditionalInfoSection mb-4">
              <h6>Additional Information</h6>
              <p>Any other details about the property</p>
              <textarea
                className="form-control"
                rows={4}
                placeholder="Enter additional info here"
              ></textarea>
            </section>

            {/* Legal Documents Section */}
            <section className="LegalDocsSection mb-4">
              <h6>Legal Documents</h6>
              <p>Upload relevant legal documents</p>

              <div className="BtnFrame d-flex mt-3 mb-2 align-items-start gap-3">
                <p className="image-p">No document chosen</p>
                <Button
                  variant="contained"
                  startIcon={<FileUploadOutlinedIcon />}
                  id="ChooseDocbtn"
                >
                  Choose document
                </Button>
              </div>
            </section>

            {/* Room Details Section */}
            <section className="RoomDetailsSection mb-4">
              <h6>Room Details</h6>
              <p>Provide information about rooms in the property</p>

              <div className="row mb-3">
                <div className="col-6 col-md-3 mb-3">
                  <label className="TextLabel" htmlFor="bedrooms">
                    Bedrooms
                  </label>
                  <InputField
                    type="number"
                    id="bedrooms"
                    placeholder="Number of Bedrooms"
                  />
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <label className="TextLabel" htmlFor="bathrooms">
                    Bathrooms
                  </label>
                  <InputField
                    type="number"
                    id="bathrooms"
                    placeholder="Number of Bathrooms"
                  />
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <label className="TextLabel" htmlFor="balconies">
                    Balconies
                  </label>
                  <InputField
                    type="number"
                    id="balconies"
                    placeholder="Number of Balconies"
                  />
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <label className="TextLabel" htmlFor="floors">
                    Floors
                  </label>
                  <InputField
                    type="number"
                    id="floors"
                    placeholder="Number of Floors"
                  />
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="d-flex gap-3 justify-content-center my-4">
              <GenericButton
                label="Cancel"
                icon={<CloseIcon />}
              />
              <GenericButton
                label="Create Listing"
                icon={<DoneIcon />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResidential;
