// BasicPopover.tsx
import React, { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

interface BasicPopoverProps {
  triggerRef: React.RefObject<HTMLElement | null>;
  openOnClick: boolean;
  onClosePopover: () => void;
  items: string[];
  selectedLabel: string;
  onSelect: (label: string) => void;
  
}

const BasicPopover: React.FC<BasicPopoverProps> = ({
  triggerRef,
  openOnClick,
  onClosePopover,
  items,
  selectedLabel,
  onSelect,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (openOnClick && triggerRef.current) {
      setAnchorEl(triggerRef.current);
    } else {
      setAnchorEl(null);
    }
  }, [openOnClick, triggerRef]);

  const handleClose = () => {
    onClosePopover();
  };

  return (
    <Popover
      id="basic-popover"
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <MenuList>
        {items.map((item) => (
          <MenuItem
            key={item}
            selected={item === selectedLabel}
            onClick={() => {
              onSelect(item);
              handleClose();
            }}
          >
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Popover>
  );
};

export default BasicPopover;
