import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './ContestRecommend.css'; // 메인 페이지 전용 CSS
import Navbar from '../components/Navbar';
import ContestCard from '../components/ContestRecommendCard'; 
import defaultProfile from '../assets/images/yeonwoo.jpg';
import poster02 from '../assets/images/contest-poster-02.png'; 
import poster03 from '../assets/images/contest-poster-03.png'; 
import poster06 from '../assets/images/contest-poster-06.png';

const STRENGTH_COLORS = ['#471E8F', '#8E6CEF', '#C2B2FC', '#E6E1FE'];
const WEAKNESS_COLORS = ['#D83EAD', '#EFA1DC', '#F7C8EB', '#FCEAF7'];

function ContestRecommendPage() { // 🌟 이름 겹침 방지를 위해 컴포넌트명 변경
  const [showResults, setShowResults] = useState(false);

  const [cvData, setCvData] = useState({
    name: "이연우",
    school: "숙명여자대학교",
    major: "인공지능공학부",
    oneLiner: "데이터 기반 의사결정을 돕는 인사이트 도출과 사용자 행동 분석에 강점을 가진 데이터 분석가",
    primaryDomains: ["핀테크 및 금융", "헬스케어", "웰빙"],
    profileImg: defaultProfile,
    strengths: [
      { name: "기술적 전문성", value: 48, average: 20, diff: "+28%" },
      { name: "문제 해결력", value: 27, average: 16, diff: "+11%" },
      { name: "프로젝트 관리", value: 15, average: 8, diff: "+7%" },
      { name: "커뮤니케이션", value: 10, average: 6, diff: "+4%" },
    ],
    weaknesses: [
      { name: "시간 관리", value: 10, average: 14, diff: "-4%" },
      { name: "협상 및 영향력", value: 10, average: 14, diff: "-4%" },
      { name: "발표", value: 10, average: 14, diff: "-4%" },
      { name: "원격 협업", value: 10, average: 14, diff: "-4%" },
    ]
  });

  const recommendedContests = [
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
  ];

  const handleRecommendClick = () => {
    setShowResults(true);
  };

  return (
    <>
      <Navbar isLoggedIn={true} />
      
      <div className="recommend-page-container">
        {/* 프로필 섹션 */}
        <section className="profile-section">
          <div className="profile-card">
            <div className="profile-left">
              <img src={cvData.profileImg} alt="프로필" className="user-profile-img" />
              <div className="user-info">
                <h1 className="user-name-title">{cvData.name}</h1>
                <p className="user-school-text">{cvData.school} {cvData.major}</p>
                <div className="one-liner-box">{cvData.oneLiner}</div>
              </div>
            </div>
            
            <div className="profile-right">
              <span className="domain-title">Primary domains</span>
              <div className="domain-tags">
                {cvData.primaryDomains.map((domain, index) => (
                  <span key={index} className="domain-tag">{domain}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CV 분석 섹션 */}
        <section className="cv-analysis-section">
          <h2 className="section-title">CV 분석</h2>
          
          <div className="analysis-grid">
            <div className="charts-container">
              {/* 강점 차트 */}
              <div className="chart-item">
                <div className="recharts-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={cvData.strengths} cx="50%" cy="50%" innerRadius={43} outerRadius={65} paddingAngle={0} dataKey="value">
                        {cvData.strengths.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={STRENGTH_COLORS[index % STRENGTH_COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="recharts-donut-center">강점</div>
                </div>

                <ul className="chart-legend">
                  {cvData.strengths.map((item, idx) => (
                    <li key={idx}>
                      <span className="legend-dot" style={{ backgroundColor: STRENGTH_COLORS[idx] }}></span>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 약점 차트 */}
              <div className="chart-item">
                <div className="recharts-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={cvData.weaknesses} cx="50%" cy="50%" innerRadius={43} outerRadius={65} paddingAngle={0} dataKey="value">
                        {cvData.weaknesses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={WEAKNESS_COLORS[index % WEAKNESS_COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="recharts-donut-center">약점</div>
                </div>

                <ul className="chart-legend">
                  {cvData.weaknesses.map((item, idx) => (
                    <li key={idx}>
                      <span className="legend-dot" style={{ backgroundColor: WEAKNESS_COLORS[idx] }}></span>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 분석 표 */}
            <div className="table-container">
              <table className="analysis-table">
                <thead>
                  <tr>
                    <th>항목</th>
                    <th>내 점수</th>
                    <th>평균(비교)</th>
                    <th>차이</th>
                  </tr>
                </thead>
                <tbody>
                  {cvData.strengths.map((item, idx) => (
                    <tr key={`strength-row-${idx}`}>
                      <td><span className="table-dot" style={{ backgroundColor: STRENGTH_COLORS[idx] }}></span>{item.name}</td>
                      <td>{item.value}%</td>
                      <td>{item.average}%</td>
                      <td className="plus-text">{item.diff}</td>
                    </tr>
                  ))}
                  {cvData.weaknesses.map((item, idx) => (
                    <tr key={`weakness-row-${idx}`}>
                      <td><span className="table-dot" style={{ backgroundColor: WEAKNESS_COLORS[idx] }}></span>{item.name}</td>
                      <td>{item.value}%</td>
                      <td>{item.average}%</td>
                      <td className="minus-text">{item.diff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="action-button-container">
            <button className="recommend-trigger-btn" onClick={handleRecommendClick}>
              공모전 추천 받기
            </button>
          </div>
        </section>

        {/* 추천 결과 조건부 렌더링 */}
        {showResults && (
          <section className="result-section">
            <h2 className="section-title">공모전 추천 결과</h2>
            <div className="contest-cards-grid">
              {recommendedContests.map((contest, index) => (
                /* 🌟 여기서 이름 변경된 카드 컴포넌트를 사용합니다 */
                <ContestCard
                  key={index}
                  title={contest.title}
                  image={contest.image}
                  score={contest.score}
                  description={contest.description}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default ContestRecommendPage;