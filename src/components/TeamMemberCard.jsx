import React from 'react';
import './TeamMemberCard.css';

function TeamMemberCard({ member }) {
  return (
    <div className="member-card">
      <div className="card-top">
        <div className="profile-img-wrapper">
          <img src={member.profileImg} alt={member.name} className="profile-img" />
        </div>
        {/* 이름과 역할을 한 그룹으로 묶음 */}
        <div className="info-text">
          <h3 className="member-name">{member.name}</h3>
          <p className="member-role">{member.role}</p>
        </div>
      </div>
      
      <div className="card-divider"></div>

      <div className="card-bottom">
        {member.matchingReasons.map((reason, index) => (
          <p key={index} className="matching-reason">{reason}</p>
        ))}
      </div>
    </div>
  );
}

export default TeamMemberCard;