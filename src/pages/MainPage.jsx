import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import useModal from '../hooks/useModal';
import './MainPage.css';
import mainIcon1 from '../assets/images/main-icon1.png'; 
import mainIcon2 from '../assets/images/main-icon2.png';

function MainPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { openModal, ModalComponent } = useModal();

  const handleMainButtonClick = () => {
    if (isLoggedIn) {
      navigate('/contests');
    } else {
      navigate('/register');
    }
  };

  // 로그인 여부 확인 후 페이지 이동
  const handleProtectedClick = (path) => {
    if (!isLoggedIn) {
      openModal('로그인 후 이용해주세요.');
      return;
    }
    navigate(path);
  };

  // 팀원 추천은 공모전 추천을 먼저 받아야만 이동 가능 (Navbar와 동일한 가드)
  const handleTeamRecommendClick = () => {
    if (!isLoggedIn) {
      openModal('로그인 후 이용해주세요.');
      return;
    }
    if (!localStorage.getItem('contestRecommended')) {
      openModal('먼저 공모전 추천을 받아주세요.');
      return;
    }
    navigate('/Teamrecommend');
  };

  return (
    <div className="main-container">
      <Navbar />

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
              AI가 내 역량에 딱 맞는 공모전부터, 부족한 점을 채워줄 찰떡궁합 팀원까지 한 번에 찾아줍니다.
            </p>

            <button type="button" className="signup-main-btn" onClick={handleMainButtonClick}>
              {isLoggedIn ? "공모전 둘러보러 가기" : "회원가입"}
            </button>

            <ol className="hero-steps">
              <li><span className="step-num" aria-hidden="true">1</span>CV 업로드</li>
              <li><span className="step-num" aria-hidden="true">2</span>AI 분석</li>
              <li><span className="step-num" aria-hidden="true">3</span>공모전·팀원 추천</li>
            </ol>
          </div>
        </section>

        <section className="hero-right">
          <div className="recommend-container">
            
            <div className="recommend-section" onClick={() => handleProtectedClick('/contest-recommend')}>
              <span className="card-step">AI MATCHING</span>
              <h2 className="recommend-title">공모전 고민 그만</h2>
              <p className="recommend-text">
                내 CV 분석을 통한 맞춤형 공모전 추천.<br />
                단순 키워드가 아닌 심층 연관성 분석
              </p>
              <img src={mainIcon1} alt="공모전 추천 아이콘" className="main-icon" />
              <button type="button" className="recommend-btn">
                공모전 추천받기
              </button>
            </div>

            <div className="step-connector" aria-hidden="true"></div>

            <div className="recommend-section" onClick={handleTeamRecommendClick}>
              <span className="card-step">TEAM BUILDING</span>
              <h2 className="recommend-title">완벽한 팀원 조합</h2>
              <p className="recommend-text">
                내가 부족한 직무 역량을 채워줄 완벽한 퍼즐 조각.<br />
                역량 보완성부터 협업 성향까지 고려한 완벽한 팀 빌딩
              </p>
              <img src={mainIcon2} alt="팀원 추천 아이콘" className="main-icon" />
              <button type="button" className="recommend-btn">
                팀원 추천받기
              </button>
            </div>

          </div>
        </section>
      </main>

      {ModalComponent}
    </div>
  );
}

export default MainPage;