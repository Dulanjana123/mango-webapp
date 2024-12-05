// shared-components/atoms/InputField.tsx
import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  className = "",
  required = false,
  disabled = false,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    className={`input-field ${className}`}
    required={required}
    disabled={disabled}
  />
);

export default InputField;
