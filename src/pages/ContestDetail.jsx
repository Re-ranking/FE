import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useModal from '../hooks/useModal.jsx';
import { getContestDetail, normalizeContestDetail } from '../api/contestAPI';
import './ContestDetail.css';
import defaultIcon from '../assets/images/profile-default.png';

// 캔버스 텍스트를 카드 폭에 맞춰 줄바꿈 (한글 특성상 글자 단위로 처리)
function wrapText(ctx, text, maxWidth) {
  const lines = [];
  let currentLine = '';
  for (const char of text) {
    const testLine = currentLine + char;
    if (ctx.measureText(testLine).width > maxWidth && currentLine !== '') {
      lines.push(currentLine);
      currentLine = char;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function ContestDetail() {
  const { id } = useParams();
  const { openModal, ModalComponent } = useModal();
  const [contest, setContest] = useState(null);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const raw = await getContestDetail(id);
        setContest(normalizeContestDetail(raw));
      } catch (err) {
        console.error('공모전 상세 로드 실패:', err);
      }
    };
    fetchDetail();
  }, [id]);

  if (!contest) return <div className="loading">로딩 중...</div>;

  const getLiveDDay = (periodStr) => {
    if (!periodStr) return "";
    const dateMatches = periodStr.match(/\d{4}-\d{2}-\d{2}/g);
    if (!dateMatches || dateMatches.length === 0) return "";
    const endDateStr = dateMatches[dateMatches.length - 1];

    const endDate = new Date(endDateStr);
    const today = new Date();
    endDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `D-${diffDays}` : diffDays === 0 ? "D-DAY" : "마감";
  };

  const dDayText = getLiveDDay(contest.applicationPeriod);

  const categoryTags = contest.category
    ? contest.category.split(',').map(c => c.trim()).filter(Boolean)
    : [];

  const cleanPeriod = contest.applicationPeriod
    ? contest.applicationPeriod.replace(/\s*D-\d+|\s*D-DAY|\s*마감/g, '').trim()
    : '';

  // 공유용 요약 카드를 캔버스로 그려서 PNG로 다운로드
  const handleGenerateShareCard = async () => {
    setIsGeneratingCard(true);
    try {
      const W = 800;
      const H = 1000;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      // 배경 그라디언트
      const bgGradient = ctx.createLinearGradient(0, 0, W, H);
      bgGradient.addColorStop(0, '#D5D1FD');
      bgGradient.addColorStop(1, '#FFF3F6');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, W, H);

      // 포스터 이미지 시도 (CORS 등으로 실패할 수 있어 실패해도 계속 진행)
      let posterImg = null;
      if (contest.imageUrl) {
        try {
          posterImg = await loadImage(contest.imageUrl);
        } catch (imgErr) {
          console.warn('포스터 이미지 로드 실패, 텍스트 카드로 대체:', imgErr);
        }
      }

      const padding = 40;
      const posterAreaHeight = 480;

      if (posterImg) {
        const areaW = W - padding * 2;
        const areaX = padding;
        const areaY = padding;

        // cover 방식으로 크롭
        const scale = Math.max(areaW / posterImg.width, posterAreaHeight / posterImg.height);
        const drawW = posterImg.width * scale;
        const drawH = posterImg.height * scale;
        const offsetX = areaX + (areaW - drawW) / 2;
        const offsetY = areaY + (posterAreaHeight - drawH) / 2;

        ctx.save();
        const radius = 20;
        ctx.beginPath();
        ctx.moveTo(areaX + radius, areaY);
        ctx.arcTo(areaX + areaW, areaY, areaX + areaW, areaY + posterAreaHeight, radius);
        ctx.arcTo(areaX + areaW, areaY + posterAreaHeight, areaX, areaY + posterAreaHeight, radius);
        ctx.arcTo(areaX, areaY + posterAreaHeight, areaX, areaY, radius);
        ctx.arcTo(areaX, areaY, areaX + areaW, areaY, radius);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(posterImg, offsetX, offsetY, drawW, drawH);
        ctx.restore();
      } else {
        // 포스터 없을 때 - 큰 아이콘 자리
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.beginPath();
        ctx.roundRect(padding, padding, W - padding * 2, posterAreaHeight, 20);
        ctx.fill();
        ctx.fillStyle = '#7176F0';
        ctx.font = '700 22px Pretendard, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CONTEST', W / 2, padding + posterAreaHeight / 2);
      }

      // 하단 정보 카드
      const infoY = padding + posterAreaHeight + 24;
      const infoH = H - infoY - padding;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(padding, infoY, W - padding * 2, infoH, 20);
      ctx.fill();

      let cursorY = infoY + 44;
      const textX = padding + 32;
      const textMaxWidth = W - padding * 2 - 64;

      // D-day 배지
      if (dDayText) {
        ctx.font = '800 16px Pretendard, sans-serif';
        const badgeText = dDayText;
        const badgeWidth = ctx.measureText(badgeText).width + 32;
        ctx.fillStyle = dDayText === '마감' ? '#A0A0B0' : '#7176F0';
        ctx.beginPath();
        ctx.roundRect(textX, cursorY - 24, badgeWidth, 36, 18);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'left';
        ctx.fillText(badgeText, textX + 16, cursorY);
        cursorY += 48;
      }

      // 제목
      ctx.fillStyle = '#1A1A2E';
      ctx.font = '800 28px Pretendard, sans-serif';
      ctx.textAlign = 'left';
      const titleLines = wrapText(ctx, contest.title, textMaxWidth).slice(0, 2);
      titleLines.forEach((line) => {
        ctx.fillText(line, textX, cursorY);
        cursorY += 38;
      });
      cursorY += 14;

      // 정보 행
      ctx.font = '600 16px Pretendard, sans-serif';
      const infoRows = [
        ['주최/주관', contest.organizer],
        ['접수 기간', cleanPeriod],
        ['총 상금', contest.totalPrize],
      ].filter(([, value]) => value);

      infoRows.forEach(([label, value]) => {
        ctx.fillStyle = '#9494A6';
        ctx.fillText(label, textX, cursorY);
        ctx.fillStyle = '#2D2D3F';
        ctx.font = '600 16px Pretendard, sans-serif';
        const valueLines = wrapText(ctx, String(value), textMaxWidth - 110).slice(0, 1);
        ctx.fillText(valueLines[0] || '', textX + 100, cursorY);
        cursorY += 30;
        ctx.font = '600 16px Pretendard, sans-serif';
      });

      // 하단 브랜딩
      ctx.fillStyle = '#B0B0C0';
      ctx.font = '600 13px Pretendard, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(window.location.hostname, W - padding - 32, infoY + infoH - 24);

      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('blob 생성 실패');
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${contest.title}-공모전카드.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setIsGeneratingCard(false);
      }, 'image/png');
    } catch (err) {
      console.error('공유 카드 생성 실패:', err);
      openModal('카드를 만드는 중 문제가 발생했어요. 다시 시도해주세요.');
      setIsGeneratingCard(false);
    }
  };

  return (
    <div className="contest-detail-page">
      <Navbar />

      <main className="contest-detail-content">
        <div className="detail-header-section">
          <div className="detail-poster-wrapper">
            <img src={contest.imageUrl} alt={contest.title} />
          </div>

          <div className="detail-summary-info">
            {dDayText && (
              <span
                className="detail-dday-badge"
                style={{ backgroundColor: dDayText === "마감" ? "#A0A0B0" : "#7176F0" }}
              >
                {dDayText}
              </span>
            )}

            <h1 className="detail-title">{contest.title}</h1>

            <div className="detail-tags-list">
              {categoryTags.map((tag, idx) => (
                <span key={idx} className="detail-tag-badge">#{tag}</span>
              ))}
            </div>

            <div className="info-table">
              <div className="info-row">
                <div className="info-label-box">
                  <img src={defaultIcon} alt="" className="label-icon" />
                  <span className="label-text">응모 대상</span>
                </div>
                <div className="info-value">{contest.target}</div>
              </div>

              <div className="info-row">
                <div className="info-label-box">
                  <img src={defaultIcon} alt="" className="label-icon" />
                  <span className="label-text">주최/주관</span>
                </div>
                <div className="info-value">{contest.organizer}</div>
              </div>

              <div className="info-row">
                <div className="info-label-box">
                  <img src={defaultIcon} alt="" className="label-icon" />
                  <span className="label-text">접수 기간</span>
                </div>
                <div className="info-value">{cleanPeriod}</div>
              </div>

              <div className="info-row">
                <div className="info-label-box">
                  <img src={defaultIcon} alt="" className="label-icon" />
                  <span className="label-text">총 상금</span>
                </div>
                <div className="info-value">
                  {contest.totalPrize} {contest.firstPrize && `(1등: ${contest.firstPrize})`}
                </div>
              </div>
            </div>

            <div className="detail-btn-group">
              <button
                className="visit-btn"
                onClick={() => window.open(contest.homepageUrl, '_blank', 'noreferrer')}
              >
                주최사 홈페이지 바로가기
              </button>
              <button
                onClick={handleGenerateShareCard}
                className="share-card-btn"
                disabled={isGeneratingCard}
              >
                {isGeneratingCard ? '카드 만드는 중...' : '공유용 카드 만들기'}
              </button>
            </div>
          </div>
        </div>

        <div className="detail-body-section">
          <h2>상세 내용</h2>
          <div className="detail-description">
            <p style={{ whiteSpace: 'pre-wrap' }}>{contest.description}</p>
          </div>
        </div>
      </main>

      {ModalComponent}
    </div>
  );
}

export default ContestDetail;