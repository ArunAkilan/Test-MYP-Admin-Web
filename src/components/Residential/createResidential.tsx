import { InputField } from "../Common/input";
import GenericButton from "../Common/Button/button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import "./createResidential/createResidential.scss";
import { Avatar } from "@mui/material";


export const CreateResidential = () => {
  return (
    <div className="createProperty container row">
      <div className="col-12 col-md-3">{/* Sidebar placeholder */}</div>
      <div className="col-12 col-md-9">
        <div className="container-fluid px-3 px-md-5">
          <div className="ContentArea container">
            {/* Breadcrumb */}
            <nav aria-label="createPagebreadcrumb" className="mb-3">
              <ol className="breadcrumb no-decoration">
                <li className="breadcrumb-item">
                  <a href="#">Residential</a>
                </li>
                <li className="breadcrumb-item">
                  <img
                    src="/src/assets/_.svg"
                    alt=""
                    className="img-brd img-fluid"
                  />
                </li>
                <li
                  className="defaultBreadcrumb-item active text-custom-blue"
                  aria-current="page"
                >
                  Create New Property
                </li>
              </ol>
            </nav>

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
                </div>

                <div className="row">
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
                      type="phone"
                      id="ownerPhone"
                      placeholder="Enter Owner’s Contact Number"
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
                      dropdownOptions={["House", "Apartment", "Villa"]}
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
                                <br />
                                - Kms
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
                              <span className="transportInfoText">Airport
                                <br />
                                - Kms
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
                              <span className="transportInfoText">Metro
                                <br />
                                - Kms
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
                              <span className="transportInfoText">Railway
                                <br />
                                - Kms
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
                    Facing
                  </label>
                  <InputField
                    type="dropdown"
                    id="facing"
                    placeholder="Select Direction Facing"
                    dropdownOptions={["North", "South", "East", "West"]}
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
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="TextLabel" htmlFor="furnishedType">
                    Furnished Type
                  </label>
                  <InputField
                    type="text"
                    id="furnishedType"
                    placeholder="Select Furnished Type"
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
                  />
                </div>
              </div>
            </section>

            {/* Amenities Section */}
            <section className="container AmenitiesSection mb-4">
              <div className="ownerTitle">
                <h6>Nearby Services & Essentials</h6>
                <p>
                  Select the important places or services available near this
                  property
                </p>
              </div>

              <div className="chipField row">
                <div
                  className="chipcard d-flex gap-4 col-6 col-md-3 mb-3"
                  style={{ padding: "31px" }}
                >
                  <InputField
                    type="chip"
                    label="Separate Electricity Billing"
                    icon={
                      <Avatar
                        alt="Separate Electricity Billing"
                        src="/src/assets/createProperty/mage_electricity.svg"
                        className="avatarImg"
                      />
                    }
                  />

                  <InputField
                    type="chip"
                    label="Public Park"
                    icon={
                      <Avatar
                        alt="Public Park"
                        src="/src/assets/createProperty/material-symbols_park-outline-rounded.svg"
                        className="avatarImg"
                      />
                    }
                  />

                  <InputField
                    type="chip"
                    label="Gym"
                    icon={
                      <Avatar
                        alt="Gym"
                        src="/src/assets/createProperty/hugeicons_equipment-gym-03.svg"
                        className="avatarImg"
                      />
                    }
                  />
                  <InputField
                    type="chip"
                    label="Movie Theater"
                    icon={
                      <Avatar
                        alt="Movie Theater"
                        src="/src/assets/createProperty/mingcute_movie-line.svg"
                        className="avatarImg"
                      />
                    }
                  />
                  <InputField
                    type="chip"
                    label="Shopping Mall"
                    icon={
                      <Avatar
                        alt="Shopping Mall"
                        src="/src/assets/createProperty/material-symbols_local-mall-outline.svg"
                        className="avatarImg"
                      />
                    }
                  />
                </div>
              </div>
            </section>

            {/* Accessibility Section */}
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
                  />
                </div>
              </div>
            </section>

            {/* Utilities Section */}
            <section className="UtilitiesSection ">
              <div className="ownerTitle">
                <h6>Infrastructure & Utilities</h6>
                <p>
                  Select the facilities or utilities included with this property{" "}
                </p>
              </div>

              <div className="chipField">
                <div
                  className="chipcard "
                  style={{ padding: "31px" }}
                >
                  
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
                  />
                 </div>

                </div>
              </div>
            </section>

            {/* Restrictions Section */}
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
              <label htmlFor="">Property Description</label>
              <textarea
                className="form-control"
                rows={4}
                placeholder="Add a brief description of the property, including highlights, unique features, or nearby landmarks"
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
              <label className="TextLabel" htmlFor="propertyCategory">
                Are Legal Documents Available? <span className="star">*</span>
              </label>
              <div className="d-flex flex-wrap gap-3">
                <InputField
                  type="radio"
                  radioOptions={["Yes", "NO"]}
                  id="propertyCategory"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-3 justify-content-end my-4">
              <GenericButton
                label="Discard changes"
                icon={<CloseIcon />}
                className="DiscardC btn-outline-secondary"
              />
              <GenericButton
                label="Create New Property"
                icon={<DoneIcon />}
                className="createNP btn btn-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResidential;
