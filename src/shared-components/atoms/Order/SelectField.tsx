import React from 'react';

interface SelectFieldProps {
  options: string[];
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const SelectField = ({ options, name, value, onChange, className }: SelectFieldProps) => (
  <select name={name} value={value} onChange={onChange} className={className || 'form-select'}>
    {options.map((option, index) => (
      <option key={index} value={option === "All" ? "" : option}>
        {option}
      </option>
    ))}
  </select>
);

export default SelectField;
