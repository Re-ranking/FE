import React, { useState, useEffect } from 'react'; // 🌟 백엔드 로그인 상태 유지를 위해 useEffect 추가
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';
import purpleIcon from '../assets/images/purple-icon.png'; 
import AuthModal from './AuthModal'; 

function Navbar() { 
  const navigate = useNavigate(); 

  // 모달창 열림/닫힘 제어용 스위치 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 🌟 임시 로그인 상태값 (테스트를 위해 true/false로 바꿔가며 확인해보세요!)
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  /* =========================================================================
     [백엔드 연동 포인트 1 - 유저 로그인 상태 유지 각주]
     - 유저가 브라우저를 새로고침 하더라도 로그인 상태가 유지되어야 합니다.
     - 렌더링 시점에 브라우저(localStorage 등)에 토큰이 있는지 확인하거나,
       백엔드의 인증 확인 API(예: axios.get('/api/auth/status'))를 호출하여 
       setIsLoggedIn(true)로 상태를 변경해주는 로직이 여기에 들어가야 합니다.
     ========================================================================= */
  useEffect(() => {
    // 예시: const token = localStorage.getItem('token');
    // if (token) setIsLoggedIn(true);
  }, []);

  // 로그아웃 및 로그인 버튼 클릭 핸들러
  const handleAuthClick = () => {
    if (isLoggedIn) {
      // ------------------------------------------------------
      // [프론트엔드 테스트용 기능] 
      // ------------------------------------------------------
      alert('로그아웃 되었습니다!');
      setIsLoggedIn(false); // 테스트를 위해 프론트 상태를 로그아웃으로 변경
      navigate('/main'); 
      
      /* =========================================================================
         [백엔드 연동 포인트 2 - 로그아웃 API 통신 각주]
         - 단순히 alert만 띄우면 브라우저에 로그인 기록(토큰 등)이 남아있습니다.
         - 여기에 백엔드 로그아웃 API를 호출하는 코드를 작성해야 합니다.
         
         예시 코드:
         axios.post('/api/auth/logout')
           .then(() => {
              localStorage.removeItem('token'); // 내 컴퓨터에 저장된 토큰 삭제
              setIsLoggedIn(false);             // 로그인 상태 꺼두기
              navigate('/main');
           })
           .catch(err => console.error('로그아웃 실패:', err));
         ========================================================================= */
    } else {
      // 로그인 상태가 아닐 때 누르면 로그인 페이지로 이동
      navigate('/login'); 
    }
  };

  // 비회원을 막아서고 모달을 띄우는 가드 핸들러 함수
  const handleProtectedMenuClick = (path) => {
    /* =========================================================================
       [백엔드 연동 포인트 3 - 접근 권한 제어 각주]
       - 회원가입 시 CV를 필수로 제출하므로, 여기서는 오직 로그인 여부만 검사하면 됩니다.
       - isLoggedIn 상태가 true라면 백엔드 DB에 이미 유저 정보와 CV 데이터가 매핑되어 
         있는 것이 보장되므로 안심하고 통과시켜 줍니다.
       ========================================================================= */
    if (!isLoggedIn) {
      setIsModalOpen(true); // 비회원이면 모달 켜기!
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
          {/* 비회원을 막아야 하는 메뉴들에 가드 함수 적용 */}
          <li onClick={() => handleProtectedMenuClick('/mypage')} style={{ cursor: 'pointer' }}>MYPAGE</li>
          <li onClick={() => handleProtectedMenuClick('/contest-recommend')} style={{ cursor: 'pointer' }}>공모전 추천 페이지</li>
          <li onClick={() => handleProtectedMenuClick('/Teamrecommend')} style={{ cursor: 'pointer' }}>팀원 추천 페이지</li>
          
          {/* 공모전 목록보기는 비회원도 구경할 수 있게 기본 원본 그대로 유지 */}
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

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}

export default Navbar;