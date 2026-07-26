import axiosInstance from './axiosInstance';

// localStorage에만 저장되는 "계정 종속" 데이터 키 모음
// (백엔드 연동 없이 프론트에서만 관리되는 값들이라, 다른 계정으로 로그인하면
//  명시적으로 정리해주지 않는 한 그대로 남아있게 됨)
const ACCOUNT_SCOPED_KEYS = ['savedContests', 'contestRecommended', 'teamRecommended'];
const LAST_EMAIL_KEY = 'lastLoggedInEmail';

const clearAccountScopedData = () => {
  ACCOUNT_SCOPED_KEYS.forEach((key) => localStorage.removeItem(key));
};

/**
 * 회원가입 API
 * POST /api/auth/signup
 *
 * @param {FormData} formData - name, major, email, password, description, profileImage
 * 응답: { success, message, data: { memberId, email, name, major, profileImage, description } }
 * Cognito가 인증 메일을 자동 발송하며, 이 시점에는 토큰이 없음.
 * 흐름: signup → confirm(회원가입 확정) → login(토큰 발급)
 */
export const register = async (formData) => {
  const { data } = await axiosInstance.post('/api/auth/signup', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

/**
 * 로그인 API
 * POST /api/auth/login
 *
 * @param {{ email: string, password: string }} credentials
 * 응답: { success, message, data: { accessToken } }
 * refreshToken, user 정보는 응답에 없음
 */
export const login = async (credentials) => {
  const { data } = await axiosInstance.post('/api/auth/login', credentials);

  // 이전에 로그인했던 계정과 다른 이메일이면(=다른 사람/새 계정),
  // 이전 계정의 저장 목록/추천 여부 플래그를 초기화한다.
  // 같은 계정으로 재로그인하는 경우엔 그대로 유지된다.
  const lastEmail = localStorage.getItem(LAST_EMAIL_KEY);
  if (lastEmail && lastEmail !== credentials.email) {
    clearAccountScopedData();
  }
  localStorage.setItem(LAST_EMAIL_KEY, credentials.email);

  localStorage.setItem('accessToken', data.data.accessToken);

  return data;
};

/**
 * 로그아웃 API
 * POST /api/auth/logout
 */
export const logout = async () => {
  try {
    await axiosInstance.post('/api/auth/logout');
  } catch (err) {
    console.error('로그아웃 API 오류:', err);
  } finally {
    localStorage.removeItem('accessToken');
    // user 정보, 저장 목록 등은 재로그인 시 이메일이 같으면 그대로 유지된다
    // (다른 계정으로 로그인하면 login()에서 자동으로 정리됨)
  }
};

/**
 * 이메일 인증번호 확인 API (회원가입 확정)
 * POST /api/auth/confirm
 *
 * @param {{ email: string, code: string }} payload
 * 응답: { success, message, data: "string" }
 */
export const confirmEmail = async (email, code) => {
  const { data } = await axiosInstance.post('/api/auth/confirm', { email, code });
  return data;
};

/** 현재 로그인 유저 정보 반환 */
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/** 로그인 여부 확인 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};