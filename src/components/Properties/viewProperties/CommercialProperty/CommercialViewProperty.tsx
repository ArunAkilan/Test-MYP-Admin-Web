import type { CommercialPropertyForm } from "../../createProperties/Commercial/createCommercial.modal";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DynamicBreadcrumbs } from "../../../Common/input";
import "./CommercialViewProperty.scss";
import backIcon from "../../../../assets/dashboardtab/icon-park-outline_down.svg";

const CommercialView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const propertyData = location.state?.data as CommercialPropertyForm | undefined;
  const [selectedImage, setSelectedImage] = useState<number>(0);

  if (!propertyData) return <p>No commercial property data found.</p>;

  const {
    title,
    commercialType,
    propertyType,
    rent,
    lease,
    sale,
    area,
    location: loc,
    owner,
    facility,
    facingDirection,
    washroom,
    readyToOccupy,
    accessibility,
    images,
    totalFloors,
    propertyFloor,
    description,
    status,
  } = propertyData;

  const formatAmount = (amount: number) => amount.toLocaleString("en-IN");

  return (
    <section className="commercial-view container pt-4">
      <div className="breadcrumb">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          <img src={backIcon} alt="backIcon" /> Back
        </button>
        <DynamicBreadcrumbs />
      </div>

      {images?.length > 0 && (
        <section className="image-carousel mb-4">
          <div className="image-carousel__main">
            <img
              src={images[selectedImage]}
              alt={`Image of ${title}`}
              className="main-image"
            />
          </div>
          <div className="image-carousel__thumbnails">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mb-4">
        <h2>{title}</h2>
        <p className="text-muted">{commercialType}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Type:</strong> {propertyType}</p>
        <p><strong>Facing:</strong> {facingDirection}</p>
        <p><strong>Washroom:</strong> {washroom}</p>
        <p><strong>Ready to Occupy:</strong> {readyToOccupy ? "Yes" : "No"}</p>
        <p><strong>Floor:</strong> {propertyFloor} of {totalFloors}</p>

        <div className="mt-3">
          {propertyType === "Rent" && rent && (
            <>
              <p><strong>Rent Amount:</strong> ₹{formatAmount(rent.rentAmount)}</p>
              <p><strong>Advance:</strong> ₹{formatAmount(rent.advanceAmount)}</p>
              <p><strong>Agreement Timing:</strong> {rent.agreementTiming}</p>
              <p><strong>Negotiable:</strong> {rent.negotiable ? "Yes" : "No"}</p>
            </>
          )}
          {propertyType === "Lease" && lease && (
            <>
              <p><strong>Lease Amount:</strong> ₹{formatAmount(lease.leaseAmount)}</p>
              <p><strong>Tenure:</strong> {lease.leaseTenure}</p>
              <p><strong>Negotiable:</strong> {lease.negotiable ? "Yes" : "No"}</p>
            </>
          )}
          {propertyType === "Sale" && sale && (
            <>
              <p><strong>Sale Amount:</strong> ₹{formatAmount(sale.saleAmount)}</p>
              <p><strong>Negotiable:</strong> {sale.negotiable ? "Yes" : "No"}</p>
            </>
          )}
        </div>
      </section>

      <section className="mb-4">
        <h4>Area Details</h4>
        <p><strong>Total Area:</strong> {area.totalArea ?? "N/A"}</p>
        <p><strong>Built-up Area:</strong> {area.builtUpArea ?? "N/A"}</p>
        <p><strong>Carpet Area:</strong> {area.carpetArea ?? "N/A"}</p>
      </section>

      <section className="mb-4">
        <h4>Location</h4>
        {loc.address && <p><strong>Address:</strong> {loc.address}</p>}
        {loc.landmark && <p><strong>Landmark:</strong> {loc.landmark}</p>}
      </section>

      <section className="mb-4">
        <h4>Facilities</h4>
        <ul>
          <li>Tiles on Floor: {facility.tilesOnFloor ? "Yes" : "No"}</li>
          <li>Road Access: {facility.roadFacility}</li>
          <li>Parking: {facility.parking ? "Yes" : "No"}</li>
          <li>Water Facility: {facility.waterFacility ? "Yes" : "No"}</li>
        </ul>
      </section>

      <section className="mb-4">
        <h4>Accessibility</h4>
        <ul>
          <li>Lift: {accessibility.lift ? "Yes" : "No"}</li>
          <li>Ramp: {accessibility.ramp ? "Yes" : "No"}</li>
          <li>Steps: {accessibility.steps ? "Yes" : "No"}</li>
        </ul>
      </section>

      <section className="mb-4">
        <h4>Description</h4>
        <p>{description || "No description provided."}</p>
      </section>

      <section className="mb-4">
        <h4>Owner Information</h4>
        <p><strong>Name:</strong> {owner.firstName} {owner.lastName}</p>
        <p><strong>Phone:</strong> {owner.contact.phone1}</p>
        {owner.contact.email && <p><strong>Email:</strong> {owner.contact.email}</p>}
      </section>
    </section>
  );
};

export default CommercialView;
