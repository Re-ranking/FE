import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonInput from '../components/CommonInput';
import CommonButton from '../components/CommonButton';
import ProfileImage from '../components/ProfileImage';
import { register, confirmEmail } from '../api/authAPI';
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

  // 이메일 인증 관련 상태
  const [isCodeSent, setIsCodeSent] = useState(false);       // 인증번호 전송 여부
  const [code, setCode] = useState('');                       // 입력한 인증번호
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 인증 완료 여부
  const [codeError, setCodeError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 이메일 변경 시 인증 상태 초기화
    if (name === 'email') {
      setIsCodeSent(false);
      setIsEmailVerified(false);
      setCode('');
      setCodeError('');
    }
  };

  // 인증번호 전송 버튼 클릭
  const handleSendCode = async () => {
    if (!formData.email) {
      setCodeError('이메일을 먼저 입력해주세요.');
      return;
    }
    setIsSending(true);
    setCodeError('');
    try {
      // 회원가입 API 호출 → 서버에서 이메일 발송
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (profileImage) data.append('profileImage', profileImage);
      const result = await register(data);

      // signup 응답에서 accessToken 저장
      localStorage.setItem('accessToken', result.accessToken);
      if (result.user) localStorage.setItem('user', JSON.stringify(result.user));

      setIsCodeSent(true);
    } catch (err) {
      setCodeError(err.response?.data?.message || '인증번호 전송에 실패했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  // 인증번호 확인 버튼 클릭
  const handleVerifyCode = async () => {
    if (!code) {
      setCodeError('인증번호를 입력해주세요.');
      return;
    }
    setIsVerifying(true);
    setCodeError('');
    try {
      await confirmEmail(formData.email, code);
      setIsEmailVerified(true);
      setCodeError('');
    } catch (err) {
      setCodeError(err.response?.data?.message || '인증번호가 올바르지 않습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  // 최종 회원가입 버튼 클릭
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isEmailVerified) {
      setError('이메일 인증을 완료해주세요.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      navigate('/cv-upload');
    } catch (err) {
      setError(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
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

            {/* ✅ 이메일 + 인증 버튼 */}
            <div className="input-wrapper">
              <label className="input-label">Email:</label>
              <div className="email-verify-row">
                <CommonInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isEmailVerified}
                />
                <button
                  type="button"
                  className="verify-send-btn"
                  onClick={handleSendCode}
                  disabled={isSending || isEmailVerified}
                >
                  {isEmailVerified ? '인증완료' : '인증'}
                </button>
              </div>
            </div>

            {/* ✅ 인증번호 입력칸 - 전송 후 등장 */}
            {isCodeSent && !isEmailVerified && (
              <div className="input-wrapper">
                <label className="input-label">인증번호:</label>
                <div className="email-verify-row">
                  <CommonInput
                    type="text"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="인증번호를 입력하세요"
                  />
                  <button
                    type="button"
                    className="verify-send-btn"
                    onClick={handleVerifyCode}
                    disabled={isVerifying}
                  >
                    확인
                  </button>
                </div>
                {codeError && (
                  <p style={{ color: 'red', fontSize: '12px', margin: '4px 0 0 4px' }}>
                    {codeError}
                  </p>
                )}
              </div>
            )}

            {/* 인증 완료 메시지 */}
            {isEmailVerified && (
              <p style={{ color: '#656ED3', fontSize: '12px', margin: '0 0 0 4px', fontWeight: 600 }}>
                ✓ 이메일 인증이 완료되었습니다.
              </p>
            )}

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