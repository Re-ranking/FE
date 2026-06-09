import React from 'react';
import './AuthModal.css';
import rabbitLogo from '../assets/images/profile-default.png'; 

/**
 * 범용 AuthModal 컴포넌트
 * @param {boolean} isOpen - 모달 표시 여부
 * @param {function} onClose - 모달 닫기 함수 (배경 클릭 시)
 * @param {string} message - 모달 중앙에 보여줄 문구
 * @param {function} onConfirm - [선택] 확인 버튼 클릭 시 실행할 커스텀 함수
 * @param {string} confirmText - [선택] 확인 버튼에 들어갈 텍스트 (기본값: "확인")
 * @param {string} logoSrc - [선택] 로고 이미지를 바꾸고 싶을 때 사용
 */
function AuthModal({ 
  isOpen, 
  onClose, 
  message, 
  onConfirm, 
  confirmText = "확인", 
  logoSrc 
}) {

  // 모달이 꺼져있으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(); // 부모가 넘겨준 커스텀 로직 실행
    } else {
      onClose();   // 별도 로직이 없다면 그냥 모달 닫기
    }
  };

  return (
    // 배경을 어둡게 만들어주는 보호막 (바깥 클릭 시 모달 닫힘)
    <div className="modal-overlay" onClick={onClose}>
      
      {/* 모달 본체 (내부 클릭 시 바깥으로 클릭 이벤트가 퍼져서 닫히는 버그 방지) */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        {/* 로고 구역 */}
        <div className="modal-logo-container">
          <img 
            src={logoSrc || rabbitLogo} 
            alt="모달 로고" 
            className="modal-rabbit-logo" 
          />
        </div>

        {/* 메인 안내 문구 구역 */}
        <h2 className="modal-message">
          {message || "안내 문구를 입력해주세요."}
        </h2>

        {/* 확인 버튼 */}
        <button className="modal-confirm-btn" onClick={handleConfirm}>
          {confirmText}
        </button>

      </div>
    </div>
  );
}

export default AuthModal;