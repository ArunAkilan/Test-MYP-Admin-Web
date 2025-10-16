import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DynamicBreadcrumbs } from "../../../Common/input";
import ViewCarousel from "../../../Common/ViewCarousel/ViewCarousel";
import GoogleMapsWrapper from "../../../Common/LocationPicker/GoogleMapWrapper";
import type { 
  ResidentialPropertyResponse,
  AmountInfoInterface,
  StatusInfoInterface,
  CoordinatesInterface,
  // TransportDataInterface,
  NegotiableInfoInterface,
  TimeDisplayInterface,
  StatusActionInterface
} from "./ResidencialViewProperty.modal";
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
import weixin_market from "../../../../assets/viewProperty/weixin-market.svg";
import equipment_gym from "../../../../assets/viewProperty/hugeicons_equipment-gym-03.svg";
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
// import Icon_Bus from "../../../../assets/viewProperty/Icon_Bus.png";
// import ph_airplane from "../../../../assets/viewProperty/ph_airplane-in-flight.png";
// import metro from "../../../../assets/viewProperty/hugeicons_metro.png";
// import light_train from "../../../../assets/viewProperty/light_train.png";
import proicons_mail from "../../../../assets/viewProperty/proicons_mail.png";
import solar_phone from "../../../../assets/viewProperty/solar_phone.png";
import MapComponent from "../../../Common/LocationPicker/LocationPicker";
import backIcon from "../../../../assets/dashboardtab/icon-park-outline_down.svg";
import { useLocation } from "react-router-dom";

