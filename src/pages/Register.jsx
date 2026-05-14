import React, { useState } from 'react';
import CommonInput from '../components/CommonInput';
import CommonButton from '../components/CommonButton';
import ProfileImage from '../components/ProfileImage';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    major: '',
    grade: '',
    email: '',
    password: '',
    bio: '' // ✅ 한줄 소개(About me) 필드 추가
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (profileImage) {
        data.append('profileImage', profileImage);
      }

      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        body: data
      });

      const result = await response.json();
      if (!response.ok) throw new Error('서버 오류');
      if (!result.success) {
        alert(result.message);
        return;
      }

      alert('회원가입 성공!');
      window.location.href = '/cv-upload';
    } catch (err) {
      console.error(err);
      alert('회원가입 중 오류 발생');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="profile-wrapper">
          <ProfileImage image={profileImage} setImage={setProfileImage} />
        </div>

        <form onSubmit={handleRegister} className="register-form">
          <div className="input-section">
            <div className="input-wrapper">
              <label className="input-label">Name:</label>
              <CommonInput name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="input-wrapper">
              <label className="input-label">Major:</label>
              <CommonInput name="major" value={formData.major} onChange={handleChange} />
            </div>

            <div className="input-wrapper">
              <label className="input-label">Grade:</label>
              <CommonInput name="grade" value={formData.grade} onChange={handleChange} />
            </div>

            <div className="input-wrapper">
              <label className="input-label">Email:</label>
              <CommonInput type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="input-wrapper">
              <label className="input-label">Password:</label>
              <CommonInput type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>

            {/* ✅ About me: 한줄 소개 칸 추가 */}
            <div className="input-wrapper">
              <label className="input-label">About me:</label>
              <CommonInput 
                name="bio" 
                value={formData.bio} 
                onChange={handleChange}
                placeholder="간단한 한 줄 소개를 적어주세요!"
              />
            </div>
          </div>

          <div className="bottom-section">
            <CommonButton text="Register" type="submit" />
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

            <p className="login-text">
              Already have an account?
              <span className="login-link" onClick={() => (window.location.href = '/login')}>
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