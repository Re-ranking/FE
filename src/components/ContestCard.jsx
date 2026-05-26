import React from 'react';
import './ContestCard.css';

function ContestCard({ contest }) {
  return (
    <div className="contest-card">
      <div className="poster-wrapper">
        <img src={contest.posterImg} alt={contest.title} className="poster-img" />
      </div>
      
      <div className="contest-info">
        <h3 className="contest-card-title">{contest.title}</h3>
        
        {/* 분야 태그 */}
        <div className="contest-tags">
          {contest.tags.map((tag, index) => (
            <span key={index} className="contest-tag">#{tag}</span>
          ))}
        </div>
        
        {/* 대상 정보만 출력하도록 변경 */}
        <div className="contest-details">
          <p><span className="detail-label">대상</span> {contest.target}</p>
        </div>
        
        <button className="detail-btn">상세보기</button>
      </div>
    </div>
  );
}

export default ContestCard;