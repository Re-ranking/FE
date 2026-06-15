import { useState } from 'react';
import AuthModal from '../components/AuthModal';

/**
 * 어느 페이지에서든 AuthModal을 쉽게 쓸 수 있는 커스텀 훅
 *
 * 사용 예시:
 *   const { openModal, ModalComponent } = useModal();
 *
 *   // 모달 띄우기
 *   openModal('CV를 업로드 해주세요!');
 *
 *   // 확인 버튼 클릭 시 커스텀 동작
 *   openModal('정말 삭제할까요?', () => handleDelete());
 *
 *   // JSX 안에 추가
 *   return (
 *     <div>
 *       ...
 *       {ModalComponent}
 *     </div>
 *   );
 */
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirmCallback, setOnConfirmCallback] = useState(null);
  const [confirmText, setConfirmText] = useState('확인');

  /**
   * 모달 열기
   * @param {string} msg - 모달에 표시할 메시지
   * @param {function} onConfirm - [선택] 확인 버튼 클릭 시 실행할 함수
   * @param {string} btnText - [선택] 확인 버튼 텍스트 (기본값: "확인")
   */
  const openModal = (msg, onConfirm = null, btnText = '확인') => {
    setMessage(msg);
    setOnConfirmCallback(() => onConfirm); 
    setConfirmText(btnText);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage('');
    setOnConfirmCallback(null);
    setConfirmText('확인');
  };

  const ModalComponent = (
    <AuthModal
      isOpen={isOpen}
      onClose={closeModal}
      message={message}
      onConfirm={onConfirmCallback}
      confirmText={confirmText}
    />
  );

  return { openModal, closeModal, ModalComponent };
};

export default useModal;