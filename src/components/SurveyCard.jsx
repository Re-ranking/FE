import React from 'react';
import './SurveyCard.css';

function SurveyCard({ title, questions, answers, onChange }) {

  const handleOptionChange = (questionId, value) => {
    onChange(questionId, value);
  };

  return (
    <div className="survey-card-container">
      <h2 className="survey-main-title">{title}</h2>
      
      <div className="survey-card">
        {/* ✅ 라벨 정렬을 위해 inner div를 추가했습니다. */}
        <div className="survey-header-labels">
          <div className="survey-header-labels-inner">
            <span>아니다</span>
            <span>그렇다</span>
          </div>
        </div>

        <div className="question-list">
          {questions.map((q) => (
            <div key={q.id} className="question-item">
              <span className="question-text">
                {q.id}. {q.text}
              </span>
              
              <div className="options-group">
                {[1, 2, 3].map((value) => (
                  <label key={value} className="radio-label">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={value}
                      // answers가 undefined일 경우를 대비해 기본값 처리
                      checked={(answers && answers[q.id]) === value}
                      onChange={() => handleOptionChange(q.id, value)}
                    />
                    <span className="custom-radio"></span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurveyCard;