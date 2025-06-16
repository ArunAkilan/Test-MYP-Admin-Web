import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Table from "../DashboradTable/table";
import { Avatar } from "@mui/material";
import './Dashboardtab.scss';
import type { ResidentialProperty } from "../../AdminResidencial/AdminResidencial.model"

interface TabPanelProps {
  children?: React.ReactNode;
  index?: number;
  value?: number;
  data?: ResidentialProperty[];
  properties?:  "residentials" | "commercials" | "plots";
  washroom?: number | string;
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

export default function Dashboardtab({ data, properties }: TabPanelProps){
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

 

  return (
     
      <div id="pending-approval-tab" >
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              paddingBottom: "24px"
            }}
          >
            <Tab
              label="Pending Requests"
              {...a11yProps(0)}
              icon={<Avatar alt="test avatar" src="/pending-action.svg" />}
              iconPosition="start"
            />
            <Tab
              label="Approved Properties"
              {...a11yProps(1)}
              icon={<Avatar alt="test avatar" src="/pending-approval.svg" />}
              iconPosition="start"
            />
            <Tab
              label="Rejected Properties"
              {...a11yProps(2)}
              icon={<Avatar alt="test avatar" src="/pending-reject.svg" />}
              iconPosition="start"
            />
            <Tab
              label="Deleted Properties"
              {...a11yProps(3)}
              icon={<Avatar alt="test avatar" src="/pending-delete.svg" />}
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