import "./sidebar.scss";

function Sidebar() {
  return (
    <div className="dash-list ">
      <div className="list-top">
        <div className="d-list profile active">
          <img src="iconamoon_profile-light.svg" alt="profile image" />
          <a href="#">Profile</a>
        </div>
        <div className="d-list Properties">
          <img src="Task.svg" alt="properties img" />
          <a href="#">Your Properties</a>
        </div>
        <div className="d-list Favorites">
          <img src="solar_star-line-duotone.svg" alt="star svg" />
          <a href="#">Your Favorites</a>
        </div>
      </div>
      <div className="bottom-list">
        <div className="d-list delete">
          <img src="mynaui_trash.svg" alt="trash image" />
          <a href="#">Delete Account</a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
