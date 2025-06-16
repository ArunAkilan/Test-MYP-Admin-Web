import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputField } from "../../../Common/input";
import './MobileInput.scss';
import type { MobileInputProps } from "./MobileInput.model"


const MobileInput: React.FC<MobileInputProps> = ({ setCurrentStep, handleClose }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const validatePhone = (phoneNumber: string) => {
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    // Assuming the user types +91 1234567890 — you should expect 12 digits including country code
    if (digitsOnly.length !== 12) {
      setError(true);
      setHelperText("Please enter a valid 10-digit phone number");
      return false;
    }
    setError(false);
    setHelperText("");
    return true;
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    validatePhone(value);
    
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatePhone(phone)) {
      setCurrentStep("otp");
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST" className="mobile-input-form">
      <section className="modalNavbar d-flex justify-content-between align-items-center px-3 py-2">
        <div className="backNav d-flex align-items-center gap-2">
          <Button
            onClick={() => setCurrentStep("login")}
            className="backBtn"
           
          >
            <img src="/src/assets/loginimgs/Back Icon.svg" alt="Back" />
            <span className="backT">Back</span>
          </Button>
        </div>
        <div className="cancelNav" onClick={handleClose} style={{ cursor: "pointer" }}>
          <img src="/src/assets/loginimgs/cancel Icon.svg" alt="Cancel" />
        </div>
      </section>
<section className="midEction">
      <section className="midTopic">
        <h3>Enter Mobile Number</h3>
      </section>

      <section className="processingArea">
        <div>
          <label htmlFor="mobile-phone">Mobile Number</label>
        </div>
        <div className="mobileMui phone-input-wrapper">
            <InputField
            
              id="mobile-phone"
              name="mobile"
              type="phone"
              value={phone}
              onChange={handlePhoneChange}
              error={error}
              helperText={helperText}
              placeholder="+91 1234567890"
            />
           
        </div>


        <div className="otpSendBtn">
          <button
            type="submit"
            variant="contained"
            fullWidth
            style={{ marginTop: "1rem" }}
            disabled={error || phone === ""}
          >
            Send OTP to Mobile Number
          </button>
        </div>
      </section>
      </section>
    </form>
  );
};

export default MobileInput;
