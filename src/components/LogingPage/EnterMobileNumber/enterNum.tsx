// src/components/LogingPage/loginModules/EnterMobileNumber.tsx
import React from "react";

interface MobileNumberFormProps {
  onBack: () => void;
}

const MobileNumberForm: React.FC<MobileNumberFormProps> = ({ onBack }) => {
  return (
    <form className="mobileNumberForm">
      <section className="topNavEP d-flex flex-d-row">
        <div className="back d-flex flex-d-row" onClick={onBack} style={{ cursor: "pointer" }}>
          <div>
            <img src="/src/assets/loginimgs/Back Icon.svg" alt="Back" width={24} height={24} />
          </div>
          <div>
            <p>Back</p>
          </div>
        </div>
        <div className="cancelIcon">
          <img src="/src/assets/loginimgs/cancel Icon.svg" alt="Cancel" width={24} height={24} />
        </div>
      </section>

      <section className="headerEP">
        <h6>Enter your Mobile Number</h6>
      </section>

      <section className="numberProcess">
        <div>
          <label htmlFor="mobileNumber">Mobile Number</label>
        </div>
        <div className="numberIPF">
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            placeholder="Enter your mobile number"
            required
            style={{ padding: "8px", width: "100%" }}
          />
        </div>
        <div className="mblOTPBTN">
          <button type="submit" className="btn btn-primary mt-3 w-100">
            Send OTP to Mobile Number
          </button>
        </div>
      </section>
    </form>
  );
};

export default MobileNumberForm;
