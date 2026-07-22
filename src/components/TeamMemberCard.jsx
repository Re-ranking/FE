import React from 'react';
import './TeamMemberCard.css';

// 이름을 기반으로 일관된 색을 뽑아주는 팔레트 (사람마다 다른 아바타 색상)
const AVATAR_PALETTE = [
  ['#8E6CEF', '#5A5FE0'], // violet
  ['#F0678B', '#D8467A'], // coral
  ['#4FC3A1', '#17A363'], // green
  ['#5FA8E8', '#3B7DD8'], // blue
  ['#F2B33D', '#E0932A'], // amber
  ['#B98CE0', '#8E5FC9'], // purple
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
  const initial = member.name ? member.name.trim().charAt(0) : '?';

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
            {initial}
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