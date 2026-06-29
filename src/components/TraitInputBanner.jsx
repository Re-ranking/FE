import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 마이페이지 - 협업 성향 입력 안내 배너
 * 클릭 시 성향입력(설문) 페이지로 이동
 */
function TraitInputBanner() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/survey');
  };

  return (
    <div className="trait-banner">
      <div className="trait-text-group">
        <div className="trait-icon-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.483-.196-.934-.558-1.012-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
          </svg>
        </div>
        <div>
          <p className="trait-title">나의 협업 성향, 알고 있나요?</p>
          <p className="trait-desc">1분 테스트로 더 잘 맞는 팀원을 찾아드려요.</p>
        </div>
      </div>
      <button className="trait-btn" onClick={handleClick}>
        시작하기
      </button>
    </div>
  );
}

export default TraitInputBanner;