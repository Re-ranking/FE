import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CVupload.css';
import CommonButton from '../components/CommonButton';
import defaultIcon from '../assets/images/profile-default.png';
import uploadIcon from '../assets/images/upload-icon.png';
import { analyzeCV } from '../api/cvAPI';
import useModal from '../hooks/useModal.jsx';

function CVupload() {
  const navigate = useNavigate();
  const { openModal, ModalComponent } = useModal(); 

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      openModal('파일 크기는 5MB 이하만 가능합니다.'); 
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg'
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      openModal('PDF, PNG, JPG 파일만 업로드 가능합니다.');
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleNext = async () => {
    if (!file) {
      openModal('CV를 업로드 해주세요!');
      return;
    }

    setIsLoading(true);
    try {
      await analyzeCV(file);
      navigate('/main');
    } catch (err) {
      const message = err.response?.data?.message || 'CV 분석 중 오류가 발생했습니다.';
      openModal(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cv-container">
      <div className="cv-content-wrapper">
        <div className="cv-card">
          <div className="cv-header">
            <div className="cv-icon-circle">
              <img src={defaultIcon} alt="Profile Icon" className="header-icon-img" />
            </div>
            <div className="cv-header-text">
              <h2>CV upload</h2>
              <p>자신의 cv를 업로드 해주세요</p>
            </div>
          </div>

          <hr className="cv-divider" />

          <div className="upload-box">
            <div className="upload-content">
              <div className="upload-cloud-icon-wrapper">
                <img src={uploadIcon} alt="Upload Icon" className="upload-icon-img" />
              </div>

              <p className="upload-text">여기에 파일을 올려주세요</p>

              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <button type="button" className="file-find-btn" onClick={handleFileButtonClick}>
                파일 찾아보기
              </button>

              {fileName && <p className="selected-file-name">{fileName}</p>}
            </div>
          </div>
        </div>

        <div className="next-button-wrapper">
          <CommonButton text="NEXT" onClick={handleNext} disabled={isLoading} />
        </div>
      </div>

      {ModalComponent}
    </div>
  );
}

export default CVupload;