import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CVupload.css';
import CommonButton from '../components/CommonButton'; 
import defaultIcon from '../assets/images/profile-default.png'; 
import uploadIcon from '../assets/images/upload-icon.png'; 

function CVupload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // ✅ 개발 모드 스위치 (true: 디자인 확인용, false: 실제 백엔드 연동용)
  const isMockMode = true;

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    e.target.value = ''; 
    if (!selectedFile) return;

    // 파일 유효성 검사 (크기/확장자)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하만 가능합니다.');
      resetFile();
      return;
    }

    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExt = selectedFile.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      alert('PDF 또는 Word 파일만 업로드 가능합니다.');
      resetFile();
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const resetFile = () => {
    setFile(null);
    setFileName('');
  };

  /**
   * ✅ [백엔드 연동 가이드]
   * 1. API 주소 확인: 'http://localhost:8080/api/cv/upload' 등으로 변경 필요
   * 2. Key 이름 협의: formData.append('cv', file)에서 'cv'라는 이름이 백엔드 파라미터와 같아야 함
   * 3. 응답 형식 확인: result.success 등 백엔드가 주는 JSON 키값이 일치해야 함
   */
  const handleNext = async () => {
    if (!file) {
      alert("CV를 업로드 해주세요!");
      return;
    }

    // -------------------------------------------------------
    // [모드 1] Mock 모드 (현재 사용 중)
    // -------------------------------------------------------
    if (isMockMode) {
      console.log('✅ Mock 모드 실행: 파일을 서버에 보내지 않고 바로 이동합니다.');
      navigate('/survey');
      return;
    }

    // -------------------------------------------------------
    // [모드 2] 실제 백엔드 연동 모드 (isMockMode를 false로 바꿀 시 실행)
    // -------------------------------------------------------
    try {
      // 1. 파일을 보낼 때는 JSON이 아닌 FormData 객체를 생성해야 함
      const formData = new FormData();
      
      // 2. 'cv'는 백엔드 개발자가 지정한 필드명(Key)으로 맞춰야 함
      formData.append('cv', file); 

      // 3. fetch 요청 보내기
      const response = await fetch('http://localhost:8080/api/cv/upload', { // 👈 백엔드 API 주소 입력
        method: 'POST',
        // ❗ 주의: FormData를 보낼 때는 'Content-Type' 헤더를 직접 설정하지 마세요. 
        // 브라우저가 알아서 경계값(boundary)을 포함한 multipart/form-data로 설정해줍니다.
        body: formData,
      });

      // 4. 서버 응답 확인
      if (!response.ok) {
        throw new Error(`서버 응답 에러 (상태 코드: ${response.status})`);
      }

      const result = await response.json();

      // 5. 백엔드에서 내려준 결과 로직에 따라 분기 처리
      // 예: { "success": true, "message": "업로드 성공" }
      if (result.success) {
        console.log('✅ 서버 업로드 완료:', result);
        navigate('/survey');
      } else {
        alert(result.message || '업로드 실패');
      }

    } catch (error) {
      console.error('❌ API 연동 중 에러 발생:', error);
      alert('서버와 연결할 수 없습니다. 백엔드 서버가 켜져 있는지 확인해 주세요.');
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
              <img src={uploadIcon} alt="Upload Icon" className="upload-icon-img" />
              <p className="upload-text">여기에 파일을 올려주세요</p>
              <input 
                type="file"
                accept=".pdf,.doc,.docx"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="file-find-btn"
                onClick={handleFileButtonClick}
              >
                파일 찾아보기
              </button>
              {fileName && (
                <p className="selected-file-name">{fileName}</p>
              )}
            </div>
          </div>
        </div>

        <div className="next-button-wrapper">
          <CommonButton text="NEXT" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
}

export default CVupload;