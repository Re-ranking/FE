import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonInput from '../components/CommonInput';
import CommonButton from '../components/CommonButton';
import ProfileImage from '../components/ProfileImage';
import { register } from '../api/authAPI';  // authAPI에서 가져오기
import './Register.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    major: '',
    email: '',
    password: '',
    bio: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // FormData 조립 (multipart/form-data 전송용)
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (profileImage) {
        data.append('profileImage', profileImage);
      }

      // authAPI의 register 함수 호출
      await register(data);

      // 회원가입 성공 → CV 업로드 페이지로 이동
      navigate('/cv-upload');

    } catch (err) {
      const message = err.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
      setError(message);
    } finally {
      setIsLoading(false);
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
              <label className="input-label">Email:</label>
              <CommonInput type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="input-wrapper">
              <label className="input-label">Password:</label>
              <CommonInput type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>

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
            <CommonButton
              text="Register"
              type="submit"
              disabled={isLoading}
            />

            {error && (
              <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>
                {error}
              </p>
            )}

            <p className="login-text">
              Already have an account?
              <span className="login-link" onClick={() => navigate('/login')}>
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