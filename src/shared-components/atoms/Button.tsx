// shared-components/atoms/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => (
  <button
    type={type}
    className={`button ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
