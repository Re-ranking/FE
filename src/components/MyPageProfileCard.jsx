import React from 'react';

/**
 * 마이페이지 - 프로필 카드 (이름, 한줄소개, 스킬)
 *
 * props:
 * - name: string
 * - profileImageUrl: string | null
 * - defaultProfile: 이미지 import
 * - oneLiner: string
 * - skills: string[]
 * - isEditing: boolean
 * - onOneLinerChange(value: string)
 * - onAddSkill(value: string)
 * - onRemoveSkill(idx: number)
 */
function MyPageProfileCard({
  name,
  profileImageUrl,
  defaultProfile,
  oneLiner,
  skills,
  isEditing,
  onOneLinerChange,
  onAddSkill,
  onRemoveSkill,
}) {
  const [skillInput, setSkillInput] = React.useState('');

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      onAddSkill(skillInput.trim());
      setSkillInput('');
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-avatar-wrapper">
        {/* ⚠️ profileImageUrl이 있으면 실제 프로필 사진, 없으면 기본 이미지 표시 */}
        <img src={profileImageUrl || defaultProfile} alt={name} />
      </div>

      <div className="profile-main">
        <h1 className="profile-name">{name}</h1>

        {isEditing ? (
          <textarea
            className="profile-oneliner-textarea"
            value={oneLiner}
            onChange={(e) => onOneLinerChange(e.target.value)}
            placeholder="간단한 한 줄 소개를 적어주세요!"
          />
        ) : (
          oneLiner && <div className="profile-oneliner-box">{oneLiner}</div>
        )}
      </div>

      <div className="skills-section">
        <span className="skills-title">Skills</span>
        <div className="skills-tags">
          {skills.map((skill, idx) =>
            isEditing ? (
              <span key={idx} className="skill-tag editable">
                {skill}
                <button className="skill-remove-btn" onClick={() => onRemoveSkill(idx)}>×</button>
              </span>
            ) : (
              <span key={idx} className="skill-tag">{skill}</span>
            )
          )}
          {isEditing && (
            <input
              className="skill-add-input"
              placeholder="추가"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPageProfileCard;