import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';
import purpleIcon from '../assets/images/purple-icon.png'; 
import AuthModal from './AuthModal'; 

function Navbar() { 
  const navigate = useNavigate(); 

  // 모달창 제어 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 임시 로그인 상태값 (테스트용 true)
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  /* =========================================================================
    [ 프론트 테스트용 핵심 더미 스위치!]
     - 아래 변수값을 바꿔가며 모달이 잘 뜨는지 확인
     - false : 공모전 추천을 안 받은 상태 ➡️ "공모전 추천 먼저..." 모달 뜸!
     - true  : 공모전 추천을 이미 받은 상태 ➡️ 모달 없이 팀원 추천 페이지로 바로 이동!
     ========================================================================= */
  const isContestRecommendedDummy = false; // 지금 false니까 모달이 무조건 뜬다.


  /* =========================================================================
     [백엔드 연동 포인트 1 - 유저 로그인 상태 유지]
     ========================================================================= */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  // 로그아웃 및 로그인 버튼 클릭 핸들러
  const handleAuthClick = () => {
    if (isLoggedIn) {
      alert('로그아웃 되었습니다!');
      setIsLoggedIn(false); 
      
      // [백엔드 연동 시] 로그아웃할 때 서버 세션이나 토큰을 파기하는 곳
      // localStorage.removeItem('token');
      
      navigate('/main'); 
    } else {
      navigate('/login'); 
    }
  };

  // 비회원 및 선행 로직 막아서는 가드 핸들러 함수
  const handleProtectedMenuClick = (path) => {
    // 1단계 가드: 로그인 여부 확인
    if (!isLoggedIn) {
      setModalMessage('로그인이 필요한 서비스입니다.');
      setIsModalOpen(true); 
      return;
    }

    // 2단계 가드: 팀원 추천 페이지 접근 시 선행 조건 확인
    if (path === '/Teamrecommend') {
      
      /* =========================================================================
         [백엔드 연동 포인트 2 - 공모전 추천 여부 DB 조회]
         - 실제 백엔드 연동 시에는 로컬 스토리지나 더미 스위치 대신, 
           로그인한 유저의 DB 데이터(예: user.hasRecommended)를 백엔드에서 받아와서 검증합니다.
         
         예시 코드:
         axios.get('/api/user/status')
           .then(res => {
             if(!res.data.contestRecommended) { ... 모달 띄우기 ... }
           })
         ========================================================================= */

      // 현재는 발표 및 테스트를 위해 위에 선언한 더미 스위치(isContestRecommendedDummy)를 바라봅니다.
      if (!isContestRecommendedDummy) {
        setModalMessage('공모전 추천을 먼저 받아주세요!');
        setIsModalOpen(true);
        return; // 페이지 이동 차단
      }
    }

    // 조건 통과 시 페이지 이동
    navigate(path);
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
          <li onClick={() => handleProtectedMenuClick('/mypage')} style={{ cursor: 'pointer' }}>MYPAGE</li>
          <li onClick={() => handleProtectedMenuClick('/contest-recommend')} style={{ cursor: 'pointer' }}>공모전 추천 페이지</li>
          <li onClick={() => handleProtectedMenuClick('/Teamrecommend')} style={{ cursor: 'pointer' }}>팀원 추천 페이지</li>
          <li onClick={() => navigate('/contests')} style={{ cursor: 'pointer' }}>공모전 목록보기</li>
        </ul>
      </div>

      <div className="navbar-right">
        <button className="login-btn" onClick={handleAuthClick}>
          {isLoggedIn ? "LOGOUT" : "LOGIN"}
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