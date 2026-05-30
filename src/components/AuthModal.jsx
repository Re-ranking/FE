import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';
import rabbitLogo from '../assets/images/profile-default.png'; // 💡 이미지 로드 완료!

function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  // 스위치(isOpen)가 켜지지 않으면 아무것도 그리지 않음
  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose();          // 모달창을 닫고
    navigate('/register'); // 회원가입 페이지로 이동
  };

  return (
    // 배경을 어둡게 만들어주는 보호막 (바깥 클릭 시 모달 닫힘)
    <div className="modal-overlay" onClick={onClose}>
      
      {/* 피그마 디자인 본체 (상자 내부 클릭 시 닫히는 버그 방지) */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        {/* 토끼 로고 구역 */}
        <div className="modal-logo-container">
          {/* 🌟 기존 이모지 대신 불러온 rabbitLogo 이미지를 매핑했습니다! */}
          <img src={rabbitLogo} alt="토끼 로고" className="modal-rabbit-logo" />
        </div>

        {/* 메인 안내 문구 */}
        <h2 className="modal-message">회원가입 후 이용해주세요</h2>

        {/* 확인 버튼 */}
        <button className="modal-confirm-btn" onClick={handleConfirm}>
          확인
        </button>

      </div>
    </div>
  );
}

export default AuthModal;