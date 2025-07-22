import {  useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DynamicBreadcrumbs } from "../../../Common/input";
import ViewCarousel from "../../../Common/ViewCarousel/ViewCarousel";
import GoogleMapsWrapper from "../../../Common/LocationPicker/GoogleMapWrapper";
import type { ResidentialProperty } from "./ResidencialViewProperty.modal";
import "./ResidentialViewProperty.scss";
import Icon_edit from "../../../../assets/viewProperty/Icon_edit.png";
import Icon_Tick from "../../../../assets/viewProperty/Icon_Tick.png";
import Icon_Deny from "../../../../assets/viewProperty/Icon_Deny.png";
import Icon_Delete from "../../../../assets/viewProperty/Icon_Delete.png";
import SqrtImage from "../../../../assets/viewProperty/radix-icons_dimensions.svg";
import facingImage from "../../../../assets/viewProperty/Icon_Facing.svg";
import dateImage from "../../../../assets/viewProperty/solar_calendar-outline.svg";
import footStepImg from "../../../../assets/viewProperty/material-steps.svg";
import roomImg from "../../../../assets/viewProperty/material-room.svg";
import furnitureImg from "../../../../assets/viewProperty/streamline-block_shopping-furniture.svg";
import gamingImg from "../../../../assets/viewProperty/hugeicons_game.svg";
import mage_electricity from "../../../../assets/viewProperty/mage_electricity.svg";
// import tree_outline from "../../../../assets/viewProperty/tree_outline.svg";
import weixin_market from "../../../../assets/viewProperty/weixin-market.svg";
import equipment_gym from "../../../../assets/viewProperty/hugeicons_equipment-gym-03.svg";
// import mingcute_movie_line from "../../../../assets/viewProperty/mingcute_movie-line.svg";
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
import MapComponent from "../../../Common/LocationPicker/LocationPicker";

import backIcon from "../../../../assets/dashboardtab/icon-park-outline_down.svg";


interface PropertyResponse {
  property: ResidentialProperty ;
}

