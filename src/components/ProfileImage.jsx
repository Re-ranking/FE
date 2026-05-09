import React, { useRef } from 'react';
import './ProfileImage.css';
import defaultIcon from '../assets/images/profile-default.png';

function ProfileImage({ image, setImage }) {
  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="profile-container" onClick={handleClick}>
      
      <div className="profile-wrapper">

        <div className="profile-image">
          {image ? (
            <img src={URL.createObjectURL(image)} alt="profile" />
          ) : (
            <img
              src={defaultIcon}
              alt="default"
              className="default-icon"
            />
          )}
        </div>

        {/* ✅ 바깥에 위치하는 + 버튼 */}
        <div className="add-button">+</div>

      </div>

      {/* ✅ 숨겨진 파일 input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: 'none' }}
      />

    </div>
  );
}

export default ProfileImage;
