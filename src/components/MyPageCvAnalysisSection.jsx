import React from 'react';

/**
 * 마이페이지 - CV 분석 (강점/약점 바 차트)
 * strengths, weaknesses는 AI 파트 별도 API 결과. 엔드포인트 미확정 - 더미 데이터로 표시 중.
 *
 * props:
 * - strengths: { name: string, value: number }[]
 * - weaknesses: { name: string, value: number }[]
 */
function MyPageCvAnalysisSection({ strengths, weaknesses }) {
  return (
    <div className="section-card analysis-card">
      <h2 className="analysis-title">CV 분석</h2>
      <div className="bar-analysis-grid">
        <div className="bar-list">
          {strengths.map((item, idx) => (
            <div key={idx} className="bar-row">
              <span className="bar-label">{item.name}</span>
              <div className="bar-track">
                <div className="bar-fill strength" style={{ width: `${item.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bar-list">
          {weaknesses.map((item, idx) => (
            <div key={idx} className="bar-row">
              <span className="bar-label">{item.name}</span>
              <div className="bar-track">
                <div className="bar-fill weakness" style={{ width: `${item.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyPageCvAnalysisSection;