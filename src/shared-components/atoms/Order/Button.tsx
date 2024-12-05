import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  label,
  onClick,
  disabled = false,
  type = "button",
  className = "",
 }) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
