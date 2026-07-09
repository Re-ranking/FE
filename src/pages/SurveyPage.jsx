import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import SurveyCard from '../components/SurveyCard';
import CollaborationCard from '../components/CollaborationCard';
import SurveyResult from '../components/SurveyResult';
import CommonButton from '../components/CommonButton';
import useModal from '../hooks/useModal.jsx';
import { saveSurveyStep, submitSurvey, getMySurvey } from '../api/surveyAPI';
import './SurveyPage.css';

function SurveyPage() {
  const navigate = useNavigate();
  const { openModal, ModalComponent } = useModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [allAnswers, setAllAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCheckingSubmission, setIsCheckingSubmission] = useState(true);

  const stepRefs = useRef({});

  // 새로고침 시에도 결과를 보여주기 위해 제출 여부/내용을 서버에서 조회
  useEffect(() => {
    const checkExistingSubmission = async () => {
      try {
        const res = await getMySurvey();
        const d = res?.data;
        if (d) {
          const SINGLE_KEYS = ['아니다', '보통', '그렇다'];
          const toVal = (str) => {
            const idx = SINGLE_KEYS.indexOf(str);
            return idx >= 0 ? idx + 1 : 1;
          };
          const rebuilt = {
            1: {
              1: toVal(d.personality?.startInitiative),
              2: toVal(d.personality?.completionTendency),
              3: toVal(d.personality?.adaptability),
              4: toVal(d.personality?.challengeOrientation),
              5: toVal(d.personality?.consistency),
              6: toVal(d.personality?.pressureHandling),
            },
            2: {
              1: d.collaborationStyle?.rolePreference || [],
              2: d.collaborationStyle?.workStyle ? [d.collaborationStyle.workStyle] : [],
              3: d.collaborationStyle?.decisionStyle ? [d.collaborationStyle.decisionStyle] : [],
              4: d.collaborationStyle?.contributionStyle || [],
              5: d.collaborationStyle?.conflictHandling ? [d.collaborationStyle.conflictHandling] : [],
              6: d.collaborationStyle?.cooperationLevel ? [d.collaborationStyle.cooperationLevel] : [],
            },
            3: {
              1: d.lifePattern?.activityTime || [],
              2: d.lifePattern?.availableTime || [],
              3: d.lifePattern?.scheduleManagementStyle ? [d.lifePattern.scheduleManagementStyle] : [],
              4: d.lifePattern?.deadlineHandlingStyle ? [d.lifePattern.deadlineHandlingStyle] : [],
              5: d.lifePattern?.meetingFrequency ? [d.lifePattern.meetingFrequency] : [],
              6: d.lifePattern?.responseSpeed ? [d.lifePattern.responseSpeed] : [],
            },
            4: {
              1: d.communication?.communicationFrequency ? [d.communication.communicationFrequency] : [],
              2: d.communication?.channelPreference || [],
              3: d.communication?.feedbackStyle ? [d.communication.feedbackStyle] : [],
              4: d.communication?.opinionExpressionStyle ? [d.communication.opinionExpressionStyle] : [],
              5: d.communication?.meetingStyle || [],
              6: d.communication?.conflictCommunicationStyle ? [d.communication.conflictCommunicationStyle] : [],
            },
            5: {
              1: d.objective?.participationPurpose || [],
              2: d.objective?.goalLevel ? [d.objective.goalLevel] : [],
              3: d.objective?.commitmentLevel ? [d.objective.commitmentLevel] : [],
              4: d.objective?.preferredCompetitionType || [],
              5: d.objective?.projectDurationPreference ? [d.objective.projectDurationPreference] : [],
              6: d.objective?.desiredTeamMood ? [d.objective.desiredTeamMood] : [],
            },
          };
          setAllAnswers(rebuilt);
          if (d.status === 'SUBMITTED') {
            setIsSubmitted(true);
          }
        }
      } catch (err) {
        console.log('제출된 성향 정보가 없습니다.', err);
      } finally {
        setIsCheckingSubmission(false);
      }
    };
    checkExistingSubmission();
  }, []);

  const handleAnswerChange = (stepNum, questionId, value) => {
    setAllAnswers(prev => ({
      ...prev,
      [stepNum]: {
        ...prev[stepNum],
        [questionId]: value
      }
    }));
  };

  // SurveyCard 라디오 값(1,2,3) → API 텍스트값 변환
  const SINGLE_LABELS = ["아니다", "보통", "그렇다"];
  const toSingleLabel = (val) => SINGLE_LABELS[(val || 1) - 1];

  // allAnswers를 API 요청 형식으로 변환
  const buildPayload = (answers) => {
    const p = answers[1] || {};
    const c = answers[2] || {};
    const l = answers[3] || {};
    const cm = answers[4] || {};
    const o = answers[5] || {};

    return {
      step: 5,
      personality: {
        startInitiative: toSingleLabel(p[1]),
        completionTendency: toSingleLabel(p[2]),
        adaptability: toSingleLabel(p[3]),
        challengeOrientation: toSingleLabel(p[4]),
        consistency: toSingleLabel(p[5]),
        pressureHandling: toSingleLabel(p[6]),
      },
      collaborationStyle: {
        rolePreference: c[1] || [],
        workStyle: (c[2] || [])[0] || '',
        decisionStyle: (c[3] || [])[0] || '',
        contributionStyle: c[4] || [],
        conflictHandling: (c[5] || [])[0] || '',
        cooperationLevel: (c[6] || [])[0] || '',
      },
      lifePattern: {
        activityTime: l[1] || [],
        availableTime: l[2] || [],
        scheduleManagementStyle: (l[3] || [])[0] || '',
        deadlineHandlingStyle: (l[4] || [])[0] || '',
        meetingFrequency: (l[5] || [])[0] || '',
        responseSpeed: (l[6] || [])[0] || '',
      },
      communication: {
        communicationFrequency: (cm[1] || [])[0] || '',
        channelPreference: cm[2] || [],
        feedbackStyle: (cm[3] || [])[0] || '',
        opinionExpressionStyle: (cm[4] || [])[0] || '',
        meetingStyle: cm[5] || [],
        conflictCommunicationStyle: (cm[6] || [])[0] || '',
      },
      objective: {
        participationPurpose: o[1] || [],
        goalLevel: (o[2] || [])[0] || '',
        commitmentLevel: (o[3] || [])[0] || '',
        preferredCompetitionType: o[4] || [],
        projectDurationPreference: (o[5] || [])[0] || '',
        desiredTeamMood: (o[6] || [])[0] || '',
      },
    };
  };

  // 스텝별 임시 저장
  const saveTemporaryStep = (stepNum, answers) => {
    const payload = buildPayload({ ...allAnswers, [stepNum]: answers });
    saveSurveyStep(payload)
      .then(() => openModal('임시 저장되었습니다.'))
      .catch(err => console.warn('임시 저장 실패:', err));
  };

  // 최종 제출
  const submitFinalSurvey = async () => {
    try {
      const payload = buildPayload(allAnswers);
      await submitSurvey(payload);
      openModal('성향입력이 완료되었습니다.');
      setIsSubmitted(true);
    } catch (error) {
      console.error('최종 전송 에러:', error);
      openModal('서버 전송 중 오류가 발생했습니다.');
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
        { id: 1, question: "역할 선호", limit: 2, isMulti: false, options: ["리더 / 조율자", "디자인 담당", "기획자", "아이디어 제안자", "개발 / 구현 담당", "보조 / 지원 역할"] },
        { id: 2, question: "업무수행방식", limit: 1, isMulti: false, options: ["개인 작업 선호", "분업 후 공유 선호", "실시간 협업 선호"] },
        { id: 3, question: "의사결정 스타일", limit: 1, isMulti: false, options: ["빠르게 결정하고 실행", "충분히 논의 후 결정", "근거와 자료 기반 결정", "리더 중심 결정 선호"] },
        { id: 4, question: "팀 기여방식", limit: 2, isMulti: false, options: ["아이디어 제시", "실행력", "일정관리", "분위기 조율", "자료 정리", "발표/전달력"] },
        { id: 5, question: "갈등 상황 대처", limit: 1, isMulti: false, options: ["직접 대화로 해결", "중재자 필요", "일단 피하고 나중에 이야기", "다수 의견 따름"] },
        { id: 6, question: "협업 선호 강도", limit: 1, isMulti: false, options: ["매우 협업형", "혼합형", "독립형"] }
      ]
    },
    3: {
      type: "multi",
      title: "Life Pattern",
      questions: [
        { id: 1, question: "활동 시간대", limit: 2, isMulti: false, options: ["아침형", "낮형", "저녁형", "새벽형"] },
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
        { id: 4, question: "선호 공모전 유형", limit: 6, isMulti: true, options: ["기획", "개발", "디자인", "데이터/AI", "창업/비즈니스","발표 중심"] },
        { id: 5, question: "장기/단기 프로젝트 선호", limit: 1, isMulti: false, options: ["단기 집중", "중기", "장기"] },
        { id: 6, question: "기대하는 팀 분위기", limit: 1, isMulti: false, options: ["빡세게 성과내는 분위기", "서로 배려하면서 가는 분위기", "자유롭고 유연한 분위기", "체계적이고 규칙적인 분위기"] }
      ]
    }
  };

  const handleNext = (stepNum) => {
    const currentStepNum = parseInt(stepNum);
    const nextStepNum = currentStepNum + 1;
    const totalSteps = Object.keys(surveyData).length;

    if (nextStepNum <= totalSteps) {
      saveTemporaryStep(currentStepNum, allAnswers[currentStepNum]);
      setCurrentStep(nextStepNum);

      setTimeout(() => {
        stepRefs.current[nextStepNum]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 50);
    } else {
      submitFinalSurvey();
    }
  };

  const handleBackToMyPage = () => {
    navigate('/mypage');
  };

  if (isCheckingSubmission) {
    return (
      <div className="survey-page-container">
        <div className="survey-loading-wrapper">불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="survey-page-container">
      {isSubmitted ? (
        <div className="survey-page-layout">
          <main className="survey-main-content survey-result-main">
            <SurveyResult
              surveyData={surveyData}
              allAnswers={allAnswers}
              onBackToMyPage={handleBackToMyPage}
            />
          </main>
        </div>
      ) : (
        <div className="survey-page-layout">
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
      )}

      {ModalComponent}
    </div>
  );
}

export default SurveyPage;