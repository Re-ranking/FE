import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import './ContestDetail.css'; 

// 더미데이터 이미지 - 공군 공모전
import poster02 from '../assets/images/contest-poster-02.png';

function ContestDetail() {
  const { id } = useParams(); // 주소창의 :id 값 가져오기
  const [isLoggedIn] = useState(true);
  const [contest, setContest] = useState(null);

  // 백엔드 연동 전까지 화면을 띄우기 위한 더미 데이터
  // 나중에 백엔드와 연동할 때는 이 id를 서버로 보내서 1개의 공모전만 받아오기
  useEffect(() => {
    const mockDetailData = {
      name: "제7회 공군 창의·혁신 아이디어 공모 해커톤",
      분야: ["과학/공학", "게임/소프트웨어", "기획/아이디어"],
      응모대상: "대학생/일반인",
      주최주관: "대한민국 공군",
      접수기간: "2026-04-27 ~ 2026-06-26 D-46",
      총상금: "5천만원이상",
      일등상금: "1,000만원",
      홈페이지: "https://vo.la/HDynhd5",
      image_url: poster02,
      description: "※ 본 내용은 참고 자료입니다. 반드시 주최사 홈페이지의 일정 및 상세 내용을 확인하세요. \n\n제4회 문화체육관광 인공지능·데이터 활용 공모전 우리 문화 생태계의 경쟁력을 높이고 새로운 활력을 불어넣을 「문화체육관광 인공지능·데이터 활용 공모전」을 개최합니다. 본 공모전은 제13회 범정부 공공데이터 활용 창업경진대회에서 '대통령상' 수상팀을 배출하며 그 저력을 입증했습니다. 기술과 문화의 융합으로 미래를 설계할 여러분의 창의적인 도전을 기다립니다."
    };

    setContest(mockDetailData);
  }, [id]);

  if (!contest) return <div className="loading">로딩 중...</div>;

  return (
    <div className="contest-detail-page">
      <Navbar isLoggedIn={isLoggedIn} />

      <main className="contest-detail-content">
        <div className="detail-header-section">
          {/* 왼쪽: 포스터 이미지 */}
          <div className="detail-poster-wrapper">
            <img src={contest.image_url} alt={contest.name} />
          </div>

          {/* 오른쪽: 공모전 개요 정보 테이블 */}
          <div className="detail-summary-info">
            <h1 className="detail-title">{contest.name}</h1>
            
            <div className="detail-tags-list">
              {contest.분야.map((tag, idx) => (
                <span key={idx} className="detail-tag-badge">#{tag}</span>
              ))}
            </div>

            <div className="info-table">
              <div className="info-row"><span className="info-label">응모 대상</span> <span>{contest.응모대상}</span></div>
              <div className="info-row"><span className="info-label">주최/주관</span> <span>{contest.주최주관}</span></div>
              <div className="info-row"><span className="info-label">접수 기간</span> <span className="highlight-text">{contest.접수기간}</span></div>
              <div className="info-row"><span className="info-label">총 상금</span> <span>{contest.총상금} (1등: {contest.일등상금})</span></div>
            </div>

            <a href={contest.홈페이지} target="_blank" rel="noreferrer" className="visit-btn">
              주최사 홈페이지 바로가기
            </a>
          </div>
        </div>

        {/* 하단: 공모전 상세 내용 본문 */}
        <div className="detail-body-section">
          <h2>상세 내용</h2>
          <div className="detail-description">
            {/* \n 행바꿈 기호를 브라우저에 그대로 반영하기 위해 pre 태그나 스타일을 적용합니다 */}
            <p style={{ whiteSpace: 'pre-wrap' }}>{contest.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ContestDetail;