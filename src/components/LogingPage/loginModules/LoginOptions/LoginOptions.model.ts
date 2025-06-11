export type LoginStep = 'login' | 'mobile' | 'otp' | 'error' | 'success';

export interface LoginOptionsProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<LoginStep>>;
}
