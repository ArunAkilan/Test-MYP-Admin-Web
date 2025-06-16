import React from "react";
import Button from "@mui/material/Button";
import type { OTPErrorProps } from "./OTPError.model";
const OTPError: React.FC<OTPErrorProps> = ({ resetOtp, setCurrentStep }) => {
  return (
    <div>
      <h3 style={{ color: "red" }}>Incorrect OTP</h3>
      <p>Please try again.</p>
      <Button
        color="error"
        fullWidth
        onClick={() => {
          resetOtp();
          setCurrentStep("otp");
        }}
      >
        Retry
      </Button>
    </div>
  );
};

export default OTPError;
