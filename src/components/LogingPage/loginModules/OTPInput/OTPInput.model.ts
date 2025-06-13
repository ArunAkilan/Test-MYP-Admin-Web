import type { RefObject } from "react";

export interface OTPInputProps {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  inputRefs: RefObject<(HTMLInputElement | null)[]>;
  handleVerify: () => void;
  setCurrentStep: (step: string) => void;
  handleResend: () => void;
}
