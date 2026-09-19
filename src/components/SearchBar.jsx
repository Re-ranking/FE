import React, { useState } from 'react';
import './SearchBar.css';

// 필터별 입력창 안내 문구 (화면 표시용, 검색 동작과 무관)
const PLACEHOLDERS = {
  All: '공모전 이름으로 검색',
  '분야': '분야로 검색',
  '대상': '대상으로 검색',
};

function SearchBar({ onSearch }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [keyword, setKeyword] = useState('');

  // 1. 드롭다운 필터 변경 시 부모에게 즉시 알림
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
    if (onSearch) {
      onSearch(filter, keyword); // 변경된 필터와 현재 검색어로 실시간 검색
    }
  };

  // 2. 검색어 타이핑 시 부모에게 즉시 알림 (실시간 검색의 핵심)
  const handleInputChange = (e) => {
    const nextKeyword = e.target.value;
    setKeyword(nextKeyword);
    if (onSearch) {
      onSearch(selectedFilter, nextKeyword); // 현재 필터와 새 검색어로 실시간 검색
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        {/* 드롭다운 버튼 영역 */}
        <button
          type="button"
          className="filter-dropdown-trigger"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedFilter === 'All' ? '전체' : selectedFilter}</span>
          <span className="arrow-icon" aria-hidden="true">▼</span>
        </button>
        
        <div className="search-divider"></div>
        
        {/* 텍스트 입력창: 값이 바뀔 때마다 handleInputChange 실행 */}
        <input 
          type="text" 
          placeholder={PLACEHOLDERS[selectedFilter]} 
          aria-label="공모전 검색"
          className="search-input" 
          value={keyword}
          onChange={handleInputChange} 
        />
        
        {/* 돋보기 아이콘 (실시간이므로 단순 데코레이션 역할이 됩니다) */}
        <button className="search-submit-btn" type="button" aria-label="검색">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        {/* 드롭다운 메뉴 */}
        {isDropdownOpen && (
          <ul className="filter-dropdown-menu">
            <li>
              <button type="button" className={`filter-option${selectedFilter === 'All' ? ' is-selected' : ''}`} onClick={() => handleFilterClick('All')}>전체</button>
            </li>
            <li>
              <button type="button" className={`filter-option${selectedFilter === '분야' ? ' is-selected' : ''}`} onClick={() => handleFilterClick('분야')}>분야</button>
            </li>
            <li>
              <button type="button" className={`filter-option${selectedFilter === '대상' ? ' is-selected' : ''}`} onClick={() => handleFilterClick('대상')}>대상</button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;