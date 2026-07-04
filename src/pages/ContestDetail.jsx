import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getContestDetail, normalizeContestDetail } from '../api/contestAPI';
import './ContestDetail.css';
import defaultIcon from '../assets/images/profile-default.png';

function ContestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const raw = await getContestDetail(id);
        setContest(normalizeContestDetail(raw));
      } catch (err) {
        console.error('공모전 상세 로드 실패:', err);
      }
    };
    fetchDetail();
  }, [id]);

  if (!contest) return <div className="loading">로딩 중...</div>;

  const getLiveDDay = (periodStr) => {
    if (!periodStr) return "";
    const dateMatches = periodStr.match(/\d{4}-\d{2}-\d{2}/g);
    if (!dateMatches || dateMatches.length === 0) return "";
    const endDateStr = dateMatches[dateMatches.length - 1];

    const endDate = new Date(endDateStr);
    const today = new Date();
    endDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `D-${diffDays}` : diffDays === 0 ? "D-DAY" : "마감";
  };

  const dDayText = getLiveDDay(contest.applicationPeriod);

  const categoryTags = contest.category
    ? contest.category.split(',').map(c => c.trim()).filter(Boolean)
    : [];

  const cleanPeriod = contest.applicationPeriod
    ? contest.applicationPeriod.replace(/\s*D-\d+|\s*D-DAY|\s*마감/g, '').trim()
    : '';

  const handleRecommendClick = () => {
    navigate(`/contests/${id}/recommend`);
  };

  return (
    <div className="contest-detail-page">
      <Navbar />

      <main className="contest-detail-content">
        <div className="detail-header-section">
          <div className="detail-poster-wrapper">
            <img src={contest.imageUrl} alt={contest.title} />
          </div>

          <div className="detail-summary-info">
            {dDayText && (
              <span
                className="detail-dday-badge"
                style={{ backgroundColor: dDayText === "마감" ? "#A0A0B0" : "#7176F0" }}
              >
                {dDayText}
              </span>
            )}

            <h1 className="detail-title">{contest.title}</h1>

            <div className="detail-tags-list">
              {categoryTags.map((tag, idx) => (
                <span key={idx} className="detail-tag-badge">#{tag}</span>
              ))}
            </div>

            <div className="info-table">
              <div className="info-row">
                <div className="info-label-box">
                  <img src={defaultIcon} alt="" className="label-icon" />
                  <span className="label-text">응모 대상</span>
                </div>
                <div className="info-value">{contest.target}</div>
              </div>

              <div className="info-row">
                <div className="info-label-box">
                  <img src={defaultIcon} alt="" className="label-icon" />
                  <span className="label-text">주최/주관</span>
                </div>
                <div className="info-value">{contest.organizer}</div>
              </div>

              <div className="info-row">
                <div className="info-label-box">
                  <img src={defaultIcon} alt="" className="label-icon" />
                  <span className="label-text">접수 기간</span>
                </div>
                <div className="info-value">{cleanPeriod}</div>
              </div>

              <div className="info-row">
                <div className="info-label-box">
                  <img src={defaultIcon} alt="" className="label-icon" />
                  <span className="label-text">총 상금</span>
                </div>
                <div className="info-value">
                  {contest.totalPrize} {contest.firstPrize && `(1등: ${contest.firstPrize})`}
                </div>
              </div>
            </div>

            <div className="detail-btn-group">
              <button
                className="visit-btn"
                onClick={() => window.open(contest.homepageUrl, '_blank', 'noreferrer')}
              >
                주최사 홈페이지 바로가기
              </button>
              <button onClick={handleRecommendClick} className="recommend-btn">
                이 공모전의 팀원 추천 받기
              </button>
            </div>
          </div>
        </div>

        <div className="detail-body-section">
          <h2>상세 내용</h2>
          <div className="detail-description">
            <p style={{ whiteSpace: 'pre-wrap' }}>{contest.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ContestDetail;