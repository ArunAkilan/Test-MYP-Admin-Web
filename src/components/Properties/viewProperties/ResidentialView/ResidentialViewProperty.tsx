import type { ResidentialProperty } from "../../../AdminResidencial/AdminResidencial.model";
import { useLocation } from "react-router-dom";
import { DynamicBreadcrumbs } from "../../../Common/input";
import VIewCarousel from "../../../Common/ViewCarousel/ViewCarousel";
import "./ResidentialViewProperty.scss"
import SqrtImage from "../../../../assets/viewProperty/radix-icons_dimensions.svg"
import facingImage from "../../../../assets/viewProperty/Icon_Facing.svg"
import dateImage from "../../../../assets/viewProperty/solar_calendar-outline.svg"
import footStepImg from "../../../../assets/viewProperty/material-steps.svg"
import roomImg from "../../../../assets/viewProperty/material-room.svg"
import furnitureImg from "../../../../assets/viewProperty/streamline-block_shopping-furniture.svg"
import gamingImg from "../../../../assets/viewProperty/hugeicons_game.svg"
import mage_electricity from "../../../../assets/viewProperty/mage_electricity.svg"
import tree_outline from "../../../../assets/viewProperty/tree_outline.svg"
import weixin_market from "../../../../assets/viewProperty/weixin-market.svg"
import equipment_gym from "../../../../assets/viewProperty/hugeicons_equipment-gym-03.svg"
import mingcute_movie_line from "../../../../assets/viewProperty/mingcute_movie-line.svg"
import local_mall from "../../../../assets/viewProperty/local-mall.svg"
import Icon_Cleaning from "../../../../assets/viewProperty/Icon_Cleaning.svg"
import water_full_outline from "../../../../assets/viewProperty/water-full-outline.svg"
import Icon_Road from "../../../../assets/viewProperty/Icon_Road.svg"
import Icon_restroom from "../../../../assets/viewProperty/Icon_restroom.svg"
import Icon_Parking from "../../../../assets/viewProperty/Icon_Parking.svg"
import Icon_Balcony from "../../../../assets/viewProperty/Icon_Balcony.svg"
import icon_park_terrace from "../../../../assets/viewProperty/icon-park_terrace.svg"
import solar_user from "../../../../assets/viewProperty/solar_user.svg"
import streamline_pets from "../../../../assets/viewProperty/streamline_pets.svg"
import Icon_Lift from "../../../../assets/viewProperty/Icon_Lift.svg"
import streamline_flex_network from "../../../../assets/viewProperty/streamline-flex_network.svg"
import user_security from "../../../../assets/viewProperty/user-security.svg"
import ramp_up from "../../../../assets/viewProperty/ramp-up.svg"
import tabler_cricket from "../../../../assets/viewProperty/tabler_cricket.svg"

