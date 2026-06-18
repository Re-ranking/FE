import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import useModal from '../hooks/useModal.jsx';
import MyPageProfileCard from '../components/MyPageProfileCard';
import MyPageEditableItemSection from '../components/MyPageEditableItemSection';
import MyPageCvAnalysisSection from '../components/MyPageCvAnalysisSection';
import MyPageRecommendHistorySection from '../components/MyPageRecommendHistorySection';
import MyPageTeamRecommendHistorySection from '../components/MyPageTeamRecommendHistorySection';
import './MyPage.css';
import defaultProfile from '../assets/images/profile-default.png';
import iconInterest from '../assets/images/profile-default.png'; // ✅ 임시 아이콘 - 실제 아이콘으로 교체 가능
import iconProject from '../assets/images/profile-default.png';
import iconAward from '../assets/images/profile-default.png';
import poster02 from '../assets/images/contest-poster-02.png';
import poster03 from '../assets/images/contest-poster-03.png';
import poster06 from '../assets/images/contest-poster-06.png';
import teamMemberDefaultImg from '../assets/images/yeonwoo.jpg';
// ✅ 백엔드 연동 시 주석 해제
// import { getMyCv, updateMyCv, updateMyProfile, getRecommendedCompetitions, getRecommendedTeamMembers } from '../api/mypageAPI';
// ⚠️ CV 분석(강점/약점)은 AI 파트 별도 API - 엔드포인트 확정되면 여기 import 추가

