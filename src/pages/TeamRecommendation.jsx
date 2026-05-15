import React, { useState, useEffect } from 'react';
import './TeamRecommendation.css';
import Navbar from '../components/Navbar';
import TeamMemberCard from '../components/TeamMemberCard';
import defaultProfile from '../assets/images/yeonwoo.jpg';

function TeamRecommendation() {

  // 더미 데이터
  const mockData = {
    competitionName: "Big data Hackathon",
    members: [
      {
        name: "이연우",
        role: "FRONTEND",
        profileImg: defaultProfile,
        matchingReasons: ["협업 성향이 잘 맞아요", "프론트 경험이 풍부해요"]
      },
      {
        name: "김철수",
        role: "BACKEND",
        profileImg: defaultProfile,
        matchingReasons: ["서버 개발 경험 보유", "문제 해결 능력이 뛰어나요"]
      },
      {
        name: "박지민",
        role: "DESIGN",
        profileImg: defaultProfile,
        matchingReasons: ["UI/UX 감각이 뛰어나요", "디자인 경험 다수"]
      },
      {
        name: "최수진",
        role: "DATA",
        profileImg: defaultProfile,
        matchingReasons: ["데이터 분석 가능", "AI 경험 있음"]
      },
      {
        name: "정민수",
        role: "PLANNER",
        profileImg: defaultProfile,
        matchingReasons: ["기획 경험 풍부", "커뮤니케이션 능력 우수"]
      },
      {
        name: "한유진",
        role: "FULLSTACK",
        profileImg: defaultProfile,
        matchingReasons: ["전체 구조 이해 가능", "다양한 기술 경험"]
      }
    ]
  };

  const [competitionName, setCompetitionName] = useState('');
  const [members, setMembers] = useState([]);

  useEffect(() => {

    // 1. 지금은 더미 데이터 사용
    setCompetitionName(mockData.competitionName);
    setMembers(mockData.members);

    /*2. 나중에 백엔드 연결할 때 사용

    fetch('http://localhost:8080/team-recommendation')
      .then(res => res.json())
      .then(data => {
        setCompetitionName(data.competitionName);
        setMembers(data.members);
      })
      .catch(err => {
        console.error('API 에러:', err);
      });
    */

  }, []);

  return (
    <div className="recommendation-page">
      <Navbar />

      <main className="recommendation-content">
        <h1 className="competition-title">
          {competitionName}
        </h1>

        <div className="member-grid">
          {members.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default TeamRecommendation;
