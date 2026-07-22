import React from 'react';
import './TeamMemberCard.css';
import memberAvatarIcon from '../assets/images/member-avatar-icon.svg';

const AVATAR_PALETTE = [
  ['#C2B2FC', '#8E6CEF'],
  ['#F7C8EB', '#EFA1DC'],
  ['#B5D4F4', '#85B7EB'],
  ['#9FE1CB', '#5DCAA5'],
  ['#FBD9B0', '#F5B876'],
  ['#E6E1FE', '#C2B2FC'],
];

function getAvatarColors(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % AVATAR_PALETTE.length;
  }
  const index = ((hash % AVATAR_PALETTE.length) + AVATAR_PALETTE.length) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
}

function TeamMemberCard({ member, showReason = true }) {
  const isTop = member.rank === 1;
  const scoreWidth = Math.max(0, Math.min(100, member.score ?? 0));
  const [colorStart, colorEnd] = getAvatarColors(member.name);

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
          <div
            className="member-avatar-initial"
            style={{ background: `linear-gradient(135deg, ${colorStart} 0%, ${colorEnd} 100%)` }}
          >
            <img src={memberAvatarIcon} alt="" className="member-avatar-icon" />
          </div>
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

      {showReason && member.reason && (
        <div className="member-reason-box">
          <p className="member-reason">{member.reason}</p>
        </div>
      )}
    </div>
  );
}

export default TeamMemberCard;