import axiosInstance from './axiosInstance';

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
    // user 정보(이름/전공/한줄소개/프로필이미지)는 재로그인 후에도 유지
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