import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CVupload.css';
import CommonButton from '../components/CommonButton';
import defaultIcon from '../assets/images/profile-default.png';
import uploadIcon from '../assets/images/upload-icon.png';
import { analyzeCV } from '../api/cvAPI';
import useModal from '../hooks/useModal.jsx';
import LoadingOverlay from '../components/LoadingOverlay';
import '../components/LoadingOverlay.css';

const formatFileSize = (bytes) => {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};

const getFileExtension = (name) => {
  const ext = name.split('.').pop();
  return ext && ext !== name ? ext.toUpperCase() : 'FILE';
};

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
    e.target.value = '';
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

  const handleRemoveFile = () => {
    setFile(null);
    setFileName('');
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
    <div className="cvupload-container">
      <div className="cvupload-content-wrapper">
        <div className="cvupload-card">
          <div className="cvupload-header">
            <div className="cvupload-icon-circle">
              <img src={defaultIcon} alt="Profile Icon" className="cvupload-header-icon-img" />
            </div>
            <div className="cvupload-header-text">
              <h2>CV upload</h2>
              <p>자신의 cv를 업로드 해주세요</p>
            </div>
          </div>

          <hr className="cvupload-divider" />

          <div className={`cvupload-box${file ? ' is-selected' : ''}`}>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {file ? (
              <div className="cvupload-content">
                <span className="cvupload-selected-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L19 8" />
                  </svg>
                </span>
                <p className="cvupload-text">파일이 선택되었어요</p>

                <div className="cvupload-file-card">
                  <span className="cvupload-file-icon">{getFileExtension(fileName)}</span>
                  <div className="cvupload-file-meta">
                    <p className="cvupload-file-name">{fileName}</p>
                    <p className="cvupload-file-size">{formatFileSize(file.size)}</p>
                  </div>
                  <button type="button" className="cvupload-file-remove" onClick={handleRemoveFile} aria-label="선택한 파일 삭제">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>

                <button type="button" className="cvupload-file-find-btn is-secondary" onClick={handleFileButtonClick}>
                  다른 파일 선택
                </button>
              </div>
            ) : (
              <div className="cvupload-content">
                <div className="cvupload-cloud-icon-wrapper">
                  <img src={uploadIcon} alt="" className="cvupload-icon-img" />
                </div>

                <div className="cvupload-info-group">
                  <p className="cvupload-text">여기에 파일을 올려주세요</p>
                  <p className="cvupload-hint">PDF, PNG, JPG · 최대 5MB</p>
                </div>

                <button type="button" className="cvupload-file-find-btn" onClick={handleFileButtonClick}>
                  파일 찾아보기
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="cvupload-next-button-wrapper">
          <CommonButton text="NEXT" onClick={handleNext} disabled={isLoading} />
        </div>
      </div>

      {ModalComponent}

      <LoadingOverlay
        isVisible={isLoading}
        message="CV를 분석하고 있어요"
        subMessage="잠시만 기다려주세요. 최대 1분 정도 걸릴 수 있어요."
      />
    </div>
  );
}

export default CVupload;