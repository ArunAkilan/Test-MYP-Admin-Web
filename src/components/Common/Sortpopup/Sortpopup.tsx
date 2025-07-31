
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";

interface BasicPopoverProps {
  triggerRef: React.RefObject<HTMLElement>;
  openOnClick: boolean;
  onClosePopover: () => void;
  selectedLabel: string;
  onSelect: (option: string) => void;
  items?: string[];
  onSortChange: (option: string) => void;
  options: string[];
}

const BasicPopover = ({
  triggerRef,
  openOnClick,
  onClosePopover,
  selectedLabel,
  onSelect,
}: BasicPopoverProps) => {
  const options = ["Newest Property", "Oldest First", "Price: High to Low", "Price: Low to High"];

  return (
    <Popover
      open={openOnClick}
      anchorEl={triggerRef.current}
      onClose={onClosePopover}
       anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
    >
      <div>
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === selectedLabel}
            onClick={() => onSelect(option)}
          >
            {option}
          </MenuItem>
        ))}
      </div>
    </Popover>
  );
};


export default BasicPopover;
