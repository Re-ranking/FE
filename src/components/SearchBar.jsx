import React, { useState } from 'react';
import './SearchBar.css';

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
        <div className="filter-dropdown-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <span>{selectedFilter}</span>
          <span className="arrow-icon">▼</span>
        </div>
        
        <div className="search-divider"></div>
        
        {/* 텍스트 입력창: 값이 바뀔 때마다 handleInputChange 실행 */}
        <input 
          type="text" 
          placeholder="Search" 
          className="search-input" 
          value={keyword}
          onChange={handleInputChange} 
        />
        
        {/* 돋보기 아이콘 (실시간이므로 단순 데코레이션 역할이 됩니다) */}
        <button className="search-submit-btn" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        {/* 드롭다운 메뉴 */}
        {isDropdownOpen && (
          <ul className="filter-dropdown-menu">
            <li onClick={() => handleFilterClick('All')}>All</li>
            <li onClick={() => handleFilterClick('분야')}>분야</li>
            <li onClick={() => handleFilterClick('대상')}>대상</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;