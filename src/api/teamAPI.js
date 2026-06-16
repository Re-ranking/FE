import axiosInstance from './axiosInstance';

/**
 * 팀원 추천 조회
 * GET /api/team-recommend/{contestId}
 * 
 * @param {string|number} contestId
 * 백엔드 확인 필요: 실제 엔드포인트 확인 후 수정
 */
export const getTeamRecommendations = async (contestId) => {
  const { data } = await axiosInstance.get(`/api/team-recommend/${contestId}`);
  return data;
};

/**
 * 팀원 추천 결과 피드백
 * POST /api/team-recommend/feedback
 * 
 * @param {{ liked: boolean }} payload
 * 백엔드 확인 필요: 실제 엔드포인트 및 요청값 구조 확인 후 수정
 */
export const submitTeamFeedback = async (liked) => {
  const { data } = await axiosInstance.post('/api/team-recommend/feedback', { liked });
  return data;
};