import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "../DashboradTable/table";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

export default function Dashboardtab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
     
      <div id="pending-approval-tab" >
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="Pending Requests"
              {...a11yProps(0)}
              icon={<PendingActionsOutlinedIcon />}
              iconPosition="start"
            />
            <Tab
              label="Approved Listings"
              {...a11yProps(1)}
              icon={<PendingActionsOutlinedIcon />}
              iconPosition="start"
            />
            <Tab
              label="Rejected Listings"
              {...a11yProps(2)}
              icon={<PendingActionsOutlinedIcon />}
              iconPosition="start"
            />
            <Tab
              label="Deleted Listings"
              {...a11yProps(2)}
              icon={<PendingActionsOutlinedIcon />}
              iconPosition="start"
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="new-listing-wrap">
            <div className="container">
              <div className="new-listing">
                <div className="new-listing-wrap-list">
                  <h3 className="fresh-list">36 Fresh Listings</h3>
                  <img src="Ellipse 24.svg" alt="dot svg" />
                  <h3 className="pending-list">136 Pending Request</h3>
                </div>
                <div className="list-panel">
                  <div className="search">
                    <input type="search" placeholder="Search Property" />
                    <img src="Search-1.svg" alt="search svg" />
                  </div>
                  <div className="filter-link color-edit">
                    <Button
                      className="filter-text"
                      aria-describedby={id}
                      onClick={handleClick}
                    >
                      <img src="majesticons_filter-line.svg" alt="filter img" />
                      Filter
                    </Button>
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
                  <div className="sort color-edit">
                    <Button
                      className="Sort-text"
                      aria-describedby={id}
                      onClick={handleClick}
                    >
                      <img
                        src="material-symbols_sort-rounded.svg"
                        alt="sort img"
                      />
                      Sort
                    </Button>
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
                </div>
              </div>
            </div>
          </div>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="new-listing-wrap">
            <div className="container">
              <div className="new-listing">
                <div className="new-listing-wrap-list">
                  <h3 className="fresh-list">36 Fresh Listings</h3>
                  <img src="Ellipse 24.svg" alt="dot svg" />
                  <h3 className="pending-list">136 Pending Request</h3>
                </div>
                <div className="list-panel">
                  <div className="search">
                    <input type="search" placeholder="Search Property" />
                    <img src="Search-1.svg" alt="search svg" />
                  </div>
                  <div className="filter-link color-edit">
                    <Button
                      className="filter-text"
                      aria-describedby={id}
                      onClick={handleClick}
                    >
                      <img src="majesticons_filter-line.svg" alt="filter img" />
                      Filter
                    </Button>
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
                  <div className="sort color-edit">
                    <Button
                      className="Sort-text"
                      aria-describedby={id}
                      onClick={handleClick}
                    >
                      <img
                        src="material-symbols_sort-rounded.svg"
                        alt="sort img"
                      />
                      Sort
                    </Button>
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
                </div>
              </div>
            </div>
          </div>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className="new-listing-wrap">
            <div className="container">
              <div className="new-listing">
                <div className="new-listing-wrap-list">
                  <h3 className="fresh-list">36 Fresh Listings</h3>
                  <img src="Ellipse 24.svg" alt="dot svg" />
                  <h3 className="pending-list">136 Pending Request</h3>
                </div>
                <div className="list-panel">
                  <div className="search">
                    <input type="search" placeholder="Search Property" />
                    <img src="Search-1.svg" alt="search svg" />
                  </div>
                  <div className="filter-link color-edit">
                    <Button
                      className="filter-text"
                      aria-describedby={id}
                      onClick={handleClick}
                    >
                      <img src="majesticons_filter-line.svg" alt="filter img" />
                      Filter
                    </Button>
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
                  <div className="sort color-edit">
                    <Button
                      className="Sort-text"
                      aria-describedby={id}
                      onClick={handleClick}
                    >
                      <img
                        src="material-symbols_sort-rounded.svg"
                        alt="sort img"
                      />
                      Sort
                    </Button>
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
                </div>
              </div>
            </div>
          </div>
          Item Three
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <div className="new-listing-wrap">
            <div className="container">
              <div className="new-listing">
                <div className="new-listing-wrap-list">
                  <h3 className="fresh-list">36 Fresh Listings</h3>
                  <img src="Ellipse 24.svg" alt="dot svg" />
                  <h3 className="pending-list">136 Pending Request</h3>
                </div>
                <div className="list-panel">
                  <div className="search">
                    <input type="search" placeholder="Search Property" />
                    <img src="Search-1.svg" alt="search svg" />
                  </div>
                  <div className="filter-link color-edit">
                    <Button
                      className="filter-text"
                      aria-describedby={id}
                      onClick={handleClick}
                    >
                      <img src="majesticons_filter-line.svg" alt="filter img" />
                      Filter
                    </Button>
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
                  <div className="sort color-edit">
                    <Button
                      className="Sort-text"
                      aria-describedby={id}
                      onClick={handleClick}
                    >
                      <img
                        src="material-symbols_sort-rounded.svg"
                        alt="sort img"
                      />
                      Sort
                    </Button>
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
                </div>
              </div>
            </div>
          </div>
          Item Four
        </CustomTabPanel>
      </div>
    
  );
}
