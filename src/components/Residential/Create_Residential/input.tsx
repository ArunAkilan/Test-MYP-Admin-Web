// InputField.tsx
import React from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Chip,
  Stack,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/system";
import { MuiTelInput } from "mui-tel-input";
import type { Theme } from "@mui/system";
import type {
  SelectChangeEvent,
} from "@mui/material/Select";
import type { ChangeEvent } from "react";

type InputType = "text" | "textarea" | "dropdown" | "radio" | "chip" | "phone" | "email";

interface InputFieldProps {
  id: string;
  name?: string;
  label?: string;
  type: InputType;
  placeholder?: string;
  dropdownOptions?: string[];
  value?: string | number;
  onChange?: (
    event:
      | SelectChangeEvent<string | number>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | string
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
    width: 100%;
    padding: 8px 12px;
    border-radius: 8px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[900] : grey[300]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
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
        />
      )}

      {type === "email" && (
        <TextField
          fullWidth
          id={id}
          name={name}
          label={label}
          type="email"
          size="small"
          value={value}
          onChange={onChange}
          className={className}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
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

      {type === "phone" && (
        <MuiTelInput
          value={typeof value === "string" ? value : ""}
          onChange={(newValue) => {
            const digitsOnly = newValue.replace(/\D/g, "");
            if (digitsOnly.length <= 12 && onChange) {
              onChange(newValue);
            }
          }}
          defaultCountry="IN"
          // No onlyCountries prop = all countries available
          label={label}
          fullWidth
          size="small"
          error={error}
          helperText={helperText}
          placeholder={placeholder || "+91 1234567890"}
          className={className}
          inputProps={{
            name,
            id,
            "aria-label": ariaLabel,
            inputMode: "numeric",
          }}
        />
      )}

      {type === "dropdown" && (
        <FormControl fullWidth>
          <InputLabel id={`${id}-select-label`}>{label}</InputLabel>
          <Select
            labelId={`${id}-select-label`}
            id={id}
            value={value || ""}
            onChange={onChange as (
              event: SelectChangeEvent<string | number>
            ) => void}
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
