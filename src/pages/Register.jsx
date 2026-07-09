import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonInput from '../components/CommonInput';
import CommonButton from '../components/CommonButton';
import ProfileImage from '../components/ProfileImage';
import { register, confirmEmail, login } from '../api/authAPI';
import './Register.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    major: '',
    email: '',
    password: '',
    description: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordRules = [
    { label: '8자 이상', test: (pw) => pw.length >= 8 },
    { label: '대문자 포함', test: (pw) => /[A-Z]/.test(pw) },
    { label: '소문자 포함', test: (pw) => /[a-z]/.test(pw) },
    { label: '숫자 포함', test: (pw) => /[0-9]/.test(pw) },
    { label: '특수문자 ! 포함', test: (pw) => /[!]/.test(pw) },
  ];
  const isPasswordValid = passwordRules.every(rule => rule.test(formData.password));

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [codeError, setCodeError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      setIsCodeSent(false);
      setIsEmailVerified(false);
      setCode('');
      setCodeError('');
    }
  };

  // signup 호출 - Cognito가 인증 메일을 자동 발송함
  const handleSendCode = async () => {
    if (!formData.email) {
      setCodeError('이메일을 먼저 입력해주세요.');
      return;
    }
    setIsSending(true);
    setCodeError('');
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (profileImage) data.append('profileImage', profileImage);
      const result = await register(data);

      if (result.data) localStorage.setItem('user', JSON.stringify(result.data));
      setIsCodeSent(true);
    } catch (err) {
      setCodeError(err.response?.data?.message || '인증번호 전송에 실패했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  // confirm 호출 - 인증 코드 확인, 회원가입 확정
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

  // 회원가입 확정 후 로그인까지 자동 처리
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isEmailVerified) {
      setError('이메일 인증을 완료해주세요.');
      return;
    }
    if (!isPasswordValid) {
      setError('비밀번호 조건을 확인해주세요.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await login({ email: formData.email, password: formData.password });
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
                  <p className="code-error-text">
                    {codeError}
                  </p>
                )}
              </div>
            )}

            {isEmailVerified && (
              <p className="verify-success-text">
                이메일 인증이 완료되었습니다.
              </p>
            )}

            <div className="input-wrapper">
              <label className="input-label">Password:</label>
              <CommonInput type="password" name="password" value={formData.password} onChange={handleChange} />
              {formData.password && (
                <div className="password-rules">
                  {passwordRules.map((rule, idx) => (
                    <span
                      key={idx}
                      className={`password-rule ${rule.test(formData.password) ? 'valid' : 'invalid'}`}
                    >
                      {rule.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="input-wrapper">
              <label className="input-label">About me:</label>
              <CommonInput
                name="description"
                value={formData.description}
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
              <p className="register-error-text">
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