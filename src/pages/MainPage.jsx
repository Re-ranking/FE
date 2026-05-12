import React from 'react';
import Navbar from '../components/Navbar';
import './MainPage.css';
// ✅ 아이콘 임포트
import mainIcon1 from '../assets/images/main-icon1.png'; 
import mainIcon2 from '../assets/images/main-icon2.png';

function MainPage() {
  return (
    <div className="main-container">
      <Navbar isLoggedIn={false} />

      <main className="main-content">
        {/* 왼쪽 섹션 (기존 코드 유지) */}
        <section className="hero-left">
          <div className="hero-content">
            <div className="deco-lines">
              <span></span><span></span><span></span>
            </div>
            <h1 className="hero-title">
              "나한테 맞는 공모전이 어딨지..?"<br />
              이제 검색 말고 매칭 받으세요
            </h1>
            <p className="hero-description">
              내 이력서(CV)만 올리면 끝!<br />
              AI가 내 역량에 딱 맞는 공모전부터, 부족한 점을 채워<br />
              줄 찰떡궁합 팀원까지 한 번에 찾아줍니다.
            </p>
            <button className="signup-main-btn">회원가입</button>
          </div>
        </section>

        {/* ✅ 오른쪽 섹션: 추천 서비스 안내 */}
        <section className="hero-right">
          <div className="recommend-container">
            
            {/* 상단: 공모전 추천 섹션 */}
            <div className="recommend-section">
              <h2 className="recommend-title">공모전 고민 그만</h2>
              <p className="recommend-text">
                내 CV 분석을 통한 맞춤형 공모전 추천.<br />
                단순 키워드가 아닌 심층 연관성 분석
              </p>
              <img src={mainIcon1} alt="공모전 추천 아이콘" className="main-icon" />
              <button className="recommend-btn">공모전 추천받기</button>
            </div>

            {/* 하단: 팀원 추천 섹션 */}
            <div className="recommend-section">
              <h2 className="recommend-title">완벽한 팀원 조합</h2>
              <p className="recommend-text">
                내가 부족한 직무 역량을 채워줄 <br />완벽한 퍼즐 조각.<br />
                역량 보완성부터 협업 성향까지 고려한 <br />완벽한 팀 빌딩
              </p>
              <img src={mainIcon2} alt="팀원 추천 아이콘" className="main-icon" />
              <button className="recommend-btn">팀원 추천받기</button>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default MainPage;