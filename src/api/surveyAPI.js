import axiosInstance from './axiosInstance';

/**
 * 성향 설문 제출
 * POST /api/personality-surveys/submit
 *
 * @param {object} payload - { step, personality, collaborationStyle, lifePattern, communication, objective }
 */
export const submitSurvey = async (payload) => {
  const { data } = await axiosInstance.post('/api/personality-surveys/submit', payload);
  return data;
};

/**
 * 성향 임시 저장
 * POST /api/personality-surveys/draft
 *
 * @param {object} payload - submitSurvey와 동일한 구조
 */
export const saveSurveyStep = async (payload) => {
  const { data } = await axiosInstance.post('/api/personality-surveys/draft', payload);
  return data;
};

/**
 * 제출한 성향 조회
 * GET /api/personality-surveys/me
 */
export const getMySurvey = async () => {
  const { data } = await axiosInstance.get('/api/personality-surveys/me');
  return data;
};