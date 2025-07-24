import React, { useState, useEffect } from "react";
import "./navbar.scss";
// import GenericButton from "../Button/button";
import Popover from "@mui/material/Popover";
import Notificationtab from "../../NotificationTab/Notificationtab";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AutoCompleteWithSelect from "./autoComplete/autoCompleteApi";

interface HeaderProps {
  Title: string;
  ProfileLogo: string;
  MainLogo: string;
  Profile: boolean;
}

const ENDPOINT = import.meta.env.VITE_BackEndUrl;

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

  const navigate = useNavigate();

  const adminLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

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

    //window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  //Socket IO
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    axios
      .get<{ notifications: Notification[] }>(`${ENDPOINT}/api/notifications`)
      .then((res) => setNotifications(res.data.notifications));

    const sock = io(ENDPOINT);

    sock.on("notification", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      sock.disconnect(); // Clean up on unmount
    };
  }, []);

  //Socket IO

  const gotoProfile = () => {
   navigate('/profile');
  }
  
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
              <div className="col-8">
                <AutoCompleteWithSelect />
              </div>
              <div className="col-4 bell">
                <img
                  src={`${import.meta.env.BASE_URL}/Vector.svg`}
                  alt="setting svg"
                  className="setting-image"
                />
                <div className="bell-image">
                  <button aria-describedby={idFirst} onClick={handleFirstClick}>
                    <img src={`${import.meta.env.BASE_URL}/BTN_Notification.svg`} alt="Notification svg" />

                    <div className="notifyround">{notifications?.length}</div>
                  </button>
                  {/* <BellIcon count={notifications.length} /> */}
                  <Popover
                    id={idFirst}
                    open={openFirst}
                    anchorEl={firstAnchorEl} // anchor to the clicked element
                    onClose={handleCloseFirst}
                    anchorOrigin={{
                      vertical: "bottom", // bottom of the source element
                      horizontal: "center", // horizontal center of the source element
                    }}
                    transformOrigin={{
                      vertical: "top", // top edge of the popover
                      horizontal: "right", // right edge of the popover
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
                  className="prh-ad-right"
                  aria-describedby={idSecond}
                  onClick={handleSecondClick}
                >
                  <img src={ProfileLogo} alt="ellipse image"></img>

                  <p>{Title}</p>
                </div>
                <Popover
                  id={idSecond}
                  open={openSecond}
                  anchorEl={secondAnchorEl} // the clicked element
                  onClose={handleCloseSecond}
                  anchorOrigin={{
                    vertical: "bottom", // bottom of the source element
                    horizontal: "center", // horizontal center of the source element
                  }}
                  transformOrigin={{
                    vertical: "top", // top edge of the popover
                    horizontal: "right", // right edge of the popover
                  }}
                >
                  <div className="admin-btn-popover">
                    <div  onClick={gotoProfile} className="row admin-btn-popup-top admin-popup-cmn-div">
                      <img
                        src={`${import.meta.env.BASE_URL}/navbar/iconamoon_profile-bold.svg`}
                        alt="profile"
                        className="col-2"
                      />
                      <p className="col-8">Profile</p>
                      <img
                        src={`${import.meta.env.BASE_URL}/navbar/icon-park-outline_down.svg`}
                        alt="side-arrow"
                        className="col-2"
                      />
                    </div>
                    <div className="row admin-btn-popup-middle admin-popup-cmn-div">
                      <img
                        src={`${import.meta.env.BASE_URL}/navbar/propertiesIcon.svg`}
                        alt="propertiesIcon"
                        className="col-2"
                      />
                      <p className="col-8">Posted Properties</p>
                      <img
                        src={`${import.meta.env.BASE_URL}/navbar/icon-park-outline_down.svg`}
                        alt="side-arrow"
                        className="col-2"
                      />
                    </div>
                    <div
                      onClick={adminLogout}
                      className="row admin-btn-popup-bottom admin-popup-cmn-div"
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}/navbar/mynaui_logout.svg`}
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
