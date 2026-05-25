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
        
        <div className="contest-tags">
          {contest.tags.map((tag, index) => (
            <span key={index} className="contest-tag">{tag}</span>
          ))}
        </div>
        
        <div className="contest-details">
          {contest.target && <p>대상 : {contest.target}</p>}
          {contest.members && <p>인원 : {contest.members} | 난이도 : {contest.difficulty}</p>}
        </div>
        
        <button className="detail-btn">상세보기</button>
      </div>
    </div>
  );
}

export default ContestCard;