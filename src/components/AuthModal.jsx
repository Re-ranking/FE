import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';
import rabbitLogo from '../assets/images/profile-default.png'; 

// 🌟 1. Props에 message를 추가로 받아옵니다!
function AuthModal({ isOpen, onClose, message }) {
  const navigate = useNavigate();

  // 스위치(isOpen)가 켜지지 않으면 아무것도 그리지 않음
  if (!isOpen) return null;

  // 🌟 2. 확인 버튼을 눌렀을 때 문구에 따라 다르게 행동하도록 제어합니다.
  const handleConfirm = () => {
    onClose(); // 우선 모달창을 닫습니다.

    if (message === '공모전 추천을 먼저 받아주세요!') {
      // 공모전 추천이 먼저 필요할 때는 페이지 이동 없이 모달만 닫고 
      // 사용자가 공모전 추천 페이지로 갈 수 있게 놔둡니다.
      return;
    } 
    
    if (message === '로그인이 필요한 서비스입니다.') {
      // 로그인 필요 문구일 때는 로그인 페이지로 이동시킵니다.
      navigate('/login');
      return;
    }

    // 그 외의 기본 상황(비회원 유도 등)일 때는 회원가입 페이지로 이동
    navigate('/register'); 
  };

  return (
    // 배경을 어둡게 만들어주는 보호막 (바깥 클릭 시 모달 닫힘)
    <div className="modal-overlay" onClick={onClose}>
      
      {/* 피그마 디자인 본체 (상자 내부 클릭 시 닫히는 버그 방지) */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        {/* 토끼 로고 구역 */}
        <div className="modal-logo-container">
          <img src={rabbitLogo} alt="토끼 로고" className="modal-rabbit-logo" />
        </div>

        {/* 🌟 3. 메인 안내 문구 구역을 동적으로 변경했습니다! */}
        {/* 넘겨받은 message가 있으면 그걸 보여주고, 없으면 기본 문구를 보여줍니다. */}
        <h2 className="modal-message">
          {message || "회원가입 후 이용해주세요"}
        </h2>

        {/* 확인 버튼 */}
        <button className="modal-confirm-btn" onClick={handleConfirm}>
          확인
        </button>

      </div>
    </div>
  );
}

export default AuthModal;