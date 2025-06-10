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
            <div className="footer-top-common-col col-sm-6 col-md-3">
              <h6>Flats for Sale in Perambalur</h6>
              <p>Flats in Vasan Nagar</p>
              <p>Flats in Kurinji Nagar</p>
              <p>1 BHK Flats Under ₹30L</p>
              <p>2 BHK Builder Floors</p>
              <p>Affordable Flats in Town Center</p>
              
            </div>
            <div className="footer-top-common-col col-sm-6 col-md-3">
              <h6>Houses for Sale in Perambalur</h6>

              <p>Houses in Sungu Pettai</p>
              <p>Luxury Villas in Arumbavur</p>
              <p>Houses Under ₹50L</p>
              <p>Gated Community Homes</p>
              <p>Bank Auction Properties</p>
        
            </div>
            <div className="footer-top-common-col col-sm-6 col-md-3">
              <h6>Plots for Sale in Perambalur</h6>

              <p>Residential Plots Near NH-45</p>
              <p>DTCP Approved Plots</p>
              <p>Plots Under ₹10L</p>
              <p>Corner Plots for Investment</p>
              <p>Plots with EMI Option</p>
            </div>
            <div className="footer-top-common-col col-sm-6 col-md-3">
              <h6>Rental Properties in Perambalur</h6>

              <p>Contact Us</p>
              <p>PG/Hostel for Students</p>
              <p>Rental Houses for Families</p>
              <p>1 RK/1 BHK Rentals</p>
              <p>Rent Under ₹5,000</p>

            </div>
          </div>
          <div className="bottom-row row">
            <div className="footer-col-heading-styles col-sm-6 col-md-4">
              <h6>Company</h6>
              <p>About PRH</p>
              <p>Contact Us</p>
              <p>Careers at PRH</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Sitemap</p>
              <p>Report a Problem</p>
              <p>Grievance Redressal</p>
              <p>Safety Guidelines</p>
            </div>
            <div className=" footer-col-heading-styles col-sm-6 col-md-4">
              <h6>Our Services</h6>

              <p>Post Your Property</p>
              <p>Property Management</p>
              <p>Property Price Trends</p>
              <p>Area Converter</p>
              <p>Real Estate Investment Tips</p>
              <p>Customer Support</p>
              <p>Rent Receipts Generator</p>
              <p>FAQs & Site Navigation</p>
            </div>
            <div className="footer-col-heading-styles customer-usage-style col-sm-6 col-md-4">
              <div className="mobile-app common-contact">
                <div className="mobile-app-heading">
                  <h5><img src="duo-icons_app.svg" alt="duo-icons_app img" />Mobile App</h5>
                  <p>Book or post a property on-the-go</p>
                </div>
                <div className="download-img">
                  <img src="Play.svg" alt="Play img" />
                  <img src="ios.svg" alt="ios img" />
                </div>
              </div>
              <div className="contact-us common-contact">
                <h6><img src="streamline_customer-support-1.svg" alt="customer-support img" />Help & Support</h6>
                <div className="contact-info">
                  <p>Call us: <span>+91 1800 00 0000</span></p>
                  <p>Email: <span>Support@prh.com</span></p>
                </div>
              </div>
              <div className="connect-us common-contact">
                <div className="connect-heading">
                  <h6><img src="mingcute_user-follow-line.svg" alt="follow img" />Follow us</h6>
                  <p>Stay in the loop</p>
                </div>
                <div className="connect-icon">
                  <img src="si_youtube-line.svg" alt="youtube img" />
                  <img src="prime_twitter.svg" alt="prime_twitter img" />
                  <img src="jam_facebook.svg" alt="facebook img" />
                  <img src="hugeicons_instagram.svg" alt="instagram img" />
                </div>
              </div>
              
            </div>
          </div>
          <div className="report-properties">
            <div className="report-heading">
              <h4><img src="material-symbols_report-outline.svg" alt="report img" />Report Properties</h4>
              <div className="report-detail">
                <p>Perambalur Rent House (PRH.com) is a local-first, verified property platform.</p>
                <p>All content is subject to moderation. Please report misuse responsibly.</p>
              </div>
            </div>
            <div className="flag-button">
              <GenericButton
                variant="primary"
                label={"Flag Inappropriate Property"}
                className="genericFlagBtn"
              />
            </div>
          </div>
          <div className="property-find-list">
            <div className="find-property">
              <h6>Find Property</h6>
              <p>
                Choose from hundreds of properties available across Perambalur. Whether you're buying or renting, we have the right options for you.

              </p>
              <GenericButton
                variant="primary"
                label={"Explore Options"}
                className="genericExploreOptionsPropertyBtn"
              />
            </div>
            <div className="property-seperate-line"></div>
            <div className="list-property">
              <h6>List Property</h6>
              <p>
                List your home or land for free and connect directly with interested buyers or tenants.
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
