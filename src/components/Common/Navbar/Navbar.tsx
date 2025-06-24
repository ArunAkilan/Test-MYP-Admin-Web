import React, { useState } from "react";
import "./navbar.scss";
import GenericButton from "../Button/button";
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
  Profile,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const toggleNavbar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="header-wrap navbar navbar-expand-lg navbar-light">
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

                <div className={`admin collapse navbar-collapse ${
              isCollapsed ? "show" : ""
            }`}>
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
                      <button aria-describedby={id} onClick={handleClick}>
                        <img
                          src="BTN_Notification.svg"
                          alt="Notification svg"
                        />
                      </button>
                      <Popover
                        anchorReference="anchorPosition"
                        anchorPosition={{ top: 138, left: 807 }}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
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

                    <div className="ad-right">
                      <img src={ProfileLogo} alt="ellipse image"></img>
                      <p>{Title}</p>
                    </div>
                    {Profile === true && (
                      <GenericButton
                        onClick={() => alert("Data saved!")}
                        variant="primary"
                        iconPosition="left"
                        label={"Post Your Property"}
                        className="genericPostYourProperty"
                      />
                    )}
                  </div>
                </div>

          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
