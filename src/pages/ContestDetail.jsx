import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import './ContestDetail.css'; 

import poster02 from '../assets/images/contest-poster-02.png'; 
import defaultIcon from '../assets/images/profile-default.png'; 

function ContestDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [isLoggedIn] = useState(true);
  const [contest, setContest] = useState(null);

  useEffect(() => {
    const backendRawData = {
      "name": "제7회 공군 창의ㆍ혁신 아이디어 공모 해커톤",
      "source_url": "https://www.wevity.com?c=find&s=_university&gub=1&cidx=20&gbn=view&gp=1&ix=106965",
      "분야": "기획/아이디어, 논문/리포트, 웹/모바일/IT, 게임/소프트웨어, 과학/공학, 대외활동/서포터즈",
      "응모대상": "제한없음",
      "주최/주관": "문화체육관광부 / 한국문화정보원, 국민체육진흥공단, 한국관광공사, 한국문화예술위원회, 한국콘텐츠진흥원",
      "접수기간": "2026-04-27 ~ 2026-06-26 D-46",
      "총 상금": "5천만원이상",
      "1등 상금": "1,000만원",
      "홈페이지": "https://vo.la/HDynhd5",
      "image_url": poster02, 
      "description": "※ 본 내용은 참고 자료입니다. 반드시 주최사 홈페이지의 일정 및 상세 내용을 확인하세요. 제4회 문화체육관광 인공지능·데이터 활용 공모전 우리 문화 생태계의 경쟁력을 높이고 새로운 활력을 불어넣을 「문화체육관광 인공지능·데이터 활용 공모전」을 개최합니다. 본 공모전은 제13회 범정부 공공데이터 활용 창업경진대회에서 '대통령상' 수상팀을 배출하며 그 저력을 입증했습니다. 기술과 문화의 융합으로 미래를 설계할 여러분의 창의적인 도전을 기다립니다. ■"
    };

    setContest(backendRawData);
  }, [id]);

  if (!contest) return <div className="loading">로딩 중...</div>;

  const tagsArray = contest["분야"] ? contest["분야"].split(', ') : [];

  // 🌟 오늘 날짜 기준으로 디데이를 실시간 계산하는 마법의 로직
  const getLiveDDay = (periodText) => {
    try {
      // 1. "2026-04-27 ~ 2026-06-26 D-46" 에서 마감일인 "2026-06-26"만 정규식으로 추출합니다.
      const dateRegex = /\d{4}-\d{2}-\d{2}/g;
      const dates = periodText.match(dateRegex); // ['2026-04-27', '2026-06-26'] 순서로 뽑힘
      
      if (!dates || dates.length < 2) return "";

      const endDate = new Date(dates[1]); // 마감 날짜 객체 생성
      const today = new Date(); // 오늘 날짜 객체 생성

      // 시, 분, 초 때문에 날짜 계산이 틀어지는 것을 막기 위해 자정(00:00:00)으로 통일합니다.
      endDate.setHours(0,0,0,0);
      today.setHours(0,0,0,0);

      // 2. 두 날짜의 밀리초(ms) 차이를 구한 뒤 하루(24시간) 단위로 나눕니다.
      const diffTime = endDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // 3. 남은 일수에 따라 텍스트를 리턴합니다.
      if (diffDays > 0) {
        return `D-${diffDays}`;
      } else if (diffDays === 0) {
        return "D-DAY";
      } else {
        return "마감"; // 마감일이 지났을 때
      }
    } catch (e) {
      return "";
    }
  };

  // 기존 백엔드 디데이 텍스트 대신, 방금 만든 함수로 실시간 디데이를 구합니다!
  const dDayText = getLiveDDay(contest["접수기간"]);
  
  // 주소창 옆에 보여줄 순수 기간만 분리 (예: "2026-04-27 ~ 2026-06-26")
  const purePeriodText = contest["접수기간"].replace(/D-\d+/, "").trim();

  const handleRecommendClick = () => {
    navigate(`/contests/${id}/recommend`);
  };

  return (
    <div className="contest-detail-page">
      <Navbar isLoggedIn={isLoggedIn} />

      <main className="contest-detail-content">
        <div className="detail-header-section">
          <div className="detail-poster-wrapper">
            <img src={contest.image_url} alt={contest.name} />
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
            
            <h1 className="detail-title">{contest.name}</h1>
            
            <div className="detail-tags-list">
              {tagsArray.map((tag, idx) => (
                <span key={idx} className="detail-tag-badge">#{tag}</span>
              ))}
            </div>

            <div className="info-table">
              <div className="info-row">
                <div className="info-label-box">
                  <img src={defaultIcon} alt="" className="label-icon" />
                  <span className="label-text">응모 대상</span>
                </div> 
                <div className="info-value">{contest["응모대상"]}</div>
              </div>

              <div className="info-row">
                <div className="info-label-box">
                  <img src={defaultIcon} alt="" className="label-icon" />
                  <span className="label-text">주최/주관</span>
                </div> 
                <div className="info-value">{contest["주최/주관"]}</div>
              </div>

              <div className="info-row">
                <div className="info-label-box">
                  <img src={defaultIcon} alt="" className="label-icon" />
                  <span className="label-text">접수 기간</span>
                </div> 
                <div className="info-value">{purePeriodText}</div>
              </div>

              <div className="info-row">
                <div className="info-label-box">
                  <img src={defaultIcon} alt="" className="label-icon" />
                  <span className="label-text">총 상금</span>
                </div> 
                <div className="info-value">
                  {contest["총 상금"]} {contest["1등 상금"] && `(1등: ${contest["1등 상금"]})`}
                </div>
              </div>
            </div>

            <div className="detail-btn-group">
              <a href={contest["홈페이지"]} target="_blank" rel="noreferrer" className="visit-btn">
                주최사 홈페이지 바로가기
              </a>
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