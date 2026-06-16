import axiosInstance from './axiosInstance';

/**
 * 회원가입 API
 * POST /api/auth/signup
 * 
 * @param {FormData} formData  - name, major, email, password, bio, profileImage
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
 */
export const login = async (credentials) => {
  const { data } = await axiosInstance.post('/api/auth/login', credentials);

  // ✅ accessToken, refreshToken 둘 다 저장
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

  return data;
};

/**
 * 로그아웃 API
 * POST /api/auth/logout
 */
export const logout = async () => {
  try {
    // 서버에 로그아웃 요청 (서버 세션/토큰 파기)
    await axiosInstance.post('/api/auth/logout');
  } catch (err) {
    // 서버 요청 실패해도 로컬은 항상 삭제
    console.error('로그아웃 API 오류:', err);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};

/**
 * 이메일 인증번호 확인 API
 * POST /api/auth/confirm
 * 
 * @param {{ email: string, code: string }} payload
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