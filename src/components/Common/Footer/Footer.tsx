import GenericButton from "../Button/button";
import './Footer.scss'

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-top-content-wrapper">
        <div className="footer-logo">
            <img src="PRH Admin 1.svg" alt="PRH Admin 1" />
        </div>
        
        <div className="footer-top">
          <h4>Quick Links – Perambalur Focused</h4>
          <div className="top-row row">
            <div className="top-common-col col-md-3">
              <h6>Flats for Sale in Perambalur</h6>
              <p>About Us</p>
              <p>Contact Us</p>
              <p>Careers</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Sitemap</p>
              <p>Testimonials</p>
              <p>Feedback</p>
              <p>Report a Problem</p>
              <p>Grievance Redressal</p>
              <p>Safety Guidelines</p>
            </div>
            <div className="top-common-col col-md-3">
              <h6>Houses for Sale in Perambalur</h6>

              <p>Contact Us</p>
              <p>Careers</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Sitemap</p>
              <p>Testimonials</p>
              <p>Feedback</p>
              <p>Report a Problem</p>
              <p>Grievance Redressal</p>
              <p>Safety Guidelines</p>
            </div>
            <div className="top-common-col col-md-3">
              <h6>Plots for Sale in Perambalur</h6>

              <p>Contact Us</p>
              <p>Careers</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Sitemap</p>
              <p>Testimonials</p>
              <p>Feedback</p>
              <p>Report a Problem</p>
              <p>Grievance Redressal</p>
              <p>Safety Guidelines</p>
            </div>
            <div className="top-common-col col-md-3">
              <h6>Rental Properties in Perambalur</h6>

              <p>Contact Us</p>
              <p>Careers</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Sitemap</p>
              <p>Testimonials</p>
              <p>Feedback</p>
              <p>Report a Problem</p>
              <p>Grievance Redressal</p>
              <p>Safety Guidelines</p>
            </div>
          </div>
          <div className="bottom-row row">
            <div className="top-common-col col-heading-styles col-md-4">
              <h6>Company</h6>
              <p>About Us</p>
              <p>Contact Us</p>
              <p>Careers</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Sitemap</p>
              <p>Testimonials</p>
              <p>Feedback</p>
              <p>Report a Problem</p>
              <p>Grievance Redressal</p>
              <p>Safety Guidelines</p>
            </div>
            <div className="top-common-col col-heading-styles col-md-4">
              <h6>Our Services</h6>

              <p>Contact Us</p>
              <p>Careers</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Sitemap</p>
              <p>Testimonials</p>
              <p>Feedback</p>
              <p>Report a Problem</p>
              <p>Grievance Redressal</p>
              <p>Safety Guidelines</p>
            </div>
            <div className="top-common-col col-md-4">
              <h5>Download the App now</h5>
              <div className="download-img">
                <img src="Play.svg" alt="Play img" />
                <img src="ios.svg" alt="ios img" />
              </div>
              <div className="contact-us common-contact">
                <h6>Contact us</h6>
                <p>Contact Links</p>
              </div>
              <div className="connect-us common-contact">
                <h6>connect with us</h6>
                <p>Social Links</p>
              </div>
              <div className="report-policy common-contact">
                <h6>Report Abuse</h6>
                <p>Report Policy</p>
              </div>
            </div>
          </div>
          <div className="property-find&list">
            <div className="find-property">
              <h6>Find Property</h6>
              <p>
                Choose from hundred’s of properties that is listed on perambalur
              </p>
              <GenericButton
                variant="primary"
                label={"Explore Options"}
                className="genericExploreOptionsPropertyBtn"
              />
            </div>
            <div className="seperate-line"></div>
            <div className="list-property">
              <h6>List Property</h6>
              <p>
                Let people know about your property, Post now by clicking down
              </p>
              <GenericButton
                variant="primary"
                label={"Post your Property for free"}
                className="genericPostPropertyBtn"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Perambalur Rent House - PRH.com | &copy; 2025 - All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
