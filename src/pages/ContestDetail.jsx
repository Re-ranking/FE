import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getContestDetail, normalizeContestDetail } from '../api/contestAPI';
import './ContestDetail.css';
import defaultIcon from '../assets/images/profile-default.png';

const SAVE_KEY = 'savedContests';

function getSavedContests() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY) || '[]');
  } catch {
    return [];
  }
}

function ContestDetail() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

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

  // 저장 여부는 localStorage 기준으로 판단 (백엔드 연동 없이 프론트에서만 처리)
  useEffect(() => {
    if (!id) return;
    const saved = getSavedContests();
    setIsSaved(saved.some((c) => String(c.competitionId) === String(id)));
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
    ? contest.applicationPeriod.replace(/\s*D[+-]\d+|\s*D-DAY|\s*마감/g, '').trim()
    : '';

  const handleToggleSave = () => {
    try {
      const saved = getSavedContests();
      const exists = saved.some((c) => String(c.competitionId) === String(id));
      const updated = exists
        ? saved.filter((c) => String(c.competitionId) !== String(id))
        : [
            ...saved,
            {
              competitionId: id,
              title: contest.title,
              category: contest.category,
              applicationPeriod: contest.applicationPeriod,
              representativeImageUrl: contest.imageUrl,
              organizer: contest.organizer,
              savedAt: new Date().toISOString(),
            },
          ];
      localStorage.setItem(SAVE_KEY, JSON.stringify(updated));
      setIsSaved(!exists);
    } catch (err) {
      console.error('저장 처리 실패:', err);
    }
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
              <button
                onClick={handleToggleSave}
                className={`save-btn${isSaved ? ' is-saved' : ''}`}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                {isSaved ? '저장됨' : '저장하기'}
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