import React from 'react';

/**
 * 전체 화면 로딩 오버레이 - AI 분석/매칭처럼 시간이 걸리는 작업에 사용
 *
 * props:
 * - isVisible: boolean - 표시 여부
 * - message: string - 안내 문구 (예: "CV를 분석하고 있어요...")
 * - subMessage: string (선택) - 부가 설명 (예: "잠시만 기다려주세요. 최대 1분 정도 걸릴 수 있어요.")
 */
function LoadingOverlay({ isVisible, message, subMessage }) {
  if (!isVisible) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-overlay-content">
        <div className="loading-visual">
          <div className="loading-pulse-ring"></div>
          <div className="loading-pulse-ring ring-2"></div>
          <svg className="loading-mascot" width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="loadingBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B6ACFA" />
                <stop offset="100%" stopColor="#8C7BF7" />
              </linearGradient>
              <linearGradient id="loadingCheekGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE0F2" />
                <stop offset="100%" stopColor="#F9C9EA" />
              </linearGradient>
            </defs>

            <circle cx="60" cy="62" r="40" fill="url(#loadingBodyGradient)" />

            <circle cx="32" cy="40" r="5" fill="#FFFFFF" opacity="0.4" />
            <circle cx="86" cy="78" r="3.5" fill="#FFFFFF" opacity="0.3" />

            <g className="loading-face">
              <circle cx="46" cy="58" r="4.2" fill="#4A4470" />
              <circle cx="74" cy="58" r="4.2" fill="#4A4470" />
              <circle cx="44.4" cy="56.2" r="1.3" fill="#FFFFFF" />
              <circle cx="72.4" cy="56.2" r="1.3" fill="#FFFFFF" />

              <ellipse cx="38" cy="68" rx="6" ry="4" fill="url(#loadingCheekGradient)" opacity="0.85" />
              <ellipse cx="82" cy="68" rx="6" ry="4" fill="url(#loadingCheekGradient)" opacity="0.85" />

              <path d="M50 72 Q60 80 70 72" stroke="#4A4470" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>

            <g className="loading-sparkle loading-sparkle-1">
              <path d="M22 30 L24.5 36 L31 38.5 L24.5 41 L22 47 L19.5 41 L13 38.5 L19.5 36 Z" fill="#FFE3A3" />
            </g>
            <g className="loading-sparkle loading-sparkle-2">
              <path d="M96 92 L97.5 96 L101.5 97.5 L97.5 99 L96 103 L94.5 99 L90.5 97.5 L94.5 96 Z" fill="#FFE3A3" />
            </g>
            <circle className="loading-sparkle loading-sparkle-3" cx="92" cy="32" r="3.5" fill="#C2EFD9" />
            <g className="loading-sparkle loading-sparkle-4">
              <path d="M14 78 L15.7 82 L19.7 83.7 L15.7 85.4 L14 89.4 L12.3 85.4 L8.3 83.7 L12.3 82 Z" fill="#C2EFD9" />
            </g>
          </svg>
        </div>
        <p className="loading-message">{message}</p>
        {subMessage && <p className="loading-submessage">{subMessage}</p>}
      </div>
    </div>
  );
}

export default LoadingOverlay;