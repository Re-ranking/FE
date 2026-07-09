import React from 'react';

/**
 * 성향 등록 결과 화면 - 제출한 답변을 설문 폼과 동일한 형태로 모두 보여줌
 *
 * props:
 * - surveyData: SurveyPage의 surveyData 객체 (질문 목록)
 * - allAnswers: 제출한 전체 답변
 * - onBackToMyPage: 마이페이지로 돌아가기 버튼 클릭 핸들러
 */
function SurveyResult({ surveyData, allAnswers, onBackToMyPage }) {
  const singleLabels = ["아니다", "보통", "그렇다"];

  return (
    <div className="survey-result-container">
      <h1 className="survey-result-heading">성향 등록이 완료되었어요</h1>
      <p className="survey-result-subheading">제출한 답변을 확인할 수 있어요.</p>

      {Object.entries(surveyData).map(([stepNum, data]) => {
        const stepAnswers = allAnswers[stepNum] || {};

        return (
          <div key={stepNum} className="survey-result-section">
            <h2 className="survey-result-title">{data.title}</h2>

            <div className="survey-result-card">
              {data.type === "single" ? (
                <div className="survey-result-question-list">
                  {data.questions.map((q) => (
                    <div key={q.id} className="survey-result-question-item">
                      <span className="survey-result-question-text">
                        {q.id}. {q.text}
                      </span>
                      <span className="survey-result-answer-badge">
                        {singleLabels[(stepAnswers[q.id] || 1) - 1]}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="survey-result-question-list">
                  {data.questions.map((item) => {
                    const selected = stepAnswers[item.id] || [];
                    return (
                      <div key={item.id} className="survey-result-multi-item">
                        <span className="survey-result-question-text">
                          {item.id}. {item.question}
                        </span>
                        <div className="survey-result-tags">
                          {selected.length > 0 ? (
                            selected.map((option, idx) => (
                              <span key={idx} className="survey-result-tag">{option}</span>
                            ))
                          ) : (
                            <span className="survey-result-tag empty">응답 없음</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="survey-result-action">
        <button className="survey-result-back-btn" onClick={onBackToMyPage}>
          마이페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default SurveyResult;