import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './MyPage.css';
import defaultProfile from '../assets/images/profile-default.png';
import iconInterest from '../assets/images/profile-default.png'; // 
import iconProject from '../assets/images/profile-default.png';
import iconAward from '../assets/images/profile-default.png';
// import { getMyCv, updateMyCv, updateMyProfile } from '../api/mypageAPI';

function MyPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ⚠️ 디자인 작업용 더미 데이터 - 백엔드 연동 시 삭제하고 useState({}) 빈 객체로 변경
  const [cvData, setCvData] = useState({
    user_id: "user_028",
    name: "Joclla Dargo",
    skills: ["SQL"],
    domains: [],
    projects: [
      "Optimized SQL database system",
      "Complex reporting solutions",
      "Database optimization strategy",
      "Legacy databases migration to cloud-based infrastructure"
    ],
    experience: [
      "SQL Developer at Microsoft Corporation, GA",
      "Junior SQL Developer at Oracle Corporation, GA"
    ]
  });
  // ⚠️ 더미 데이터 끝

  // 회원가입 때 입력한 한줄소개(bio) - localStorage의 user 정보에서 가져옴
  const [oneLiner, setOneLiner] = useState('');

  // 편집용 임시 상태 (취소 시 원복하기 위함)
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    // 백엔드 연동 시 아래 주석 해제 (GET /api/mypage/cv)
    // const fetchMyCv = async () => {
    //   try {
    //     const data = await getMyCv();
    //     setCvData(data);
    //   } catch (err) {
    //     console.error('CV 정보 로드 실패:', err);
    //   }
    // };
    // fetchMyCv();

    // 회원가입 때 입력한 한줄소개(bio) - localStorage의 user 정보에서 가져옴
    // (한줄소개는 mypage/profile API가 아니라 회원가입 시 저장된 값을 그대로 사용)
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setOneLiner(parsed.bio || '');
    }
  }, []);

  const handleEditStart = () => {
    setDraft({ ...cvData, oneLiner }); // 현재 상태를 편집용으로 복사
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 백엔드 연동 시 아래 두 API 호출 주석 해제 (CV와 프로필은 별도 엔드포인트)

      // 1) CV 정보 수정 (PATCH /api/mypage/cv)
      // await updateMyCv({
      //   skills: draft.skills,
      //   domains: draft.domains,
      //   projects: draft.projects,
      //   experience: draft.experience
      // });

      // 2) 한줄소개(프로필) 수정 (PATCH /api/mypage/profile)
      // await updateMyProfile({ bio: draft.oneLiner });

      setCvData({
        user_id: draft.user_id,
        name: draft.name,
        skills: draft.skills,
        domains: draft.domains,
        projects: draft.projects,
        experience: draft.experience
      });
      setOneLiner(draft.oneLiner);
      setIsEditing(false);
      setDraft(null);
    } catch (err) {
      console.error('저장 실패:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // 스킬 추가/삭제 (편집 모드에서만)
  const [skillInput, setSkillInput] = useState('');
  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      setDraft(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };
  const handleRemoveSkill = (idx) => {
    setDraft(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));
  };

  // 리스트형 데이터(domains, projects, experience) 개별 항목 추가/삭제
  const handleAddItem = (field, value, setValue) => {
    if (value.trim()) {
      setDraft(prev => ({ ...prev, [field]: [...prev[field], value.trim()] }));
      setValue('');
    }
  };
  const handleRemoveItem = (field, idx) => {
    setDraft(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== idx) }));
  };
  const handleItemKeyDown = (e, field, value, setValue) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem(field, value, setValue);
    }
  };

  const [domainInput, setDomainInput] = useState('');
  const [projectInput, setProjectInput] = useState('');
  const [experienceInput, setExperienceInput] = useState('');

  const current = isEditing ? draft : { ...cvData, oneLiner };

  return (
    <div className="mypage-page">
      <Navbar />

      <main className="mypage-content">

        
        <div className="profile-card">
          <div className="profile-avatar-wrapper">
            <img src={defaultProfile} alt={current.name} />
          </div>

          <div className="profile-main">
            <h1 className="profile-name">{current.name}</h1>

            {isEditing ? (
              <textarea
                className="profile-oneliner-textarea"
                value={draft.oneLiner}
                onChange={(e) => setDraft(prev => ({ ...prev, oneLiner: e.target.value }))}
                placeholder="간단한 한 줄 소개를 적어주세요!"
              />
            ) : (
              current.oneLiner && (
                <div className="profile-oneliner-box">{current.oneLiner}</div>
              )
            )}
          </div>

          <div className="skills-section">
            <span className="skills-title">Skills</span>
            <div className="skills-tags">
              {current.skills.map((skill, idx) => (
                isEditing ? (
                  <span key={idx} className="skill-tag editable">
                    {skill}
                    <button className="skill-remove-btn" onClick={() => handleRemoveSkill(idx)}>×</button>
                  </span>
                ) : (
                  <span key={idx} className="skill-tag">{skill}</span>
                )
              ))}
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

        <div className="section-card">
          <div className="section-grid">
            <div>
              <h3 className="info-block-title">
                <img src={iconInterest} alt="" className="info-block-icon" />
                domains
              </h3>

              {isEditing ? (
                <div className="editable-item-list">
                  {draft.domains.map((d, idx) => (
                    <div key={idx} className="editable-item">
                      <span className="editable-item-text">{d}</span>
                      <button type="button" className="item-remove-btn" onClick={() => handleRemoveItem('domains', idx)}>×</button>
                    </div>
                  ))}
                  <div className="item-add-row">
                    <input
                      className="item-add-input"
                      placeholder="관심 분야 입력 후 Enter"
                      value={domainInput}
                      onChange={(e) => setDomainInput(e.target.value)}
                      onKeyDown={(e) => handleItemKeyDown(e, 'domains', domainInput, setDomainInput)}
                    />
                    <button type="button" className="item-add-btn" onClick={() => handleAddItem('domains', domainInput, setDomainInput)}>
                      추가
                    </button>
                  </div>
                </div>
              ) : (
                <div className="info-list">
                  {current.domains.length > 0 ? (
                    current.domains.map((d, idx) => (
                      <p key={idx} className="info-list-item">{d}</p>
                    ))
                  ) : (
                    <p className="info-list-item">아직 등록된 관심 분야가 없어요.</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <h3 className="info-block-title">
                <img src={iconProject} alt="" className="info-block-icon" />
                projects
              </h3>
              {isEditing ? (
                <div className="editable-item-list">
                  {draft.projects.map((p, idx) => (
                    <div key={idx} className="editable-item">
                      <span className="editable-item-text">{p}</span>
                      <button type="button" className="item-remove-btn" onClick={() => handleRemoveItem('projects', idx)}>×</button>
                    </div>
                  ))}
                  <div className="item-add-row">
                    <input
                      className="item-add-input"
                      placeholder="프로젝트 입력 후 Enter"
                      value={projectInput}
                      onChange={(e) => setProjectInput(e.target.value)}
                      onKeyDown={(e) => handleItemKeyDown(e, 'projects', projectInput, setProjectInput)}
                    />
                    <button type="button" className="item-add-btn" onClick={() => handleAddItem('projects', projectInput, setProjectInput)}>
                      추가
                    </button>
                  </div>
                </div>
              ) : (
                <div className="info-list">
                  {current.projects.map((p, idx) => (
                    <p key={idx} className="info-list-item">{p}</p>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="info-block-title">
                <img src={iconAward} alt="" className="info-block-icon" />
                experience
              </h3>
              {isEditing ? (
                <div className="editable-item-list">
                  {draft.experience.map((exp, idx) => (
                    <div key={idx} className="editable-item">
                      <span className="editable-item-text">{exp}</span>
                      <button type="button" className="item-remove-btn" onClick={() => handleRemoveItem('experience', idx)}>×</button>
                    </div>
                  ))}
                  <div className="item-add-row">
                    <input
                      className="item-add-input"
                      placeholder="수상/경력 입력 후 Enter"
                      value={experienceInput}
                      onChange={(e) => setExperienceInput(e.target.value)}
                      onKeyDown={(e) => handleItemKeyDown(e, 'experience', experienceInput, setExperienceInput)}
                    />
                    <button type="button" className="item-add-btn" onClick={() => handleAddItem('experience', experienceInput, setExperienceInput)}>
                      추가
                    </button>
                  </div>
                </div>
              ) : (
                <div className="info-list">
                  {current.experience.map((e, idx) => (
                    <p key={idx} className="info-list-item">{e}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mypage-action-bar">
          {isEditing ? (
            <div className="edit-actions">
              <button className="edit-toggle-btn cancel" onClick={handleCancel} disabled={isSaving}>
                취소
              </button>
              <button className="edit-toggle-btn" onClick={handleSave} disabled={isSaving}>
                저장하기
              </button>
            </div>
          ) : (
            <button className="edit-toggle-btn" onClick={handleEditStart}>
              수정하기
            </button>
          )}
        </div>

      </main>
    </div>
  );
}

export default MyPage;