import React from 'react';

export const Button: React.FunctionComponent<{
  children: React.ReactChild;
  type: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
}> = ({ children, type, className = '', onClick = () => {} }) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`border p-1 w-1/3 hover:bg-gray-500 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
