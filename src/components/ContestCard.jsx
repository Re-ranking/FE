import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ContestCard.css';

// 부모로부터 contest 데이터와 함께 고유 번호(id)를 추가
function ContestCard({ contest, id }) {
  const navigate = useNavigate(); // useNavigate 훅 사용 등록

  // 상세보기 버튼 클릭 함수
  const handleDetailClick = () => {
    // 주소창을 /contests/0 , /contests/1 동적 이동
    navigate(`/contests/${id}`);
  };

  return (
    <div className="contest-card">
      <div className="poster-wrapper">
        {/* 기존 posterImg 외에 백엔드 명세인 image_url도 호환되도록 처리 */}
        <img 
          src={contest.posterImg || contest.image_url} 
          alt={contest.title || contest.name} 
          className="poster-img" 
        />
      </div>
      
      <div className="contest-info">
        {/* 기존 title 외에 백엔드 명세인 name도 호환되도록 처리 */}
        <h3 className="contest-card-title">{contest.title || contest.name}</h3>
        
        {/* 분야 태그 */}
        <div className="contest-tags">
          {contest.tags && contest.tags.map((tag, index) => (
            <span key={index} className="contest-tag">#{tag}</span>
          ))}
        </div>
        
        {/* 대상 정보 (기존 target 외에 백엔드 명세인 응모대상도 호환) */}
        <div className="contest-details">
          <p>
            <span className="detail-label">대상</span> 
            {contest.target || contest.응모대상}
          </p>
        </div>
        
        <button className="detail-btn" onClick={handleDetailClick}>
          상세보기
        </button>
      </div>
    </div>
  );
}

export default ContestCard;