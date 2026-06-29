import axiosInstance from './axiosInstance';

/**
 * 성향 등록 임시 저장
 * POST /api/personality-surveys/draft
 * 
 * @param {{ step: number, answers: object }} payload
 */
export const saveSurveyStep = async (step, answers) => {
  const { data } = await axiosInstance.post('/api/personality-surveys/draft', { step, answers });
  return data;
};

/**
 * 성향 등록 최종 제출
 * POST /api/personality-surveys/submit
 * 
 * @param {object} allAnswers - 전체 스텝의 답변 객체
 */
export const submitSurvey = async (allAnswers) => {
  const { data } = await axiosInstance.post('/api/personality-surveys/submit', allAnswers);
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