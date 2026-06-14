import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonInput from '../components/CommonInput';
import CommonButton from '../components/CommonButton';
import { login } from '../api/authAPI';  //api 주소 가져오기
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // authAPI의 login 함수 호출 (토큰 저장까지 자동 처리됨)
      await login(loginData);

      // 로그인 성공 → 메인 페이지 이동
      navigate('/main');

    } catch (err) {
      // 서버에서 내려준 에러 메시지 우선 표시, 없으면 기본 메시지
      const message = err.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">LOGIN</h1>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-section">
            <div className="input-wrapper">
              <label className="input-label">Email:</label>
              <CommonInput
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <label className="input-label">Password:</label>
              <CommonInput
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="bottom-section">
            {/* ✅ 로딩 중엔 버튼 비활성화 */}
            <CommonButton
              text={isLoading ? '로그인 중...' : 'Login'}
              type="submit"
              disabled={isLoading}
            />

            {error && (
              <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>
                {error}
              </p>
            )}

            <p className="register-text">
              Don't have an account?
              <span className="register-link" onClick={() => navigate('/register')}>
                Register
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;