import GenericButton from "../Common/Button/button";
import { Carousel } from "../Common/Carousel/carousel";
import HomeTab from "../Common/HomeTab/HomeTab";
import "./HomePage.scss";



function Property() {
  return (
    <div>
      <section className="Hero">
        <div className="hero-title">
          <p>
            Find your next property in{" "}
            <span className="sep-color">Minutes</span>
          </p>
        </div>
        <div className="search-wrapper">
          <HomeTab />
        </div>
        <div className="divider">
          <p className="divider-or">or</p>
          <div className="divider-line"></div>
        </div>
        <div className="owner-interaction">
          <p>For Property Owners</p>
          <GenericButton
           
            variant="primary"
            iconPosition="left"
            label={"Post Your Property"}
            className="genericPostYourProperty"
          />
        </div>
        <div className="marque-part"></div>
      </section>
      <section className="recently-listed">
        <div className="recentlylisted-title">
          <h6 className="tile-head">Recently Listed Properties</h6>
          <p>Find your next home with ease</p>
        </div>

        <Carousel />
      </section>
      <section className="buy-house">
        <div className="row">
        <div className="buyhouse-explore col-md-6">
          <div className="house-explore-content">
            <h6>Rent, Buy, or Sell a House</h6>
            <p className="find-house">Find, Buy & Own Your Dream Home</p>
            <p className="Explore-house">
              Explore a wide range of properties — from apartments and builder
              floors to villas and land. Whether you're looking to move in or
              invest, we've got you covered
            </p>
          </div>
          <GenericButton
            variant="secondary"
            label="Explore Options"
            className="genericExploreOptionsStyles"
          />
        </div>
        <div className="ellipse-image col-md-6">
          <img src="Frame 383.svg" alt="ellipse img" />
        </div>
        </div>
      </section>
      <section className="location-overview">
        <div className="location-overview-title">
          <h6>Explore Properties in Popular Areas of Perambalur</h6>
          <p>Explore over 200+ properties in prime localities across Perambalur. Stay connected, live peacefully, and invest smartly.</p>

        </div>
        <div className="location-property-list"> 
          <div className="row-1 row">
            <div className="col-md-3">
              <div className="property-img">
                <img src="" alt="" />
              </div>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-3"></div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default Property;
