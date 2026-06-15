import axiosInstance from './axiosInstance';

/**
 * 공모전 목록 조회 (마감임박순 디폴트)
 * GET /api/competitions
 */
export const getContestList = async () => {
  const { data } = await axiosInstance.get('/api/competitions');
  return data;
};

/**
 * 공모전 상세 조회
 * GET /api/competitions/{competitionId}
 * @param {string|number} competitionId
 */
export const getContestDetail = async (competitionId) => {
  const { data } = await axiosInstance.get(`/api/competitions/${competitionId}`);
  return data;
};

/**
 * 공모전 검색
 * GET /api/competitions/search
 * @param {string} keyword - 검색어
 */
export const searchContests = async (keyword) => {
  const { data } = await axiosInstance.get('/api/competitions/search', {
    params: { keyword }
  });
  return data;
};

/**
 * 공모전 필터별 조회 - 분야
 * GET /api/competitions?filter=category&value={분야}
 * @param {string} category - 분야값 (예: "웹/모바일/IT")
 */
export const getContestsByCategory = async (category) => {
  const { data } = await axiosInstance.get('/api/competitions', {
    params: { filter: 'category', value: category }
  });
  return data;
};

/**
 * 공모전 필터별 조회 - 대상
 * GET /api/competitions?filter=target&value={응모대상}
 * @param {string} target - 대상값 (예: "대학생")
 */
export const getContestsByTarget = async (target) => {
  const { data } = await axiosInstance.get('/api/competitions', {
    params: { filter: 'target', value: target }
  });
  return data;
};

/**
 * 백엔드 응답 → 컴포넌트 형식으로 변환하는 정제 함수
 */
export const normalizeContest = (raw) => {
  const dateRegex = /\d{4}-\d{2}-\d{2}/g;
  const dates = raw['접수기간']?.match(dateRegex) || [];

  return {
    id: raw.id ?? raw.competitionId ?? null,
    title: raw.name ?? raw.title ?? '',
    categories: raw['분야'] ? raw['분야'].split(', ') : raw.categories ?? [],
    target: raw['응모대상'] ?? raw.target ?? '',
    organizer: raw['주최/주관'] ?? raw.organizer ?? raw.host ?? '',
    startDate: raw.startDate ?? dates[0] ?? null,
    endDate: raw.endDate ?? dates[1] ?? null,
    totalPrize: raw['총 상금'] ?? raw.totalPrize ?? '',
    firstPrize: raw['1등 상금'] ?? raw.firstPrize ?? '',
    homepageUrl: raw['홈페이지'] ?? raw.homepageUrl ?? raw.link ?? '',
    imageUrl: raw.image_url ?? raw.imageUrl ?? '',
    description: raw.description ?? '',
  };
};