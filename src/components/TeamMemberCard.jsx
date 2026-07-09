import React from 'react';
import './TeamMemberCard.css';
import defaultProfile from '../assets/images/profile-default.png';

function TeamMemberCard({ member }) {
  const isTop = member.rank === 1;
  const scoreWidth = Math.max(0, Math.min(100, member.score ?? 0));

  const renderTagGroup = (label, items, tagClass, groupClass = '') => {
    if (!items || items.length === 0) return null;

    return (
      <div className={`member-tag-group ${groupClass}`.trim()}>
        <span className="member-tag-label">{label}</span>
        <div className="member-tags">
          {items.map((item, idx) => (
            <span key={idx} className={`member-tag ${tagClass}`}>{item}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`member-card${isTop ? ' is-top' : ''}`}>
      <span className="member-rank-badge">No.{member.rank}</span>

      <div className="member-card-top">
        <div className="member-avatar-ring">
          <img src={defaultProfile} alt={member.name} className="member-avatar" />
        </div>

        <div className="member-name-row">
          <h3 className="member-name">{member.name}</h3>
          <span className="member-role">{member.role}</span>
        </div>
      </div>

      <div className="member-score-block">
        <div className="member-score-row">
          <span className="member-score-label">매칭 점수</span>
          <span className="member-score-value">{member.score}점</span>
        </div>
        <div className="member-score-track">
          <div className="member-score-fill" style={{ width: `${scoreWidth}%` }} />
        </div>
      </div>

      <div className="member-divider"></div>

      <div className="member-tags-section">
        {renderTagGroup('SKILL', member.skills, 'skill-tag')}
        {renderTagGroup('DOMAIN', member.domains, 'domain-tag', 'is-domain')}
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