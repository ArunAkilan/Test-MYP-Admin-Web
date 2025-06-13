import type { ResidentialProperty } from "../../AdminResidencial/AdminResidencial.model";

const ViewResidential = () => {
  return (
    <section>
      <section>
        <div className="">
          <div>
            <h3>Muthu Residency Flats</h3>
          </div>
          <div>
            <button>Rental</button>
          </div>
        </div>
        <div>
          <p>Independent House for Rent</p>
        </div>
        <div>
          <div>
            <img src="/src/assets/Propert View Page imgs/Icon_Location.svg" alt="" />
          </div>
          <div>
            <p>in Vellapalayam, Perambalur</p>
          </div>
          <div className="">
            <div>
              <p>Area</p>
              <h3>1500</h3>
              <p>Sq.Ft</p>
            </div>
            <div>
              <p>Facing</p>
              <h3>East</h3>
            </div>
            <div>
              <p>Rent</p>
              <h3>₹20,000 Per Month</h3>
              <p>Per Month</p>
            </div>
            <div>
              <p>Deposit Amount</p>
              <h3>₹1,00,000</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="midDetails">
        <section>
          <img src="/src/assets/Propert View Page imgs/Section_ImageAndData.svg" alt="" />
        </section>
        <div className="row">
          <div className="col-6">
            <img src="" alt="" />
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col">
                <img src="" alt="" />
                <h3>Builtup Area</h3>
                <p>1400 Sq.Ft</p>
              </div>
              <div className="col">
                <img src="" alt="" />
                <h3>Carpet area</h3>
                <p>1200 Sq.Ft</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <img src="" alt="" />
                <h3>Builtup Area</h3>
                <p>1400 Sq.Ft</p>
              </div>
              <div className="col">
                <img src="" alt="" />
                <h3>Carpet area</h3>
                <p>1200 Sq.Ft</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <img src="" alt="" />
                <h3>Builtup Area</h3>
                <p>1400 Sq.Ft</p>
              </div>
              <div className="col">
                <img src="" alt="" />
                <h3>Carpet area</h3>
                <p>1200 Sq.Ft</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <search className="propertyDes">
        <h3>Description</h3>
        <div>
          <p>
            Discover comfortable urban living in this 2BHK unit located in the
            well-connected Perambalur Green Enclave. Spanning 1,200 sq ft of
            total area with a built-up space of 950 sq ft, this 2nd-floor
            apartment offers a carpet area of 800 sq ft, ensuring ample room for
            cozy living. This South-facing home invites natural light throughout
            the day and features unfurnished interiors—ideal for tenants who
            prefer to style their space from scratch. Located just minutes from
            schools, markets, and public transport, it’s an excellent choice for
            families or working professionals.
          </p>
          <p>Address: 13, Vellapalayam, Perambalur</p>
        </div>
      </search>

      <section className="propertyOwnerInfo">
        <h3>Owner Information</h3>
        <div>
          <div>
            <img src="" alt="" />
            <p>Name</p>
            <p>Naveen raj</p>
          </div>
          <div>
            <img src="" alt="" />
            <p>Name</p>
            <p>Naveen raj</p>
          </div>
          <div>
            <img src="" alt="" />
            <p>Name</p>
            <p>Naveen raj</p>
          </div>
        </div>
        <h3>₹20,000 / Month</h3>
        <div>
          <div>
            <button>
              <img src="" alt="" />
              <p>Edit</p>
            </button>
          </div>

          <div>
            <button className="btn btn-color--primary">
              <img src="" alt="" />
              <p>Approve</p>
            </button>
          </div>
        </div>
        <button>
          <img src="" alt="" />
          <p>Deny</p>
        </button>
      </section>
    </section>
  );
};

export default ViewResidential;
  