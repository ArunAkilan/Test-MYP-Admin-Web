import * as React from "react";
import "./navbar.scss";
import GenericButton from "../Button/button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="header-wrap">
      <div className="container">
        <header className="header row">
          <div className="logo col-3">
            <img src={MainLogo} alt="logo image" />
            
          </div>
          
          <div className="admin-wrap col-9">
            <div className="admin">
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
                  <button aria-describedby={id} 
                 
                  onClick={handleClick}>
                    <img
                      src="BTN_Notification.svg"
                      alt="Notification svg"
                      
                    />
                  </button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Typography sx={{ p: 2 }}>
                      The content of the Popover.
                    </Typography>
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
