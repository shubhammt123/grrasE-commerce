import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
  className : string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label , className }) => {
  return (
    <button onClick={onClick} className={`p-2 ${className}`}>
      {label}
    </button>
  );
};

export default Button;
