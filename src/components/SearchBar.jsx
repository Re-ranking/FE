import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
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
        
        {/* 텍스트 입력창 */}
        <input type="text" placeholder="Search" className="search-input" />
        
        {/* 돋보기 아이콘 */}
        <button className="search-submit-btn">
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