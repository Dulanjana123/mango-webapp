import React from 'react';
import { Input } from 'reactstrap';

interface SelectDropdownProps {
  options: string[];
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, name, value, onChange, className = "" }) => {
  return (
    <Input
      type="select"
      name={name}
      value={value}
      onChange={onChange}
      className={`form-select ${className}`}
    >
      {options.map((option, index) => (
        <option key={index} value={option === "All" ? "" : option}>
          {option}
        </option>
      ))}
    </Input>
  );
};

export default SelectDropdown;
