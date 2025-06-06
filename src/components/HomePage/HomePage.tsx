import GenericButton from "../Common/Button/button";
import HomeTab from "../Common/HomeTab/HomeTab";
import './HomePage.scss'
import { Carousel } from "../Common/Carousel/carousel";
function HomePage() {
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
         < HomeTab/>
          
        </div>
        <div className="divider">
          <p className="divider-or">or</p>
          <div className="divider-line"></div>
        </div>
        <div className="owner-interaction">
          <p>For Property Owners</p>
          <GenericButton
                    onClick={() => alert("Data saved!")}
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
    </div>
  );
}

export default HomePage;
