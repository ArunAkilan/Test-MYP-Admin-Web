import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import "./Notificationtab.scss";
import { io } from "socket.io-client";
import axios from "axios";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Notification {
  _id: string;
  createdBy: string;
  date: string;
  isView: string;
  message: string;
  propertyId: string;
  role: string;
  type: "update" | "alert";
}

interface NotificationResponse {
  notifications: Notification[];
}

const ENDPOINT = import.meta.env.VITE_BackEndUrl;

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Notificationtab() {
  const [value, setValue] = React.useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //Socket IO
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get<NotificationResponse>(`${ENDPOINT}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNotifications(res.data.notifications);
      });

    const sock = io(ENDPOINT);

    sock.on("notification", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
    });
  }, []);
  //Socket IO
  return (
    <div id="notification-tab">
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="All"
            {...a11yProps(0)}
            icon={
              <Avatar
                alt="all-icon avatar"
                src={`${import.meta.env.BASE_URL}/all-icon.svg`}
              />
            }
            iconPosition="start"
          />
          <Tab
            label="Updates"
            {...a11yProps(1)}
            icon={
              <Avatar
                alt="update-icon avatar"
                src={`${import.meta.env.BASE_URL}/update-icon.svg`}
              />
            }
            iconPosition="start"
          />
          <Tab
            label="Alerts"
            {...a11yProps(2)}
            icon={
              <Avatar
                alt="alert-icon avatar"
                src={`${import.meta.env.BASE_URL}/alert-new-icon.svg`}
              />
            }
            iconPosition="start"
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="">
          <div className="tab-panel-wrapper  mt-1">
            <div className="tab-panel">
              {notifications?.length == 0 ? (
                <div className="pt-5">
                  <img
                    src="charm_tick.svg"
                    alt="charm_tick image"
                    className="notify-img"
                  />
                  <div className="panel-notify-content">
                    <h6>You're All Set!</h6>
                    <p>
                      No alerts right now. If something important comes up like
                      a listing issue we'll let you know here
                    </p>
                  </div>
                </div>
              ) : (
                <ul className="notifyList">
                  {notifications.map((n) => (
                    <li key={n._id}>
                      <div className="d-flex">
                        <b>{n?.role}:&nbsp; </b> {n.createdBy}
                      </div>
                      <div className="d-flex justify-content-between">
                        <div>{n.message}</div>
                        <div>{new Date(n.date).toLocaleString()}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="tab-panel-wrapper mt-1">
          <div className="tab-panel">
            {notifications.filter((n) => n.type === "update").length === 0 ? (
              <div className="pt-5">
                <img
                  src="icon-park-outline_message.svg"
                  alt="update message"
                  className="notify-img"
                />
                <div className="panel-notify-content">
                  <h6>No Updates Yet</h6>
                  <p>
                    Looks like there's nothing new at the moment. Check back
                    later for messages or activity
                  </p>
                </div>
              </div>
            ) : (
              <ul className="notifyList">
                {notifications
                  .filter((n) => n.type === "update")
                  .map((n) => (
                    <li key={n._id}>
                      <div className="d-flex">
                        <b>{n?.role}:&nbsp;</b>
                        {n.createdBy}
                      </div>
                      <div className="d-flex justify-content-between">
                        <div>{n.message}</div>
                        <div>{new Date(n.date).toLocaleString()}</div>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <div className="tab-panel-wrapper mt-1">
          <div className="tab-panel">
            {notifications.filter((n) => n.type === "alert").length === 0 ? (
              <div className="pt-5">
                <img
                  src="solar_inbox-in-outline.svg"
                  alt="alert image"
                  className="notify-img"
                />
                <div className="panel-notify-content">
                  <h6>No Alerts Yet</h6>
                  <p>
                    You're all caught up! We'll notify you here when something
                    needs your attention
                  </p>
                </div>
              </div>
            ) : (
              <ul className="notifyList">
                {notifications
                  .filter((n) => n.type === "alert")
                  .map((n) => (
                    <li key={n._id}>
                      <div className="d-flex">
                        <b>{n?.role}:&nbsp;</b>
                        {n.createdBy}
                      </div>
                      <div className="d-flex justify-content-between">
                        <div>{n.message}</div>
                        <div>{new Date(n.date).toLocaleString()}</div>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </CustomTabPanel>
    </div>
  );
}
