import './sidebar.scss'

function Sidebar() {
  return ( 
   <div className="dash-list ">
    <div className="list-top">
      <div className="d-list profile active">
         <img src="iconamoon_profile-light.svg" alt="profile image" />
        <a href="#">Profile</a>
      </div>
      <div className="d-list Properties">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7.99955 4.99976C7.99955 4.44747 8.44727 3.99976 8.99955 3.99976H14.9996C15.5518 3.99976 15.9996 4.44747 15.9996 4.99976V5.99976C15.9996 6.55204 15.5518 6.99976 14.9996 6.99976H8.99955C8.44727 6.99976 7.99955 6.55204 7.99955 5.99976V4.99976Z" fill="white"/>
          <path d="M7.00022 10.9999H12.0002M7.00022 14.9999H15.0002M16.6646 6.08598C18.3827 6.18507 19.8779 7.41249 19.9996 8.99994C20.0766 10.0057 20.1394 11.2116 20.1394 12.4717C20.1394 13.7317 20.0766 14.9376 19.9996 15.9434C19.8779 17.5308 18.3827 18.9009 16.6646 18.9999C15.3818 19.0739 13.765 19.1376 12.0002 19.1376C10.2355 19.1376 8.61869 19.0739 7.33582 18.9999C5.61774 18.9009 4.12144 17.5308 3.99978 15.9434C3.92269 14.9376 3.85991 13.7317 3.85991 12.4717C3.85991 11.2116 3.92269 10.0057 3.99978 8.99994C4.12144 7.41249 5.61774 6.18507 7.33582 6.08598M8.99955 6.99976H14.9996C15.5518 6.99976 15.9996 6.55204 15.9996 5.99976V4.99976C15.9996 4.44747 15.5518 3.99976 14.9996 3.99976H8.99955C8.44727 3.99976 7.99955 4.44747 7.99955 4.99976V5.99976C7.99955 6.55204 8.44727 6.99976 8.99955 6.99976Z" stroke="#81868C" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
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
  )
}

export default Sidebar