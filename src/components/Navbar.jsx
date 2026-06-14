import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';   // 로그인 상태 훅
import { logout } from '../api/authAPI';       // 로그아웃 API
import './Navbar.css';
import purpleIcon from '../assets/images/purple-icon.png';
import AuthModal from './AuthModal';

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // ✅ 전역 로그인 상태

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 로그아웃 핸들러
  const handleAuthClick = async () => {
    if (isLoggedIn) {
      await logout();          // 서버 로그아웃 + localStorage 정리
      setIsLoggedIn(false);    // 화면 즉시 반영
      navigate('/main');
    } else {
      navigate('/login');
    }
  };

  // 로그인/선행조건 가드
  const handleProtectedMenuClick = (path) => {
    if (!isLoggedIn) {
      setModalMessage('로그인이 필요한 서비스입니다.');
      setIsModalOpen(true);
      return;
    }

    if (path === '/Teamrecommend') {
      // 백엔드 연동 시: 서버에서 공모전 추천 여부 받아서 검사
      // 지금은 localStorage에 저장된 값으로 확인
      const isContestRecommended = localStorage.getItem('contestRecommended') === 'true';
      if (!isContestRecommended) {
        setModalMessage('공모전 추천을 먼저 받아주세요!');
        setIsModalOpen(true);
        return;
      }
    }

    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-container" onClick={() => navigate('/main')}>
          <img src={purpleIcon} alt="Team-up Logo" className="navbar-logo" />
        </div>
      </div>

      <div className="navbar-center">
        <ul className="nav-menu">
          <li onClick={() => handleProtectedMenuClick('/mypage')}>MYPAGE</li>
          <li onClick={() => handleProtectedMenuClick('/contest-recommend')}>공모전 추천 페이지</li>
          <li onClick={() => handleProtectedMenuClick('/Teamrecommend')}>팀원 추천 페이지</li>
          <li onClick={() => navigate('/contests')}>공모전 목록보기</li>
        </ul>
      </div>

      <div className="navbar-right">
        <button className="login-btn" onClick={handleAuthClick}>
          {isLoggedIn ? 'LOGOUT' : 'LOGIN'}
        </button>
      </div>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </nav>
  );
}

export default Navbar;