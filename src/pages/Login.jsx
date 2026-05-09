import React, { useState } from 'react';
import CommonInput from '../components/CommonInput';
import CommonButton from '../components/CommonButton';
import './Login.css';

function Login() {

  // ✅ 로그인 입력값 상태
  // 👉 백엔드 API 요청 body와 동일한 구조로 맞추는 것이 중요
  // 👉 나중에 그대로 JSON.stringify 해서 보냄
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // ✅ 에러 메시지 상태
  // 👉 로그인 실패 / 서버 오류 등을 사용자에게 보여주기 위함
  const [error, setError] = useState('');

  // ✅ input 값 변경 핸들러
  // 👉 모든 input을 하나의 함수로 관리 (name 기준)
  // 👉 name="email" → loginData.email 업데이트됨
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value  // ✅ key를 동적으로 업데이트
    }));
  };

  // ✅ 로그인 요청 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ form 기본 새로고침 방지

    setError(''); // ✅ 이전 에러 초기화

    try {
      // ✅ 백엔드 API 호출
      // 👉 실제 배포 시 URL 변경 필요 (환경변수 사용 권장)
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // ✅ loginData 그대로 JSON으로 변환해서 전송
        body: JSON.stringify(loginData)
      });

      // ✅ 응답 JSON 파싱
      const result = await response.json();

      // ✅ HTTP 에러 (500, 404 등)
      // 👉 서버 자체 문제
      if (!response.ok) {
        throw new Error('서버 오류 발생');
      }

      // ✅ 로그인 실패 (백엔드 로직 결과)
      // 👉 success: false 인 경우
      if (!result.success) {
        setError(result.message); // ✅ 서버에서 준 메시지 표시
        return;
      }

      // ✅ 로그인 성공
      const user = result.data;

      // ⚠️ 현재는 토큰이 없으므로 user 정보만 저장
      // 👉 나중에 JWT 오면 token 저장으로 변경
      localStorage.setItem('user', JSON.stringify(user));

      // ✅ 디버깅용 로그
      console.log('로그인 성공:', user);

      // ✅ 로그인 성공 후 페이지 이동
      // 👉 React Router 사용 시 navigate('/home') 권장
      window.location.href = '/home';

    } catch (err) {
      // ✅ 네트워크 에러 / 예외 처리
      console.error('로그인 에러:', err);

      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  // ✅ 회원가입 페이지 이동
  const handleRegisterClick = () => {
    // 👉 나중에 React Router로 교체 가능
    window.location.href = '/register';
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">LOGIN</h1>
        
        {/* ✅ form submit 시 handleLogin 실행 */}
        <form onSubmit={handleLogin} className="login-form">
          
          <div className="input-section">
            
            {/* ✅ 이메일 입력 */}
            <div className="input-wrapper">
              <label className="input-label">Email:</label>
              <CommonInput 
                type="email"          // ✅ 이메일 형식 검증 가능
                name="email"          // ✅ state key와 반드시 동일해야 함
                value={loginData.email}
                onChange={handleChange}
              />
            </div>

            {/* ✅ 비밀번호 입력 */}
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
            
            {/* ✅ 로그인 버튼 */}
            <CommonButton 
              text="Login" 
              type="submit" 
            />

            {/* ✅ 에러 메시지 UI */}
            {/* 👉 로그인 실패 / 서버 오류 시 표시 */}
            {error && (
              <p style={{ color: 'red', fontSize: '14px' }}>
                {error}
              </p>
            )}

            {/* ✅ 회원가입 이동 */}
            <p className="register-text">
              Don't have an account? 
              <span 
                className="register-link" 
                onClick={handleRegisterClick}
              >
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
