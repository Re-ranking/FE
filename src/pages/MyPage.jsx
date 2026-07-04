import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import useModal from '../hooks/useModal.jsx';
import ProfileCard from '../components/ProfileCard';
import TraitInputBanner from '../components/TraitInputBanner';
import MyPageEditableItemSection from '../components/MyPageEditableItemSection';
import MyPageCvAnalysisSection from '../components/MyPageCvAnalysisSection';
import MyPageRecommendHistorySection from '../components/MyPageRecommendHistorySection';
import MyPageTeamRecommendHistorySection from '../components/MyPageTeamRecommendHistorySection';
import './MyPage.css';
import defaultProfile from '../assets/images/profile-default.png';
import iconInterest from '../assets/images/profile-default.png';
import iconProject from '../assets/images/profile-default.png';
import iconAward from '../assets/images/profile-default.png';
import { getMyCv, updateMyCv, updateMyProfile, getRecommendedCompetitions, getRecommendedTeamMembers } from '../api/mypageAPI';

function MyPage() {
  const { openModal, ModalComponent } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [cvData, setCvData] = useState({
    name: '',
    major: '',
    profileImage: '',
    introduction: '',
    skills: [],
    interests: [],
    projects: [],
    awards: [],
  });

  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [recommendedContests, setRecommendedContests] = useState([]);
  const [recommendedTeamMembers, setRecommendedTeamMembers] = useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

    const toFullUrl = (url) => {
      if (!url) return null;
      if (url.startsWith('http')) return url;
      return `${BASE_URL}${url}`;
    };

    const fetchMyCv = async () => {
      try {
        const data = await getMyCv();
        const savedUser = localStorage.getItem('user');
        const user = savedUser ? JSON.parse(savedUser) : {};

        setCvData({
          name: data.name || user.name || '',
          major: data.major || user.major || '',
          profileImage: toFullUrl(data.profileImage) || toFullUrl(user.profileImage) || '',
          introduction: data.introduction || user.description || '',
          skills: data.skills || [],
          interests: data.interests || [],
          projects: data.projects || [],
          awards: data.awards || [],
        });
        setStrengths((data.strengths || []).map(s => ({ name: s.name, value: s.score })));
        setWeaknesses((data.weaknesses || []).map(w => ({ name: w.name, value: w.score })));
        setProfileImageUrl(toFullUrl(data.profileImage) || toFullUrl(user.profileImage) || null);
      } catch (err) {
        console.error('CV 정보 로드 실패:', err);
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          setCvData(prev => ({
            ...prev,
            name: user.name || '',
            major: user.major || '',
            introduction: user.description || '',
            profileImage: toFullUrl(user.profileImage) || '',
          }));
          setProfileImageUrl(toFullUrl(user.profileImage) || null);
        }
      }
    };
    fetchMyCv();

    const fetchRecommendedContests = async () => {
      if (!localStorage.getItem('contestRecommended')) return;
      try {
        const data = await getRecommendedCompetitions();
        setRecommendedContests(data || []);
      } catch (err) {
        console.error('공모전 추천 내역 로드 실패:', err);
      }
    };
    fetchRecommendedContests();

    const fetchRecommendedTeamMembers = async () => {
      try {
        const data = await getRecommendedTeamMembers();
        setRecommendedTeamMembers(data || []);
      } catch (err) {
        console.error('팀원 추천 내역 로드 실패:', err);
      }
    };
    fetchRecommendedTeamMembers();
  }, []);

  const handleEditStart = () => {
    setDraft({ ...cvData });
    setProfileImageFile(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(null);
    setProfileImageFile(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // CV 정보 수정 (PATCH /api/mypage/cv)
      await updateMyCv({
        skills: draft.skills,
        interests: draft.interests,
        projects: draft.projects,
        awards: draft.awards,
      });

      // 프로필 수정 (PATCH /api/mypage/profile)
      if (draft.introduction !== cvData.introduction || profileImageFile) {
        await updateMyProfile({
          introduction: draft.introduction,
          profileImage: profileImageFile || undefined,
        });
      }

      setCvData({ ...draft });
      setIsEditing(false);
      setDraft(null);
      openModal('CV 수정이 완료되었습니다.');
    } catch (err) {
      console.error('저장 실패:', err);
      openModal('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSkill = (value) => {
    setDraft(prev => ({ ...prev, skills: [...prev.skills, value] }));
  };
  const handleRemoveSkill = (idx) => {
    setDraft(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));
  };

  const handleAddItem = (field, value) => {
    setDraft(prev => ({ ...prev, [field]: [...prev[field], value] }));
  };
  const handleRemoveItem = (field, idx) => {
    setDraft(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== idx) }));
  };

  const current = isEditing ? draft : cvData;

  return (
    <div className="mypage-page">
      <Navbar />

      <main className="mypage-content">

        <ProfileCard
          name={current.name}
          profileImageUrl={profileImageUrl}
          defaultProfile={defaultProfile}
          oneLiner={current.introduction}
          tagLabel="Skills"
          tags={current.skills}
          isEditing={isEditing}
          onOneLinerChange={(value) => setDraft(prev => ({ ...prev, introduction: value }))}
          onAddTag={handleAddSkill}
          onRemoveTag={handleRemoveSkill}
          onProfileImageChange={(file) => setProfileImageFile(file)}
        />

        <TraitInputBanner />

        <div className="section-card">
          <div className="section-grid">
            <MyPageEditableItemSection
              icon={iconInterest}
              title="interests"
              items={current.interests}
              isEditing={isEditing}
              emptyText="수정하기 버튼을 눌러 관심 분야를 추가해보세요!"
              placeholder="관심 분야 입력 후 Enter"
              onAdd={(value) => handleAddItem('interests', value)}
              onRemove={(idx) => handleRemoveItem('interests', idx)}
            />

            <MyPageEditableItemSection
              icon={iconProject}
              title="projects"
              items={current.projects.map(p =>
                [p.period, p.title, p.description].filter(Boolean).join(' | ')
              )}
              isEditing={isEditing}
              emptyText="수정하기 버튼을 눌러 프로젝트를 추가해보세요!"
              placeholder="프로젝트 입력 후 Enter"
              onAdd={(value) => handleAddItem('projects', { period: '', title: value, description: '' })}
              onRemove={(idx) => handleRemoveItem('projects', idx)}
            />

            <MyPageEditableItemSection
              icon={iconAward}
              title="awards"
              items={current.awards}
              isEditing={isEditing}
              emptyText="수정하기 버튼을 눌러 수상/경력을 추가해보세요!"
              placeholder="수상/경력 입력 후 Enter"
              onAdd={(value) => handleAddItem('awards', value)}
              onRemove={(idx) => handleRemoveItem('awards', idx)}
            />
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

        <MyPageCvAnalysisSection strengths={strengths} weaknesses={weaknesses} />

        <MyPageRecommendHistorySection recommendedContests={recommendedContests} />

        <MyPageTeamRecommendHistorySection members={recommendedTeamMembers} />

      </main>

      {ModalComponent}
    </div>
  );
}

export default MyPage;