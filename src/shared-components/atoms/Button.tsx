import React from 'react';
import { Button, ButtonProps } from 'reactstrap';

interface CdButtonProps extends ButtonProps {
  label: string; 
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; // Button` component type prop
  className?: string;
  disabled?: boolean;
  borderRadius?: number; // Custom prop specific to CdButton
}

const CdButton: React.FC<CdButtonProps> = ({
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  borderRadius = 5,
  ...props
}) => {
  return (
    <Button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...props.style,
        borderRadius: `${borderRadius}px`,
        "--bs-btn-bg": "none", // Override the Bootstrap variable
      } as React.CSSProperties}
      {...props}
    >
      {label}
    </Button>
  );
};

export default CdButton;
