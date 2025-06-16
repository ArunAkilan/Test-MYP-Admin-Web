import React from "react";
import Button from "@mui/material/Button";

interface Props {
  handleClose: () => void;
  resetOtp: () => void;
}

const OTPSuccess: React.FC<Props> = ({ handleClose, resetOtp }) => {
  return (
    <div>
      <h3 style={{ color: "green" }}>Login Successful!</h3>
      <p>Welcome to your account.</p>
      <Button
        fullWidth
        onClick={() => {
          resetOtp();
          handleClose();
        }}
      >
        Close
      </Button>
    </div>
  );
};

export default OTPSuccess;
