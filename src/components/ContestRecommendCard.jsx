import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ContestRecommendCard.css';

/**
 * 마이페이지 공모전 추천 내역 카드
 * 응답 필드: competitionId, dlContestId, title, score, domainScore, skillScore,
 *            category, applicationTarget, organizer, applicationPeriod, representativeImageUrl
 */
function getLiveDDay(periodStr) {
  if (!periodStr) return "";
  const dateMatches = periodStr.match(/\d{4}-\d{2}-\d{2}/g);
  if (!dateMatches || dateMatches.length === 0) return "";
  const endDateStr = dateMatches[dateMatches.length - 1];

  const endDate = new Date(endDateStr);
  const today = new Date();
  endDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? `D-${diffDays}` : diffDays === 0 ? "D-DAY" : "마감";
}

function ContestRecommendCard({ contest }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/contests/${contest.competitionId}`);
  };

  const categoryTags = contest.category
    ? contest.category.split(',').map(c => c.trim()).filter(Boolean)
    : [];

  const dDayText = getLiveDDay(contest.applicationPeriod);
  const isClosed = dDayText === '마감';
  const cleanPeriod = contest.applicationPeriod
    ? contest.applicationPeriod.replace(/\s*D[+-]\d+|\s*D-DAY|\s*마감/g, '').trim()
    : '';

  return (
    <div className={`contest-recommend-card${isClosed ? ' is-closed' : ''}`} onClick={handleClick}>
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
          {categoryTags.map((tag, idx) => (
            <span key={idx} className="recommend-card-tag">#{tag}</span>
          ))}
        </div>

        <div className="recommend-card-scores">
          {contest.domainScore !== undefined && (
            <div className="recommend-score-item">
              <span className="recommend-score-label">분야 점수</span>
              <strong>{contest.domainScore}점</strong>
            </div>
          )}
          {contest.domainScore !== undefined && contest.skillScore !== undefined && (
            <div className="recommend-score-divider" />
          )}
          {contest.skillScore !== undefined && (
            <div className="recommend-score-item">
              <span className="recommend-score-label">기술 점수</span>
              <strong>{contest.skillScore}점</strong>
            </div>
          )}
        </div>

        <p className="recommend-card-period">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="3" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {dDayText && (
            <span className={`recommend-card-dday${isClosed ? ' is-closed' : ''}`}>
              {dDayText}
            </span>
          )}
          {cleanPeriod}
        </p>
      </div>
    </div>
  );
}

export default ContestRecommendCard;