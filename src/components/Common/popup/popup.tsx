import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  title: string;
};

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  message,
  title,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center", // center horizontally
          gap: 2, // space between buttons (optional)
          paddingBottom: 3, // optional bottom padding
        }}
      >
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
