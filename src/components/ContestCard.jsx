import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ContestCard.css';

function ContestCard({ contest, id }) {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/contests/${id}`);
  };

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
          {contest.category && (
            <span className="contest-tag">#{contest.category}</span>
          )}
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