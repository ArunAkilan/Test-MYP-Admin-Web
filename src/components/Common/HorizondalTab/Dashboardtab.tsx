import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";

// Define your Listing data type
interface Listing {
  id: number;
  title: string;
  status: "pending" | "approved" | "rejected" | "deleted";
  createdAt: string;
  updatedAt: string;
}

// Define table column structure (optional, for demo)
interface TableColumn {
  field: string;
  headerName: string;
  type?: string;
  width?: number;
}

interface TableProperties {
  columns: TableColumn[];
}

// Table Props
interface TableProps {
  data: Listing[];
  properties: TableProperties;
}

// Simple Table component for demo (replace with your real Table)
function Table({ data, properties }: TableProps) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {properties.columns.map((col) => (
            <th
              key={col.field}
              style={{ border: "1px solid #ccc", padding: "8px", width: col.width }}
            >
              {col.headerName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={properties.columns.length} style={{ textAlign: "center", padding: 8 }}>
              No data
            </td>
          </tr>
        )}
        {data.map((item) => (
          <tr key={item.id}>
            {properties.columns.map((col) => (
              <td key={col.field} style={{ border: "1px solid #ccc", padding: "8px" }}>
                {/* Simple access to item fields */}
                {item[col.field as keyof Listing] ?? ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Tab panel props and component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({ children, value, index, ...other }: TabPanelProps) {
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

// DashboardTab Props
interface DashboardTabProps {
  data: Listing[];
  properties: TableProperties;
}

// Main component
export default function Dashboardtab({ data, properties }: DashboardTabProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Filter data by status for each tab
  const filteredData = {
    pending: data.filter((item) => item.status === "pending"),
    approved: data.filter((item) => item.status === "approved"),
    rejected: data.filter((item) => item.status === "rejected"),
    deleted: data.filter((item) => item.status === "deleted"),
  };

  return (
    <div id="pending-approval-tab">
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
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
            {...a11yProps(3)}
            icon={<PendingActionsOutlinedIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Table data={filteredData.pending} properties={properties} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Table data={filteredData.approved} properties={properties} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Table data={filteredData.rejected} properties={properties} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Table data={filteredData.deleted} properties={properties} />
      </CustomTabPanel>
    </div>
  );
}
