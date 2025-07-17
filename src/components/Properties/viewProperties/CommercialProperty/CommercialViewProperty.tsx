import { useLocation, useNavigate } from "react-router-dom";
import { DynamicBreadcrumbs } from "../../../Common/input";
import type { CommercialProperty } from "./CommercialViewProperty.modal";
import "./CommercialViewProperty.scss";
import SqrtImage from "../../../../assets/viewProperty/radix-icons_dimensions.svg";
import facingImage from "../../../../assets/viewProperty/Icon_Facing.svg";
import dateImage from "../../../../assets/viewProperty/solar_calendar-outline.svg";
import footStepImg from "../../../../assets/viewProperty/material-steps.svg";
// import roomImg from "../../../../assets/viewProperty/material-room.svg";
// import furnitureImg from "../../../../assets/viewProperty/streamline-block_shopping-furniture.svg";

// import tree_outline from "../../../../assets/viewProperty/tree_outline.svg";

// import mingcute_movie_line from "../../../../assets/viewProperty/mingcute_movie-line.svg";

import Icon_Cleaning from "../../../../assets/viewProperty/Icon_Cleaning.svg";
import water_full_outline from "../../../../assets/viewProperty/water-full-outline.svg";
import Icon_Road from "../../../../assets/viewProperty/Icon_Road.svg";
import Icon_restroom from "../../../../assets/viewProperty/Icon_restroom.svg";
import Icon_Parking from "../../../../assets/viewProperty/Icon_Parking.svg";
import Icon_Balcony from "../../../../assets/viewProperty/Icon_Balcony.svg";

import solar_user from "../../../../assets/viewProperty/solar_user.svg";



import ramp_up from "../../../../assets/viewProperty/ramp-up.svg";

import Icon_Bus from "../../../../assets/viewProperty/Icon_Bus.png";
import ph_airplane from "../../../../assets/viewProperty/ph_airplane-in-flight.png";
import metro from "../../../../assets/viewProperty/hugeicons_metro.png";
import light_train from "../../../../assets/viewProperty/light_train.png";
import proicons_mail from "../../../../assets/viewProperty/proicons_mail.png";
import solar_phone from "../../../../assets/viewProperty/solar_phone.png";
import GoogleMapsWrapper from "../../../Common/LocationPicker/GoogleMapWrapper";
import MapComponent from "../../../Common/LocationPicker/LocationPicker";
import Icon_edit from "../../../../assets/viewProperty/Icon_edit.png";
import Icon_Tick from "../../../../assets/viewProperty/Icon_Tick.png";
import Icon_Deny from "../../../../assets/viewProperty/Icon_Deny.png";
import Icon_Delete from "../../../../assets/viewProperty/Icon_Delete.png";
import backIcon from "../../../../assets/dashboardtab/icon-park-outline_down.svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ViewCarousel from "../../../Common/ViewCarousel/ViewCarousel";

interface PropertyResponse {
  property: CommercialProperty;
}

const CommercialView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const propertyData = location.state?.data as CommercialProperty;

  const { id } = useParams();
  const [property, setProperty] = useState<PropertyResponse | null>(null);
console.log("property",property)
const latitudeRaw = property?.property?.location?.map?.latitude;
const longitudeRaw = property?.property?.location?.map?.longitude;

const latitude =
  typeof latitudeRaw === "number"
    ? latitudeRaw
    : typeof latitudeRaw === "string" && !isNaN(parseFloat(latitudeRaw))
    ? parseFloat(latitudeRaw)
    : undefined;

const longitude =
  typeof longitudeRaw === "number"
    ? longitudeRaw
    : typeof longitudeRaw === "string" && !isNaN(parseFloat(longitudeRaw))
    ? parseFloat(longitudeRaw)
    : undefined;


  if (!propertyData) {
    return <p className="mt-5">No property data found</p>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BackEndUrl
        }/api/commercial/${id}`
      )
      .then((res) => setProperty(res.data))
      .catch((err) => console.error("Error fetching property:", err));
  }, [id]);

  if (!property) return <div>Loading...</div>;

  return (
    <section className="container pt-4">
      <div className="breadcrumb">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          <img src={backIcon} alt="backIcon" />Back
        </button>
        <DynamicBreadcrumbs />
      </div>
      <div className="slick-carousel">
        <ViewCarousel images={property?.property?.images || []} />
      </div>
      <section className="row address-detail">
        <div className="d-flex title-address col-md-6  ">
          <div className="landmark-type">
            <h3 className="mb-0">{property?.property?.title}</h3>
            <button className="btn detail-type">
              {property?.property?.propertyType}
            </button>
            <button className="btn detail-status-type">Rented out</button>
          </div>

          <p className="lead mb-3">
            Property for {property?.property?.propertyType}
          </p>
          <div className="d-flex align-items-center">
            <img
              src="../../../../../public/ICON_Location.svg"
              alt="Location Icon"
              className="me-2"
            />
            <p className="mb-0">{property?.property?.location?.address}</p>
          </div>
        </div>
        <div className="d-flex col-md-6 align-items-start area-facing-detail flex-wrap gap-4">
          <div className="area-facing-detail-inner-div w-100 mt-2">
            <div className="text-center">
              <p className="mb-1 caps">Area</p>
              <h3 className="mb-1 user-result-data">
                {property?.property?.area?.totalArea}
              </h3>
              <p className="text-muted">Sq.Ft</p>
            </div>
            <div className="area-facing-divider"></div>
            <div className=" text-center">
              <p className="mb-1">Rent</p>
              <h3 className="mb-1 user-result-data">
                {property?.property?.rent?.rentAmount}
              </h3>
              <p className="text-muted">Per Month</p>
            </div>
            <div className="area-facing-divider"></div>
            {property?.property?.propertyType !== "Rent" &&
              property?.property?.propertyType !== "Sale" && (
                <>
                  <div className=" text-center deposit-amount">
                    <p className="mb-1">Deposit Amount</p>
                    <h3 className="mb-1 user-result-data">
                      {property?.property?.rent?.advanceAmount}
                    </h3>
                  </div>
                </>
              )}
            {property?.property?.propertyType === "Rent" && (
              <div className=" text-center tenure-days ">
                <p className="mb-1">AGREEMENT</p>
                <h3 className="mb-1 user-result-data">
                  {property?.property?.rent?.agreementTiming}
                </h3>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="midDetails">
        <h3>Property Overview</h3>
        <div className="row gap-4 data-detail-row">
          <div className="col-md-2 row-individual-data">
            <p>PROPERTY TYPE</p>
            <span>{property?.property?.propertyType}</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>Residential TYPE</p>
            <span>Shop</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>Negotiable</p>
            <span>{property?.property?.rent?.negotiable}</span>
          </div>
        </div>
      </section>
      {(property?.property?.area?.totalArea ||
        property?.property?.facingDirection ||
        property?.property?.createdAt ||
        property?.property?.totalFloors ||
        property?.property?.propertyFloor ) && (
        <section className="midDetails">
          <h3>Property Dimension & Layout</h3>
          <div className="row gap-4 data-detail-row">
            {property?.property?.area?.totalArea && (
              <div className="col-md-2 row-individual-data">
                <p>TOTAL AREA</p>
                <span>
                  <img src={SqrtImage} alt="dimention" />
                  {property.property.area.totalArea}
                </span>
              </div>
            )}

            {property?.property?.facingDirection && (
              <div className="col-md-2 row-individual-data">
                <p>FACING</p>
                <span>
                  <img src={facingImage} alt="Facing" />
                  {property.property.facingDirection}
                </span>
              </div>
            )}

            

            {property?.property?.totalFloors && (
              <div className="col-md-2 row-individual-data">
                <p>TOTAL FLOORS</p>
                <span>
                  <img src={footStepImg} alt="Facing" />
                  {property.property.totalFloors}
                </span>
              </div>
            )}

            {property?.property?.propertyFloor && (
              <div className="col-md-2 row-individual-data">
                <p>PROPERTY ON</p>
                <span>
                  <img src={footStepImg} alt="Facing" />
                  {property.property.propertyFloor}
                </span>
              </div>
            )}

            {property?.property?.createdAt && (
              <div className="col-md-2 row-individual-data">
                <p>POSTED ON</p>
                <span>
                  <img src={dateImage} alt="date" />
                  {property.property.createdAt}
                </span>
              </div>
            )}

            
          </div>
        </section>
      )}

      {(property?.property?.facility?.washRoom ||
        property?.property?.facility?.waterFacility ||
        property?.property?.facility?.roadFacility ||
        property?.property?.facility?.tilesOnFloor ||
        property?.property?.facility?.parking ||
        property?.property?.facility?.readyToOccupy ) && (
        <section className="midDetails">
          <h3>Facilities Provided</h3>
          <div className="row gap-4 data-detail-row">
            {property?.property?.facility?.washRoom  && (
              <div className="col-md-2 row-individual-data">
                <p>WASHROOM</p>
                <span>
                  <img src={Icon_Cleaning} alt="Icon_Cleaning" />
                  {property.property.facility.washRoom }
                </span>
              </div>
            )}

            {property?.property?.facility?.waterFacility && (
              <div className="col-md-2 row-individual-data">
                <p>WATER FACILITY</p>
                <span>
                  <img src={water_full_outline} alt="water_full_outline" />
                  {property.property.facility.waterFacility}
                </span>
              </div>
            )}

            {property?.property?.facility?.roadFacility && (
              <div className="col-md-2 row-individual-data">
                <p>ROAD FACILITY</p>
                <span>
                  <img src={Icon_Road} alt="Icon_Road" />
                  {property.property.facility.roadFacility}
                </span>
              </div>
            )}

            {property?.property?.facility?.tilesOnFloor && (
              <div className="col-md-2 row-individual-data">
                <p>TILES ON FLOOR</p>
                <span>
                  <img src={Icon_restroom} alt="Icon_restroom" />
                  {property.property.facility.tilesOnFloor}
                </span>
              </div>
            )}

            {property?.property?.facility?.parking && (
              <div className="col-md-2 row-individual-data">
                <p>PARKING</p>
                <span>
                  <img src={Icon_Parking} alt="Icon_Parking" />
                  {property.property.facility.parking}
                </span>
              </div>
            )}

            {property?.property?.facility?.readyToOccupy && (
              <div className="col-md-2 row-individual-data">
                <p>READY TO OCCUPY</p>
                <span>
                  <img src={Icon_Balcony} alt="Icon_Balcony" />
                  {property.property.facility.readyToOccupy}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      {(property?.property?.accessibility?.ramp ||
        property?.property?.accessibility?.steps ||
        property?.property?.accessibility?.lift) && (
        <section className="midDetails">
          <h3>Move-In Accessibility</h3>
          <div className="row gap-4 data-detail-row">
            {/* RAMP ACCESS */}
            {property?.property?.accessibility?.ramp && (
              <div className="col-md-2 row-individual-data">
                <p>RAMP ACCESS</p>
                <span>
                  <img src={ramp_up} alt="ramp_up" />
                  {property.property.accessibility.ramp}
                </span>
              </div>
            )}

            {/* STAIR ACCESS */}
            {property?.property?.accessibility?.steps && (
              <div className="col-md-2 row-individual-data">
                <p>STAIR ACCESS</p>
                <span>
                  <img src={footStepImg} alt="footStepImg" />
                  {property.property.accessibility.steps}
                </span>
              </div>
            )}

            {/* LIFT */}
            {property?.property?.accessibility?.lift && (
              <div className="col-md-2 row-individual-data">
                <p>LIFT</p>
                <span>
                  <img src={footStepImg} alt="footStepImg" />
                  {property.property.accessibility.lift}
                </span>
              </div>
            )}
          </div>
        </section>
      )}
      <section className="propertyDes">
        <h3 className="mb-4">Description</h3>
        <div>
          <p>
            Discover comfortable urban living in this 2BHK unit located in the
            well-connected Perambalur Green Enclave. Spanning 1,200 sq ft of
            total area with a built-up space of 950 sq ft, this 2nd-floor
            apartment offers a carpet area of 800 sq ft, ensuring ample room for
            cozy living.
          </p>

          <p className="mb-0">
            This South-facing home invites natural light throughout the day and
            features unfurnished interiors—ideal for tenants who prefer to style
            their space from scratch. Located just minutes from schools,
            markets, and public transport, it’s an excellent choice for families
            or working professionals.
          </p>
        </div>
      </section>
      <section className="google-location">
        <h3 className="mb-4 google-top">Location & Address</h3>
        <div className="map-row row">
          <div className="map-location col-md-6">
            <h3>Location</h3>
            <GoogleMapsWrapper>
              <MapComponent latitude={latitude} longitude={longitude} />
            </GoogleMapsWrapper>
          </div>
          <div className="location-detail col-md-6">
            <div className="address">
              <h3>Full Address</h3>
              <p>{property?.property?.location?.address}</p>
            </div>
            <div className="lat-long row">
              <div className="lat col-md-6">
                <h3>latitude</h3>
                <p>{property?.property?.location?.map?.latitude}</p>
              </div>
              <div className="long col-md-6">
                <h3>longitude</h3>
                <p>{property?.property?.location?.map?.longitude}</p>
              </div>
            </div>
            <div className="transport ">
              <h3 className="Nearby">Nearby Transportation</h3>
              <div className="transport-row row">
                <div className="busstand col-md-3">
                  <h3>
                    <img src={Icon_Bus} alt="Icon_Bus" />
                    Bus Stand
                  </h3>
                  <p>
                    {property?.property?.availability?.transport?.nearbyBusStop}
                  </p>
                </div>
                <div className="Airport col-md-3">
                  <h3>
                    <img src={ph_airplane} alt="ph_airplane" />
                    Airport
                  </h3>
                  <p>
                    {property?.property?.availability?.transport?.nearbyAirport}
                  </p>
                </div>
                <div className="Metro col-md-3">
                  <h3>
                    <img src={metro} alt="" />
                    Metro
                  </h3>
                  <p>
                    {property?.property?.availability?.transport?.nearbyPort}
                  </p>
                </div>
                <div className="Railway col-md-3">
                  <h3>
                    <img src={light_train} alt="light_train" />
                    Railway
                  </h3>
                  <p>
                    {property?.property?.availability?.transport?.nearbyBusStop}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="midDetails">
        <h3>Owner Information</h3>
        <div className="owner-info row">
          <div className="name inner-div col-md-4">
            <img src={solar_user} alt="solar_user" />
            <p>Name</p>
            <h6>
              {property?.property?.owner?.firstName} &nbsp;
              {property?.property?.owner?.lastName}
            </h6>
          </div>
          <div className="number-outer col-md-4">
            <div className="number inner-div  col-md-4">
              <img src={solar_phone} alt="solar_phone" />
              <p>Phone number</p>
              <h6>{property?.property?.owner?.contact?.phone1}</h6>
            </div>
          </div>
          <div className="email inner-div col-md-4">
            <img src={proicons_mail} alt="proicons_mail" />
            <p>Email</p>
            <h6>{property?.property?.owner?.contact?.email}</h6>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <div className="area-icon ">

          <div className="view-property-icon ">
            <h3>Action</h3>
            <div className="view-property-icon-inside">
              <button className="btn edit-btn d-flex align-items-center gap-1">
                <img src={Icon_edit} alt="Edit Icon" />
                <p className="mb-0">Edit</p>
              </button>
              <button className="btn approve-btn d-flex align-items-center gap-1">
                <img src={Icon_Tick} alt="Approve Icon" />
                <p className="mb-0">Approve</p>
              </button>
              <button className="btn deny-btn d-flex align-items-center gap-1">
                <img src={Icon_Deny} alt="Deny Icon" />
                <p className="mb-0">Deny</p>
              </button>
              <button className="btn delete-btn d-flex align-items-center gap-1">
                <img src={Icon_Delete} alt="Delete Icon" />
                <p className="mb-0">Delete</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CommercialView;
