import React from 'react';
import TeamMemberCard from '../components/TeamMemberCard';

function MyPageTeamRecommendHistorySection({ members }) {
  return (
    <div className="section-card team-recommend-history-card">
      <h2 className="analysis-title">팀원 추천 내역</h2>
      {members.length === 0 ? (
        <p style={{ color: '#9494A6', fontSize: '15px' }}>
          아직 추천받은 팀원이 없어요. 성향 입력 후 팀원 추천을 받아보세요!
        </p>
      ) : (
        <div className="team-member-grid">
          {members.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPageTeamRecommendHistorySection;