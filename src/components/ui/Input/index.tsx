import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...rest }) => {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      
      <input 
        className={`base-input ${error ? 'input-error' : ''} ${className}`}
        {...rest} 
      />

      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export {Input};