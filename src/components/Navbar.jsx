import React, { useState } from 'react'; // 🌟 useState 추가
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';
import purpleIcon from '../assets/images/purple-icon.png'; 
import AuthModal from './AuthModal'; // 🌟 1. 모달 컴포넌트 가져오기

function Navbar({ isLoggedIn = false }) {
  const navigate = useNavigate(); 

  // 🌟 2. 모달창 열림/닫힘 제어용 스위치 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // 🌟 3. 비회원을 막아서고 모달을 띄우는 가드 핸들러 함수
  const handleProtectedMenuClick = (path) => {
    if (!isLoggedIn) {
      setIsModalOpen(true); // 비회원이면 토끼 모달 켜기!
    } else {
      navigate(path); // 회원이면 원래 가려던 페이지로 이동
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
          {/* 🌟 4. 비회원을 막아야 하는 메뉴들에 가드 함수 적용 */}
          <li onClick={() => handleProtectedMenuClick('/mypage')} style={{ cursor: 'pointer' }}>MYPAGE</li>
          <li onClick={() => handleProtectedMenuClick('/contest-recommend')} style={{ cursor: 'pointer' }}>공모전 추천 페이지</li>
          <li onClick={() => handleProtectedMenuClick('/Teamrecommend')} style={{ cursor: 'pointer' }}>팀원 추천 페이지</li>
          
          {/* 💡 공모전 목록보기는 비회원도 구경할 수 있게 기본 원본 그대로 유지 */}
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

      {/* 🌟 5. 새롭게 부활한 공중 부양 토끼 모달 조립 */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}

export default Navbar;