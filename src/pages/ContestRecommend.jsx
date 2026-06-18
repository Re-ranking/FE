import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './ContestRecommend.css';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import ContestCard from '../components/ContestRecommendCard';
import LoadingOverlay from '../components/LoadingOverlay';
import '../components/LoadingOverlay.css';
import defaultProfile from '../assets/images/profile-default.png';
import poster02 from '../assets/images/contest-poster-02.png';
import poster03 from '../assets/images/contest-poster-03.png';
import poster06 from '../assets/images/contest-poster-06.png';
// ✅ 백엔드 연동 시 주석 해제 (마이페이지와 동일한 CV 조회 API에서 domains만 사용)
// import { getMyCv } from '../api/mypageAPI';
// ⚠️ CV 분석(강점/약점), 공모전 추천 결과는 AI 파트 별도 API - 엔드포인트 확정되면 import 추가

const STRENGTH_COLORS = ['#471E8F', '#8E6CEF', '#C2B2FC', '#E6E1FE'];
const WEAKNESS_COLORS = ['#D83EAD', '#EFA1DC', '#F7C8EB', '#FCEAF7'];

function ContestRecommendPage() {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // ✅ 공모전 추천 분석 중 로딩

  // ✅ 회원가입 때 입력한 한줄소개(bio) - localStorage의 user 정보에서 가져옴 (마이페이지와 동일한 방식)
  const [oneLiner, setOneLiner] = useState('');

  // ⚠️ 회원가입 때 업로드한 프로필 이미지 URL - localStorage의 user 정보에서 가져옴
  // 필드명은 임의로 지정함, Swagger 확인 후 실제 필드명으로 수정 필요
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  // ✅ 이름 - localStorage user 정보에서 가져옴
  const [name, setName] = useState('');

  // ⚠️ GET /api/mypage/cv 에서 받아오는 domains - 마이페이지와 동일한 API, domains만 사용
  // 디자인 작업용 더미 데이터, 백엔드 연동 시 빈 배열([])로 변경
  const [domains, setDomains] = useState(["핀테크 및 금융", "헬스케어", "웰빙"]);
  // ⚠️ 더미 데이터 끝

  // ⚠️ CV 분석(강점/약점) - AI 파트 API 미확정, 더미 데이터 표시 중
  const [strengths, setStrengths] = useState([
    { name: "기술적 전문성", value: 48, average: 20, diff: "+28%" },
    { name: "문제 해결력", value: 27, average: 16, diff: "+11%" },
    { name: "프로젝트 관리", value: 15, average: 8, diff: "+7%" },
    { name: "커뮤니케이션", value: 10, average: 6, diff: "+4%" },
  ]);
  const [weaknesses, setWeaknesses] = useState([
    { name: "시간 관리", value: 10, average: 14, diff: "-4%" },
    { name: "협상 및 영향력", value: 10, average: 14, diff: "-4%" },
    { name: "발표", value: 10, average: 14, diff: "-4%" },
    { name: "원격 협업", value: 10, average: 14, diff: "-4%" },
  ]);
  // ⚠️ 더미 데이터 끝

  // ⚠️ 디자인 작업용 더미 데이터 - 백엔드 연동 시 삭제 (공모전 추천 결과 - AI 파트 API)
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

  useEffect(() => {
    // ✅ 백엔드 연동 시 아래 주석 해제 (GET /api/mypage/cv - 마이페이지와 동일 API, domains만 사용)
    // const fetchDomains = async () => {
    //   try {
    //     const data = await getMyCv();
    //     setName(data.name);
    //     setDomains(data.domains);
    //   } catch (err) {
    //     console.error('CV 정보 로드 실패:', err);
    //   }
    // };
    // fetchDomains();

    // ⚠️ CV 분석(강점/약점), 공모전 추천 결과는 AI 파트 담당 - 엔드포인트 확정되면 fetch 로직 추가 필요
    // 지금은 strengths, weaknesses, recommendedContests 더미 데이터 그대로 사용 중

    // ✅ 회원가입 때 입력한 한줄소개(bio), 이름 - localStorage의 user 정보에서 가져옴
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setName(parsed.name || '');
      setOneLiner(parsed.bio || '');
      // ⚠️ 임의 필드명 - Swagger 확인 후 실제 필드명으로 수정 필요 (예: profileImage, avatarUrl 등)
      setProfileImageUrl(parsed.profileImageUrl || null);
    }
  }, []);

  const handleRecommendClick = async () => {
    setIsAnalyzing(true);
    try {
      // ✅ 백엔드 연동 시 아래 주석 해제 (AI 파트 - 공모전 추천 분석 API, 시간이 걸리는 작업)
      // const result = await analyzeCvForContests();
      // setStrengths(result.strengths);
      // setWeaknesses(result.weaknesses);
      // setRecommendedContests(result.recommendedContests);

      setShowResults(true);
      localStorage.setItem('contestRecommended', 'true');
    } catch (err) {
      console.error('공모전 추천 분석 실패:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * 팀원 추천 페이지 이동 핸들러
   * - 공모전 추천 1위 결과를 기준으로 팀원을 추천하므로 contestId를 쿼리 파라미터로 전달
   * - 실제 팀원 매칭(시간이 걸리는 AI 작업)은 TeamRecommendation 페이지에서 진입 시 처리됨
   */
  const handleTeamRecommendClick = () => {
    // 1위 공모전 id를 쿼리 파라미터로 전달
    // 백엔드 연동 시 recommendedContests[0].id 사용
    // 지금은 더미 index 0으로 테스트
    const topContestId = recommendedContests[0]?.id ?? 0;
    navigate(`/Teamrecommend?contestId=${topContestId}`);
  };

  return (
    <>
      <Navbar />

      <div className="recommend-page-container">
        <section className="profile-section">
          {/* ✅ 프로필 카드 (이름, 한줄소개, domains) - 마이페이지 ProfileCard 재사용 */}
          <ProfileCard
            name={name}
            profileImageUrl={profileImageUrl}
            defaultProfile={defaultProfile}
            oneLiner={oneLiner}
            tagLabel="Domains"
            tags={domains}
            isEditing={false}
          />
        </section>

        <section className="cv-analysis-section">
          <h2 className="section-title">CV 분석</h2>

          <div className="analysis-grid">
            <div className="charts-container">
              <div className="chart-item">
                <div className="recharts-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={strengths} cx="50%" cy="50%" innerRadius={43} outerRadius={65} paddingAngle={0} dataKey="value">
                        {strengths.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={STRENGTH_COLORS[index % STRENGTH_COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="recharts-donut-center">강점</div>
                </div>

                <ul className="chart-legend">
                  {strengths.map((item, idx) => (
                    <li key={idx}>
                      <span className="legend-dot" style={{ backgroundColor: STRENGTH_COLORS[idx] }}></span>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="chart-item">
                <div className="recharts-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={weaknesses} cx="50%" cy="50%" innerRadius={43} outerRadius={65} paddingAngle={0} dataKey="value">
                        {weaknesses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={WEAKNESS_COLORS[index % WEAKNESS_COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="recharts-donut-center">약점</div>
                </div>

                <ul className="chart-legend">
                  {weaknesses.map((item, idx) => (
                    <li key={idx}>
                      <span className="legend-dot" style={{ backgroundColor: WEAKNESS_COLORS[idx] }}></span>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

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
                  {strengths.map((item, idx) => (
                    <tr key={`strength-row-${idx}`}>
                      <td><span className="table-dot" style={{ backgroundColor: STRENGTH_COLORS[idx] }}></span>{item.name}</td>
                      <td>{item.value}%</td>
                      <td>{item.average}%</td>
                      <td className="plus-text">{item.diff}</td>
                    </tr>
                  ))}
                  {weaknesses.map((item, idx) => (
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
            <button className="recommend-trigger-btn" onClick={handleRecommendClick} disabled={isAnalyzing}>
              {isAnalyzing ? '분석 중...' : '공모전 추천 받기'}
            </button>
          </div>
        </section>

        {showResults && (
          <section className="result-section">
            <h2 className="section-title">공모전 추천 결과</h2>
            <div className="contest-cards-grid">
              {recommendedContests.map((contest, index) => (
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

        {showResults && (
          <div className="action-button-container" style={{ marginTop: '50px' }}>
            <button className="recommend-trigger-btn" onClick={handleTeamRecommendClick}>
              팀원 추천 받기
            </button>
          </div>
        )}
      </div>

      <LoadingOverlay
        isVisible={isAnalyzing}
        message="CV를 분석하고 공모전을 추천하고 있어요"
        subMessage="잠시만 기다려주세요. 최대 1분 정도 걸릴 수 있어요."
      />
    </>
  );
}

export default ContestRecommendPage;