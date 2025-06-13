// Login.tsx

import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import LoginOptions from "../LoginOptions/LoginOptions";
import MobileInput from "../MobileInput/MobileInput";
import OTPInput from "../OTPInput/OTPInput";
import OTPError from "../OTPError/OTPError";
import OTPSuccess from "../OTPSuccess/OTPSuccess";

import './LoginInputs.scss';

const style = {
  position: "fixed" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 461,
  maxHeight: "calc(100vh - 71px)",
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  overflowY: "auto",
};

const CORRECT_OTP = "123456";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "login" | "mobile" | "otp" | "error" | "success"
  >("login");

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOpen = () => {
    setOpen(true);
    setCurrentStep("login");
  };

  const handleClose = () => setOpen(false);

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === CORRECT_OTP) {
      setCurrentStep("success");
    } else {
      setCurrentStep("error");
    }
  };

  return (
    <form>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Go To Login
      </Button>

      <Modal
        open={open}
        onClose={(_, reason) => {
          if (reason === "backdropClick") return;
          handleClose();
        }}
      >
        <Box sx={style}>
          {currentStep === "login" && (
            <LoginOptions setCurrentStep={setCurrentStep} />
          )}

          {currentStep === "mobile" && (
            <MobileInput
              setCurrentStep={setCurrentStep}
              handleClose={handleClose}
            />
          )}

          {currentStep === "otp" && (
            <OTPInput
              otp={otp}
              setOtp={setOtp}
              inputRefs={inputRefs}
              handleVerify={handleVerify}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === "error" && (
            <OTPError
              resetOtp={() => setOtp(Array(6).fill(""))}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === "success" && (
            <OTPSuccess
              handleClose={handleClose}
              resetOtp={() => setOtp(Array(6).fill(""))}
            />
          )}
        </Box>
      </Modal>
    </form>
  );
}
