export type MobileLoginStep = 'login' | 'mobile' | 'otp' | 'error' | 'success';

export interface MobileInputProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<MobileLoginStep>>;
  handleClose: () => void;
}
