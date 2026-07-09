import React from 'react';
import { createPortal } from 'react-dom';

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

  return createPortal(
    <div className="loading-overlay">
      <div className="loading-overlay-content">
        <div className="loading-spinner">
          <div className="loading-spinner-ring" />
        </div>

        <div className="loading-text-group">
          <p className="loading-eyebrow">Processing</p>
          <p className="loading-message">{message}</p>
          {subMessage && <p className="loading-submessage">{subMessage}</p>}
        </div>

        <div className="loading-progress-track">
          <div className="loading-progress-bar" />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default LoadingOverlay;