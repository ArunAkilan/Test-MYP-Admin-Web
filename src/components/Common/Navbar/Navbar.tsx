import React, { useState, useEffect } from "react";
import "./navbar.scss";
// import GenericButton from "../Button/button";
import Popover from "@mui/material/Popover";
import Notificationtab from "../../NotificationTab/Notificationtab";

interface HeaderProps {
  Title: string;
  ProfileLogo: string;
  MainLogo: string;
  Profile: boolean;
}

const Header: React.FC<HeaderProps> = ({
  Title,
  ProfileLogo,
  MainLogo,
  // Profile,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [firstAnchorEl, setFirstAnchorEl] = useState<HTMLElement | null>(null);
  const [secondAnchorEl, setSecondAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const toggleNavbar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleFirstClick = (event: React.MouseEvent<HTMLElement>) => {
    setFirstAnchorEl(event.currentTarget);
    setSecondAnchorEl(null); // Close second popover if open
  };

  const handleSecondClick = (event: React.MouseEvent<HTMLElement>) => {
    setSecondAnchorEl(event.currentTarget);
    setFirstAnchorEl(null); // Close first popover if open
  };

  // const handleClose = () => {
  //   setFirstAnchorEl(null);
  //   setSecondAnchorEl(null);
  // };

  const handleCloseFirst = () => setFirstAnchorEl(null);
  const handleCloseSecond = () => setSecondAnchorEl(null);

  const openFirst = Boolean(firstAnchorEl);
  const openSecond = Boolean(secondAnchorEl);

const idFirst = openFirst ? "first-popover" : undefined;
const idSecond = openSecond ? "second-popover" : undefined;

  // sticky function
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setHideHeader(false);
      } else {
        setHideHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`navbar navbar-expand-lg navbar-light header-wrap ${
        hideHeader ? "hide" : ""
      }`}
    >
      <div className="container">
        <header className="header  row">
          <div className="logo navbar-brand col-md-3 col-3">
            <img src={MainLogo} alt="logo image" />
          </div>

          <div className="admin-wrap  col-9 col-md-9">
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={toggleNavbar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`admin collapse navbar-collapse ${
                isCollapsed ? "show" : ""
              }`}
            >
              <div className="h-search">
                <img src="Search.svg" alt="Search img" />

                <input type="search" placeholder="Search Anything..." />
              </div>
              <div className="bell">
                <img
                  src="Vector.svg"
                  alt="setting svg"
                  className="setting-image"
                />
                <div className="bell-image">
                  <button aria-describedby={idFirst} onClick={handleFirstClick}>
                    <img src="BTN_Notification.svg" alt="Notification svg" />
                  </button>
                  <Popover
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 60, left: 831 }}
                    id={idFirst}
                    open={openFirst}
                    anchorEl={firstAnchorEl}
                    onClose={handleCloseFirst}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <div className="notification-popover">
                      <div className="notify-header">
                        <h4>Notifications</h4>
                        <button>Clear all</button>
                      </div>
                      <Notificationtab />
                    </div>
                  </Popover>
                </div>

                <div
                  className="ad-right"
                  aria-describedby={idSecond}
                  onClick={handleSecondClick}
                >
                  <img src={ProfileLogo} alt="ellipse image"></img>
                  <p>{Title}</p>
                </div>
                <Popover
                  anchorReference="anchorPosition"
                  anchorPosition={{ top: 60, left: 951 }}
                  id={idSecond}
                  open={openSecond}
                  anchorEl={secondAnchorEl}
                  onClose={handleCloseSecond}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <div className="admin-btn-popover">
                    <div className="row admin-btn-popup-top admin-popup-cmn-div">
                      <img
                        src="../src/assets/navbar/iconamoon_profile-bold.svg"
                        alt="profile"
                        className="col-2"
                      />
                      <p className="col-8">Profile</p>
                      <img
                        src="../src/assets/navbar/icon-park-outline_down.svg"
                        alt="side-arrow"
                        className="col-2"
                      />
                    </div>
                    <div className="row admin-btn-popup-middle admin-popup-cmn-div">
                      <img
                        src="../src/assets/navbar/propertiesIcon.svg"
                        alt="propertiesIcon"
                        className="col-2"
                      />
                      <p className="col-8">Posted Properties</p>
                      <img
                        src="../src/assets/navbar/icon-park-outline_down.svg"
                        alt="side-arrow"
                        className="col-2"
                      />
                    </div>
                    <div className="row admin-btn-popup-bottom admin-popup-cmn-div">
                      <img
                        src="../src/assets/navbar/mynaui_logout.svg"
                        alt="logout"
                        className="col-2"
                      />
                      <p className="col-8">Signout</p>
                    </div>
                  </div>
                </Popover>
                {/* {Profile === true && (
                      <GenericButton
                        onClick={() => alert("Data saved!")}
                        variant="primary"
                        iconPosition="left"
                        label={"Post Your Property"}
                        className="genericPostYourProperty"
                      />
                    )} */}
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
