import "./sidebar.scss";

function Sidebar({sidebarData}) {

  return (
    <div className="dash-list ">
      <div className="list-top">
        {sidebarData.map((sidebar, index) => {
          const IconComponent = sidebar.icon;
          return (
            <div
              key={index}
              className={`dash-list-keys profile ${index === 0 && "active"}`}
            >
              {IconComponent && <IconComponent />}
              <a href="#">{sidebar.name}</a>
            </div>
          );
        })}
      </div>
   
    </div>
  );
}

export default Sidebar;
