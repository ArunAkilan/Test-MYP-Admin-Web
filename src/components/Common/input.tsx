// src/components/LogingPage/loginModules/MobileInput/input.tsx
import * as React from "react";
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
  Box,
  Button,
  Typography,
  Modal,
  Breadcrumbs,
  Link,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/system";
import { MuiTelInput } from "mui-tel-input";
import type { Theme } from "@mui/system";
import type { SelectChangeEvent } from "@mui/material/Select";
 
// ---------------- Types -------------------
type InputType = "text" | "textarea" | "dropdown" | "radio" | "chip" | "phone" | "email" | "number" | 
"checkbox" | "tel";
 
interface BreadcrumbItem {
  label: string;
  href?: string;
}
 
interface InputFieldProps {
  id?: string;
  name?: string;
  label?: string;
  type: InputType;
  placeholder?: string;
  dropdownOptions?: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // For text, email, textarea, dropdown, radio
  onPhoneChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // For phone input (string)
  className?: string;
  radioOptions?: string[];
  icon?: React.ReactElement;
  ariaLabel?: string;
  error?: boolean;
  helperText?: string;
  Selected?: string;
  breadcrumbs?: BreadcrumbItem[];
}
 
// ---------------- Styles -------------------
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
    border: 1px solid ${theme.palette.mode === "dark" ? grey[900] : grey[300]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
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
 
// ---------------- Component -------------------
const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  type,
  placeholder,
  dropdownOptions,
  value,
  onChange,
  onPhoneChange,
  className,
  radioOptions,
  icon,
  ariaLabel = "input",
  error,
  helperText,
  breadcrumbs,
}) => {
  // Handler for normal inputs (text, email, textarea, dropdown, radio)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onChange) {
      onChange(e);
    }
  };
 
  // Handler for Select dropdown
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    if (onChange) {
      // Cast to React.ChangeEvent<HTMLInputElement> for compatibility
      onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };
 
  // Breadcrumb click handler
  const handleBreadcrumbClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.info("Breadcrumb clicked.");
  };
 
  return (
    <div className="mb-3 d-flex flex-column">
      {/* ---------- Dynamic Breadcrumbs ---------- */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Stack spacing={2} sx={{ mb: 2 }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs.map((crumb, index) =>
              crumb.href && index !== breadcrumbs.length - 1 ? (
                <Link
                  key={index}
                  underline="hover"
                  color="inherit"
                  href={crumb.href}
                  onClick={handleBreadcrumbClick}
                >
                  {crumb.label}
                </Link>
              ) : (
                <Typography key={index} color="text.primary">
                  {crumb.label}
                </Typography>
              )
            )}
          </Breadcrumbs>
        </Stack>
      )}
 
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          className={className}
        />
      )}
 
      {type === "phone" && (
        <MuiTelInput
          value={typeof value === "string" ? value : ""}
          onChange={(newValue: any) => {
            const digitsOnly = newValue.replace(/\D/g, "");
            if (digitsOnly.length <= 12 && onPhoneChange) {
              onPhoneChange(newValue);
            }
          }}
          defaultCountry="IN"
          label={label}
          fullWidth
          size="small"
          error={error}
          helperText={helperText}
          placeholder={placeholder || "+91 1234567890"}
          className={className}
          name={name}
          id={id}
          aria-label={ariaLabel}
        />
      )}
 
      {type === "dropdown" && (
        <FormControl fullWidth size="small" error={error}>
          <InputLabel id={`${id}-select-label`}>{label}</InputLabel>
          <Select
            labelId={`${id}-select-label`}
            id={id}
            value={value || ""}
            onChange={handleSelectChange}
            displayEmpty
            label={label}
            inputProps={{ "aria-label": "Without label", name }}
          >
            {dropdownOptions?.map((option: string, index: number) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {helperText && (
            <Typography variant="caption" color="error">
              {helperText}
            </Typography>
          )}
        </FormControl>
      )}
 
      {type === "radio" && radioOptions && (
        <FormControl error={error}>
          <FormLabel id={`${id}-radio-label`}>{label}</FormLabel>
          <RadioGroup
            row
            aria-labelledby={`${id}-radio-label`}
            name={name}
            value={value}
            onChange={handleInputChange}
          >
            {radioOptions.map((option: string, index: number) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          {helperText && (
            <Typography variant="caption" color="error">
              {helperText}
            </Typography>
          )}
        </FormControl>
      )}
 
      {type === "chip" && icon && (
        <Stack direction="row" spacing={1}>
          <Chip avatar={icon} 
          label={
            <Typography
              sx={{
                // whiteSpace: "normal",
                // overflowWrap: "break-word",
              }}
            >
              {label}
            </Typography>
          } 
          variant="outlined" 
          sx={{
            maxWidth: "none", // remove max-width constraint
            whiteSpace: "normal", // allow wrapping
            textOverflow: "unset", // remove ...
            overflow: "visible", // allow content to overflow
            height: "auto", // allow height to expand if text wraps
            paddingY: 1, // optional: give some vertical padding for better layout
          }}
          />
        </Stack>
      )}
    </div>
  );
};
 
// ---------------- Modal (unchanged) -------------------
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
 
export function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
 
export { InputField };