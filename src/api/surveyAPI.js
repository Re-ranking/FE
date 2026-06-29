import axiosInstance from './axiosInstance';

/**
 * 설문 스텝별 임시 저장
 * POST /survey/temp
 * 
 * ⚠️ 백엔드 확인 필요: 실제 엔드포인트가 /api/survey/temp 인지 확인 후 수정
 * @param {{ step: number, answers: object }} payload
 */
export const saveSurveyStep = async (step, answers) => {
  const { data } = await axiosInstance.post('/survey/temp', { step, answers });
  return data;
};

/**
 * 설문 최종 제출
 * POST /survey
 * 
 * ⚠️ 백엔드 확인 필요: 실제 엔드포인트가 /api/survey 인지 확인 후 수정
 * @param {object} allAnswers - 전체 스텝의 답변 객체
 */
export const submitSurvey = async (allAnswers) => {
  const { data } = await axiosInstance.post('/survey', allAnswers);
  return data;
};