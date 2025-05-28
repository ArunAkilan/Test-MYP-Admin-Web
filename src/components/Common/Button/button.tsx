import React from "react";
import "./button.scss";
import type GenericButtonProps from './button.module'

export type ButtonVariant = "primary" | "secondary" | "success" | "danger";



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
