import React from 'react';
import type { LoginOptionsProps } from './LoginOptions.model';
import Button from '@mui/material/Button';
import { GoogleLogin } from '@react-oauth/google';
import './LoginOption.scss';



const LoginOptions: React.FC<LoginOptionsProps> = ({ setCurrentStep }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentStep("mobile");
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <section className="loginHeader">
        <div className="headerTitle">
          <h2>Login</h2>
        </div>
        <div className="headerDes">
          <p>Login or Create Profile</p>
        </div>
      </section>

      <section className="loginOptions">
        <div className="buttonWrapper">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            style={{ marginTop: "1rem" }}
            className="mobileLoginBtn"
          >
            <img src="/src/assets/loginimgs/mbl Icon.svg" alt="" />
            Continue with Mobile Number
          </Button>
        </div>

        <div
          className="orPart"
          style={{
            margin: "1rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <img
            src="/src/assets/loginimgs/Line 7.svg"
            alt="line"
            style={{
              width: "100%",
              maxWidth: "173px",
              height: "1px",
              objectFit: "cover",
            }}
          />
          <span className="orText">or</span>
          <img
            src="/src/assets/loginimgs/Line 7.svg"
            alt="line"
            style={{
              width: "100%",
              maxWidth: "173px",
              height: "1px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="googleLoginBtn">
          <GoogleLogin
            onSuccess={(res) => console.log("Google success:", res)}
            onError={() => console.log("Google login failed")}
          />
        </div>

        <div className="facebookLoginBtn">
          <Button variant="outlined" color="primary" fullWidth className="facebookBtn">
            <img src="/src/assets/loginimgs/LOGO_FB.svg" alt="Facebook" />
            Continue with Facebook
          </Button>
        </div>
      </section>

      <section className="terms-section">
        <p>
          By creating an account, you agree to our{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policies
          </a>
        </p>
      </section>
    </form>
  );
};

export default LoginOptions;
