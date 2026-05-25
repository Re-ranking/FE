import React, { useState } from 'react';
import './ContestList.css';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ContestCard from '../components/ContestCard';
import poster1 from '../assets/images/purple-icon.png'; 

function ContestList() {
  const [isLoggedIn] = useState(true); // Navbar 로그아웃 상태 테스트용

  // 피그마 시안 기준 더미 데이터 6개 설정
  const [contests] = useState([
    {
      title: "제 6회 K-디지털 트레이닝 해커톤",
      tags: ["# 기획/아이디어", "# 논문/리포트"],
      target: "대학생",
      posterImg: poster1
    },
    {
      title: "제7회 공군 창의·혁신 아이디어 공모 해커톤",
      tags: ["# Python", "# ML"],
      members: "3명",
      difficulty: "중",
      posterImg: poster1
    },
    {
      title: "CYBER SECURITY 해커톤",
      tags: ["# Python", "# ML"],
      members: "3명",
      difficulty: "중",
      posterImg: poster1
    },
    {
      title: "Us:Code 해커톤 in 의성",
      tags: ["# Python", "# ML"],
      members: "4명",
      difficulty: "중",
      posterImg: poster1
    },
    {
      title: "제7회 K-디지털 트레이닝 해커톤 공모전",
      tags: ["# Python", "# ML"],
      members: "3명",
      difficulty: "중",
      posterImg: poster1
    },
    {
      title: "제3회 KISIA 정보보호 개발자 해커톤",
      tags: ["# Python", "# ML"],
      members: "3명",
      difficulty: "중",
      posterImg: poster1
    }
  ]);

  return (
    <div className="contest-list-page">
      {/* 이전에 만들어둔 내비게이션 바 재사용 */}
      <Navbar isLoggedIn={isLoggedIn} />
      
      <main className="contest-list-content">
        {/* 검색바 컴포넌트 */}
        <SearchBar />
        
        {/* 공모전 2열 그리드 리스트 */}
        <div className="contest-grid">
          {contests.map((contest, index) => (
            <ContestCard key={index} contest={contest} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default ContestList;