const ViewProperty = () => {
  const location = useLocation();
  const propertyData = location.state?.data as ResidentialProperty;

  console.log("mode", propertyData);

  if (!propertyData) {
    return <p className="mt-5">No property data found</p>;
  }

  return (
    <section className="container py-4">
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
      <DynamicBreadcrumbs />
      <div className="slick-carousel">
        <VIewCarousel />
      </div>
      <section className="row address-detail">
        <div className="d-flex title-address col-md-6  ">
          <div className="landmark-type">
            <h3 className="mb-0">{propertyData?.title}</h3>
            <button className="btn detail-type">
              {propertyData?.propertyType}
            </button>
            <button className="btn detail-status-type">
              Rented out
            </button>
          </div>
          

          <p className="lead mb-3">Shop for {propertyData?.propertyType}</p>
          <div className="d-flex align-items-center">
            <img
              src="../../../../../public/ICON_Location.svg"
              alt="Location Icon"
              className="me-2"
            />
            <p className="mb-0">{propertyData?.location?.address}</p>
          </div>
        </div>
        <div className="d-flex col-md-6 align-items-start area-facing-detail flex-wrap gap-4">
          <div className="area-facing-detail-inner-div w-100 mt-2">
            <div className="text-center">
              <p className="mb-1 caps">Area</p>
              <h3 className="mb-1">{propertyData?.totalArea}</h3>
              <p className="text-muted">Sq.Ft</p>
            </div>
            <div className="area-facing-divider"></div>
            <div className=" text-center">
              <p className="mb-1">Facing</p>
              <h3 className="mb-1 user-result-data">{propertyData?.facingDirection}</h3>
            </div>
             <div className="area-facing-divider"></div>
            <div className=" text-center">
              <p className="mb-1">Rent</p>
              <h3 className="mb-1 user-result-data" >{propertyData?.rent?.rentAmount}</h3>
              <p className="text-muted">Per Month</p>
            </div>
             <div className="area-facing-divider"></div>
            <div className=" text-center">
              <p className="mb-1">Deposit Amount</p>
              <h3 className="mb-1 user-result-data">
                ₹{propertyData?.rent?.depositAmount || "1,00,000"}
              </h3>
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
            <span><img src={SqrtImage} alt="dimention" />1400 Sq.Ft</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>BUILTUP AREA</p>
            <span><img src={SqrtImage} alt="dimention" />1400 Sq.Ft</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>CARPET AREA</p>
            <span><img src={SqrtImage} alt="dimention" />1400 Sq.Ft</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>FACING</p>
            <span><img src={facingImage} alt="Facing" />East</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>POSTED ON</p>
            <span><img src={dateImage} alt="date" />15 Aug 2025</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>TOTAL FLOORS</p>
            <span><img src={footStepImg} alt="Facing" />2</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>PROPERTY ON</p>
            <span><img src={footStepImg} alt="Facing" />2</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>FUSRNISH TYPE</p>
            <span><img src={furnitureImg} alt="Facing" />1400 Sq.Ft</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>ROOMS</p>
            <span><img src={roomImg} alt="Facing" />East</span>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <h3>Nearby Services & Essentials</h3>
        <div className="row gap-4 data-detail-row">
          <div className="col-md-2 row-individual-data">
            <p>ELECTRICITY</p>
            <span><img src={mage_electricity} alt="mage_electricity" />Available</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>PARK</p>
            <span><img src={tree_outline} alt="tree_outline" />Available</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>MARKET</p>
            <span><img src={weixin_market} alt="weixin_market" />Available</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>GYM</p>
            <span><img src={equipment_gym} alt="equipment_gym" />Available</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>MOVIE THEATRE</p>
            <span><img src={mingcute_movie_line} alt="mingcute_movie_line" />Available</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>SHOPING MALL</p>
            <span><img src={local_mall} alt="local_mall" />Available</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>TURF</p>
            <span><img src={tabler_cricket} alt="tabler_cricket" />Available</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>ARENA</p>
            <span><img src={gamingImg} alt="gamingImg" />Available</span>
          </div>
          
        </div>
      </section>
      <section className="midDetails">
        <h3>Infrastructure & Utilities</h3>
        <div className="row gap-4 data-detail-row">
          <div className="col-md-2 row-individual-data">
            <p>MAINTENANCE</p>
            <span><img src={Icon_Cleaning} alt="Icon_Cleaning" />Available</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>WATER SUPPLY</p>
            <span><img src={water_full_outline} alt="water_full_outline" />Available</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>ROAD ACCESS</p>
            <span><img src={Icon_Road} alt="Icon_Road" />Available</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>DRINAGE</p>
            <span><img src={Icon_restroom} alt="Icon_restroom" />Available</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>PARKING</p>
            <span><img src={Icon_Parking} alt="Icon_Parking" />Available</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>BALCONY</p>
            <span><img src={Icon_Balcony} alt="Icon_Balcony" />Available</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>TERRACE</p>
            <span><img src={icon_park_terrace} alt="icon_park_terrace" />Available</span>
          </div>
          
        </div>
      </section>
      <section className="midDetails">
        <h3>Occupancy Restrictions</h3>
        <div className="row gap-4 data-detail-row">
          <div className="col-md-2 row-individual-data">
            <p>GUESTS</p>
            <span><img src={solar_user} alt="solar_user" />Allowed</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>PETS</p>
            <span><img src={streamline_pets} alt="streamline_pets" />Allowed</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>BACHELORS</p>
            <span><img src={Icon_Lift} alt="Icon_Lift" />Allowed</span>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <h3>Connectivity & Security Features</h3>
        <div className="row gap-4 data-detail-row">
          <div className="col-md-2 row-individual-data">
            <p>ELECTRICITY</p>
            <span><img src={streamline_flex_network} alt="streamline_flex_network" />Private</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>SECURITY</p>
            <span><img src={user_security} alt="user_security" />15 Feet</span>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <h3>Move-In Accessibility</h3>
        <div className="row gap-4 data-detail-row">
          <div className="col-md-2 row-individual-data">
            <p>RAMP ACCESS</p>
            <span><img src={ramp_up} alt="ramp_up" />{propertyData?.propertyType}</span>
          </div>
          <div className="col-md-2 row-individual-data">
            <p>STAIR ACCESS</p>
            <span><img src={footStepImg} alt="footStepImg" />Shop</span>
          </div>
        </div>
      </section>

      <section className="propertyDes">
        <h3 className="mb-4">Description</h3>
        <div className="bg-light rounded">
          <p>Discover comfortable urban living in this 2BHK unit located in the well-connected Perambalur Green Enclave. Spanning 1,200 sq ft of total area with a built-up space of 950 sq ft, this 2nd-floor apartment offers a carpet area of 800 sq ft, ensuring ample room for cozy living.</p>

          <p className="mb-0">
            This South-facing home invites natural light throughout the day and features unfurnished interiors—ideal for tenants who prefer to style their space from scratch. Located just minutes from schools, markets, and public transport, it’s an excellent choice for families or working professionals.
          </p>
        </div>
      </section>
      <section className="propertyDes">
        <h3 className="mb-4">Description</h3>
        <div className="map-row row">
          <div className="map-location"></div>
        </div>
      </section>

      <section className="propertyOwnerInfo">
        <h3 className="mb-4">Owner Information</h3>
        <div className="d-flex flex-wrap gap-4 mb-4">
          {[...Array(3)].map((_, i) => (
            <div className="text-center" key={i}>
              <img src="" alt="Owner" className="mb-2" />
              <p className="mb-1">Name</p>
              <p className="fw-bold">{propertyData?.owner?.firstName}</p>
            </div>
          ))}
        </div>

        <h3 className="text-primary mb-4">
          ₹{propertyData?.rent?.rentAmount} / Month
        </h3>

        <div className="d-flex gap-3 mb-3">
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
            <img src="" alt="Edit Icon" />
            <p className="mb-0">Edit</p>
          </button>
          <button className="btn btn-primary d-flex align-items-center gap-2">
            <img src="" alt="Approve Icon" />
            <p className="mb-0">Approve</p>
          </button>
        </div>

        <button className="btn btn-danger d-flex align-items-center gap-2">
          <img src="" alt="Deny Icon" />
          <p className="mb-0">Deny</p>
        </button>
      </section>
    </section>
  );
};

export default ViewProperty;
