import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material"; // ✅
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";

// type Option = {
//   label: string;
//   value: string;
//   disabled?: boolean;
// };
// interface RowRadioButtonsGroupProps {
//   label: string;
//   name: string;
//   options: Option[];
// }

type InputType = "text" | "dropdown";

interface InputFieldProps {
  id: string;
  label?: string;
  type: InputType;
  placeholder?: string;
  size?: "sm" | "lg"; // Bootstrap input sizes
  dropdownOptions?: string[];
  Selected?: string;
  radioOptions?: string[];
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  dropdownOptions,
  Selected,
  radioOptions,
  icon
  
}) => {
  const [rent, setRent] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRent(event.target.value as string);
  };

  return (
    <div className="mb-3">
      <div className="d-flex flex-column">
        {type === "text" && (
          <>
            <label className="form-label">{label}</label>

            <TextField
              fullWidth
              id={id}
              sx={{
                height: 40, // overall height
                "& .MuiInputBase-root": {
                  height: "100%",
                },
                "& input": {
                  padding: "4px 12px",
                },
              }}
              label={label}
              type={type}
              size="small"
            />
          </>
        )}
      </div>

      {type === "dropdown" && (
        <>
          <label className="form-label">{label}</label>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{Selected}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={rent}
              onChange={handleChange}
              id="outlined-size-small"
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {dropdownOptions?.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}

      {type === "radio" && (
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {radioOptions.map((Options, index) => (
              <FormControlLabel
                key={index}
                value={Options}
                control={<Radio />}
                label={Options}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
          {type === "chip" && (
       <Stack direction="row" spacing={1}>
       <Chip icon={icon} label={label} variant="outlined" />
     </Stack>
      )}
    </div>
  );
};

export default InputField;
