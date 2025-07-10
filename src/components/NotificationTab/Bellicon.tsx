import React, { useState } from "react";
import Notificationtab from "./Notificationtab";

type Props = { count: number };

const BellIcon: React.FC<Props> = ({ count }) => {
    const [open, setOpen] = useState(false);
    // const [firstAnchorEl, setFirstAnchorEl] = useState<HTMLElement | null>(null);
    // const openFirst = Boolean(firstAnchorEl);

    // const idFirst = openFirst ? "first-popover" : undefined;
    //  const handleCloseFirst = () => setFirstAnchorEl(null);

    return (
        <div style={{ position: 'relative' }}>
            <img src="BTN_Notification.svg" alt="Notification svg"
                className="h-6 w-6 cursor-pointer" onClick={() => setOpen(!open)} />
            {count > 0 && <span className="badge">{count}</span>}
            {open && <div className="dropdown"> {/* custom dropdown UI */}
               
                {/* <Popover
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 60, left: 816 }}
                    id={idFirst}
                    open={openFirst}
                    anchorEl={firstAnchorEl}
                    onClose={handleCloseFirst}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                > */}
                    <div className="notification-popover">
                        <div className="notify-header">
                            <h4>Notifications</h4>
                            <button>Clear all</button>
                        </div>
                        <Notificationtab />
                    </div>
                {/* </Popover> */}
            </div>}
        </div>
    );
};

export default BellIcon;
