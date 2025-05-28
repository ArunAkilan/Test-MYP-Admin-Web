export default interface GenericButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: ButtonVariant;
  className?: string;
  icon?: React.ReactNode; // New prop
  iconPosition?: "left" | "right"; // Optional: left/right icon
}