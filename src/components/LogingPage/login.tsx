// // src/components/LogingPage/Login.tsx

// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";

// import LoginOptions from "./loginModules/LoginOptions/LoginOptions";
// import MobileInput from "./loginModules/MobileInput/MobileInput";
// import OTPInput from "./loginModules/OTPInput/OTPInput";
// import OTPError from "./loginModules/OTPError/OTPError";
// import OTPSuccess from "./loginModules/OTPSuccess/OTPSuccess";
// import "./login.scss";

// const CORRECT_OTP = "123456";

// export default function Login() {
//   const [open, setOpen] = useState(false);
//   const [currentStep, setCurrentStep] = useState<
//     "login" | "mobile" | "otp" | "error" | "success"
//   >("login");
//   const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

//   const handleOpen = () => {
//     setOpen(true);
//     setCurrentStep("login");
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setOtp(Array(6).fill(""));
//   };

//   const handleVerify = () => {
//     const enteredOtp = otp.join("");
//     if (enteredOtp === CORRECT_OTP) {
//       setCurrentStep("success");
//     } else {
//       setCurrentStep("error");
//     }
//   };

//   return (
//     <form action="" className="LoginPagePO">
//       <Button onClick={handleOpen}>Go To Login Page</Button>
//       <Modal open={open} onClose={handleClose}>
//         <Box className="modalBox">
//           {currentStep === "login" && <LoginOptions onNext={() => setCurrentStep("mobile")} />}

//           {currentStep === "mobile" && (
//             <MobileInput onBack={() => setCurrentStep("login")} onNext={() => setCurrentStep("otp")} />
//           )}

//           {currentStep === "otp" && (
//             <OTPInput
//               otp={otp}
//               setOtp={setOtp}
//               onBack={() => setCurrentStep("mobile")}
//               onVerify={handleVerify}
//             />
//           )}

//           {currentStep === "error" && (
//             <OTPError
//               onRetry={() => {
//                 setOtp(Array(6).fill(""));
//                 setCurrentStep("otp");
//               }}
//             />
//           )}

//           {currentStep === "success" && <OTPSuccess onClose={handleClose} />}
//         </Box>
//       </Modal>
//     </form>
//   );
// }
