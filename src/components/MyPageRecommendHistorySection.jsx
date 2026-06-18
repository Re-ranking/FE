import React from 'react';
import ContestCard from '../components/ContestRecommendCard';

/**
 * 마이페이지 - 공모전 추천 내역
 * 공모전 추천 페이지(ContestRecommend.jsx)의 카드 컴포넌트를 그대로 재사용합니다.
 *
 * props:
 * - recommendedContests: { title, image, score, description }[]
 */
function MyPageRecommendHistorySection({ recommendedContests }) {
  return (
    <div className="section-card recommend-history-card">
      <h2 className="analysis-title">공모전 추천 내역</h2>
      <div className="contest-cards-grid">
        {recommendedContests.map((contest, index) => (
          <ContestCard
            key={index}
            title={contest.title}
            image={contest.image}
            score={contest.score}
            description={contest.description}
          />
        ))}
      </div>
    </div>
  );
}

export default MyPageRecommendHistorySection;