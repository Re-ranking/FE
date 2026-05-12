import React, { useState, useRef } from 'react';
import Stepper from '../components/Stepper';
import SurveyCard from '../components/SurveyCard';
import CollaborationCard from '../components/CollaborationCard';
import CommonButton from '../components/CommonButton';
import './SurveyPage.css';

function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [allAnswers, setAllAnswers] = useState({});

  // ✅ 각 카드(단계)의 위치를 저장할 Ref
  const stepRefs = useRef({});

  // ✅ 답변 변경 핸들러
  const handleAnswerChange = (stepNum, questionId, value) => {
    setAllAnswers(prev => ({
      ...prev,
      [stepNum]: {
        ...prev[stepNum],
        [questionId]: value
      }
    }));
  };

  // ✅ [백엔드 요구사항 1] 스텝별 임시 저장 함수
  // await를 제거하여 화면 전환이 즉시 일어나도록 합니다.
  const saveTemporaryStep = (stepNum, answers) => {
    console.log(`[임시 저장 요청] Step ${stepNum}:`, answers);
    
    fetch('http://localhost:8080/survey/temp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        step: stepNum,
        answers: answers
      })
    }).catch(err => {
      console.warn("임시 저장 실패(백그라운드 처리 중):", err);
    });
  };

  // ✅ [백엔드 요구사항 2] 최종 제출 함수
  const submitFinalSurvey = async () => {
    try {
      console.log("최종 제출 데이터:", allAnswers);
      const response = await fetch('http://localhost:8080/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allAnswers) 
      });

      const result = await response.json();
      if (result.success) {
        alert("모든 설문이 완료되었습니다!");
        window.location.href = '/result';
      } else {
        alert(result.message || "최종 제출에 실패했습니다.");
      }
    } catch (error) {
      console.error('최종 전송 에러:', error);
      alert('서버 전송 중 오류가 발생했습니다.');
    }
  };

  const surveyData = {
    1: {
      type: "single",
      title: "Personality",
      questions: [
        { id: 1, text: "팀에서 먼저 의견을 내고 일을 시작하는 편인지" },
        { id: 2, text: "맡은 일을 끝까지 수행하고 마감에 맞추는 성향인지" },
        { id: 3, text: "예상치 못한 변화나 새로운 상황에 얼마나 유연하게 대응하는지" },
        { id: 4, text: "새로운 주제나 어려운 문제를 피하지 않고 시도하는지" },
        { id: 5, text: "꾸준하게 일하는지, 감정 기복 없이 일정하게 참여하는지" },
        { id: 6, text: "압박 상황에서 침착하게 해결하는 편인지, 부담을 크게 느끼는지" },
      ]
    },
    2: {
      type: "multi",
      title: "Collaboration Style",
      questions: [
        { id: 1, question: "역할 선호", limit: 2, isMulti: false, options: ["리더 / 조율자", "디자인 담당", "발표/문서화 담당", "기획자", "아이디어 제안자", "자료조사 담당", "개발 / 구현 담당", "보조 / 지원 역할"] },
        { id: 2, question: "업무수행방식", limit: 1, isMulti: false, options: ["개인 작업 선호", "분업 후 공유 선호", "실시간 협업 선호"] },
        { id: 3, question: "의사결정 스타일", limit: 1, isMulti: false, options: ["빠르게 결정하고 실행", "충분히 논의 후 결정", "근거와 자료 기반 결정", "리더 중심 결정 선호"] },
        { id: 4, question: "팀 기여방식", limit: 2, isMulti: false, options: ["아이디어 제시", "실행력", "분위기 조율", "자료 정리"] },
        { id: 5, question: "갈등 상황 대처", limit: 1, isMulti: false, options: ["직접 대화로 해결", "중재자 필요", "일단 피하고 나중에 이야기", "다수 의견 따름"] },
        { id: 6, question: "협업 선호 강도", limit: 1, isMulti: false, options: ["매우 협업형", "혼합형", "독립형"] }
      ]
    },
    3: {
      type: "multi",
      title: "Life Pattern",
      questions: [
        { id: 1, question: "활동 시간대", limit: 2, isMulti: false, options: ["아침형", "낮형", "저녁형", "밤형"] },
        { id: 2, question: "작업 가능 시간", limit: 2, isMulti: false, options: ["평일 오전", "평일 오후", "평일 저녁", "주말 위주", "시간 유동적"] },
        { id: 3, question: "일정 관리 스타일", limit: 1, isMulti: false, options: ["계획형", "반계획형", "즉흥형"] },
        { id: 4, question: "마감 처리 방식", limit: 1, isMulti: false, options: ["미리 준비형", "중간 점검형", "마감 집중형"] },
        { id: 5, question: "회의 가능 빈도", limit: 1, isMulti: false, options: ["주 1회", "주 2-3회", "필요할 때만 가능", "온라인 회의 선호"] },
        { id: 6, question: "응답 가능 속도", limit: 1, isMulti: false, options: ["1시간 이내", "반나절 이내", "하루 이내", "불규칙"] }
      ]
    },
    4: {
      type: "multi",
      title: "Communication",
      questions: [
        { id: 1, question: "소통 빈도 선호", limit: 1, isMulti: false, options: ["자주 소통 선호", "적당한 소통 선호", "최소 소통 선호"] },
        { id: 2, question: "소통 채널 선호", limit: 5, isMulti: true, options: ["카톡/메신저", "디스코드/슬랙", "전화/음성통화", "대면 회의", "문서 기반 정리"] },
        { id: 3, question: "피드백 스타일", limit: 1, isMulti: false, options: ["직설적인 피드백", "부드럽고 조심스러운 피드백", "구체적 근거 중심 피드백", "문서로 정리된 피드백 선호"] },
        { id: 4, question: "의견 표현 방식", limit: 1, isMulti: false, options: ["즉시 표현형", "숙고 후 표현형", "상태 분위기 보고 표현형"] },
        { id: 5, question: "회의 스타일", limit: 4, isMulti: true, options: ["자유롭게 브레인스토밍", "안건 정리 후 짧고 효율적으로", "리더 중심 진행", "자료 기반 차분한 논의"] },
        { id: 6, question: "갈등 커뮤니케이션 방식", limit: 1, isMulti: false, options: ["바로 이야기하기", "시간을 두고 이야기", "글로 정리해서 이야기", "중재자를 통한 이야기"] }
      ]
    },
    5: {
      type: "multi",
      title: "Objective",
      questions: [
        { id: 1, question: "참여 목적", limit: 7, isMulti: true, options: ["수상", "포트폴리오 강화", "실무 경험", "취업 준비", "팀 프로젝트 경험", "인맥 형성", "진로 탐색"] },
        { id: 2, question: "목표 수준", limit: 1, isMulti: false, options: ["수상 목표", "본선 진출 목표", "결과보다 완주 목표", "경험 자체가 중요"] },
        { id: 3, question: "몰입 가능 수준", limit: 1, isMulti: false, options: ["매우 높음", "중간", "제한적"] },
        { id: 4, question: "선호 공모전 유형", limit: 6, isMulti: true, options: ["기획형", "개발형", "디자인형", "데이터/AI형", "창업/비즈니스형","발표 중심형"] },
        { id: 5, question: "장기/단기 프로젝트 선호", limit: 1, isMulti: false, options: ["단기 집중형", "중기형", "장기형"] },
        { id: 6, question: "기대하는 팀 분위기", limit: 1, isMulti: false, options: ["빡세게 성과내는 분위기", "서로 배려하면서 가는 분위기", "자유롭고 유연한 분위기", "체계적이고 규칙적인 분위기"] }
      ]
    }
  };

  // ✅ 버튼 클릭 핸들러: NEXT 클릭 시 즉시 실행
  const handleNext = (stepNum) => {
    const currentStepNum = parseInt(stepNum);
    const nextStepNum = currentStepNum + 1;
    const totalSteps = Object.keys(surveyData).length;

    // 1. 임시 저장 실행 (백그라운드에서 비동기 처리)
    saveTemporaryStep(currentStepNum, allAnswers[currentStepNum]);

    if (nextStepNum <= totalSteps) {
      // 2. 다음 단계로 즉시 이동
      setCurrentStep(nextStepNum);
      
      // ✅ React가 렌더링을 끝낸 후 스크롤 하도록 약간의 지연(50ms) 부여
      setTimeout(() => {
        stepRefs.current[nextStepNum]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 50);
    } else {
      // 3. 마지막 단계면 최종 제출 실행
      submitFinalSurvey();
    }
  };

  return (
    <div className="survey-page-container">
      <aside className="stepper-sidebar">
        <Stepper currentStep={currentStep} />
      </aside>

      <main className="survey-main-content">
        <div className="survey-content-inner">
          {Object.entries(surveyData).map(([stepNum, data]) => (
            <div 
              key={stepNum} 
              ref={el => stepRefs.current[stepNum] = el}
              className="survey-step-wrapper"
            >
              {data.type === "single" ? (
                <SurveyCard
                  title={data.title}
                  questions={data.questions}
                  answers={allAnswers[stepNum] || {}}
                  onChange={(qId, val) => handleAnswerChange(stepNum, qId, val)}
                />
              ) : (
                <CollaborationCard
                  title={data.title}
                  data={data.questions}
                  answers={allAnswers[stepNum] || {}}
                  onChange={(qId, val) => handleAnswerChange(stepNum, qId, val)}
                />
              )}

              <div className="survey-next-button">
                <CommonButton 
                  text={parseInt(stepNum) === Object.keys(surveyData).length ? "FINISH" : "NEXT"} 
                  onClick={() => handleNext(stepNum)} 
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default SurveyPage;