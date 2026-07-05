import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './TeamRecommendation.css';
import Navbar from '../components/Navbar';
import TeamMemberCard from '../components/TeamMemberCard';
import LoadingOverlay from '../components/LoadingOverlay';
import '../components/LoadingOverlay.css';
import useModal from '../hooks/useModal.jsx';
import { getRecommendedTeamMembers } from '../api/mypageAPI';
import { getMySurvey } from '../api/surveyAPI';

function TeamRecommendation() {
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

  return (
    <div className="recommendation-page">
      <Navbar />

      <main className="recommendation-content">
        <div className="member-grid">
          {members.length === 0 && !isMatching ? (
            <p style={{ color: '#9494A6', fontSize: '15px', textAlign: 'center', gridColumn: '1/-1' }}>
              아직 추천된 팀원이 없어요. 성향 입력 후 팀원 추천을 받아보세요!
            </p>
          ) : (
            members.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))
          )}
        </div>
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