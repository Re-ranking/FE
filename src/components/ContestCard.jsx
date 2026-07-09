import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ContestCard.css';

function ContestCard({ contest, id }) {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/contests/${id}`);
  };

  // category가 "Data, AI" 같은 쉼표 구분 문자열이면 분리, 아니면 그대로 배열로
  const categoryTags = contest.category
    ? contest.category.split(',').map(c => c.trim()).filter(Boolean)
    : [];

  return (
    <div className="contest-card">
      <div className="poster-wrapper">
        <img
          src={contest.imageUrl}
          alt={contest.title}
          className="poster-img"
        />
      </div>

      <div className="contest-info">
        <h3 className="contest-card-title">{contest.title}</h3>

        <div className="contest-tags">
          {categoryTags.map((tag, idx) => (
            <span key={idx} className="contest-tag">#{tag}</span>
          ))}
        </div>

        <div className="contest-details">
          <p>
            <span className="detail-label">대상</span>
            {contest.target}
          </p>
        </div>

        <button className="detail-btn" onClick={handleDetailClick}>
          상세보기
        </button>
      </div>
    </div>
  );
}

export default ContestCard;