import React from 'react';
import './CollaborationCard.css';

function CollaborationCard({ title, data, answers, onChange }) {

  const handleToggle = (questionId, option, limit, isMulti) => {
    const currentSelected = answers[questionId] || [];

    if (currentSelected.includes(option)) {
      // ✅ 선택 해제
      onChange(
        questionId,
        currentSelected.filter(item => item !== option)
      );
    } else {
      // ✅ 선택 추가 로직
      if (isMulti) {
        // 1. 중복 선택 가능(isMulti: true)일 경우 제한 없이 추가
        onChange(questionId, [...currentSelected, option]);
      } else if (limit === 1) {
        // 2. 단일 선택일 경우 교체
        onChange(questionId, [option]);
      } else if (currentSelected.length < limit) {
        // 3. 개수 제한이 있는 경우
        onChange(questionId, [...currentSelected, option]);
      } else {
        // 4. 제한 개수 초과 시 알림 (필요 시 주석 해제)
        // alert(`최대 ${limit}개까지 선택 가능합니다.`);
      }
    }
  };

  // ✅ 안내 문구를 결정하는 함수
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
              {/* ✅ isMulti 여부에 따라 가이드 텍스트 변경 */}
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