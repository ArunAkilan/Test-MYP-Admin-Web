import { useLocation, useNavigate } from "react-router-dom";
// import type {ResidentialFormState} from "../../createProperties/createProperty.model";
import { DynamicBreadcrumbs } from "../../../Common/input";
import VIewCarousel from "../../../Common/ViewCarousel/ViewCarousel";
import type { ResidentialProperty } from "./ResidencialViewProperty.modal";
import "./ResidentialViewProperty.scss";
import SqrtImage from "../../../../assets/viewProperty/radix-icons_dimensions.svg";
import facingImage from "../../../../assets/viewProperty/Icon_Facing.svg";
import dateImage from "../../../../assets/viewProperty/solar_calendar-outline.svg";
import footStepImg from "../../../../assets/viewProperty/material-steps.svg";
import roomImg from "../../../../assets/viewProperty/material-room.svg";
import furnitureImg from "../../../../assets/viewProperty/streamline-block_shopping-furniture.svg";
import gamingImg from "../../../../assets/viewProperty/hugeicons_game.svg";
import mage_electricity from "../../../../assets/viewProperty/mage_electricity.svg";
import tree_outline from "../../../../assets/viewProperty/tree_outline.svg";
import weixin_market from "../../../../assets/viewProperty/weixin-market.svg";
import equipment_gym from "../../../../assets/viewProperty/hugeicons_equipment-gym-03.svg";
import mingcute_movie_line from "../../../../assets/viewProperty/mingcute_movie-line.svg";
import local_mall from "../../../../assets/viewProperty/local-mall.svg";
import Icon_Cleaning from "../../../../assets/viewProperty/Icon_Cleaning.svg";
import water_full_outline from "../../../../assets/viewProperty/water-full-outline.svg";
import Icon_Road from "../../../../assets/viewProperty/Icon_Road.svg";
import Icon_restroom from "../../../../assets/viewProperty/Icon_restroom.svg";
import Icon_Parking from "../../../../assets/viewProperty/Icon_Parking.svg";
import Icon_Balcony from "../../../../assets/viewProperty/Icon_Balcony.svg";
import icon_park_terrace from "../../../../assets/viewProperty/icon-park_terrace.svg";
import solar_user from "../../../../assets/viewProperty/solar_user.svg";
import streamline_pets from "../../../../assets/viewProperty/streamline_pets.svg";
import Icon_Lift from "../../../../assets/viewProperty/Icon_Lift.svg";
import streamline_flex_network from "../../../../assets/viewProperty/streamline-flex_network.svg";
import user_security from "../../../../assets/viewProperty/user-security.svg";
import ramp_up from "../../../../assets/viewProperty/ramp-up.svg";
import tabler_cricket from "../../../../assets/viewProperty/tabler_cricket.svg";
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
import backIcon from "../../../../assets/dashboardtab/icon-park-outline_down.svg"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface PropertyResponse {
  property: ResidentialProperty;
}
const ViewProperty = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const propertyData = location.state?.data as ResidentialProperty;
   const { id } = useParams();
