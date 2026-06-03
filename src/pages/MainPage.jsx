import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import './MainPage.css';
import mainIcon1 from '../assets/images/main-icon1.png'; 
import mainIcon2 from '../assets/images/main-icon2.png';

function MainPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
  }, []);

  const handleMainButtonClick = () => {
    if (isLoggedIn) {
      navigate('/contests');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="main-container">
      <Navbar isLoggedIn={isLoggedIn} />

      <main className="main-content">
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

            <button className="signup-main-btn" onClick={handleMainButtonClick}>
              {isLoggedIn ? "공모전 둘러보러 가기" : "회원가입"}
            </button>
          </div>
        </section>

        <section className="hero-right">
          <div className="recommend-container">
            
            <div className="recommend-section" onClick={() => navigate('/contest-recommend')}>
              <span className="card-badge">AI MATCHING</span>
              <h2 className="recommend-title">공모전 고민 그만</h2>
              <p className="recommend-text">
                내 CV 분석을 통한 맞춤형 공모전 추천.<br />
                단순 키워드가 아닌 심층 연관성 분석
              </p>
              <img src={mainIcon1} alt="공모전 추천 아이콘" className="main-icon" />
              <button className="recommend-btn">
                추천받기 →
              </button>
            </div>

            <div className="recommend-section" onClick={() => navigate('/Teamrecommend')}>
              <span className="card-badge">TEAM BUILDING</span>
              <h2 className="recommend-title">완벽한 팀원 조합</h2>
              <p className="recommend-text">
                내가 부족한 직무 역량을 채워줄 완벽한 퍼즐 조각.<br />
                역량 보완성부터 협업 성향까지 고려한 완벽한 팀 빌딩
              </p>
              <img src={mainIcon2} alt="팀원 추천 아이콘" className="main-icon" />
              <button className="recommend-btn">
                추천받기 →
              </button>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default MainPage;