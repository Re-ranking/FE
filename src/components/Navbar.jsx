import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';
import purpleIcon from '../assets/images/purple-icon.png'; 

function Navbar({ isLoggedIn = false }) {
  const navigate = useNavigate(); 

  // 로그아웃 및 로그인 버튼 클릭 핸들러
  const handleAuthClick = () => {
    if (isLoggedIn) {
      // ------------------------------------------------------
      // [프론트엔드 테스트용 기능] 
      // ------------------------------------------------------
      alert('로그아웃 되었습니다!');
      navigate('/main'); // 로그인 페이지로 이동시켜서 눈으로 확인하기
      
      /* =====================================================
         1. 서버에 로그아웃 요청 보내기 (axios.post('/api/logout'))
         2. 브라우저 저장소 토큰 삭제 (localStorage.clear())
         ======================================================
      */
    } else {
      // 로그인 상태가 아닐 때 누르면 로그인 페이지로 이동
      navigate('/login'); 
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-container" onClick={() => navigate('/main')} style={{ cursor: 'pointer' }}>
          <img src={purpleIcon} alt="Team-up Logo" className="navbar-logo" />
        </div>
      </div>

      <div className="navbar-center">
        <ul className="nav-menu">
          <li onClick={() => navigate('/mypage')} style={{ cursor: 'pointer' }}>MYPAGE</li>
          <li onClick={() => navigate('/contest-recommend')} style={{ cursor: 'pointer' }}>공모전 추천 페이지</li>
          <li onClick={() => navigate('/Teamrecommend')} style={{ cursor: 'pointer' }}>팀원 추천 페이지</li>
          <li onClick={() => navigate('/contests')} style={{ cursor: 'pointer' }}>공모전 목록보기</li>
        </ul>
      </div>

      <div className="navbar-right">
        <button 
          className="login-btn" 
          onClick={handleAuthClick}
        >
          {isLoggedIn ? "LOGOUT" : "LOGIN"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;