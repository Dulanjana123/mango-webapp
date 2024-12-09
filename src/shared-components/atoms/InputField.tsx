import React from 'react';
import { Input, InputProps } from 'reactstrap';

interface InputFieldProps extends InputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text", // Default to "text"
  placeholder = "",
  name,
  value,
  onChange,
  className = "",
  required = false,
  disabled = false,
  ...props
}) => (
  <Input
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    className={`input-field ${className}`}
    required={required}
    disabled={disabled}
    {...props}
  />
);

export default InputField;