const ViewProperty= () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();
  const token = localStorage.getItem("token");

  const [property, setProperty] = useState<PropertyResponse | null>(null);
  // const propertyData = location.state?.data as ResidentialProperty;

  useEffect(() => {
    console.log("API call URL:", `${import.meta.env.VITE_BackEndUrl}/api/residential/${id}`);
    axios
      .get(`${import.meta.env.VITE_BackEndUrl}/api/residential/${id}`,
         {
          headers: {
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          },
        }
      )
      .then((res) => setProperty(res.data))
      .catch((err) => console.error("Error fetching property:", err));
      toast.error("Failed to load property");
  }, [id, token]);

  const handleEdit = () => {
    navigate(`/edit-residential/${property?.property._id}`, {
      state: { data: property?.property },
    });
  };

  // Unified status update function for approve, deny, delete, sold
  const updateResidentialPermissionStatus = async (status: "0" | "1" | "2" | "3") => {
    if (!token) {
      toast.error("Authentication token missing");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BackEndUrl}/api/adminpermission`,
        {
          status, // 0=Rejected, 1=Approved, 2=Deleted, 3=Sold
          properties: [
            {
              type: "residential",
              id: property?.property._id,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const action =
        status === "1"
          ? "Approved"
          : status === "0"
          ? "Denied"
          : status === "2"
          ? "Deleted"
          : "Sold";

      toast.success(`Property ${action.toLowerCase()} successfully`);

      if (status === "2") {
        navigate("/property-management"); // Redirect after delete
      }
    } catch (error) {
      toast.error("Action failed");
      console.error(error);
    }
  };


  if (!property) return <div>Loading...</div>;

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
          <img src={backIcon} alt="backIcon" />
          Back
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
        property?.property?.area?.buitUpArea ||
        property?.property?.area?.carpetArea ||
        property?.property?.facingDirection ||
        property?.property?.createdAt ||
        property?.property?.totalFloors ||
        property?.property?.propertyFloor ||
        property?.property?.furnishingType ||
        property?.property?.rooms) && (
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

            {property?.property?.area?.buitUpArea && (
              <div className="col-md-2 row-individual-data">
                <p>BUILTUP AREA</p>
                <span>
                  <img src={SqrtImage} alt="dimention" />
                  {property.property.area.buitUpArea}
                </span>
              </div>
            )}

            {property?.property?.area?.carpetArea && (
              <div className="col-md-2 row-individual-data">
                <p>CARPET AREA</p>
                <span>
                  <img src={SqrtImage} alt="dimention" />
                  {property.property.area.carpetArea}
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

            {property?.property?.createdAt && (
              <div className="col-md-2 row-individual-data">
                <p>POSTED ON</p>
                <span>
                  <img src={dateImage} alt="date" />
                  {property.property.createdAt}
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

            {property?.property?.furnishingType && (
              <div className="col-md-2 row-individual-data">
                <p>FURNISH TYPE</p>
                <span>
                  <img src={furnitureImg} alt="Facing" />
                  {property.property.furnishingType}
                </span>
              </div>
            )}

            {property?.property?.rooms && (
              <div className="col-md-2 row-individual-data">
                <p>ROOMS</p>
                <span>
                  <img src={roomImg} alt="room" />
                  {property.property.rooms}
                </span>
              </div>
            )}
          </div>
        </section>
      )}
      {(property?.property?.amenities?.separateEBConnection ||
        property?.property?.amenities?.nearbyMarket ||
        property?.property?.amenities?.nearbyGym ||
        property?.property?.amenities?.nearbyMall ||
        property?.property?.amenities?.nearbyTurf ||
        property?.property?.amenities?.nearbyArena) && (
        <section className="midDetails">
          <h3>Nearby Services & Essentials</h3>
          <div className="row gap-4 data-detail-row">
            {property?.property?.amenities?.separateEBConnection && (
              <div className="col-md-2 row-individual-data">
                <p>SEPARATE EB CONNECTION</p>
                <span>
                  <img src={mage_electricity} alt="mage_electricity" />
                  {property.property.amenities.separateEBConnection}
                </span>
              </div>
            )}

            {property?.property?.amenities?.nearbyMarket && (
              <div className="col-md-2 row-individual-data">
                <p>MARKET</p>
                <span>
                  <img src={weixin_market} alt="weixin_market" />
                  {property.property.amenities.nearbyMarket}
                </span>
              </div>
            )}

            {property?.property?.amenities?.nearbyGym && (
              <div className="col-md-2 row-individual-data">
                <p>GYM</p>
                <span>
                  <img src={equipment_gym} alt="equipment_gym" />
                  {property.property.amenities.nearbyGym}
                </span>
              </div>
            )}

            {property?.property?.amenities?.nearbyMall && (
              <div className="col-md-2 row-individual-data">
                <p>SHOPPING MALL</p>
                <span>
                  <img src={local_mall} alt="local_mall" />
                  {property.property.amenities.nearbyMall}
                </span>
              </div>
            )}

            {property?.property?.amenities?.nearbyTurf && (
              <div className="col-md-2 row-individual-data">
                <p>TURF</p>
                <span>
                  <img src={tabler_cricket} alt="tabler_cricket" />
                  {property.property.amenities.nearbyTurf}
                </span>
              </div>
            )}

            {property?.property?.amenities?.nearbyArena && (
              <div className="col-md-2 row-individual-data">
                <p>ARENA</p>
                <span>
                  <img src={gamingImg} alt="gamingImg" />
                  {property.property.amenities.nearbyArena}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      {(property?.property?.facility?.maintenance ||
        property?.property?.facility?.waterFacility ||
        property?.property?.facility?.roadFacility ||
        property?.property?.facility?.drainage ||
        property?.property?.facility?.parking ||
        property?.property?.facility?.balcony ||
        property?.property?.facility?.terrace) && (
        <section className="midDetails">
          <h3>Infrastructure & Utilities</h3>
          <div className="row gap-4 data-detail-row">
            {/* MAINTENANCE */}
            {property?.property?.facility?.maintenance && (
              <div className="col-md-2 row-individual-data">
                <p>MAINTENANCE</p>
                <span>
                  <img src={Icon_Cleaning} alt="Icon_Cleaning" />
                  {property.property.facility.maintenance}
                </span>
              </div>
            )}

            {/* WATER SUPPLY */}
            {property?.property?.facility?.waterFacility && (
              <div className="col-md-2 row-individual-data">
                <p>WATER SUPPLY</p>
                <span>
                  <img src={water_full_outline} alt="water_full_outline" />
                  {property.property.facility.waterFacility}
                </span>
              </div>
            )}

            {/* ROAD ACCESS */}
            {property?.property?.facility?.roadFacility && (
              <div className="col-md-2 row-individual-data">
                <p>ROAD ACCESS</p>
                <span>
                  <img src={Icon_Road} alt="Icon_Road" />
                  {property.property.facility.roadFacility}
                </span>
              </div>
            )}

            {/* DRAINAGE */}
            {property?.property?.facility?.drainage && (
              <div className="col-md-2 row-individual-data">
                <p>DRAINAGE</p>
                <span>
                  <img src={Icon_restroom} alt="Icon_restroom" />
                  {property.property.facility.drainage}
                </span>
              </div>
            )}

            {/* PARKING */}
            {property?.property?.facility?.parking && (
              <div className="col-md-2 row-individual-data">
                <p>PARKING</p>
                <span>
                  <img src={Icon_Parking} alt="Icon_Parking" />
                  {property.property.facility.parking}
                </span>
              </div>
            )}

            {/* BALCONY */}
            {property?.property?.facility?.balcony && (
              <div className="col-md-2 row-individual-data">
                <p>BALCONY</p>
                <span>
                  <img src={Icon_Balcony} alt="Icon_Balcony" />
                  {property.property.facility.balcony}
                </span>
              </div>
            )}

            {/* TERRACE */}
            {property?.property?.facility?.terrace && (
              <div className="col-md-2 row-individual-data">
                <p>TERRACE</p>
                <span>
                  <img src={icon_park_terrace} alt="icon_park_terrace" />
                  {property.property.facility.terrace}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      {(property?.property?.restrictions?.guestAllowed ||
        property?.property?.restrictions?.petsAllowed ||
        property?.property?.restrictions?.bachelorsAllowed) && (
        <section className="midDetails">
          <h3>Occupancy Restrictions</h3>
          <div className="row gap-4 data-detail-row">
            {property?.property?.restrictions?.guestAllowed && (
              <div className="col-md-2 row-individual-data">
                <p>GUESTS</p>
                <span>
                  <img src={solar_user} alt="solar_user" />
                  {property.property.restrictions.guestAllowed}
                </span>
              </div>
            )}

            {property?.property?.restrictions?.petsAllowed && (
              <div className="col-md-2 row-individual-data">
                <p>PETS</p>
                <span>
                  <img src={streamline_pets} alt="streamline_pets" />
                  {property.property.restrictions.petsAllowed}
                </span>
              </div>
            )}

            {property?.property?.restrictions?.bachelorsAllowed && (
              <div className="col-md-2 row-individual-data">
                <p>BACHELORS</p>
                <span>
                  <img src={Icon_Lift} alt="Icon_Lift" />
                  {property.property.restrictions.bachelorsAllowed}
                </span>
              </div>
            )}
          </div>
        </section>
      )}
      {(property?.property?.amenities?.separateEBConnection ||
        property?.property?.availability?.securities) && (
        <section className="midDetails">
          <h3>Connectivity & Security Features</h3>
          <div className="row gap-4 data-detail-row">
            {/* ELECTRICITY */}
            {property?.property?.amenities?.separateEBConnection && (
              <div className="col-md-2 row-individual-data">
                <p>ELECTRICITY</p>
                <span>
                  <img
                    src={streamline_flex_network}
                    alt="streamline_flex_network"
                  />
                  {property.property.amenities.separateEBConnection}
                </span>
              </div>
            )}

            {/* SECURITY */}
            {property?.property?.availability?.securities && (
              <div className="col-md-2 row-individual-data">
                <p>SECURITY</p>
                <span>
                  <img src={user_security} alt="user_security" />
                  {property.property.availability.securities}
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
        <div className="owner-info gap-2 row">
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
              <button className="btn edit-btn d-flex align-items-center gap-1"
               onClick={handleEdit}>
                <img src={Icon_edit} alt="Edit Icon" />
                <p className="mb-0">Edit</p>
              </button>
              <button className="btn approve-btn d-flex align-items-center gap-1"
              onClick={() => updateResidentialPermissionStatus("1")}>
                <img src={Icon_Tick} alt="Approve Icon" />
                <p className="mb-0">Approve</p>
              </button>
              <button className="btn deny-btn d-flex align-items-center gap-1"
              onClick={() => updateResidentialPermissionStatus("0")}>
                <img src={Icon_Deny} alt="Deny Icon" />
                <p className="mb-0">Deny</p>
              </button>
              <button className="btn delete-btn d-flex align-items-center gap-1"
              onClick={() => updateResidentialPermissionStatus("2")}>
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