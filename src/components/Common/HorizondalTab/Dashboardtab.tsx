import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import Table from "../DashboradTable/table";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other  } = props;

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

export default function Dashboardtab({ data,properties}) {
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
          
              <Table data={data} properties={properties} />

        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
           
               <Table data={data} properties={properties} />

        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
        
               <Table data={data} properties={properties} />

        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
         
               <Table data={data} properties={properties} />

        </CustomTabPanel>
      </div>
    
  );
}
