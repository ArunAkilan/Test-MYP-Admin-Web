import type { CommercialPropertyForm } from "../../createProperties/Commercial/createCommercial.modal";
import { useLocation, useNavigate } from "react-router-dom";
import { DynamicBreadcrumbs } from "../../../Common/input";

const CommercialView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const propertyData = location.state?.data as CommercialPropertyForm | undefined;

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

  const formatAmount = (amount: number) =>
    amount.toLocaleString("en-IN");

  return (
    <section className="container py-4">
      <DynamicBreadcrumbs />

      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
        Back
      </button>

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
            <div>
              <p><strong>Rent Amount:</strong> ₹{formatAmount(rent.rentAmount)}</p>
              <p><strong>Advance:</strong> ₹{formatAmount(rent.advanceAmount)}</p>
              <p><strong>Agreement Timing:</strong> {rent.agreementTiming}</p>
              <p><strong>Negotiable:</strong> {rent.negotiable ? "Yes" : "No"}</p>
            </div>
          )}
          {propertyType === "Lease" && lease && (
            <div>
              <p><strong>Lease Amount:</strong> ₹{formatAmount(lease.leaseAmount)}</p>
              <p><strong>Tenure:</strong> {lease.leaseTenure}</p>
              <p><strong>Negotiable:</strong> {lease.negotiable ? "Yes" : "No"}</p>
            </div>
          )}
          {propertyType === "Sale" && sale && (
            <div>
              <p><strong>Sale Amount:</strong> ₹{formatAmount(sale.saleAmount)}</p>
              <p><strong>Negotiable:</strong> {sale.negotiable ? "Yes" : "No"}</p>
            </div>
          )}
        </div>
      </section>

      <section className="mb-4">
        <h4>Area Details</h4>
        <p><strong>Total Area:</strong> {area.totalArea != null ? area.totalArea : "N/A"}</p>
        <p><strong>Built-up Area:</strong> {area.builtUpArea != null ? area.builtUpArea : "N/A"}</p>
        <p><strong>Carpet Area:</strong> {area.carpetArea != null ? area.carpetArea : "N/A"}</p>
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

      {images?.length > 0 && (
        <section className="mb-4">
          <h4>Images</h4>
          <div className="row">
            {images.map((img, index) => (
              <div className="col-md-3 mb-3" key={index}>
                <img
                  src={img}
                  alt={`Image of ${title} - ${index + 1}`}
                  className="img-fluid rounded"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default CommercialView;
