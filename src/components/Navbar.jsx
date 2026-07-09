import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../api/authAPI';
import useModal from '../hooks/useModal.jsx'; // useModal 훅
import './Navbar.css';
import purpleIcon from '../assets/images/purple-icon.png';

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { openModal, ModalComponent } = useModal(); // ✅

  const handleAuthClick = async () => {
    if (isLoggedIn) {
      await logout();
      setIsLoggedIn(false);
      navigate('/main');
    } else {
      navigate('/login');
    }
  };

  const handleProtectedMenuClick = (path) => {
    if (!isLoggedIn) {
      openModal('로그인이 필요한 서비스입니다.'); 
      return;
    }

    if (path === '/Teamrecommend') {
      const isContestRecommended = localStorage.getItem('contestRecommended') === 'true';
      if (!isContestRecommended) {
        openModal('공모전 추천을 먼저 받아주세요!'); 
        return;
      }
    }

    navigate(path);
  };

  return (
    <>
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
      </nav>

      {ModalComponent}
    </>
  );
}

export default Navbar;