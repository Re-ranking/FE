import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './TeamRecommendation.css';
import Navbar from '../components/Navbar';
import TeamMemberCard from '../components/TeamMemberCard';
import LoadingOverlay from '../components/LoadingOverlay';
import '../components/LoadingOverlay.css';
import useModal from '../hooks/useModal.jsx';
import { getRecommendedTeamMembers } from '../api/mypageAPI';
import { getMySurvey } from '../api/surveyAPI';

function TeamRecommendation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contestId = searchParams.get('contestId');

  const { openModal, ModalComponent } = useModal();
  const [isMatching, setIsMatching] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchTeamRecommend = async () => {
      setIsMatching(true);

      // 성향 설문을 아직 제출하지 않은 경우 팀원 추천 API가 500을 반환하므로,
      // 먼저 설문 제출 여부를 확인한 뒤에만 호출한다.
      try {
        await getMySurvey();
      } catch (surveyErr) {
        console.warn('성향 설문 미제출로 팀원 추천을 건너뜁니다:', surveyErr);
        setIsMatching(false);
        openModal('팀원 추천을 받으려면 먼저 성향 설문을 제출해주세요.');
        return;
      }

      try {
        const data = await getRecommendedTeamMembers();
        setMembers(data || []);
      } catch (err) {
        console.error('팀원 추천 로드 실패:', err);
        openModal('팀원 추천 정보를 불러오지 못했습니다.');
      } finally {
        setIsMatching(false);
      }
    };
    fetchTeamRecommend();
  }, [contestId]);

  const hasMembers = members.length > 0;

  return (
    <div className="recommendation-page">
      <Navbar />

      <main className="recommendation-content">
        {/* 히어로 */}
        <section className="tr-hero">
          <p className="tr-eyebrow">Team Match</p>
          <h1 className="tr-headline">
            성향이 <em>맞는 사람</em>과<br />
            팀을 이뤄보세요
          </h1>
          <p className="tr-subcopy">
            제출하신 협업 성향과 생활 패턴을 바탕으로,
            함께했을 때 시너지가 좋은 팀원을 골라봤어요.
          </p>
        </section>

        {/* 추천 결과 */}
        <section>
          <div className="tr-section-head">
            <h2 className="tr-section-title">추천 팀원</h2>
            {hasMembers && (
              <span className="tr-section-count">총 {members.length}명 매칭됨</span>
            )}
          </div>

          <div className="member-grid">
            {!hasMembers && !isMatching ? (
              <div className="tr-empty-card">
                <div className="tr-empty-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5A5FE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="8" r="3.2" />
                    <circle cx="17" cy="9.5" r="2.6" />
                    <path d="M4 19c0-3 2.5-5 5-5s5 2 5 5" />
                    <path d="M14.5 14.2c2 .3 3.5 2 3.5 4.3" />
                  </svg>
                </div>
                <p className="tr-empty-title">아직 추천된 팀원이 없어요</p>
                <p className="tr-empty-desc">
                  성향 설문을 제출하면 협업 스타일과 생활 패턴이 맞는
                  팀원을 찾아드려요.
                </p>
                <button className="tr-empty-cta" onClick={() => navigate('/survey')}>
                  성향 입력하러 가기
                </button>
              </div>
            ) : (
              members.map((member, index) => (
                <div className="tr-card-slot" key={member.id ?? index}>
                  <TeamMemberCard member={member} />
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {ModalComponent}

      <LoadingOverlay
        isVisible={isMatching}
        message="팀원을 매칭하고 있어요"
        subMessage="잠시만 기다려주세요. 최대 1분 정도 걸릴 수 있어요."
      />
    </div>
  );
}

export default TeamRecommendation;