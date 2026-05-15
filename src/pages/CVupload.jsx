import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CVupload.css';
import CommonButton from '../components/CommonButton'; 
import defaultIcon from '../assets/images/profile-default.png'; 
import uploadIcon from '../assets/images/upload-icon.png'; 

function CVupload() {

  const navigate = useNavigate();

  // ✅ 실제 서버로 보낼 파일 객체
  const [file, setFile] = useState(null);

  // ✅ 화면에 보여줄 파일 이름 (UI용)
  const [fileName, setFileName] = useState('');

  // ✅ 숨겨진 input 제어용 ref
  const fileInputRef = useRef(null);

  // ✅ "파일 찾아보기" 버튼 클릭 시 input 클릭 트리거
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  // ✅ 파일 선택 시 실행
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // ✅ 파일 크기 제한 (예: 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하만 가능합니다.');
      return;
    }

    // ✅ 파일 확장자 제한 (CV용)
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert('PDF 또는 Word 파일만 업로드 가능합니다.');
      return;
    }

    // ✅ 상태 저장
    setFile(selectedFile);           // ✅ 서버 전송용
    setFileName(selectedFile.name);  // ✅ UI 표시용

    console.log('선택된 파일:', selectedFile);
  };

  //NEXT 버튼 클릭 → 서버로 파일 업로드
  const handleNext = async () => {

  if (!file) {
    alert("CV를 업로드 해주세요!");
    return;
  }

  // 개발용 (백엔드 연결 전) 나중에 false로 수정하면 됨
  const isMockMode = true;

  if (isMockMode) {
    console.log("Mock 모드: 업로드 없이 이동");
    navigate('/main');
    return;
  }

  // 실제 백엔드 연동
  try {
    const formData = new FormData();
    formData.append('cv', file);

    const response = await fetch('http://localhost:8080/cv-upload', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error('서버 오류 발생');
    }

    if (!result.success) {
      alert(result.message);
      return;
    }

    console.log('CV 업로드 성공:', result);

    navigate('/main');

  } catch (error) {
    console.error('업로드 에러:', error);
    alert('CV 업로드 중 오류가 발생했습니다.');
  }
};

  return (
    <div className="cv-container">
      <div className="cv-content-wrapper">

        <div className="cv-card">

          {/* ✅ 상단 영역 */}
          <div className="cv-header">
            <div className="cv-icon-circle">
              <img
                src={defaultIcon}
                alt="Profile Icon"
                className="header-icon-img"
              />
            </div>

            <div className="cv-header-text">
              <h2>CV upload</h2>
              <p>자신의 cv를 업로드 해주세요</p>
            </div>
          </div>

          <hr className="cv-divider" />

          {/* ✅ 업로드 박스 */}
          <div className="upload-box">
            <div className="upload-content">

              {/* ✅ 업로드 아이콘 */}
              <div className="upload-cloud-icon-wrapper">
                <img
                  src={uploadIcon}
                  alt="Upload Icon"
                  className="upload-icon-img"
                />
              </div>

              <p className="upload-text">
                여기에 파일을 올려주세요
              </p>

              {/* ✅ 숨겨진 파일 input */}
              <input 
                type="file"
                accept=".pdf,.doc,.docx"  // ✅ 파일 제한
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {/* ✅ 파일 선택 버튼 */}
              <button
                type="button"
                className="file-find-btn"
                onClick={handleFileButtonClick}
              >
                파일 찾아보기
              </button>

              {/* ✅ 선택된 파일 이름 표시 */}
              {fileName && (
                <p className="selected-file-name">
                  {fileName}
                </p>
              )}

            </div>
          </div>
        </div>

        {/* ✅ NEXT 버튼 */}
        <div className="next-button-wrapper">
          <CommonButton
            text="NEXT"
            onClick={handleNext}
          />
        </div>

      </div>
    </div>
  );
}

export default CVupload;
