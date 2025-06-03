import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/system";
import type { Theme } from "@mui/system";
import type { ChangeEvent } from "react";

type InputType = "text" | "textarea" | "dropdown" | "radio" | "chip";

interface InputFieldProps {
  id: string;
  name?: string;
  label?: string;
  type: InputType;
  placeholder?: string;
  dropdownOptions?: string[];
  dropdow?: string;
  value?: string;
  onChange?: (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => void;
  className?: string;
  radioOptions?: string[];
  icon?: React.ReactElement;
  ariaLabel?: string;
  error?: boolean;
  helperText?: string;
}

const grey = {
  300: "#C7D0DD",
  900: "#1C2025",
};

const blue = {
  200: "#b6daff",
  400: "#3399FF",
  600: "#0072E5",
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }: { theme: Theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[900] : grey[300]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : "#F3F6F9"
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    &:focus-visible {
      outline: 0;
    }
  `
);

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  type,
  placeholder,
  dropdownOptions,
  value,
  onChange,
  className,
  radioOptions,
  icon,
  ariaLabel = "input",
  error,
  helperText,
}) => {
  return (
    <div className="mb-3 d-flex flex-column">
      {label && type !== "radio" && type !== "chip" && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}

      {type === "text" && (
        <TextField
          fullWidth
          id={id}
          name={name}
          label={label}
          type="text"
          size="small"
          value={value}
          onChange={onChange}
          className={className}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          sx={{
            height: 40,
            "& .MuiInputBase-root": {
              height: "100%",
            },
            "& input": {
              padding: "4px 12px",
            },
          }}
        />
      )}

      {type === "textarea" && (
        <StyledTextarea
          id={id}
          name={name}
          aria-label={ariaLabel}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={className}
        />
      )}

      {type === "dropdown" && (
        <FormControl fullWidth>
          <InputLabel id={`${id}-select-label`}>{label}</InputLabel>
          <Select
            labelId={`${id}-select-label`}
            id={id}
            value={value || ""}
            onChange={onChange as (event: SelectChangeEvent) => void}
            size="small"
            displayEmpty
            inputProps={{ "aria-label": "Without label", name }}
          >
            {dropdownOptions?.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {type === "radio" && radioOptions && (
        <FormControl>
          <FormLabel id={`${id}-radio-label`}>{label}</FormLabel>
          <RadioGroup
            row
            aria-labelledby={`${id}-radio-label`}
            name={name}
            value={value}
            onChange={onChange}
          >
            {radioOptions.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}

      {type === "chip" && icon && (
        <Stack direction="row" spacing={1}>
          <Chip icon={icon} label={label} variant="outlined" />
        </Stack>
      )}
    </div>
  );
};

export { InputField };
