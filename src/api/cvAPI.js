import axiosInstance from './axiosInstance';

/**
 * CV 업로드 (생성)
 * POST /api/cv
 *
 * @param {File} file - PDF 또는 Word 파일
 */
export const uploadCV = async (file) => {
  const formData = new FormData();
  formData.append('cv', file);

  const { data } = await axiosInstance.post('/api/cv', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data; // 응답: CV ID, 저장 결과
};