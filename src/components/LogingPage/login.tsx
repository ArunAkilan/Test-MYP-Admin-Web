// src/components/LogingPage/Login.tsx

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { GoogleLogin } from "@react-oauth/google";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 461,
  height: 656,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = paste.split("").slice(0, 6);
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
    newOtp.forEach((char, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx]!.value = char;
      }
    });
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === CORRECT_OTP) {
      setCurrentStep("success");
    } else {
      setCurrentStep("error");
    }
  };

  return (
    <form action="">
      <Button onClick={handleOpen}>Login</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {currentStep === "login" && (
            <div>
              <section className="loginHeader">
                <div><h2>Login</h2></div>
                <div> <p>Login or Create Profile</p></div>
              </section>
              
              <section className="LoginOptions">
              <Button
                variant="outlined"
                fullWidth
                style={{ marginTop: "1rem" }}
                onClick={() => setCurrentStep("mobile")}
              >
                Continue with Mobile Number
              </Button>
              <div style={{ margin: "1rem 0", textAlign: "center" }}>or</div>
              <GoogleLogin
                onSuccess={(response) =>
                  console.log("Google success:", response)
                }
                onError={() => console.log("Google login failed")}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "1rem" }}
              >
                Continue with Facebook
              </Button>
              </section>
              <section className="terms-section">
                <p>
                By creating an account, you agree to our{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="link">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="link">
                  Privacy Policies
                </a>
                </p>
              </section>
            </div>
          )}

          {currentStep === "mobile" && (
            <div>
              <h3>Enter Mobile Number</h3>
              <input
                type="text"
                placeholder="Enter mobile number"
                style={{ width: "100%", padding: "10px" }}
              />
              <Button
                variant="contained"
                fullWidth
                style={{ marginTop: "1rem" }}
                onClick={() => setCurrentStep("otp")}
              >
                Send OTP
              </Button>
              <Button onClick={() => setCurrentStep("login")}>Back</Button>
            </div>
          )}

          {currentStep === "otp" && (
            <div>
              <h3>Enter OTP</h3>
              <Box display="flex" justifyContent="center" gap={1} onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    inputProps={{
                      maxLength: 1,
                      style: {
                        textAlign: "center",
                        fontSize: "20px",
                        width: "40px",
                      },
                    }}
                    variant="outlined"
                  />
                ))}
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleVerify}
                style={{ marginTop: "1rem" }}
                fullWidth
              >
                Verify OTP
              </Button>
              <Button onClick={() => setCurrentStep("mobile")} fullWidth>
                Back
              </Button>
            </div>
          )}

          {currentStep === "error" && (
            <div>
              <h3 style={{ color: "red" }}>Incorrect OTP</h3>
              <p>Please try again.</p>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => {
                  setOtp(Array(6).fill(""));
                  setCurrentStep("otp");
                }}
              >
                Retry
              </Button>
            </div>
          )}

          {currentStep === "success" && (
            <div>
              <h3 style={{ color: "green" }}>Login Successful!</h3>
              <p>Welcome to your account.</p>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setOtp(Array(6).fill(""));
                  handleClose();
                }}
              >
                Close
              </Button>
            </div>
          )}
        </Box>
      </Modal>
      </form>
  );
}
