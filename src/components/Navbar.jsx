import React from 'react';
import './Navbar.css';
// ✅ 새로 넣으신 보라색 아이콘으로 임포트 경로 수정
import purpleIcon from '../assets/images/purple-icon.png'; 

function Navbar({ isLoggedIn = false }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-container">
          {/* ✅ 보라색 아이콘 적용 */}
          <img src={purpleIcon} alt="Team-up Logo" className="navbar-logo" />
        </div>
      </div>

      <div className="navbar-center">
        <ul className="nav-menu">
          <li>MYPAGE</li>
          <li>공모전 추천 페이지</li>
          <li>팀원 추천 페이지</li>
          <li>공모전 목록보기</li>
        </ul>
      </div>

      <div className="navbar-right">
        <button className="login-btn">{isLoggedIn ? "LOGOUT" : "LOGIN"}</button>
      </div>
    </nav>
  );
}

export default Navbar;