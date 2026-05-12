import React from 'react';
import Navbar from '../components/Navbar';
import './MainPage.css';

function MainPage() {
  return (
    <div className="main-container">
      <Navbar isLoggedIn={false} />

      <main className="main-content">
        {/* ✅ 왼쪽 섹션: 비회원 안내 영역 */}
        <section className="hero-left">
          <div className="hero-content">
            {/* 상단 장식 아이콘/그래픽 (이미지의 선 형태 반영) */}
            <div className="deco-lines">
              <span></span>
              <span></span>
              <span></span>
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

        {/* 오른쪽 섹션 (공백 유지 또는 추후 개발) */}
        <section className="hero-right">
          {/* 여기에 오른쪽 카드들이 들어갈 예정입니다 */}
        </section>
      </main>
    </div>
  );
}

export default MainPage;