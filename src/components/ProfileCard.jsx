import React, { useState } from 'react';

/**
 * 프로필 카드 (이름, 한줄소개, 태그 목록)
 * - 마이페이지: tagLabel="Skills", tags=skills
 * - 공모전 추천 페이지: tagLabel="Domains", tags=domains
 *
 * props:
 * - name: string
 * - profileImageUrl: string | null
 * - defaultProfile: 이미지 import
 * - oneLiner: string
 * - tagLabel: string (예: "Skills", "Domains")
 * - tags: string[]
 * - isEditing: boolean (편집 가능한 페이지에서만 true로 사용, 읽기 전용 페이지는 항상 false)
 * - onOneLinerChange(value: string)
 * - onAddTag(value: string)
 * - onRemoveTag(idx: number)
 */
function ProfileCard({
  name,
  profileImageUrl,
  defaultProfile,
  oneLiner,
  tagLabel,
  tags,
  isEditing,
  onOneLinerChange,
  onAddTag,
  onRemoveTag,
}) {
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      onAddTag(tagInput.trim());
      setTagInput('');
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
        <span className="skills-title">{tagLabel}</span>
        <div className="skills-tags">
          {tags.map((tag, idx) =>
            isEditing ? (
              <span key={idx} className="skill-tag editable">
                {tag}
                <button className="skill-remove-btn" onClick={() => onRemoveTag(idx)}>×</button>
              </span>
            ) : (
              <span key={idx} className="skill-tag">{tag}</span>
            )
          )}
          {isEditing && (
            <input
              className="skill-add-input"
              placeholder="추가"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;