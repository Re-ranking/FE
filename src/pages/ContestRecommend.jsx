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
import { getLatestCV } from '../api/cvAPI';
import { getMyCv, getRecommendedCompetitions } from '../api/mypageAPI';

const STRENGTH_COLORS = ['#471E8F', '#8E6CEF', '#C2B2FC', '#E6E1FE'];
const WEAKNESS_COLORS = ['#D83EAD', '#EFA1DC', '#F7C8EB', '#FCEAF7'];

function ContestRecommendPage() {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [name, setName] = useState('');
  const [oneLiner, setOneLiner] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [domains, setDomains] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [recommendedContests, setRecommendedContests] = useState([]);

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
    const toFullUrl = (url) => {
      if (!url) return null;
      if (url.startsWith('http')) return url;
      return `${BASE_URL}${url}`;
    };

    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setName(parsed.name || '');
      setOneLiner(parsed.description || '');
      setProfileImageUrl(toFullUrl(parsed.profileImage) || null);
    }

    const fetchCvInfo = async () => {
      try {
        const data = await getMyCv();
        const savedUser = localStorage.getItem('user');
        const u = savedUser ? JSON.parse(savedUser) : {};

        setName(data.name || u.name || '');
        setOneLiner(data.introduction || u.description || '');
        setProfileImageUrl(toFullUrl(data.profileImage) || toFullUrl(u.profileImage) || null);
      } catch (err) {
        console.error('CV 정보 로드 실패:', err);
      }
    };
    fetchCvInfo();

    // GET /api/cv/latest - 이전 분석 결과(강점/약점/추천 공모전) 불러오기
    const fetchLatestCV = async () => {
      try {
        const data = await getLatestCV();
        if (data?.cvAnalysis) {
          const analysis = data.cvAnalysis;
          setDomains(analysis.primaryDomains || []);
          setStrengths((analysis.strengths || []).map(s => ({
            name: s.name,
            value: s.score,
            average: s.averageScore,
            diff: s.difference >= 0 ? `+${s.difference}%` : `${s.difference}%`
          })));
          setWeaknesses((analysis.weaknesses || []).map(w => ({
            name: w.name,
            value: w.score,
            average: w.averageScore,
            diff: w.difference >= 0 ? `+${w.difference}%` : `${w.difference}%`
          })));
        }
        if (data?.recommendations?.length > 0) {
          setRecommendedContests(data.recommendations);
          setShowResults(true);
        }
      } catch (err) {
        console.error('최신 CV 분석 결과 로드 실패:', err);
      }
    };
    fetchLatestCV();
  }, []);

  const handleRecommendClick = async () => {
    setIsAnalyzing(true);
    try {
      const data = await getRecommendedCompetitions();
      const sorted = (data || []).sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
      setRecommendedContests(sorted);
      setShowResults(true);
      localStorage.setItem('contestRecommended', 'true');
    } catch (err) {
      console.error('공모전 추천 로드 실패:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTeamRecommendClick = () => {
    const topContestId = recommendedContests[0]?.competitionId ?? 0;
    navigate(`/Teamrecommend?contestId=${topContestId}`);
  };

  return (
    <>
      <Navbar />

      <div className="recommend-page-container">
        <section className="profile-section">
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
              {isAnalyzing ? '불러오는 중...' : '공모전 추천 받기'}
            </button>
          </div>
        </section>

        {showResults && (
          <section className="result-section">
            <h2 className="section-title">공모전 추천 결과</h2>
            <div className="contest-cards-grid">
              {recommendedContests.map((contest, index) => (
                <ContestCard
                  key={contest.competitionId ?? index}
                  contest={contest}
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
        message="공모전 추천 결과를 불러오고 있어요"
        subMessage="잠시만 기다려주세요."
      />
    </>
  );
}

export default ContestRecommendPage;