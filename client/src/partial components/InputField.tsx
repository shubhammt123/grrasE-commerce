import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className : string;
  name : string
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange , className  , name }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-2 ${className}`}
      name={name}
    />
  );
};

export default InputField;
