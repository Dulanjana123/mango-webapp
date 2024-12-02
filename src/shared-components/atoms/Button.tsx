import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button", className }) => (
  <button type={type} className={`button ${className}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
