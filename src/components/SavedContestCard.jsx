import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SavedContestCard.css';

/**
 * 마이페이지 - 저장한 공모전 전용 심플 카드
 * ContestRecommendCard와 색상 톤은 맞추되, 점수/분야 정보 없이
 * 포스터 + 제목 + 태그 + 접수기간만 보여주는 가벼운 레이아웃입니다.
 *
 * @param {object} contest - { competitionId, title, category, applicationPeriod, representativeImageUrl }
 * @param {(competitionId: string) => void} onUnsave - 저장 해제 콜백
 */
function SavedContestCard({ contest, onUnsave }) {
  const navigate = useNavigate();

  const categoryTags = contest.category
    ? contest.category.split(',').map((c) => c.trim()).filter(Boolean)
    : [];

  const handleUnsaveClick = (e) => {
    e.stopPropagation();
    onUnsave?.(contest.competitionId);
  };

  return (
    <div
      className="saved-contest-card"
      onClick={() => navigate(`/contests/${contest.competitionId}`)}
    >
      <div className="saved-card-image-wrapper">
        <img
          src={contest.representativeImageUrl}
          alt={contest.title}
          className="saved-card-image"
        />
        <button
          type="button"
          className="saved-card-unsave-btn"
          onClick={handleUnsaveClick}
          aria-label="저장 해제"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      <div className="saved-card-info">
        <h3 className="saved-card-title">{contest.title}</h3>

        {categoryTags.length > 0 && (
          <div className="saved-card-tags">
            {categoryTags.map((tag, idx) => (
              <span key={idx} className="saved-card-tag">#{tag}</span>
            ))}
          </div>
        )}

        {contest.applicationPeriod && (
          <p className="saved-card-period">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="3" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {contest.applicationPeriod}
          </p>
        )}
      </div>
    </div>
  );
}

export default SavedContestCard;