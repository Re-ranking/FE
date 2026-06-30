import axiosInstance from './axiosInstance';

/**
 * CV 분석 및 공모전 추천
 * POST /api/cv/analyze
 *
 * @param {File} file - PDF, PNG, JPG 중 하나
 * 응답: { userId, name, cvAnalysis: { summary, skills, primaryDomains, strengths, weaknesses } }
 */
export const analyzeCV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await axiosInstance.post('/api/cv/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};

/**
 * 최신 CV 분석 결과 조회
 * GET /api/cv/latest
 *
 * 공모전 추천 페이지 진입 시 직전에 analyze한 분석 결과를 다시 불러올 때 사용
 */
export const getLatestCV = async () => {
  const { data } = await axiosInstance.get('/api/cv/latest');
  return data;
};