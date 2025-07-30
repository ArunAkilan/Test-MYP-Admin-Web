// SortMenu.tsx
import React from "react";
import {
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";

// Define the sort options type
type SortOption = "newest" | "oldest" | "highestPrice" | "lowestPrice";

// Props type
type SortMenuProps = {
  anchorElement: null | HTMLElement;
  menuOpen: boolean;
  handleMenuClose: () => void;
  onChange: (label: string) => void;
  selected: string;
};

// Raw options to map to display strings
const sortOptions: SortOption[] = [
  "newest",
  "oldest",
  "highestPrice",
  "lowestPrice",
];

// Format display label
const formatOption = (key: SortOption): string => {
  switch (key) {
    case "newest":
      return "Newest Property";
    case "oldest":
      return "Oldest Property";
    case "highestPrice":
      return "Highest Price";
    case "lowestPrice":
      return "Lowest Price";
    default:
      return key;
  }
};

const SortMenu: React.FC<SortMenuProps> = ({
  anchorElement,
  menuOpen,
  handleMenuClose,
  onChange,
  selected,
}) => {
  return (
    <Menu
      anchorEl={anchorElement}
      open={menuOpen}
      onClose={handleMenuClose}
      sx={{ border: "1px solid #D3DDE7" }}
    >
      {sortOptions.map((option) => (
        <MenuItem
          key={option}
          selected={selected === option}
          onClick={() => {
            onChange(option);
            handleMenuClose();
          }}
        >
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Menu>
  );
};

export default SortMenu;
