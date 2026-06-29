import React from 'react';
import './CollaborationCard.css';

function CollaborationCard({ title, data, answers, onChange }) {

  const handleToggle = (questionId, option, limit, isMulti) => {
    const currentSelected = answers[questionId] || [];

    if (currentSelected.includes(option)) {
      onChange(
        questionId,
        currentSelected.filter(item => item !== option)
      );
    } else {
      if (isMulti) {
        onChange(questionId, [...currentSelected, option]);
      } else if (limit === 1) {
        onChange(questionId, [option]);
      } else if (currentSelected.length < limit) {
        onChange(questionId, [...currentSelected, option]);
      }
    }
  };

  const getGuideText = (limit, isMulti) => {
    if (isMulti) return "중복 선택 가능";
    if (limit > 1) return `최대 ${limit}개 선택`;
    return "1개 선택";
  };

  return (
    <div className="collab-card-container">
      <h2 className="collab-main-title">{title}</h2>
      
      <div className="collab-card">
        {data.map((item) => (
          <div key={item.id} className="collab-question-section">

            <h3 className="collab-question-title">
              {item.id}. {item.question}
              <span> ({getGuideText(item.limit, item.isMulti)})</span>
            </h3>
            
            <div className="collab-options-grid">
              {item.options.map((option) => (
                <label key={option} className="collab-checkbox-label">
                  
                  <input
                    type="checkbox"
                    checked={(answers[item.id] || []).includes(option)}
                    onChange={() => handleToggle(item.id, option, item.limit, item.isMulti)}
                  />

                  <span className="collab-custom-box"></span>
                  <span className="collab-option-text">{option}</span>

                </label>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default CollaborationCard;