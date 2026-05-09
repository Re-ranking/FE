import React from 'react';
import './CommonButton.css';

function CommonButton({ text, onClick, type = "button" }) {
  return (
    <button 
      type={type} 
      className="common-button" 
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default CommonButton;