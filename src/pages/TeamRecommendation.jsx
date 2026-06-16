import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './TeamRecommendation.css';
import Navbar from '../components/Navbar';
import TeamMemberCard from '../components/TeamMemberCard';
import useModal from '../hooks/useModal.jsx';
import { submitTeamFeedback, getTeamRecommendations } from '../api/teamAPI';
import defaultProfile from '../assets/images/yeonwoo.jpg';

function TeamRecommendation() {
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get('contestId'); // ✅ 공모전 추천 1위 id

  const { openModal, ModalComponent } = useModal();

  // 피드백 상태
  const [feedback, setFeedback] = useState(null); // null | 'liked' | 'disliked'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockData = {
    competitionName: "Big data Hackathon",
    members: [
      { name: "이연우", role: "FRONTEND", profileImg: defaultProfile, matchingReasons: ["협업 성향이 잘 맞아요", "프론트 경험이 풍부해요"] },
      { name: "김철수", role: "BACKEND", profileImg: defaultProfile, matchingReasons: ["서버 개발 경험 보유", "문제 해결 능력이 뛰어나요"] },
      { name: "박지민", role: "DESIGN", profileImg: defaultProfile, matchingReasons: ["UI/UX 감각이 뛰어나요", "디자인 경험 다수"] },
      { name: "최수진", role: "DATA", profileImg: defaultProfile, matchingReasons: ["데이터 분석 가능", "AI 경험 있음"] },
      { name: "정민수", role: "PLANNER", profileImg: defaultProfile, matchingReasons: ["기획 경험 풍부", "커뮤니케이션 능력 우수"] },
      { name: "한유진", role: "FULLSTACK", profileImg: defaultProfile, matchingReasons: ["전체 구조 이해 가능", "다양한 기술 경험"] }
    ]
  };

  const [competitionName, setCompetitionName] = useState('');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // 더미 데이터 사용 (백엔드 연동 시 아래 주석 해제)
    setCompetitionName(mockData.competitionName);
    setMembers(mockData.members);

    // const fetchTeamRecommend = async () => {
    //   try {
    //     const data = await getTeamRecommendations(contestId); // ✅ 1위 공모전 id 전달
    //     setCompetitionName(data.competitionName);
    //     setMembers(data.members);
    //   } catch (err) {
    //     console.error('팀원 추천 로드 실패:', err);
    //   }
    // };
    // fetchTeamRecommend();
  }, [contestId]); // ✅ contestId 바뀌면 재호출

  // 피드백 전송
  const handleFeedback = async (liked) => {
    if (feedback) return; // 이미 피드백 완료 시 중복 방지
    setIsSubmitting(true);
    try {
      await submitTeamFeedback(liked);
      setFeedback(liked ? 'liked' : 'disliked');
      openModal(liked ? '긍정적인 피드백 감사해요!' : '소중한 피드백 감사해요! 더 나은 추천을 드릴게요');
    } catch (err) {
      openModal('피드백 전송 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="recommendation-page">
      <Navbar />

      <main className="recommendation-content">
        <h1 className="competition-title">{competitionName}</h1>

        <div className="member-grid">
          {members.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>

        {/* 피드백 버튼 영역 */}
        <div className="feedback-section">
          <p className="feedback-title">추천 결과가 마음에 드셨나요?</p>
          <div className="feedback-btn-group">
            <button
              className={`feedback-btn liked ${feedback === 'liked' ? 'active' : ''}`}
              onClick={() => handleFeedback(true)}
              disabled={!!feedback || isSubmitting}
            >
              좋아요
            </button>
            <button
              className={`feedback-btn disliked ${feedback === 'disliked' ? 'active' : ''}`}
              onClick={() => handleFeedback(false)}
              disabled={!!feedback || isSubmitting}
            >
              별로예요
            </button>
          </div>
        </div>
      </main>

      {ModalComponent}
    </div>
  );
}

export default TeamRecommendation;