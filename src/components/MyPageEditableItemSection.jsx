import React, { useState } from 'react';

/**
 * 마이페이지 - domains / projects / experience 공통 섹션
 *
 * props:
 * - icon: 아이콘 이미지 import
 * - title: string (예: "domains", "projects", "experience")
 * - items: string[]
 * - isEditing: boolean
 * - emptyText: string (목록이 비어있을 때 보여줄 안내 문구, 선택)
 * - placeholder: string (추가 입력창 placeholder)
 * - onAdd(value: string)
 * - onRemove(idx: number)
 */
function MyPageEditableItemSection({
  icon,
  title,
  items,
  isEditing,
  emptyText,
  placeholder,
  onAdd,
  onRemove,
}) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <h3 className="info-block-title">
        <img src={icon} alt="" className="info-block-icon" />
        {title}
      </h3>

      {isEditing ? (
        <div className="editable-item-list">
          {items.map((item, idx) => (
            <div key={idx} className="editable-item">
              <span className="editable-item-text">{item}</span>
              <button type="button" className="item-remove-btn" onClick={() => onRemove(idx)}>×</button>
            </div>
          ))}
          <div className="item-add-row">
            <input
              className="item-add-input"
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="button" className="item-add-btn" onClick={handleAdd}>
              추가
            </button>
          </div>
        </div>
      ) : (
        <div className="info-list">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <p key={idx} className="info-list-item">{item}</p>
            ))
          ) : (
            <p className="info-list-item">{emptyText || '아직 등록된 정보가 없어요.'}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MyPageEditableItemSection;