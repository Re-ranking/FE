import React from 'react';
import './ContestRecommendCard.css'; // 카드 전용 CSS 연결

function ContestRecommendCard({ title, image, score, description }) {
  return (
    <div className="recommend-card">
      <h3 className="recommend-card-title">{title}</h3>
      <div className="recommend-card-image-wrapper">
        <img src={image} alt={title} className="recommend-card-poster-img" />
      </div>
      <div className="recommend-card-score">score : {score}</div>
      <p className="recommend-card-desc">{description}</p>
      <button className="recommend-card-detail-btn">상세보기</button>
    </div>
  );
}

export default ContestRecommendCard;