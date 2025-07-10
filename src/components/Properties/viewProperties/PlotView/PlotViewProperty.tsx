import type { PlotFormState as PlotProperty } from "../../createProperties/Plot/createPlot.modal";
import { useLocation } from "react-router-dom";
import { DynamicBreadcrumbs } from "../../../Common/input";

const PlotView = () => {
  const location = useLocation();
  const propertyData = location.state?.data as PlotProperty;

  if (!propertyData) return <p>No property data found</p>;

  const {
    title,
    plotType,
    facingDirection,
    location: loc,
    rent,
    lease,
    sale,
    propertyType,
    ownerDetails,
    description,
  } = propertyData;

  return (
    <section className="container py-4">
      <DynamicBreadcrumbs />

      <section className="mb-4">
        <h2>{title}</h2>
        <p className="text-muted">{plotType}</p>
        <p><strong>Facing:</strong> {facingDirection}</p>
        <p><strong>Type:</strong> {propertyType}</p>

        {loc?.address && <p><strong>Location:</strong> {loc.address}</p>}
        {loc?.landmark && <p><strong>Landmark:</strong> {loc.landmark}</p>}

        {loc?.area && (
          <div>
            <p><strong>Area Details:</strong></p>
            <ul>
              <li>Total Area: {loc.area.totalArea || "N/A"}</li>
              <li>Length: {loc.area.length || "N/A"}</li>
              <li>Width: {loc.area.width || "N/A"}</li>
              <li>Acre: {loc.area.acre ?? "N/A"}</li>
            </ul>
          </div>
        )}

        {propertyType === "Rent" && rent && (
          <div>
            <p><strong>Rent Amount:</strong> ₹{rent.rentAmount}</p>
            <p><strong>Advance:</strong> ₹{rent.advanceAmount}</p>
            <p><strong>Agreement Timing:</strong> {rent.agreementTiming}</p>
            <p><strong>Negotiable:</strong> {rent.negotiable ? "Yes" : "No"}</p>
          </div>
        )}

        {propertyType === "Lease" && lease && (
          <div>
            <p><strong>Lease Amount:</strong> ₹{lease.leaseAmount}</p>
            <p><strong>Tenure:</strong> {lease.leaseTenure}</p>
            <p><strong>Negotiable:</strong> {lease.negotiable ? "Yes" : "No"}</p>
          </div>
        )}

        {propertyType === "Sale" && sale && (
          <div>
            <p><strong>Sale Amount:</strong> ₹{sale.saleAmount}</p>
            <p><strong>Negotiable:</strong> {sale.negotiable ? "Yes" : "No"}</p>
          </div>
        )}
      </section>

      <section className="mb-4">
        <h4>Description</h4>
        <p>{description}</p>
      </section>

      <section className="mb-4">
        <h4>Owner Info</h4>
        <p><strong>Name:</strong> {ownerDetails.firstName} {ownerDetails.lastName}</p>
        <p><strong>Phone:</strong> {ownerDetails.contact.phone1}</p>
        {ownerDetails.contact.email && <p><strong>Email:</strong> {ownerDetails.contact.email}</p>}
      </section>
    </section>
  );
};

export default PlotView;
