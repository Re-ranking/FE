import React from 'react';
import TeamMemberCard from '../components/TeamMemberCard';

/**
 * 마이페이지 - 팀원 추천 내역
 * 팀원 추천 페이지(TeamRecommendation.jsx)의 카드 컴포넌트를 그대로 재사용합니다.
 *
 * props:
 * - members: { name, role, profileImg, matchingReasons }[]
 */
function MyPageTeamRecommendHistorySection({ members }) {
  return (
    <div className="section-card team-recommend-history-card">
      <h2 className="analysis-title">팀원 추천 내역</h2>
      <div className="team-member-grid">
        {members.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
}

export default MyPageTeamRecommendHistorySection;