import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./HomeTab.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import GenericButton from "../Button/button";
import heroSearchImage from "../../../../public/tdesign_search.svg";

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

function HomeTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [age, setAge] = React.useState("");

  const selecthandleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleSearchFieldOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchValue(value);

    if (!value.trim()) {
      setError(true);
      setHelperText("Search cannot be empty.");
    } else {
      setError(false);
      setHelperText("");
    }
  };
  return (
    <div className="rentsalelease-tab">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{ paddingBottom: "24px" }}
      >
        <Tab label="Rent" className="prop-type-tab" {...a11yProps(0)} />
        <Tab label="Sale" className="prop-type-tab" {...a11yProps(1)} />
        <Tab label="Lease" className="prop-type-tab" {...a11yProps(2)} />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <div className="property-search-field">
          <img
            src="weui_location-outlined.svg"
            className="hero-location-image"
            alt="location img"
          />

          <TextField
            placeholder="Search in Perambalur"
            type="search"
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleSearchFieldOnChange}
            className="hero-search-field"
            value={searchValue}
            error={error}
            helperText={helperText}
            sx={{
              mr: "10px",
              color: "81838C",
              letterSpacing: "0px",
              fontSize: "16px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
          <div className="line"></div>
          <FormControl
            sx={{ mr: "10px", maxWidth: 225, width: 1, minWidth: "auto" }}
            className="hero-select"
            size="small"
          >
            <InputLabel id="demo-select-small-label">House</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              onChange={selecthandleChange}
              label="House"
              input={
                <OutlinedInput
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <div className="line"></div>
          <FormControl
            sx={{ mr: "10px", maxWidth: 225, width: 1, minWidth: "auto" }}
            className="hero-select"
            size="small"
          >
            <InputLabel id="demo-select-small-label">Budget</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              onChange={selecthandleChange}
              label="Budget"
              input={
                <OutlinedInput
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <GenericButton
            image={heroSearchImage}
            variant="primary"
            iconPosition="left"
            label={"Search"}
            className="genericSearchBtn"
          />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="property-search-field">
          <img src="weui_location-outlined.svg" alt="location img" />

          <TextField
            placeholder="Search in Perambalur"
            type="search"
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleSearchFieldOnChange}
            value={searchValue}
            sx={{
              mr: "10px",
              color: "81838C",
              letterSpacing: "0px",
              fontSize: "16px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />

          <div className="line"></div>
          <FormControl sx={{ mr: "10px", maxWidth: 225, minWidth: "auto", width: 1 }} size="small">
            <InputLabel id="demo-select-small-label">House</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              onChange={selecthandleChange}
              label="House"
              input={
                <OutlinedInput
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <div className="line"></div>
          <FormControl
            sx={{ mr: "10px", maxWidth: 225, minWidth: "auto", width: 1 }}
            size="small"
          >
            <InputLabel id="demo-select-small-label">Budget</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              onChange={selecthandleChange}
              label="Budget"
              input={
                <OutlinedInput
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <GenericButton
            image={heroSearchImage}
            variant="primary"
            iconPosition="left"
            label={"Search"}
            className="genericSearchBtn"
          />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="property-search-field">
          <img src="weui_location-outlined.svg" alt="location img" />

          <TextField
            placeholder="Search in Perambalur"
            type="search"
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleSearchFieldOnChange}
            value={searchValue}
            sx={{
              mr: "10px",
              color: "81838C",
              letterSpacing: "0px",
              fontSize: "16px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />

          <div className="line"></div>
          <FormControl
            sx={{ mr: "10px" }}
            className="select-tab-house"
            size="small"
          >
            <InputLabel id="demo-select-small-label">House</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              onChange={selecthandleChange}
              label="House"
              input={
                <OutlinedInput
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <div className="line"></div>
          <FormControl
            sx={{ mr: "10px" }}
            className="select-tab-budget"
            size="small"
          >
            <InputLabel id="demo-select-small-label">Budget</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              onChange={selecthandleChange}
              label="Budget"
              input={
                <OutlinedInput
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <GenericButton
            image={heroSearchImage}
            variant="primary"
            iconPosition="left"
            label={"Search"}
            className="genericSearchBtn"
          />
        </div>
      </CustomTabPanel>
    </div>
  );
}

export default HomeTab;
