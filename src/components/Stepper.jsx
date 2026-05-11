import React from 'react';
import './Stepper.css';

function Stepper({ currentStep }) {
  const steps = [
    { id: 1, title: 'Personality' },
    { id: 2, title: 'Collaboration style' },
    { id: 3, title: 'Life pattern' },
    { id: 4, title: 'Communication' },
    { id: 5, title: 'Objective' },
  ];

  return (
    <div className="stepper-container">
      {steps.map((step, index) => (
        <div key={step.id} className="step-wrapper">
          <div className="step-item">
            {/* 숫자 원형 영역 */}
            <div className={`step-number ${currentStep === step.id ? 'active' : ''}`}>
              {step.id}
            </div>
            
            {/* 텍스트 영역 */}
            <span className={`step-title ${currentStep === step.id ? 'active-text' : ''}`}>
              {step.title}
            </span>
          </div>
          
          {/* 마지막 단계가 아닐 때만 수직선 표시 */}
          {index !== steps.length - 1 && (
            <div className="step-line"></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Stepper;