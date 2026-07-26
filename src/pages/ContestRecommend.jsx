import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContestRecommend.css';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import ContestCard from '../components/ContestRecommendCard';
import LoadingOverlay from '../components/LoadingOverlay';
import '../components/LoadingOverlay.css';
import defaultProfile from '../assets/images/profile-default.png';
import { getLatestCV } from '../api/cvAPI';
import { getMyCv } from '../api/mypageAPI';

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

    // GET /api/cv/latest - 이전 분석 결과(강점/약점) 불러오기
    // 공모전 추천 결과는 "공모전 추천 받기" 버튼을 눌렀을 때만 보여준다.
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
      } catch (err) {
        console.error('최신 CV 분석 결과 로드 실패:', err);
      }
    };
    fetchLatestCV();
  }, []);

  const handleRecommendClick = async () => {
    setIsAnalyzing(true);
    try {
      const data = await getLatestCV();
      const recommendations = data?.recommendations || [];
      const sorted = [...recommendations].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
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

  const topStrength = strengths.length > 0
    ? strengths.reduce((max, item) => (item.value > max.value ? item : max), strengths[0])
    : null;
  const topWeakness = weaknesses.length > 0
    ? weaknesses.reduce((min, item) => (item.value < min.value ? item : min), weaknesses[0])
    : null;

  const renderBarList = (items, type) => (
    <div className="cra-bar-list">
      {items.map((item, idx) => {
        const isPositive = item.diff.startsWith('+');
        const markerPos = Math.max(0, Math.min(100, item.average));
        return (
          <div key={idx} className="cra-bar-row">
            <div className="cra-bar-top">
              <span className="cra-bar-label">{item.name}</span>
              <div className="cra-bar-stats">
                <span className="cra-bar-value">{item.value}%</span>
                <span className={`cra-delta-badge${isPositive ? ' positive' : ' negative'}`}>
                  {item.diff}
                </span>
              </div>
            </div>
            <div className="cra-bar-track-wrapper">
              <div className="cra-bar-marker" style={{ left: `${markerPos}%` }} />
              <div className="cra-bar-track">
                <div className={`cra-bar-fill ${type}`} style={{ width: `${item.value}%` }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

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

          <div className="cra-analysis-card">
            {(topStrength || topWeakness) && (
              <div className="cra-summary-row">
                {topStrength && (
                  <div className="cra-summary-chip strength">
                    <span className="cra-summary-label">가장 강한 역량</span>
                    <span className="cra-summary-text">
                      {topStrength.name} <strong>{topStrength.value}%</strong>
                    </span>
                  </div>
                )}
                {topWeakness && (
                  <div className="cra-summary-chip weakness">
                    <span className="cra-summary-label">보완이 필요한 부분</span>
                    <span className="cra-summary-text">
                      {topWeakness.name} <strong>{topWeakness.value}%</strong>
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="cra-analysis-grid">
              <div>
                <p className="cra-list-heading strength">
                  <span className="cra-list-dot strength" />강점
                </p>
                {renderBarList(strengths, 'strength')}
              </div>
              <div>
                <p className="cra-list-heading weakness">
                  <span className="cra-list-dot weakness" />약점
                </p>
                {renderBarList(weaknesses, 'weakness')}
              </div>
            </div>

            <p className="cra-legend">
              <span className="cra-legend-marker" />평균 지점
            </p>

            <div className="cra-cta-row">
              <button className="recommend-trigger-btn" onClick={handleRecommendClick} disabled={isAnalyzing}>
                {isAnalyzing ? '불러오는 중...' : '공모전 추천 받기'}
              </button>
            </div>
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
          <div className="cra-team-cta" style={{ marginTop: '50px' }}>
            <p className="cra-team-cta-text">이 공모전에 딱 맞는 팀원도 찾아볼까요?</p>
            <button className="recommend-trigger-btn secondary" onClick={handleTeamRecommendClick}>
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