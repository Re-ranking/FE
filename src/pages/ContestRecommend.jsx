import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './ContestRecommend.css';
import Navbar from '../components/Navbar';
import defaultProfile from '../assets/images/yeonwoo.jpg';

const STRENGTH_COLORS = ['#471E8F', '#8E6CEF', '#C2B2FC', '#E6E1FE'];
const WEAKNESS_COLORS = ['#D83EAD', '#EFA1DC', '#F7C8EB', '#FCEAF7'];

function ContestRecommend() {
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

  return (
    /* 1. Navbar가 화면 전체 너비를 가질 수 있도록 최상위 구조로 뺍니다. */
    <>
      <Navbar isLoggedIn={true} />
      
      <div className="recommend-page-container">
        {/* 2~3번 영역: 유저 프로필 카드 */}
        <section className="profile-section">
          <div className="profile-card">
            <div className="profile-left">
              <img src={cvData.profileImg} alt="프로필" className="user-profile-img" />
              <div className="user-info">
                <h1 className="user-name-title">{cvData.name}</h1>
                <p className="user-school-text">{cvData.school} {cvData.major}</p>
                <div className="one-liner-box">
                  {cvData.oneLiner}
                </div>
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

        {/* 4번 영역: CV 분석 메인 파트 */}
        <section className="cv-analysis-section">
          <h2 className="section-title">CV 분석</h2>
          
          <div className="analysis-grid">
            <div className="charts-container">
              
              {/* [강점 차트] */}
              <div className="chart-item">
                <div className="recharts-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={cvData.strengths}
                        cx="50%"
                        cy="50%"
                        innerRadius={43}
                        outerRadius={65}
                        paddingAngle={0}
                        dataKey="value"
                      >
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

              {/* [약점 차트] */}
              <div className="chart-item">
                <div className="recharts-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={cvData.weaknesses}
                        cx="50%"
                        cy="50%"
                        innerRadius={43}
                        outerRadius={65}
                        paddingAngle={0}
                        dataKey="value"
                      >
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

            {/* 오른쪽: 분석 데이터 스코어 표(Table) */}
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
                      <td>
                        <span className="table-dot" style={{ backgroundColor: STRENGTH_COLORS[idx] }}></span>
                        {item.name}
                      </td>
                      <td>{item.value}%</td>
                      <td>{item.average}%</td>
                      <td className="plus-text">{item.diff}</td>
                    </tr>
                  ))}
                  {cvData.weaknesses.map((item, idx) => (
                    <tr key={`weakness-row-${idx}`}>
                      <td>
                        <span className="table-dot" style={{ backgroundColor: WEAKNESS_COLORS[idx] }}></span>
                        {item.name}
                      </td>
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
            <button className="recommend-trigger-btn">공모전 추천 받기</button>
          </div>
        </section>
      </div>
    </>
  );
}

export default ContestRecommend;