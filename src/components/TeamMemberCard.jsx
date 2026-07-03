import React from 'react';
import './TeamMemberCard.css';
import defaultProfile from '../assets/images/profile-default.png';

function TeamMemberCard({ member }) {
  return (
    <div className="member-card">
      <div className="member-card-top">
        <div className="member-avatar-wrapper">
          <img src={defaultProfile} alt={member.name} className="member-avatar" />
        </div>

        <div className="member-rank-pill">
          <span className="member-rank-label">RANK</span>
          <span className="member-rank-number">{String(member.rank).padStart(2, '0')}</span>
        </div>

        <div className="member-name-row">
          <h3 className="member-name">{member.name}</h3>
          <span className="member-role">{member.role}</span>
        </div>

        <p className="member-score">매칭 점수 {member.score}점</p>
      </div>

      <div className="member-divider"></div>

      <div className="member-tags-section">
        {member.skills?.length > 0 && (
          <div className="member-tags">
            {member.skills.map((skill, idx) => (
              <span key={idx} className="member-tag skill-tag">{skill}</span>
            ))}
          </div>
        )}
        {member.domains?.length > 0 && (
          <div className="member-tags">
            {member.domains.map((domain, idx) => (
              <span key={idx} className="member-tag domain-tag">{domain}</span>
            ))}
          </div>
        )}
      </div>

      {member.reason && (
        <div className="member-reason-box">
          <p className="member-reason">{member.reason}</p>
        </div>
      )}
    </div>
  );
}

export default TeamMemberCard;