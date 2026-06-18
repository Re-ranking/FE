import axiosInstance from './axiosInstance';

/**
 * CV 정보 가져오기
 * GET /api/mypage/cv
 * 
 * @returns {{ user_id, name, skills, domains, projects, experience }}
 */
export const getMyCv = async () => {
  const { data } = await axiosInstance.get('/api/mypage/cv');
  return data;
};

/**
 * CV 정보 수정
 * PATCH /api/mypage/cv
 * 
 * @param {{ skills, domains, projects, experience }} payload
 */
export const updateMyCv = async (payload) => {
  const { data } = await axiosInstance.patch('/api/mypage/cv', payload);
  return data;
};

/**
 * 마이페이지 프로필 정보 수정 (한줄소개 등)
 * PATCH /api/mypage/profile
 * 
 * @param {{ bio: string }} payload
 */
export const updateMyProfile = async (payload) => {
  const { data } = await axiosInstance.patch('/api/mypage/profile', payload);
  return data;
};

/**
 * 공모전 추천 내역 조회
 * GET /api/mypage/recommendations/competitions
 * 
 * ⚠️ CV 분석(강점/약점)은 이 API에 포함되지 않음 - AI 파트 별도 엔드포인트 확인 필요
 * @returns {Array<{ title, image, score, description }>}
 */
export const getRecommendedCompetitions = async () => {
  const { data } = await axiosInstance.get('/api/mypage/recommendations/competitions');
  return data;
};