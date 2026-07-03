import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ContestRecommendCard.css';

/**
 * 마이페이지 공모전 추천 내역 카드
 * 응답 필드: competitionId, dlContestId, title, score, domainScore, skillScore,
 *            category, applicationTarget, organizer, applicationPeriod, representativeImageUrl
 */
function ContestRecommendCard({ contest }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/contests/${contest.competitionId}`);
  };

  return (
    <div className="contest-recommend-card" onClick={handleClick}>
      <div className="recommend-card-image-wrapper">
        <img
          src={contest.representativeImageUrl}
          alt={contest.title}
          className="recommend-card-image"
        />
        {contest.score !== undefined && (
          <div className="recommend-card-score-badge">
            {contest.score}점
          </div>
        )}
      </div>

      <div className="recommend-card-info">
        <h3 className="recommend-card-title">{contest.title}</h3>

        <div className="recommend-card-tags">
          {contest.category && (
            <span className="recommend-card-tag">#{contest.category}</span>
          )}
        </div>

        <div className="recommend-card-scores">
          {contest.domainScore !== undefined && (
            <span className="recommend-score-item">
              분야 <strong>{contest.domainScore}점</strong>
            </span>
          )}
          {contest.skillScore !== undefined && (
            <span className="recommend-score-item">
              기술 <strong>{contest.skillScore}점</strong>
            </span>
          )}
        </div>

        <p className="recommend-card-period">{contest.applicationPeriod}</p>
      </div>
    </div>
  );
}

export default ContestRecommendCard;