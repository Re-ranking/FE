import React from 'react';
import './CommonInput.css';

function CommonInput({ type, name, value, onChange, placeholder }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="custom-input"
    />
  );
}

export default CommonInput;