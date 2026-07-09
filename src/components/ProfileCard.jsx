import React, { useState, useRef } from 'react';

/**
 * 프로필 카드 (이름, 한줄소개, 태그 목록)
 * - 마이페이지: tagLabel="Skills", tags=skills, isEditing 가능
 * - 공모전 추천 페이지: tagLabel="Domains", tags=domains, isEditing=false
 *
 * props:
 * - name: string
 * - profileImageUrl: string | null
 * - defaultProfile: 이미지 import
 * - oneLiner: string
 * - tagLabel: string
 * - tags: string[]
 * - isEditing: boolean
 * - onOneLinerChange(value: string)
 * - onAddTag(value: string)
 * - onRemoveTag(idx: number)
 * - onProfileImageChange(file: File) - 편집 모드에서 이미지 파일 변경 시 호출
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
  onProfileImageChange,
}) {
  const [tagInput, setTagInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      onAddTag(tagInput.trim());
      setTagInput('');
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    onProfileImageChange?.(file);
  };

  const displayImage = previewUrl || profileImageUrl || defaultProfile;

  return (
    <div className="profile-card">
      <div
        className={`profile-avatar-wrapper ${isEditing ? 'profile-avatar-editable' : ''}`}
        onClick={handleAvatarClick}
      >
        <img src={displayImage} alt={name} />
        {isEditing && (
          <div className="profile-avatar-overlay">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
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