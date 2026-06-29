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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div>
          <p className="trait-title">협업 성향을 입력하면 더 정확한 팀 매칭을 받을 수 있어요</p>
          <p className="trait-desc">1분이면 충분해요. 성향에 맞는 팀원을 추천해드려요.</p>
        </div>
      </div>
      <button className="trait-btn" onClick={handleClick}>
        성향 입력하기
      </button>
    </div>
  );
}

export default TraitInputBanner;