# Personalized RAG 기반 공모전 Re-ranking 및 팀매칭 시스템 (Frontend)

본 레포지토리는 사용자의 이력서(CV) 및 역량을 분석하여 개인화된 공모전 추천(Re-ranking) 및 최적의 팀원을 매칭해 주는 AI 기반 플랫폼의 **프론트엔드(Frontend)** 소스코드 저장소

## 주요 기능 (Key Features)

- **AI 맞춤형 공모전 Re-ranking**: 사용자가 업로드한 이력서(CV)를 기반으로 알고리즘이 연관성을 심층 분석하여 가장 매칭 확률이 높은 공모전을 상위에 추천합니다.
- **지능형 팀 매칭 (Team Building)**: 사용자의 부족한 기술 스택 및 직무 역량을 보완해 줄 수 있는 찰떡궁합의 팀원과 협업 성향을 분석하여 최적의 팀 빌딩을 제안합니다.
- **실시간 인터랙션 대시보드**: 시각적인 이퀄라이저 애니메이션 및 직관적인 카드 레이아웃 인터페이스를 통해 높은 몰입감과 세련된 사용자 경험(UX)을 제공합니다.

## 기술 스택 (Tech Stack)

- **Framework & Library**: React (v18+)
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: CSS3 (Glassmorphic Card UI, Keyframe Animations, Responsive Media Queries)
- **State Management**: React Hooks (useState, useEffect)

## 프로젝트 구조 (Project Structure)

```text
src/
├── assets/
│   └── images/          # 아이콘 및 이미지 
├── components/
│   
├── pages/
│   
├── index.css            # 글로벌 스타일시트 (화면 꽉 찬 레이아웃 적용)
├── MainPage.css         # 메인 페이지 전용 스타일시트
├── App.jsx              # 라우팅 매핑 및 애플리케이션 루트
└── main.jsx            # 엔트리 포인트
