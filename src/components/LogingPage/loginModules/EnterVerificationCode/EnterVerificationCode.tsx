// src/components/LoginPage/EnterVerificationCode.tsx

import React, { useRef, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

interface Props {
  length?: number;
  onVerifySuccess: () => void;
  onVerifyFail: () => void;
  onBack: () => void;
}

const CORRECT_OTP = "123456";

const EnterVerificationCode: React.FC<Props> = ({
  length = 6,
  onVerifySuccess,
  onVerifyFail,
  onBack,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData("text").slice(0, length);
    const newOtp = paste.split("").slice(0, length);
    setOtp([...newOtp, ...Array(length - newOtp.length).fill("")]);
    newOtp.forEach((char, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx]!.value = char;
      }
    });
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === CORRECT_OTP) {
      onVerifySuccess();
    } else {
      onVerifyFail();
    }
  };

  return (
    <Box>
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
              style: { textAlign: "center", fontSize: "20px", width: "40px" },
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
        Verify
      </Button>
      <Button onClick={onBack} fullWidth style={{ marginTop: "0.5rem" }}>
        Back
      </Button>
    </Box>
  );
};

export default EnterVerificationCode;