const [property, setProperty] = useState<PropertyResponse | null>(null);

  console.log("property", property);

   useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BackEndUrl}/api/residential/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.error("Error fetching property:", err));
  }, [id]);

  if (!property) return <div>Loading...</div>;

  if (!propertyData) {
    return <p className="mt-5">No property data found</p>;
  }

  return (
    <section className="container pt-4">
      {/* <section className="breadcrumb d-flex flex-row align-items-center gap-2 mb-3">
        <div className="d-flex align-items-center gap-1">
          <p className="mb-0">Residential</p>
          <img
            src="/src/assets/Propert View Page imgs/ChevronRightFilled.svg"
            alt="arrow"
          />
        </div>
        <div className="d-flex align-items-center gap-1">
          <p className="mb-0">{propertyData?.propertyType}</p>
          <img
            src="/src/assets/Propert View Page imgs/ChevronRightFilled.svg"
            alt="arrow"
          />
        </div>
        <div>
          <p className="mb-0 fw-bold">{propertyData?.title}</p>
        </div>
      </section> */}
      <div className="breadcrumb">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          <img src={backIcon} alt="backIcon" />Back
        </button>
        <DynamicBreadcrumbs />
      </div>
      <div className="slick-carousel">
        <VIewCarousel />
      </div>
      <section className="row address-detail">
        <div className="d-flex title-address col-md-6  ">
          <div className="landmark-type">
            <h3 className="mb-0">{property?.property?.title}</h3>
            <button className="btn detail-type">
              {propertyData?.propertyType}
            </button>
            <button className="btn detail-status-type">Rented out</button>
          </div>

          <p className="lead mb-3">Shop for {propertyData?.propertyType}</p>
          <div className="d-flex align-items-center">
            <img
              src="../../../../../public/ICON_Location.svg"
              alt="Location Icon"
              className="me-2"
            />
            <p className="mb-0">Address</p>
          </div>
        </div>
        <div className="d-flex col-md-6 align-items-start area-facing-detail flex-wrap gap-4">
          <div className="area-facing-detail-inner-div w-100 mt-2">
            <div className="text-center">
              <p className="mb-1 caps">Area</p>
              <h3 className="mb-1 user-result-data">1000</h3>
              <p className="text-muted">Sq.Ft</p>
            </div>
            <div className="area-facing-divider"></div>
            <div className=" text-center">
              <p className="mb-1">Facing</p>
              <h3 className="mb-1 user-result-data">
                {propertyData?.facingDirection}
              </h3>
            </div>
            <div className="area-facing-divider"></div>
            <div className=" text-center">
              <p className="mb-1">Rent</p>
              <h3 className="mb-1 user-result-data">{property?.property?.rent?.rentAmount}</h3>
              <p className="text-muted">Per Month</p>
            </div>
            <div className="area-facing-divider"></div>
            <div className=" text-center">
              <p className="mb-1">Deposit Amount</p>
              <h3 className="mb-1 user-result-data">₹1,00,000</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="midDetails">
        <h3>Property Overview</h3>
        <div className="row gap-4 data-detail-row">
          <div className="col-md-2 row-individual-data">
            <p>PROPERTY TYPE</p>
            <span>{propertyData?.propertyType}</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>Residential TYPE</p>
            <span>Shop</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>Negotiable</p>
            <span>Yes</span>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <h3>Property Dimension & Layout</h3>
        <div className="row gap-4 data-detail-row">
          <div className="col-md-2 row-individual-data">
            <p>TOTAL AREA</p>
            <span>
              <img src={SqrtImage} alt="dimention" />
              1400 Sq.Ft
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>BUILTUP AREA</p>
            <span>
              <img src={SqrtImage} alt="dimention" />
              1400 Sq.Ft
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>CARPET AREA</p>
            <span>
              <img src={SqrtImage} alt="dimention" />
              1400 Sq.Ft
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>FACING</p>
            <span>
              <img src={facingImage} alt="Facing" />
              East
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>POSTED ON</p>
            <span>
              <img src={dateImage} alt="date" />
              15 Aug 2025
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>TOTAL FLOORS</p>
            <span>
              <img src={footStepImg} alt="Facing" />2
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>PROPERTY ON</p>
            <span>
              <img src={footStepImg} alt="Facing" />2
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>FUSRNISH TYPE</p>
            <span>
              <img src={furnitureImg} alt="Facing" />
              1400 Sq.Ft
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>ROOMS</p>
            <span>
              <img src={roomImg} alt="Facing" />
              East
            </span>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <h3>Nearby Services & Essentials</h3>
        <div className="row gap-4 data-detail-row">
          <div className="col-md-2 row-individual-data">
            <p>ELECTRICITY</p>
            <span>
              <img src={mage_electricity} alt="mage_electricity" />
              Available
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>PARK</p>
            <span>
              <img src={tree_outline} alt="tree_outline" />
              Available
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>MARKET</p>
            <span>
              <img src={weixin_market} alt="weixin_market" />
              Available
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>GYM</p>
            <span>
              <img src={equipment_gym} alt="equipment_gym" />
              Available
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>MOVIE THEATRE</p>
            <span>
              <img src={mingcute_movie_line} alt="mingcute_movie_line" />
              Available
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>SHOPING MALL</p>
            <span>
              <img src={local_mall} alt="local_mall" />
              Available
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>TURF</p>
            <span>
              <img src={tabler_cricket} alt="tabler_cricket" />
              Available
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>ARENA</p>
            <span>
              <img src={gamingImg} alt="gamingImg" />
              Available
            </span>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <h3>Infrastructure & Utilities</h3>
        <div className="row gap-4 data-detail-row">
          <div className="col-md-2 row-individual-data">
            <p>MAINTENANCE</p>
            <span>
              <img src={Icon_Cleaning} alt="Icon_Cleaning" />
              Available
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>WATER SUPPLY</p>
            <span>
              <img src={water_full_outline} alt="water_full_outline" />
              Available
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>ROAD ACCESS</p>
            <span>
              <img src={Icon_Road} alt="Icon_Road" />
              Available
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>DRINAGE</p>
            <span>
              <img src={Icon_restroom} alt="Icon_restroom" />
              Available
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>PARKING</p>
            <span>
              <img src={Icon_Parking} alt="Icon_Parking" />
              Available
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>BALCONY</p>
            <span>
              <img src={Icon_Balcony} alt="Icon_Balcony" />
              Available
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>TERRACE</p>
            <span>
              <img src={icon_park_terrace} alt="icon_park_terrace" />
              Available
            </span>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <h3>Occupancy Restrictions</h3>
        <div className="row gap-4 data-detail-row">
          <div className="col-md-2 row-individual-data">
            <p>GUESTS</p>
            <span>
              <img src={solar_user} alt="solar_user" />
              Allowed
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>PETS</p>
            <span>
              <img src={streamline_pets} alt="streamline_pets" />
              Allowed
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>BACHELORS</p>
            <span>
              <img src={Icon_Lift} alt="Icon_Lift" />
              Allowed
            </span>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <h3>Connectivity & Security Features</h3>
        <div className="row gap-4 data-detail-row">
          <div className="col-md-2 row-individual-data">
            <p>ELECTRICITY</p>
            <span>
              <img
                src={streamline_flex_network}
                alt="streamline_flex_network"
              />
              Private
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>SECURITY</p>
            <span>
              <img src={user_security} alt="user_security" />
              15 Feet
            </span>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <h3>Move-In Accessibility</h3>
        <div className="row gap-4 data-detail-row">
          <div className="col-md-2 row-individual-data">
            <p>RAMP ACCESS</p>
            <span>
              <img src={ramp_up} alt="ramp_up" />
              {propertyData?.propertyType}
            </span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>STAIR ACCESS</p>
            <span>
              <img src={footStepImg} alt="footStepImg" />
              Shop
            </span>
          </div>
        </div>
      </section>

      <section className="propertyDes">
        <h3 className="mb-4">Description</h3>
        <div className="bg-light rounded">
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
                <MapComponent />
              </GoogleMapsWrapper>
          </div>
          <div className="location-detail col-md-6">
            <div className="address">
              <h3>Full Address</h3>
              <p>321-B Valluvar Street, Vellapalayam, Perambalur</p>
            </div>
            <div className="lat-long row">
              <div className="lat col-md-6">
                <h3>Latitude</h3>
                <p>11.4323242</p>
              </div>
              <div className="long col-md-6">
                <h3>Longitude</h3>
                <p>19.4323242</p>
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
                  <p>2 Kms</p>
                </div>
                <div className="Airport col-md-3">
                  <h3>
                    <img src={ph_airplane} alt="ph_airplane" />
                    Airport
                  </h3>
                  <p>34 Kms</p>
                </div>
                <div className="Metro col-md-3">
                  <h3>
                    <img src={metro} alt="" />
                    Metro
                  </h3>
                  <p>125 Kms</p>
                </div>
                <div className="Railway col-md-3">
                  <h3>
                    <img src={light_train} alt="light_train" />
                    Railway
                  </h3>
                  <p>34 Kms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <div className="row  data-detail-row">
          <div className="col-md-6 row-individual-data">
            <h3>Nearby Services & Essentials</h3>
            <span className="inline-style">
              <img src={mage_electricity} alt="mage_electricity" />
              Separate Electricity Billing
            </span>
          </div>
          <div className="col-md-6 row-individual-data">
            <h3>Move-In Accessibility</h3>
            <div className="essential">
              <span className="inline-style">
                <img src={ramp_up} alt="ramp_up" />
                Ramp Access
              </span>
              <span className="inline-style">
                <img src={footStepImg} alt="footStepImg" />
                Only via Stairs
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <div className="row  data-detail-row">
          <div className="col-md-6 row-individual-data">
            <h3>Infrastructure & Utilities</h3>
            <div className="Utilities ">
              <span className="inline-style ">
                <img src={Icon_Cleaning} alt="Icon_Cleaning" />
                Regular Maintenance Included
              </span>
              <span className="inline-style ">
                <img src={water_full_outline} alt="footStepImg" />
                Water Supply Available
              </span>
              <span className="inline-style inline-style-3 ">
                <img src={Icon_restroom} alt="Icon_restroom" />
                Sewage Connection Available
              </span>
            </div>
          </div>
          <div className="col-md-6 row-individual-data">
            <h3>Occupancy Restrictions</h3>
            <span className="inline-style">
              <img src={streamline_pets} alt="streamline_pets" />
              No Pets Allowed
            </span>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <h3>Owner Information</h3>
        <div className="owner-info row">
          <div className="name inner-div col-md-4">
            <img src={solar_user} alt="solar_user" />
            <p>Name</p>
            <h6>Naveen raj R</h6>
          </div>
          <div className="number-outer col-md-4">
            <div className="number inner-div  col-md-4">
              <img src={solar_phone} alt="solar_phone" />
              <p>Phone number</p>
              <h6>9876543210</h6>
            </div>
          </div>
          <div className="email inner-div col-md-4">
            <img src={proicons_mail} alt="proicons_mail" />
            <p>Email</p>
            <h6>Naveenraj.st@gmail.com</h6>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <div className="area-icon row">
          <div className="view-area row col-md-6">
            <div className="text-center col-md-3">
              <p className="mb-1 caps">Rent</p>
              <h3 className="mb-1">₹20,000 </h3>
              <p className="text-muted">Per Month</p>
            </div>
            <div className="text-center col-md-3">
              <p className="mb-1 caps">Tenure</p>
              <h3 className="mb-1">4 Years</h3>
            </div>
          </div>
          <div className="view-property-icon col-md-6">
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

export default ViewProperty;
