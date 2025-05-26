import React from "react";
import "./button.scss";

export type ButtonVariant = "primary" | "secondary" | "success" | "danger";

interface GenericButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: ButtonVariant;
  className?: string;
  icon?: React.ReactNode; // New prop
  iconPosition?: "left" | "right"; // Optional: left/right icon
}

const GenericButton: React.FC<GenericButtonProps> = ({
  label,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
  icon,
  iconPosition = "left",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn--${variant} ${className}`}
    >
      {icon && iconPosition === "left" && (
        <span className="btn__icon">{icon}</span>
      )}
       {label}
      {/* <span className="btn__label">{label}</span> */}
      {icon && iconPosition === "right" && (
        <span className="btn__icon">{icon}</span>
      )}
     
    </button>
  );
};

export default GenericButton;