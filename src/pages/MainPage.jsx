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

  const handleProtectedClick = (path) => {
    if (!isLoggedIn) {
      openModal('로그인 후 이용해주세요.');
      return;
    }
    navigate(path);
  };

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
        <section className="main-hero">
          <div className="hero-blobs" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>

          <div className="hero-floats" aria-hidden="true">
            <div className="main-float-card mini-contest main-float-a">
              <div className="mini-contest-poster">
                <span className="mini-contest-score">92점</span>
                <span className="mini-contest-poster-text">DATA · AI<br />CONTEST</span>
              </div>
              <div className="mini-contest-info">
                <p className="mini-contest-title">데이터 분석 아이디어 공모전</p>
                <div className="mini-tags">
                  <span className="mini-tag">#데이터/AI</span>
                  <span className="mini-tag">#기획</span>
                </div>
                <div className="mini-contest-scores">
                  <div>
                    <span>분야 점수</span>
                    <strong>94점</strong>
                  </div>
                  <i></i>
                  <div>
                    <span>기술 점수</span>
                    <strong>88점</strong>
                  </div>
                </div>
                <p className="mini-contest-period">
                  <span className="mini-dday">D-12</span>
                  ~ 10.31 마감
                </p>
              </div>
            </div>

            <div className="main-float-card mini-member main-float-c">
              <span className="mini-member-rank">No.1</span>
              <div className="mini-member-top">
                <div className="mini-avatar-ring">
                  <div className="mini-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="8" r="4.2" />
                      <path d="M3.8 21c.9-4.3 4.2-6.8 8.2-6.8s7.3 2.5 8.2 6.8z" />
                    </svg>
                  </div>
                </div>
                <div className="mini-member-name">
                  <p>이연우</p>
                  <span>프론트엔드</span>
                </div>
              </div>
              <div className="mini-member-score">
                <div>
                  <span>매칭 점수</span>
                  <strong>94점</strong>
                </div>
                <div className="mini-track"><span></span></div>
              </div>
              <div className="mini-member-tags">
                <span className="mini-tag-label">SKILL</span>
                <div className="mini-tags">
                  <span className="mini-tag">Figma</span>
                  <span className="mini-tag">UI/UX</span>
                </div>
                <span className="mini-tag-label is-domain">DOMAIN</span>
                <div className="mini-tags">
                  <span className="mini-tag is-domain">데이터/AI</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-content">
            <div className="deco-lines" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>

            <h1 className="hero-title">
              "나한테 맞는 공모전이 어딨지..?"<br />
              이제 검색 말고 <span className="hero-highlight">매칭</span> 받으세요
            </h1>
            <p className="hero-description">
              내 이력서(CV)만 올리면 끝!<br />
              AI가 내 역량에 딱 맞는 공모전부터,<br />부족한 점을 채워줄 찰떡궁합 팀원까지 한 번에 찾아줍니다.
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

        <section className="main-features" id="features">
          <div className="main-feature-grid">
            <article className="recommend-section" onClick={() => handleProtectedClick('/contest-recommend')}>
              <div className="main-card-top">
                <span className="card-step"><b>01</b>AI MATCHING</span>
                <div className="main-card-icon">
                  <img src={mainIcon1} alt="" className="main-icon" />
                </div>
              </div>
              <h3 className="recommend-title">공모전 고민 그만</h3>
              <p className="recommend-text">
                내 CV 분석을 통한 맞춤형 공모전 추천.<br />
                단순 키워드가 아닌 심층 연관성 분석
              </p>
              <button type="button" className="recommend-btn">
                공모전 추천받기
                <span className="main-btn-arrow" aria-hidden="true">→</span>
              </button>
            </article>

            <div className="step-connector" aria-hidden="true">
              <span>→</span>
            </div>

            <article className="recommend-section" onClick={handleTeamRecommendClick}>
              <div className="main-card-top">
                <span className="card-step"><b>02</b>TEAM BUILDING</span>
                <div className="main-card-icon">
                  <img src={mainIcon2} alt="" className="main-icon" />
                </div>
              </div>
              <h3 className="recommend-title">완벽한 팀원 조합</h3>
              <p className="recommend-text">
                내가 부족한 직무 역량을 채워줄 완벽한 퍼즐 조각.<br />
                역량 보완성부터 협업 성향까지 고려한 완벽한 팀 빌딩
              </p>
              <button type="button" className="recommend-btn">
                팀원 추천받기
                <span className="main-btn-arrow" aria-hidden="true">→</span>
              </button>
            </article>
          </div>
        </section>
      </main>

      {ModalComponent}
    </div>
  );
}

export default MainPage;