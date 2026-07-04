import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// refreshToken이 없으므로 401 발생 시 재발급 없이 로그아웃 처리
// 단, 인증이 필요 없는 엔드포인트(회원가입/로그인/이메일인증)는 예외
const AUTH_FREE_URLS = [
  '/api/auth/signup',
  '/api/auth/login',
  '/api/auth/confirm',
];

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';
    const isAuthFree = AUTH_FREE_URLS.some(url => requestUrl.includes(url));

    if (error.response?.status === 401 && !isAuthFree) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;