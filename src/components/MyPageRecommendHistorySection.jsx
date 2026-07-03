import React from 'react';
import ContestRecommendCard from '../components/ContestRecommendCard';

/**
 * 마이페이지 - 공모전 추천 내역
 * GET /api/mypage/recommendations/competitions 결과를 표시합니다.
 */
function MyPageRecommendHistorySection({ recommendedContests }) {
  return (
    <div className="section-card recommend-history-card">
      <h2 className="analysis-title">공모전 추천 내역</h2>
      {recommendedContests.length === 0 ? (
        <p style={{ color: '#9494A6', fontSize: '15px' }}>
          아직 추천받은 공모전이 없어요. CV를 분석하면 공모전을 추천받을 수 있어요!
        </p>
      ) : (
        <div className="contest-cards-grid">
          {recommendedContests.map((contest) => (
            <ContestRecommendCard
              key={contest.competitionId}
              contest={contest}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPageRecommendHistorySection;