import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, name, value, onChange }) => (
  <input
    type={type}
    className="input-field"
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    required
  />
);

export default InputField;
