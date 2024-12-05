import React from 'react';

interface SelectDropdownProps {
  options: string[];
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, name, value, onChange, className }) => {
  return (
    <select name={name} value={value} onChange={onChange} className={`form-select ${className}`}>
      {options.map((option, index) => (
        <option key={index} value={option === "All" ? "" : option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdown;
