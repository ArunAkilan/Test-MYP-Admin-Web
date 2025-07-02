import type { ResidentialProperty } from "../../AdminResidencial/AdminResidencial.model";
import { useLocation } from "react-router-dom";
import { DynamicBreadcrumbs } from "../../Common/input";

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

      <section className="mb-6">
        <div className="d-flex align-items-center gap-3 mb-3">
          <h3 className="mb-0">{propertyData?.title}</h3>
          <button className="btn btn-outline-success">
            {propertyData?.propertyType}
          </button>
        </div>

        <p className="lead mb-3">{propertyData?.title}</p>

        <div className="d-flex align-items-start flex-wrap gap-4">
          <div className="d-flex align-items-center">
            <img
              src="/src/assets/Propert View Page imgs/Icon_Location.svg"
              alt="Location Icon"
              className="me-2"
            />
            <p className="mb-0">{propertyData?.location?.address}</p>
          </div>

          <div className="row g-4 w-100 mt-2">
            <div className="col-md-3 text-center">
              <p className="mb-1">Area</p>
              <h3 className="mb-1">{propertyData?.totalArea}</h3>
              <p className="text-muted">Sq.Ft</p>
            </div>
            <div className="col-md-3 text-center">
              <p className="mb-1">Facing</p>
              <h3 className="mb-1">{propertyData?.facingDirection}</h3>
            </div>
            <div className="col-md-3 text-center">
              <p className="mb-1">Rent</p>
              <h3 className="mb-1">{propertyData?.rent?.rentAmount}</h3>
              <p className="text-muted">Per Month</p>
            </div>
            <div className="col-md-3 text-center">
              <p className="mb-1">Deposit Amount</p>
              <h3 className="mb-1">
                ₹{propertyData?.rent?.depositAmount || "1,00,000"}
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="midDetails mb-5">
        <section className="text-center mb-4">
          <img
            src="/src/assets/Propert View Page imgs/Section_ImageAndData.svg"
            alt="Section Overview"
            className="img-fluid"
          />
        </section>

        <div className="row">
          <div className="col-6">
            <img
              src={propertyData?.images[1] || ""}
              alt="Property"
              className="img-fluid"
            />
          </div>
          <div className="col-6">
            {[...Array(3)].map((_, i) => (
              <div className="row mb-3" key={i}>
                <div className="col">
                  <img src="" alt="" className="mb-2" />
                  <h3 className="h6">Builtup Area</h3>
                  <p>{propertyData?.builtUpArea || "1400 Sq.Ft"}</p>
                </div>
                <div className="col">
                  <img src="" alt="" className="mb-2" />
                  <h3 className="h6">Carpet Area</h3>
                  <p>{propertyData?.carpetArea || "1200 Sq.Ft"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="propertyDes mb-5">
        <h3 className="mb-3">Description</h3>
        <div className="bg-light p-3 rounded">
          <p>{propertyData?.description}</p>
          <p className="mb-0">
            {propertyData?.location?.address} {propertyData?.location?.landmark}
          </p>
        </div>
      </section>

      <section className="propertyOwnerInfo mb-5">
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
