import React, { useState, useEffect } from 'react';
import SavedContestCard from '../components/SavedContestCard';

const SAVE_KEY = 'savedContests';

function readSavedContests() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY) || '[]');
  } catch (err) {
    console.error('저장한 공모전 로드 실패:', err);
    return [];
  }
}

/**
 * 마이페이지 - 저장한 공모전 (즐겨찾기)
 * 백엔드 연동 없이 localStorage에만 저장된 데이터를 표시합니다.
 * 공모전 상세페이지의 "저장하기" 버튼으로 추가/제거되며,
 * 이 목록의 카드에서도 바로 저장 해제할 수 있습니다.
 */
function MyPageSavedContestsSection() {
  const [savedContests, setSavedContests] = useState([]);

  useEffect(() => {
    const loadSaved = () => {
      // 최근 저장한 순으로 표시
      setSavedContests([...readSavedContests()].reverse());
    };

    loadSaved();

    // 다른 탭에서 저장/해제했을 때도 동기화
    window.addEventListener('storage', loadSaved);
    return () => window.removeEventListener('storage', loadSaved);
  }, []);

  const handleUnsave = (competitionId) => {
    const updated = readSavedContests().filter(
      (c) => String(c.competitionId) !== String(competitionId)
    );
    localStorage.setItem(SAVE_KEY, JSON.stringify(updated));
    setSavedContests([...updated].reverse());
  };

  return (
    <div className="section-card recommend-history-card">
      <h2 className="analysis-title">저장한 공모전</h2>
      {savedContests.length === 0 ? (
        <p style={{ color: '#9494A6', fontSize: '15px' }}>
          아직 저장한 공모전이 없어요. 관심 있는 공모전 상세페이지에서 저장해보세요!
        </p>
      ) : (
        <div className="contest-cards-grid">
          {savedContests.map((contest) => (
            <SavedContestCard
              key={contest.competitionId}
              contest={contest}
              onUnsave={handleUnsave}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPageSavedContestsSection;