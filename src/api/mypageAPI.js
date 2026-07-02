import axiosInstance from './axiosInstance';

/**
 * 내 CV 정보 조회
 * GET /api/mypage/cv
 *
 * 응답: { name, major, profileImage, introduction, skills, primaryDomains,
 *         strengths[{name,score}], weaknesses[{name,score}],
 *         interests, projects[{period,title,description}], awards }
 */
export const getMyCv = async () => {
  const { data } = await axiosInstance.get('/api/mypage/cv');
  return data;
};

/**
 * CV 정보 수정
 * PATCH /api/mypage/cv
 *
 * @param {{ skills, interests, projects, awards }} payload
 */
export const updateMyCv = async (payload) => {
  const { data } = await axiosInstance.patch('/api/mypage/cv', payload);
  return data;
};

/**
 * 프로필 수정 (이름, 전공, 한줄소개, 프로필 이미지)
 * PATCH /api/mypage/profile
 * Content-Type: multipart/form-data
 * 모든 항목 선택값 - 수정할 항목만 포함하면 됨
 *
 * @param {{ name?, major?, introduction?, profileImage? }} payload
 */
export const updateMyProfile = async (payload) => {
  const formData = new FormData();
  if (payload.name) formData.append('name', payload.name);
  if (payload.major) formData.append('major', payload.major);
  if (payload.introduction) formData.append('introduction', payload.introduction);
  if (payload.profileImage) formData.append('profileImage', payload.profileImage);

  const { data } = await axiosInstance.patch('/api/mypage/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

/**
 * 공모전 추천 내역 조회
 * GET /api/mypage/recommendations/competitions
 */
export const getRecommendedCompetitions = async () => {
  const { data } = await axiosInstance.get('/api/mypage/recommendations/competitions');
  return data;
};

/**
 * 팀원 추천 내역 조회
 * GET /api/mypage/recommendations/team-members
 */
export const getRecommendedTeamMembers = async () => {
  const { data } = await axiosInstance.get('/api/mypage/recommendations/team-members');
  return data;
};