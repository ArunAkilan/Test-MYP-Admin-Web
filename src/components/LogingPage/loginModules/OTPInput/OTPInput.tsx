import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import type { OTPInputProps } from "./OTPInput.model";

const OTPInput: React.FC<OTPInputProps> = ({
  otp,
  setOtp,
  inputRefs,
  handleVerify,
  setCurrentStep,
  handleResend,
}) => {
  const [resendTimer, setResendTimer] = useState(30); // seconds
  
  // const [resendCount, setResendCount] = useState(0);
  // const maxResendAttempts = 3;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

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
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = paste.split("");
    const filledOtp = [...newOtp, ...Array(6 - newOtp.length).fill("")];
    setOtp(filledOtp);

    filledOtp.forEach((char, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx]!.value = char;
      }
    });

    const firstEmptyIndex = filledOtp.findIndex((val) => val === "");
    if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
      inputRefs.current[firstEmptyIndex]?.focus();
    }
  };

  const handleResendClick = () => {
    handleResend();
    setOtp(Array(6).fill(""));
    setResendTimer(30);
  };

  return (
    <div>
      <section className="centerSection">
        <h3>Enter Verification Code</h3>
      </section>

      <section>
        <div className="d-flex gap-1">
          <p>Enter the 6 Digit code sent to +91 987 654 3210</p>
          <div
  onClick={() => {
    setOtp(Array(6).fill("")); // Clear the OTP input
    setCurrentStep("mobile");  // Navigate to mobile input step
  }}
  style={{ cursor: "pointer" }}
>
  <img src="/src/assets/loginimgs/PenIcon.svg" alt="Edit" />
  <span className="editP">Edit</span>
</div>

        </div>

        <Box display="flex" justifyContent="center" gap={1} onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => {
                inputRefs.current[index] = el;
              }}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "20px",
                  width: "60.33px",
                  height: "60.33px",
                },
              }}
              variant="outlined"
            />
          ))}
        </Box>

        <Box mt={2} textAlign="center">
          {resendTimer > 0 ? (
            <p style={{ color: "gray" }}>
              Resend Code will be available after {resendTimer} seconds
            </p>
          ) : (
            <Button onClick={handleResendClick} variant="text" color="primary">
              Resend Code
            </Button>
          )}
        </Box>

        <Button
          color="primary"
          onClick={handleVerify}
          style={{ marginTop: "1rem" }}
          fullWidth
          disabled={otp.some((d) => d === "")}
        >
          Confirm OTP
        </Button>
      </section>
    </div>
  );
};

export default OTPInput;
