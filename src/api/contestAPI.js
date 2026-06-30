import axiosInstance from './axiosInstance';

/**
 * 공모전 목록 조회
 * GET /api/competitions?filter=&value=
 *
 * @param {{ filter?: string, value?: string }} params - 예: { filter: 'category', value: 'AI' }
 */
export const getContestList = async (params = {}) => {
  const { data } = await axiosInstance.get('/api/competitions', { params });
  return data;
};

/**
 * 공모전 상세 조회
 * GET /api/competitions/{competitionId}
 * @param {number} competitionId
 */
export const getContestDetail = async (competitionId) => {
  const { data } = await axiosInstance.get(`/api/competitions/${competitionId}`);
  return data;
};

/**
 * 공모전 검색
 * GET /api/competitions/search?keyword=
 * @param {string} keyword
 */
export const searchContests = async (keyword) => {
  const { data } = await axiosInstance.get('/api/competitions/search', {
    params: { keyword }
  });
  return data;
};

/**
 * 공모전 필터별 조회 - 분야
 * @param {string} category
 */
export const getContestsByCategory = async (category) => {
  return getContestList({ filter: 'category', value: category });
};

/**
 * 공모전 필터별 조회 - 대상
 * @param {string} target
 */
export const getContestsByTarget = async (target) => {
  return getContestList({ filter: 'target', value: target });
};

/**
 * 목록/검색 응답 → 컴포넌트 형식으로 변환
 * 목록 응답 필드: competitionId, dlContestId, name, category, applicationTarget,
 *                organizer, applicationPeriod, representativeImageUrl
 */
export const normalizeContestListItem = (raw) => {
  return {
    id: raw.competitionId,
    dlContestId: raw.dlContestId,
    title: raw.name,
    category: raw.category,
    target: raw.applicationTarget,
    organizer: raw.organizer,
    applicationPeriod: raw.applicationPeriod,
    imageUrl: raw.representativeImageUrl,
  };
};

/**
 * 상세 조회 응답 → 컴포넌트 형식으로 변환
 * 상세 응답 필드: competitionId, dlContestId, name, sourceUrl, category, domains, skills,
 *                applicationTarget, organizer, applicationPeriod, totalPrize, firstPrize,
 *                homepage, representativeImageUrl, description
 */
export const normalizeContestDetail = (raw) => {
  return {
    id: raw.competitionId,
    dlContestId: raw.dlContestId,
    title: raw.name,
    sourceUrl: raw.sourceUrl,
    category: raw.category,
    domains: raw.domains,
    skills: raw.skills,
    target: raw.applicationTarget,
    organizer: raw.organizer,
    applicationPeriod: raw.applicationPeriod,
    totalPrize: raw.totalPrize,
    firstPrize: raw.firstPrize,
    homepageUrl: raw.homepage,
    imageUrl: raw.representativeImageUrl,
    description: raw.description,
  };
};