function MyPage() {
  const { openModal, ModalComponent } = useModal();
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

  // ⚠️ 디자인 작업용 더미 데이터 - AI 파트 API 확정 전까지 유지 (CV 분석 강점/약점)
  const [strengths, setStrengths] = useState([
    { name: "기술적 전문성", value: 75 },
    { name: "문제 해결력", value: 65 },
    { name: "프로젝트 관리", value: 45 },
    { name: "커뮤니케이션", value: 30 },
  ]);
  const [weaknesses, setWeaknesses] = useState([
    { name: "시간 관리", value: 20 },
    { name: "협상 및 영향력", value: 20 },
    { name: "발표", value: 12 },
    { name: "원격 협업", value: 12 },
  ]);
  // ⚠️ 더미 데이터 끝 (AI 파트 엔드포인트 확정되면 useEffect에서 fetch로 교체)

  // ⚠️ 디자인 작업용 더미 데이터 - 백엔드 연동 시 삭제 (GET /api/mypage/recommendations/competitions 로 대체)
  const [recommendedContests, setRecommendedContests] = useState([
    {
      title: "CYBER SECURITY 해커톤",
      image: poster03,
      score: 100,
      description: "AI/ML 분석 경험을 살려, 즉각적으로 프로토타입을 개발하고 완성도를 높일 수 있는 대회"
    },
    {
      title: "제7회 공군 창의·혁신 아이디어 공모 해커톤",
      image: poster02,
      score: 90,
      description: "AI/ML 분석 경험을 살려, 즉각적으로 프로토타입을 개발하고 완성도를 높일 수 있는 대회"
    },
    {
      title: "제3회 KISIA 정보보호 개발자 해커톤",
      image: poster06,
      score: 80,
      description: "AI/ML 분석 경험을 살려, 즉각적으로 프로토타입을 개발하고 완성도를 높일 수 있는 대회"
    }
  ]);
  // ⚠️ 더미 데이터 끝

  // ⚠️ 디자인 작업용 더미 데이터 - 백엔드 연동 시 삭제 (GET /api/mypage/recommendations/team-members 로 대체)
  const [recommendedTeamMembers, setRecommendedTeamMembers] = useState([
    { name: "이연우", role: "FRONTEND", profileImg: teamMemberDefaultImg, matchingReasons: ["협업 성향이 잘 맞아요", "프론트 경험이 풍부해요"] },
    { name: "김철수", role: "BACKEND", profileImg: teamMemberDefaultImg, matchingReasons: ["서버 개발 경험 보유", "문제 해결 능력이 뛰어나요"] },
    { name: "박지민", role: "DESIGN", profileImg: teamMemberDefaultImg, matchingReasons: ["UI/UX 감각이 뛰어나요", "디자인 경험 다수"] },
  ]);
  // ⚠️ 더미 데이터 끝

  // ✅ 회원가입 때 입력한 한줄소개(bio) - localStorage의 user 정보에서 가져옴
  const [oneLiner, setOneLiner] = useState('');

  // ⚠️ 회원가입 때 업로드한 프로필 이미지 URL - localStorage의 user 정보에서 가져옴
  // 필드명은 임의로 지정함, Swagger 확인 후 실제 응답 필드명으로 수정 필요
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  // ✅ 편집용 임시 상태 (취소 시 원복하기 위함)
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    // ✅ 백엔드 연동 시 아래 주석 해제 (GET /api/mypage/cv)
    // const fetchMyCv = async () => {
    //   try {
    //     const data = await getMyCv();
    //     setCvData(data);
    //   } catch (err) {
    //     console.error('CV 정보 로드 실패:', err);
    //   }
    // };
    // fetchMyCv();

    // ✅ 백엔드 연동 시 아래 주석 해제 (GET /api/mypage/recommendations/competitions)
    // const fetchRecommendedContests = async () => {
    //   try {
    //     const data = await getRecommendedCompetitions();
    //     setRecommendedContests(data);
    //   } catch (err) {
    //     console.error('공모전 추천 내역 로드 실패:', err);
    //   }
    // };
    // fetchRecommendedContests();

    // ✅ 백엔드 연동 시 아래 주석 해제 (GET /api/mypage/recommendations/team-members)
    // const fetchRecommendedTeamMembers = async () => {
    //   try {
    //     const data = await getRecommendedTeamMembers();
    //     setRecommendedTeamMembers(data);
    //   } catch (err) {
    //     console.error('팀원 추천 내역 로드 실패:', err);
    //   }
    // };
    // fetchRecommendedTeamMembers();

    // ⚠️ CV 분석(강점/약점)은 AI 파트 담당 - 엔드포인트 확정되면 fetch 로직 추가 필요
    // 지금은 strengths, weaknesses 더미 데이터 그대로 사용 중

    // ✅ 회원가입 때 입력한 한줄소개(bio) - localStorage의 user 정보에서 가져옴
    // (한줄소개는 mypage/profile API가 아니라 회원가입 시 저장된 값을 그대로 사용)
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setOneLiner(parsed.bio || '');
      // ⚠️ 임의 필드명 - Swagger 확인 후 실제 필드명으로 수정 필요 (예: profileImage, avatarUrl 등)
      setProfileImageUrl(parsed.profileImageUrl || null);
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
      // ✅ 백엔드 연동 시 아래 두 API 호출 주석 해제 (CV와 프로필은 별도 엔드포인트)

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
      openModal('CV 수정이 완료되었습니다.');
    } catch (err) {
      console.error('저장 실패:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ 스킬 추가/삭제 (편집 모드에서만)
  const handleAddSkill = (value) => {
    setDraft(prev => ({ ...prev, skills: [...prev.skills, value] }));
  };
  const handleRemoveSkill = (idx) => {
    setDraft(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));
  };

  // ✅ 리스트형 데이터(domains, projects, experience) 개별 항목 추가/삭제 - 세 섹션 공통
  const handleAddItem = (field, value) => {
    setDraft(prev => ({ ...prev, [field]: [...prev[field], value] }));
  };
  const handleRemoveItem = (field, idx) => {
    setDraft(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== idx) }));
  };

  const current = isEditing ? draft : { ...cvData, oneLiner };

  return (
    <div className="mypage-page">
      <Navbar />

      <main className="mypage-content">

        {/* ✅ 프로필 카드 (이름, 한줄소개, 스킬) */}
        <MyPageProfileCard
          name={current.name}
          profileImageUrl={profileImageUrl}
          defaultProfile={defaultProfile}
          oneLiner={current.oneLiner}
          skills={current.skills}
          isEditing={isEditing}
          onOneLinerChange={(value) => setDraft(prev => ({ ...prev, oneLiner: value }))}
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
        />

        {/* ✅ domains & projects & experience - 2열 그리드, 한 칸은 비워둠 */}
        <div className="section-card">
          <div className="section-grid">
            <MyPageEditableItemSection
              icon={iconInterest}
              title="domains"
              items={current.domains}
              isEditing={isEditing}
              emptyText="아직 등록된 관심 분야가 없어요."
              placeholder="관심 분야 입력 후 Enter"
              onAdd={(value) => handleAddItem('domains', value)}
              onRemove={(idx) => handleRemoveItem('domains', idx)}
            />

            <MyPageEditableItemSection
              icon={iconProject}
              title="projects"
              items={current.projects}
              isEditing={isEditing}
              placeholder="프로젝트 입력 후 Enter"
              onAdd={(value) => handleAddItem('projects', value)}
              onRemove={(idx) => handleRemoveItem('projects', idx)}
            />

            <MyPageEditableItemSection
              icon={iconAward}
              title="experience"
              items={current.experience}
              isEditing={isEditing}
              placeholder="수상/경력 입력 후 Enter"
              onAdd={(value) => handleAddItem('experience', value)}
              onRemove={(idx) => handleRemoveItem('experience', idx)}
            />
          </div>
        </div>

        {/* ✅ 하단 버튼 영역 */}
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

        {/* ⚠️ CV 분석 (강점/약점) - AI 파트 API 미확정, 더미 데이터 표시 중 */}
        <MyPageCvAnalysisSection strengths={strengths} weaknesses={weaknesses} />

        {/* ✅ 공모전 추천 내역 - GET /api/mypage/recommendations/competitions */}
        <MyPageRecommendHistorySection recommendedContests={recommendedContests} />

        {/* ✅ 팀원 추천 내역 - GET /api/mypage/recommendations/team-members */}
        <MyPageTeamRecommendHistorySection members={recommendedTeamMembers} />

      </main>

      {ModalComponent}
    </div>
  );
}

export default MyPage;