const ViewProperty = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [property, setProperty] = useState<ResidentialPropertyResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState<string>("");

  useEffect(() => {
    console.log(
      "API call URL:",
      `${import.meta.env.VITE_BackEndUrl}/api/residential/${id}`
    );
    axios
      .get(`${import.meta.env.VITE_BackEndUrl}/api/residential/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProperty(res.data))
      .catch((err) => {
        console.error("Error fetching property:", err);
        toast.error("Failed to load property");
      });
  }, [id, token]);

  if (!property) return <div className="loading-container">Loading...</div>;

  // Dynamic coordinates processing - NO functions
  const latitudeRaw = property?.property?.location?.map?.latitude;
  const longitudeRaw = property?.property?.location?.map?.longitude;
  const coordinates: CoordinatesInterface = {
    latitude: typeof latitudeRaw === "number"
      ? latitudeRaw
      : typeof latitudeRaw === "string" && !isNaN(parseFloat(latitudeRaw))
      ? parseFloat(latitudeRaw)
      : undefined,
    longitude: typeof longitudeRaw === "number"
      ? longitudeRaw
      : typeof longitudeRaw === "string" && !isNaN(parseFloat(longitudeRaw))
      ? parseFloat(longitudeRaw)
      : undefined
  };

  // Dynamic path processing - inline logic
  const pathSegments = location.pathname.split("/");
  const propertyType = pathSegments[1];
  const typeLabel: string = 
    propertyType === "residential" ? "Residential TYPE" :
    propertyType === "commercial" ? "Commercial TYPE" :
    propertyType === "plot" ? "Plot TYPE" : "PROPERTY TYPE";

  // Dynamic amount information processing - NO functions
  const amountInfo: AmountInfoInterface = 
    property?.property?.propertyType === "Rent" ? {
      amount: property?.property?.rent?.rentAmount || 0,
      label: "Per Month",
      showDeposit: true,
      deposit: property?.property?.rent?.advanceAmount || 0,
      agreement: property?.property?.rent?.agreementTiming,
    } : property?.property?.propertyType === "Lease" ? {
      amount: property?.property?.lease?.leaseAmount || 0,
      label: "Lease Amount", 
      showDeposit: false,
      deposit: 0,
      tenure: property?.property?.lease?.leaseTenure,
    } : property?.property?.propertyType === "Sale" ? {
      amount: property?.property?.sale?.saleAmount || 0,
      label: "Sale Price",
      showDeposit: false,
      deposit: 0,
    } : { amount: 0, label: "Amount", showDeposit: false, deposit: 0 };

  // Dynamic status information processing - NO "Under Review" - NO functions
  const statusInfo: StatusInfoInterface = 
    property?.property?.status === "Approved" ? { label: "Available", class: "available" } :
    property?.property?.status === "Pending" ? { label: "Pending Approval", class: "pending" } :
    property?.property?.status === "Rejected" ? { label: "Rejected", class: "rejected" } :
    property?.property?.status === "Deleted" ? { label: "Deleted", class: "deleted" } :
    property?.property?.propertyType === "Rent" && property?.property?.status === "Rented Out" ? 
      { label: "Rented Out", class: "rented-out" } :
    property?.property?.propertyType === "Lease" && property?.property?.status === "Leased Out" ? 
      { label: "Leased Out", class: "leased-out" } :
    property?.property?.propertyType === "Sale" && property?.property?.status === "Sold Out" ? 
      { label: "Sold Out", class: "sold-out" } :
    { label: property?.property?.status || "Pending Action", class: "pending-action" };

  // Dynamic negotiable information processing - NO functions
  const negotiableInfo: NegotiableInfoInterface = 
    property?.property?.propertyType === "Rent" ? {
      isNegotiable: property?.property?.rent?.negotiable || false,
      label: property?.property?.rent?.negotiable ? "Yes" : "No"
    } : property?.property?.propertyType === "Lease" ? {
      isNegotiable: property?.property?.lease?.negotiable || false,
      label: property?.property?.lease?.negotiable ? "Yes" : "No"
    } : property?.property?.propertyType === "Sale" ? {
      isNegotiable: property?.property?.sale?.negotiable || false,
      label: property?.property?.sale?.negotiable ? "Yes" : "No"
    } : { isNegotiable: false, label: "No" };

  // Dynamic time display processing - NO functions
  const agreementTimeDisplay: TimeDisplayInterface = {
    value: amountInfo.agreement || "",
    formatted: !amountInfo.agreement ? "-" :
      isNaN(Number(amountInfo.agreement)) ? amountInfo.agreement :
      Number(amountInfo.agreement) === 12 ? "12 Months" :
      Number(amountInfo.agreement) === 1 ? "1 Year" :
      `${Number(amountInfo.agreement)} Years`
  };

  const tenureTimeDisplay: TimeDisplayInterface = {
    value: amountInfo.tenure || "",
    formatted: !amountInfo.tenure ? "-" :
      isNaN(Number(amountInfo.tenure)) ? amountInfo.tenure :
      Number(amountInfo.tenure) === 12 ? "12 Months" :
      Number(amountInfo.tenure) === 1 ? "1 Year" :
      `${Number(amountInfo.tenure)} Years`
  };

  // Dynamic transport data processing - NO functions
  // const transportData: TransportDataInterface = {
  //   busStop: typeof property?.property?.availability?.transport?.nearbyBusStop === "string"
  //     ? property.property.availability.transport.nearbyBusStop
  //     : property?.property?.availability?.transport?.nearbyBusStop ? "Available" : "0 KM",
  //   airport: typeof property?.property?.availability?.transport?.nearbyAirport === "string"
  //     ? property.property.availability.transport.nearbyAirport
  //     : property?.property?.availability?.transport?.nearbyAirport ? "Available" : "0 KM",
  //   metro: typeof property?.property?.availability?.transport?.nearbyPort === "string"
  //     ? property.property.availability.transport.nearbyPort
  //     : property?.property?.availability?.transport?.nearbyPort ? "Available" : "0 KM",
  //   railway: "0 KM"
  // };

  // Dynamic status action mapping - NO functions
  const statusActionMap: Record<string, StatusActionInterface> = {
    "0": { status: "0", label: "Rejected", route: "/residential?tab=deleted" },
    "1": { status: "1", label: "Approved", route: "/residential" },
    "2": { status: "2", label: "Deleted", route: "/residential?tab=deleted" },
    "3": { status: "3", label: "Sold Out", route: "/residential?tab=deleted" },
    "4": { status: "4", label: "Leased Out", route: "/residential?tab=deleted" },
    "5": { status: "5", label: "Rented Out", route: "/residential?tab=deleted" },
  };

  return (
    <section className="container pt-4">
      <div className="breadcrumb">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          <img src={backIcon} alt="backIcon" />
          Back
        </button>
        <DynamicBreadcrumbs title={property?.property?.title} />
      </div>

      <div className="slick-carousel">
        <ViewCarousel images={property?.property?.images || []} />
      </div>

      <section className="row address-detail">
  <div className="d-flex title-address col-md-6">
    <div className="landmark-type">
      <h3 className="mb-0">{property?.property?.title}</h3>
      <button className={`${property?.property?.propertyType} detail-type`}>
        {property?.property?.propertyType}
      </button>
      
      {/* Show completion status based on property type */}
      <button className={`detail-status-type ${
        property?.property?.propertyType === "Rent" && property?.property?.status === "Rented Out" ? "rented-out" :
        property?.property?.propertyType === "Lease" && property?.property?.status === "Leased Out" ? "leased-out" :
        property?.property?.propertyType === "Sale" && property?.property?.status === "Sold Out" ? "sold-out" :
        property?.property?.status === "Approved" ? "available" :
        property?.property?.status === "Pending" ? "pending" :
        property?.property?.status === "Rejected" ? "rejected" :
        property?.property?.status === "Deleted" ? "deleted" : "pending"
      }`}>
        {property?.property?.propertyType === "Rent" && property?.property?.status === "Rented Out" ? "Rented Out" :
         property?.property?.propertyType === "Lease" && property?.property?.status === "Leased Out" ? "Leased Out" :
         property?.property?.propertyType === "Sale" && property?.property?.status === "Sold Out" ? "Sold Out" :
         property?.property?.status === "Approved" ? "Available" :
         property?.property?.status === "Pending" ? "Pending Approval" :
         property?.property?.status === "Rejected" ? "Rejected" :
         property?.property?.status === "Deleted" ? "Deleted" :
         "Pending Action"}
      </button>
    </div>

    <p className="lead mb-3">
      Property for {property?.property?.propertyType}
    </p>
    <div className="d-flex align-items-center">
      <img
        src={`${import.meta.env.VITE_BASE_URL}/ICON_Location.svg`}
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
                {property?.property?.area?.totalArea || "-"}
              </h3>
            </div>
            <div className="area-facing-divider"></div>
            <div className="text-center">
              <p className="mb-1">Amount</p>
              <h3 className="mb-1 user-result-data">
                ₹{amountInfo.amount.toLocaleString()}
              </h3>
              {amountInfo.label && (
                <p className="text-muted">{amountInfo.label}</p>
              )}
            </div>
            {amountInfo.showDeposit && (
              <>
                <div className="area-facing-divider"></div>
                <div className="text-center deposit-amount">
                  <p className="mb-1">Deposit Amount</p>
                  <h3 className="mb-1 user-result-data">
                    ₹{amountInfo.deposit.toLocaleString()}
                  </h3>
                </div>
              </>
            )}
            {agreementTimeDisplay.value && (
              <>
                <div className="area-facing-divider"></div>
                <div className="text-center tenure-days">
                  <p className="mb-1">AGREEMENT</p>
                  <h3 className="mb-1 user-result-data">
                    {agreementTimeDisplay.formatted}
                  </h3>
                </div>
              </>
            )}
            {tenureTimeDisplay.value && (
              <>
                <div className="area-facing-divider"></div>
                <div className="text-center tenure-days">
                  <p className="mb-1">LEASE TENURE</p>
                  <h3 className="mb-1 user-result-data">
                    {tenureTimeDisplay.formatted}
                  </h3>
                </div>
              </>
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
            <p>{typeLabel}</p>
            <span>{property?.property?.residentialType}</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>Negotiable</p>
            <span>{negotiableInfo.label}</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>STATUS</p>
            <span className={`status-badge ${statusInfo.class}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>
      </section>

      {(property?.property?.area?.totalArea ||
        property?.property?.area?.builtUpArea ||
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
                  <img src={SqrtImage} alt="dimension" />
                  {property.property.area.totalArea}
                </span>
              </div>
            )}

            {property?.property?.area?.builtUpArea && (
              <div className="col-md-2 row-individual-data">
                <p>BUILTUP AREA</p>
                <span>
                  <img src={SqrtImage} alt="dimension" />
                  {property.property.area.builtUpArea}
                </span>
              </div>
            )}

            {property?.property?.area?.carpetArea && (
              <div className="col-md-2 row-individual-data">
                <p>CARPET AREA</p>
                <span>
                  <img src={SqrtImage} alt="dimension" />
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
                  {new Date(property?.property?.createdAt).toLocaleDateString("en-GB")}
                </span>
              </div>
            )}

            {property?.property?.totalFloors  > 0 && (
              <div className="col-md-2 row-individual-data">
                <p>TOTAL FLOORS</p>
                <span>
                  <img src={footStepImg} alt="Floors" />
                  {property.property.totalFloors}
                </span>
              </div>
            )}

            {property?.property?.propertyFloor !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>PROPERTY ON</p>
                <span>
                  <img src={footStepImg} alt="Floor" />
                  {property.property.propertyFloor}
                </span>
              </div>
            )}

            {property?.property?.furnishingType && (
              <div className="col-md-2 row-individual-data">
                <p>FURNISH TYPE</p>
                <span>
                  <img src={furnitureImg} alt="Furniture" />
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

      {(property?.property?.amenities?.separateEBConnection !== undefined ||
        property?.property?.amenities?.nearbyMarket !== undefined ||
        property?.property?.amenities?.nearbyGym !== undefined ||
        property?.property?.amenities?.nearbyMall !== undefined ||
        property?.property?.amenities?.nearbyTurf !== undefined ||
        property?.property?.amenities?.nearbyArena !== undefined) && (
        <section className="midDetails">
          <h3>Nearby Services & Essentials</h3>
          <div className="row gap-4 data-detail-row">
            {property?.property?.amenities?.separateEBConnection !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>SEPARATE EB CONNECTION</p>
                <span>
                  <img src={mage_electricity} alt="electricity" />
                  {property.property.amenities.separateEBConnection ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.amenities?.nearbyMarket !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>MARKET</p>
                <span>
                  <img src={weixin_market} alt="market" />
                  {property.property.amenities.nearbyMarket ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.amenities?.nearbyGym !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>GYM</p>
                <span>
                  <img src={equipment_gym} alt="gym" />
                  {property.property.amenities.nearbyGym ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.amenities?.nearbyMall !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>SHOPPING MALL</p>
                <span>
                  <img src={local_mall} alt="mall" />
                  {property.property.amenities.nearbyMall ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.amenities?.nearbyTurf !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>TURF</p>
                <span>
                  <img src={tabler_cricket} alt="turf" />
                  {property.property.amenities.nearbyTurf ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.amenities?.nearbyArena !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>ARENA</p>
                <span>
                  <img src={gamingImg} alt="arena" />
                  {property.property.amenities.nearbyArena ? "Available" : "Not Available"}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      {(property?.property?.facility?.maintenance !== undefined ||
        property?.property?.facility?.waterFacility !== undefined ||
        property?.property?.facility?.roadFacility !== undefined ||
        property?.property?.facility?.drainage !== undefined ||
        property?.property?.facility?.parking !== undefined ||
        property?.property?.facility?.balcony !== undefined ||
        property?.property?.facility?.terrace !== undefined) && (
        <section className="midDetails">
          <h3>Infrastructure & Utilities</h3>
          <div className="row gap-4 data-detail-row">
            {property?.property?.facility?.maintenance !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>MAINTENANCE</p>
                <span>
                  <img src={Icon_Cleaning} alt="maintenance" />
                  {property.property.facility.maintenance ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.facility?.waterFacility !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>WATER SUPPLY</p>
                <span>
                  <img src={water_full_outline} alt="water" />
                  {property.property.facility.waterFacility ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.facility?.roadFacility !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>ROAD ACCESS</p>
                <span>
                  <img src={Icon_Road} alt="road" />
                  {property.property.facility.roadFacility ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.facility?.drainage !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>DRAINAGE</p>
                <span>
                  <img src={Icon_restroom} alt="drainage" />
                  {property.property.facility.drainage ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.facility?.parking !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>PARKING</p>
                <span>
                  <img src={Icon_Parking} alt="parking" />
                  {property.property.facility.parking ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.facility?.balcony !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>BALCONY</p>
                <span>
                  <img src={Icon_Balcony} alt="balcony" />
                  {property.property.facility.balcony ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.facility?.terrace !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>TERRACE</p>
                <span>
                  <img src={icon_park_terrace} alt="terrace" />
                  {property.property.facility.terrace ? "Available" : "Not Available"}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      {(property?.property?.restrictions?.guestAllowed !== undefined ||
        property?.property?.restrictions?.petsAllowed !== undefined ||
        property?.property?.restrictions?.bachelorsAllowed !== undefined) && (
        <section className="midDetails">
          <h3>Occupancy Restrictions</h3>
          <div className="row gap-4 data-detail-row">
            {property?.property?.restrictions?.guestAllowed !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>GUESTS</p>
                <span>
                  <img src={solar_user} alt="guests" />
                  {property.property.restrictions.guestAllowed ? "Allowed" : "Not Allowed"}
                </span>
              </div>
            )}

            {property?.property?.restrictions?.petsAllowed !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>PETS</p>
                <span>
                  <img src={streamline_pets} alt="pets" />
                  {property.property.restrictions.petsAllowed ? "Allowed" : "Not Allowed"}
                </span>
              </div>
            )}

            {property?.property?.restrictions?.bachelorsAllowed !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>BACHELORS</p>
                <span>
                  <img src={Icon_Lift} alt="bachelors" />
                  {property.property.restrictions.bachelorsAllowed ? "Allowed" : "Not Allowed"}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      {(property?.property?.availability?.broadband !== undefined ||
        property?.property?.availability?.securities !== undefined) && (
        <section className="midDetails">
          <h3>Connectivity & Security Features</h3>
          <div className="row gap-4 data-detail-row">
            {property?.property?.availability?.broadband !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>BROADBAND</p>
                <span>
                  <img src={streamline_flex_network} alt="broadband" />
                  {property.property.availability.broadband ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.availability?.securities !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>SECURITY</p>
                <span>
                  <img src={user_security} alt="security" />
                  {property.property.availability.securities ? "Available" : "Not Available"}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      {(property?.property?.accessibility?.ramp !== undefined ||
        property?.property?.accessibility?.steps !== undefined ||
        property?.property?.accessibility?.lift !== undefined) && (
        <section className="midDetails">
          <h3>Move-In Accessibility</h3>
          <div className="row gap-4 data-detail-row">
            {property?.property?.accessibility?.ramp !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>RAMP ACCESS</p>
                <span>
                  <img src={ramp_up} alt="ramp" />
                  {property.property.accessibility.ramp ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.accessibility?.steps !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>STAIR ACCESS</p>
                <span>
                  <img src={footStepImg} alt="steps" />
                  {property.property.accessibility.steps ? "Available" : "Not Available"}
                </span>
              </div>
            )}

            {property?.property?.accessibility?.lift !== undefined && (
              <div className="col-md-2 row-individual-data">
                <p>LIFT</p>
                <span>
                  <img src={footStepImg} alt="lift" />
                  {property.property.accessibility.lift ? "Available" : "Not Available"}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="propertyDes">
        <h3 className="mb-4">Description</h3>
        <div>
          <p>{property?.property?.description || "No description available."}</p>
        </div>
      </section>

      <section className="google-location">
        <h3 className="mb-4 google-top">Location & Address</h3>
        <div className="map-row row">
          <div className="map-location col-md-6">
            <h3>Location</h3>
            <GoogleMapsWrapper>
              <MapComponent latitude={coordinates.latitude} longitude={coordinates.longitude} />
            </GoogleMapsWrapper>
          </div>
          <div className="location-detail col-md-6">
            <div className="address">
              <h3>Full Address</h3>
              <p>{property?.property?.location?.address}</p>
            </div>
            <div className="lat-long row">
              <div className="lat col-md-6">
                <h3>Latitude</h3>
                <p>{property?.property?.location?.map?.latitude}</p>
              </div>
              <div className="long col-md-6">
                <h3>Longitude</h3>
                <p>{property?.property?.location?.map?.longitude}</p>
              </div>
            </div>
            {/* <div className="transport">
              <h3 className="Nearby">Nearby Transportation</h3>
              <div className="transport-row row">
                <div className="busstand col-md-3">
                  <h3>
                    <img src={Icon_Bus} alt="Bus" />
                    Bus Stand
                  </h3>
                  <p>{transportData.busStop}</p>
                </div>
                <div className="Airport col-md-3">
                  <h3>
                    <img src={ph_airplane} alt="Airport" />
                    Airport
                  </h3>
                  <p>{transportData.airport}</p>
                </div>
                <div className="Metro col-md-3">
                  <h3>
                    <img src={metro} alt="Metro" />
                    Metro
                  </h3>
                  <p>{transportData.metro}</p>
                </div>
                <div className="Railway col-md-3">
                  <h3>
                    <img src={light_train} alt="Railway" />
                    Railway
                  </h3>
                  <p>{transportData.railway}</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="midDetails">
        <h3>Owner Information</h3>
        <div className="owner-info gap-2 row">
          <div className="name inner-div col-md-4">
            <img src={solar_user} alt="User" />
            <p>Name</p>
            <h6>
              {property?.property?.propertyOwner?.firstName} &nbsp;
              {property?.property?.propertyOwner?.lastName}
            </h6>
          </div>
          <div className="number-outer col-md-4">
            <div className="number inner-div col-md-4">
              <img src={solar_phone} alt="Phone" />
              <p>Phone Number</p>
              <h6>{property?.property?.propertyOwner?.contact?.phone1}</h6>
            </div>
          </div>
          <div className="email inner-div col-md-4">
            <img src={proicons_mail} alt="Email" />
            <p>Email</p>
            <h6>{property?.property?.propertyOwner?.contact?.email}</h6>
          </div>
        </div>
      </section>

      <section className="midDetails">
        <div className="area-icon">
          <div className="view-property-icon">
            <h3>Property Actions</h3>
            <div className="view-property-icon-inside">
              
              {/* Show approve/deny for pending properties */}
              {property?.property?.status === "Pending" && (
                <>
                  <button
                    className={`btn approve-btn d-flex align-items-center gap-1 ${
                      isProcessing === "Approve" ? "processing" : ""
                    }`}
                    onClick={async () => {
                      const statusAction = statusActionMap["1"];
                      if (!token) {
                        toast.error("Authentication token missing");
                        return;
                      }
                      if (isProcessing) {
                        toast.warning("Please wait, another action is in progress");
                        return;
                      }
                      setIsProcessing("Approve");
                      try {
                        const response = await axios.put(
                          `${import.meta.env.VITE_BackEndUrl}/api/adminpermission`,
                          {
                            status: statusAction.status,
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
                        if (property) {
                          const updatedProperty = { ...property };
                          updatedProperty.property.status = statusAction.label;
                          setProperty(updatedProperty);
                        }
                        toast.success(`Property ${statusAction.label.toLowerCase()} successfully! ${response.data.message}`);
                        setTimeout(() => {
                          navigate(statusAction.route);
                        }, 1500);
                      } catch (error: unknown) {
                        const errorMessage = axios.isAxiosError(error) 
                          ? error?.response?.data?.message || "Action failed"
                          : "Action failed";
                        toast.error(errorMessage);
                        console.error("Approve failed:", error);
                      } finally {
                        setIsProcessing("");
                      }
                    }}
                    disabled={isProcessing !== ""}
                  >
                    <img src={Icon_Tick} alt="Approve" />
                    <p className="mb-0">
                      {isProcessing === "Approve" ? "Processing..." : "Approve Property"}
                    </p>
                  </button>

                  <button
                    className={`btn deny-btn d-flex align-items-center gap-1 ${
                      isProcessing === "Deny" ? "processing" : ""
                    }`}
                    onClick={async () => {
                      const statusAction = statusActionMap["0"];
                      if (!token) {
                        toast.error("Authentication token missing");
                        return;
                      }
                      if (isProcessing) {
                        toast.warning("Please wait, another action is in progress");
                        return;
                      }
                      setIsProcessing("Deny");
                      try {
                        const response = await axios.put(
                          `${import.meta.env.VITE_BackEndUrl}/api/adminpermission`,
                          {
                            status: statusAction.status,
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
                        if (property) {
                          const updatedProperty = { ...property };
                          updatedProperty.property.status = statusAction.label;
                          setProperty(updatedProperty);
                        }
                        toast.success(`Property ${statusAction.label.toLowerCase()} successfully! ${response.data.message}`);
                        setTimeout(() => {
                          navigate(statusAction.route);
                        }, 1500);
                      } catch (error: unknown) {
                        const errorMessage = axios.isAxiosError(error) 
                          ? error?.response?.data?.message || "Action failed"
                          : "Action failed";
                        toast.error(errorMessage);
                        console.error("Deny failed:", error);
                      } finally {
                        setIsProcessing("");
                      }
                    }}
                    disabled={isProcessing !== ""}
                  >
                    <img src={Icon_Deny} alt="Deny" />
                    <p className="mb-0">
                      {isProcessing === "Deny" ? "Processing..." : "Reject Property"}
                    </p>
                  </button>
                </>
              )}

              {/* Always show edit button */}
              <button
                className="btn edit-btn d-flex align-items-center gap-1"
                onClick={() => {
                  if (!property) {
                    toast.error("Property data not available");
                    return;
                  }
                  const cleanItem = JSON.parse(JSON.stringify(property.property));
                  navigate(`/residential/create`, {
                    state: { data: cleanItem, mode: "edit" },
                  });
                }}
                disabled={isProcessing !== ""}
              >
                <img src={Icon_edit} alt="Edit" />
                <p className="mb-0">Edit Property</p>
              </button>

              {/* Always show delete button */}
              <button
                className={`btn delete-btn d-flex align-items-center gap-1 ${
                  isProcessing === "Delete" ? "processing" : ""
                }`}
                onClick={async () => {
                  const statusAction = statusActionMap["2"];
                  if (!token) {
                    toast.error("Authentication token missing");
                    return;
                  }
                  if (isProcessing) {
                    toast.warning("Please wait, another action is in progress");
                    return;
                  }
                  setIsProcessing("Delete");
                  try {
                    const response = await axios.put(
                      `${import.meta.env.VITE_BackEndUrl}/api/adminpermission`,
                      {
                        status: statusAction.status,
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
                    if (property) {
                      const updatedProperty = { ...property };
                      updatedProperty.property.status = statusAction.label;
                      setProperty(updatedProperty);
                    }
                    toast.success(`Property ${statusAction.label.toLowerCase()} successfully! ${response.data.message}`);
                    setTimeout(() => {
                      navigate(statusAction.route);
                    }, 1500);
                  } catch (error: unknown) {
                    const errorMessage = axios.isAxiosError(error) 
                      ? error?.response?.data?.message || "Action failed"
                      : "Action failed";
                    toast.error(errorMessage);
                    console.error("Delete failed:", error);
                  } finally {
                    setIsProcessing("");
                  }
                }}
                disabled={isProcessing !== ""}
              >
                <img src={Icon_Delete} alt="Delete" />
                <p className="mb-0">
                  {isProcessing === "Delete" ? "Processing..." : "Delete Property"}
                </p>
              </button>

              {/* Property Type Specific Status Buttons - Only show if not already in that state */}
              {property?.property?.propertyType === "Rent" && property?.property?.status !== "Rented Out" && (
                <button
                  className={`btn rented-out-btn d-flex align-items-center gap-1 ${
                    isProcessing === "Rented Out" ? "processing" : ""
                  }`}
                  onClick={async () => {
                    const statusAction = statusActionMap["5"];
                    if (!token) {
                      toast.error("Authentication token missing");
                      return;
                    }
                    if (isProcessing) {
                      toast.warning("Please wait, another action is in progress");
                      return;
                    }
                    setIsProcessing("Rented Out");
                    try {
                      const response = await axios.put(
                        `${import.meta.env.VITE_BackEndUrl}/api/adminpermission`,
                        {
                          status: statusAction.status,
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
                      if (property) {
                        const updatedProperty = { ...property };
                        updatedProperty.property.status = statusAction.label;
                        setProperty(updatedProperty);
                      }
                      toast.success(`Property ${statusAction.label.toLowerCase()} successfully! ${response.data.message}`);
                      setTimeout(() => {
                        navigate(statusAction.route);
                      }, 1500);
                    } catch (error: unknown) {
                      const errorMessage = axios.isAxiosError(error) 
                        ? error?.response?.data?.message || "Action failed"
                        : "Action failed";
                      toast.error(errorMessage);
                      console.error("Rented Out failed:", error);
                    } finally {
                      setIsProcessing("");
                    }
                  }}
                  disabled={isProcessing !== ""}
                >
                  <img src={Icon_Tick} alt="Rented Out" />
                  <p className="mb-0">
                    {isProcessing === "Rented Out" ? "Processing..." : "Mark as Rented"}
                  </p>
                </button>
              )}

              {property?.property?.propertyType === "Lease" && property?.property?.status !== "Leased Out" && (
                <button
                  className={`btn leased-out-btn d-flex align-items-center gap-1 ${
                    isProcessing === "Leased Out" ? "processing" : ""
                  }`}
                  onClick={async () => {
                    const statusAction = statusActionMap["4"];
                    if (!token) {
                      toast.error("Authentication token missing");
                      return;
                    }
                    if (isProcessing) {
                      toast.warning("Please wait, another action is in progress");
                      return;
                    }
                    setIsProcessing("Leased Out");
                    try {
                      const response = await axios.put(
                        `${import.meta.env.VITE_BackEndUrl}/api/adminpermission`,
                        {
                          status: statusAction.status,
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
                      if (property) {
                        const updatedProperty = { ...property };
                        updatedProperty.property.status = statusAction.label;
                        setProperty(updatedProperty);
                      }
                      toast.success(`Property ${statusAction.label.toLowerCase()} successfully! ${response.data.message}`);
                      setTimeout(() => {
                        navigate(statusAction.route);
                      }, 1500);
                    } catch (error: unknown) {
                      const errorMessage = axios.isAxiosError(error) 
                        ? error?.response?.data?.message || "Action failed"
                        : "Action failed";
                      toast.error(errorMessage);
                      console.error("Leased Out failed:", error);
                    } finally {
                      setIsProcessing("");
                    }
                  }}
                  disabled={isProcessing !== ""}
                >
                  <img src={Icon_Tick} alt="Leased Out" />
                  <p className="mb-0">
                    {isProcessing === "Leased Out" ? "Processing..." : "Mark as Leased"}
                  </p>
                </button>
              )}

              {property?.property?.propertyType === "Sale" && property?.property?.status !== "Sold Out" && (
                <button
                  className={`btn sold-out-btn d-flex align-items-center gap-1 ${
                    isProcessing === "Sold Out" ? "processing" : ""
                  }`}
                  onClick={async () => {
                    const statusAction = statusActionMap["3"];
                    if (!token) {
                      toast.error("Authentication token missing");
                      return;
                    }
                    if (isProcessing) {
                      toast.warning("Please wait, another action is in progress");
                      return;
                    }
                    setIsProcessing("Sold Out");
                    try {
                      const response = await axios.put(
                        `${import.meta.env.VITE_BackEndUrl}/api/adminpermission`,
                        {
                          status: statusAction.status,
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
                      if (property) {
                        const updatedProperty = { ...property };
                        updatedProperty.property.status = statusAction.label;
                        setProperty(updatedProperty);
                      }
                      toast.success(`Property ${statusAction.label.toLowerCase()} successfully! ${response.data.message}`);
                      setTimeout(() => {
                        navigate(statusAction.route);
                      }, 1500);
                    } catch (error: unknown) {
                      const errorMessage = axios.isAxiosError(error) 
                        ? error?.response?.data?.message || "Action failed"
                        : "Action failed";
                      toast.error(errorMessage);
                      console.error("Sold Out failed:", error);
                    } finally {
                      setIsProcessing("");
                    }
                  }}
                  disabled={isProcessing !== ""}
                >
                  <img src={Icon_Tick} alt="Sold Out" />
                  <p className="mb-0">
                    {isProcessing === "Sold Out" ? "Processing..." : "Mark as Sold"}
                  </p>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ViewProperty;
