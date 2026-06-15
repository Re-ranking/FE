import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { normalizeContest } from '../api/contestAPI'; // 정제함수만 import
import './ContestDetail.css';
import poster02 from '../assets/images/contest-poster-02.png';
import defaultIcon from '../assets/images/profile-default.png';

function ContestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);

  useEffect(() => {
    // 더미 데이터 유지 (디자인 작업용)
    const backendRawData = {
      "name": "제4회 문화체육관광 인공지능·데이터 활용 공모전",
      "분야": "기획/아이디어, 논문/리포트, 웹/모바일/IT, 게임/소프트웨어, 과학/공학, 대외활동/서포터즈",
      "응모대상": "제한없음",
      "주최/주관": "문화체육관광부 / 한국문화정보원",
      "접수기간": "2026-04-27 ~ 2026-06-26 D-46",
      "총 상금": "5천만원이상",
      "1등 상금": "1,000만원",
      "홈페이지": "https://vo.la/HDynhd5",
      "image_url": poster02,
      "description": "※ 본 내용은 참고 자료입니다. 반드시 주최사 홈페이지의 일정 및 상세 내용을 확인하세요. 제4회 문화체육관광 인공지능·데이터 활용 공모전 우리 문화 생태계의 경쟁력을 높이고 새로운 활력을 불어넣을 「문화체육관광 인공지능·데이터 활용 공모전」을 최합니다. 본 공모전은 제13회 범정부 공공데이터 활용 창업경진대회에서 '대통령상' 수상팀을 배출하며 그 저력을 입증했습니다. 기술과 문화의 융합으로 미래를 설계할 여러분의 창의적인 도전을 기다립니다."
    };

    setContest(normalizeContest(backendRawData));

    // 백엔드 연동 시 위 더미데이터 지우고 아래 주석 해제
    // const fetchDetail = async () => {
    //   try {
    //     const raw = await getContestDetail(id);
    //     setContest(normalizeContest(raw));
    //   } catch (err) {
    //     console.error('공모전 상세 로드 실패:', err);
    //   }
    // };
    // fetchDetail();
  }, [id]);

  if (!contest) return <div className="loading">로딩 중...</div>;

  const getLiveDDay = (endDateStr) => {
    if (!endDateStr) return "";
    const endDate = new Date(endDateStr);
    const today = new Date();
    endDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `D-${diffDays}` : diffDays === 0 ? "D-DAY" : "마감";
  };

  const dDayText = getLiveDDay(contest.endDate);

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
              {contest.categories.map((tag, idx) => (
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
                <div className="info-value">{contest.startDate} ~ {contest.endDate}</div>
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