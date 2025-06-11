import ListIcon from "@mui/icons-material/List";
import "./navbar.scss";
import GenericButton from "../Button/button";


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
  return (
    <div className="header-wrap">
      <div className="container">
        <header className="header row">
          <div className="logo col-3">
            <img src="PRH-user-logo.svg" alt="logo image" />
          </div>
          <div className="admin-wrap col-9">
            <div className="list-icon">
              <ListIcon />
            </div>
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
                <img
                  src="BTN_Notification.svg"
                  alt="Notification svg"
                  className="bell-image"
                />
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
