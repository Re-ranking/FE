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
  const topStrength = strengths.length > 0
    ? strengths.reduce((max, item) => (item.value > max.value ? item : max), strengths[0])
    : null;
  const topWeakness = weaknesses.length > 0
    ? weaknesses.reduce((min, item) => (item.value < min.value ? item : min), weaknesses[0])
    : null;

  return (
    <div className="section-card analysis-card">
      <h2 className="analysis-title">CV 분석</h2>

      {(topStrength || topWeakness) && (
        <div className="cv-summary-row">
          {topStrength && (
            <div className="cv-summary-chip strength">
              <span className="cv-summary-label">가장 강한 역량</span>
              <span className="cv-summary-text">
                {topStrength.name} <strong>{topStrength.value}%</strong>
              </span>
            </div>
          )}
          {topWeakness && (
            <div className="cv-summary-chip weakness">
              <span className="cv-summary-label">보완이 필요한 부분</span>
              <span className="cv-summary-text">
                {topWeakness.name} <strong>{topWeakness.value}%</strong>
              </span>
            </div>
          )}
        </div>
      )}

      <div className="bar-analysis-grid">
        <div>
          <p className="bar-list-heading">강점</p>
          <div className="bar-list">
            {strengths.map((item, idx) => (
              <div key={idx} className="bar-row">
                <div className="bar-row-top">
                  <span className="bar-label">{item.name}</span>
                  <span className="bar-value strength">{item.value}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill strength" style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="bar-list-heading weakness">약점</p>
          <div className="bar-list">
            {weaknesses.map((item, idx) => (
              <div key={idx} className="bar-row">
                <div className="bar-row-top">
                  <span className="bar-label">{item.name}</span>
                  <span className="bar-value weakness">{item.value}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill weakness" style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPageCvAnalysisSection;