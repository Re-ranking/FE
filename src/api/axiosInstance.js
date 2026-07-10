import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://cv-reranking.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const publicAuthUrls = [
  '/api/auth/signup',
  '/api/auth/login',
  '/api/auth/confirm',
];

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    const isPublicAuthRequest = publicAuthUrls.some((url) =>
      config.url?.startsWith(url)
    );

    // 회원가입/로그인/이메일인증 요청에는 Authorization 절대 붙이지 않음
    if (token && !isPublicAuthRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // FormData는 Content-Type을 브라우저가 자동으로 boundary 포함해서 넣어야 함
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isPublicAuthRequest = publicAuthUrls.some((url) =>
      error.config?.url?.startsWith(url)
    );

    if (error.response?.status === 401 && !isPublicAuthRequest) {
      localStorage.removeItem('accessToken');
      // user 정보(이름/전공/한줄소개/프로필이미지)는 토큰 만료 후에도 유지
      // -> 재로그인 시 getMyCv() 응답이 비어있어도 기존 프로필 정보가 화면에 남아있도록 함
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;