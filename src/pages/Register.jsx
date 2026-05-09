import React, { useState } from 'react';
import CommonInput from '../components/CommonInput';
import CommonButton from '../components/CommonButton';
import ProfileImage from '../components/ProfileImage';
import './Register.css';

function Register() {

  // ✅ 회원가입 데이터 (API body와 동일)
  const [formData, setFormData] = useState({
    name: '',
    major: '',
    grade: '',
    email: '',      // ✅ 수정됨
    password: ''
  });

  const [profileImage, setProfileImage] = useState(null);

  // ✅ input 값 변경
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ 회원가입 요청
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // ✅ 텍스트 데이터 추가
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // ✅ 이미지 추가
      if (profileImage) {
        data.append('profileImage', profileImage);
      }

      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        body: data
      });

      const result = await response.json();

      // ✅ 서버 에러
      if (!response.ok) {
        throw new Error('서버 오류');
      }

      // ✅ 회원가입 실패
      if (!result.success) {
        alert(result.message);
        return;
      }

      // ✅ 회원가입 성공
      alert('회원가입 성공!');

      // ✅ 다음 단계: CV 업로드 페이지로 이동
      window.location.href = '/cv-upload';

      // 👉 React Router 쓸 경우:
      // navigate('/cv-upload');

    } catch (err) {
      console.error(err);
      alert('회원가입 중 오류 발생');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        {/* ✅ 프로필 이미지 */}
        <div className="profile-wrapper">
          <ProfileImage
            image={profileImage}
            setImage={setProfileImage}
          />
        </div>

        <form onSubmit={handleRegister} className="register-form">

          <div className="input-section">

            <div className="input-wrapper">
              <label className="input-label">Name:</label>
              <CommonInput
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <label className="input-label">Major:</label>
              <CommonInput
                name="major"
                value={formData.major}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <label className="input-label">Grade:</label>
              <CommonInput
                name="grade"
                value={formData.grade}
                onChange={handleChange}
              />
            </div>

            {/* ✅ 이메일 (수정 완료) */}
            <div className="input-wrapper">
              <label className="input-label">Email:</label>
              <CommonInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <label className="input-label">Password:</label>
              <CommonInput
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="bottom-section">

            <CommonButton text="Register" type="submit" />

            {/* ✅ 방법 2: 디자인 확인용 임시 버튼 추가 */}
            <button 
              type="button" 
              onClick={() => (window.location.href = '/CVupload')}
              style={{ 
                marginTop: '10px', 
                fontSize: '12px', 
                color: '#999', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              (개발용) CV 업로드 페이지 미리보기
            </button>

            {/* ✅ 로그인 이동은 유지 (선택사항) */}
            <p className="login-text">
              Already have an account?
              <span
                className="login-link"
                onClick={() => (window.location.href = '/login')}
              >
                Login
              </span>
            </p>

          </div>

        </form>

      </div>
    </div>
  );
}

export default Register;
