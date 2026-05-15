import React, { useState } from 'react';
import './TeamRecommendation.css';
import Navbar from '../components/Navbar';
import TeamMemberCard from '../components/TeamMemberCard';
// 기본 이미지 내 증명사진으로
import defaultProfile from '../assets/images/yeonwoo.jpg'; 

function TeamRecommendation() {
  const [competitionName] = useState("Big data Hackathon");
  
  // 더미 데이터 (시안처럼 6개)
  const [members] = useState(Array(6).fill({
    name: "이연우",
    role: "FRONTEND",
    profileImg: defaultProfile,
    matchingReasons: ["매칭 이유", "매칭 이유"]
  }));

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
      </main>
    </div>
  );
}

export default TeamRecommendation;