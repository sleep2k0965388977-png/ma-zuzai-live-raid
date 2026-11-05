const fs = require('fs');
const path = require('path');

const perfect916CSS = `
/* ==========================================================================
   CHUẨN CHÍNH XÁC 100% TỶ LỆ 9:16 (TIKTOK LIVE STUDIO & OBS NATIVE)
   - Khóa cứng chuẩn tỷ lệ dọc 9:16 (1080 x 1920)
   - Bố cục HUD hoàn mỹ:
     + Trên cùng: Tiêu đề Thượng Cổ Ma Tôn, Timer đếm ngược, Level 99, Chữ MA ZUZAI, Thanh Máu Neon
     + Góc trên bên TRÁI: Khung Sát Thương Đánh Boss
     + Góc trên bên PHẢI: Khung TOP Tu Sĩ Lực Chiến
     + Góc dưới bên PHẢI: Khung Hướng Dẫn Cách Đánh Boss
     + Khoảng giữa: Tượng Boss Ma Zuzai hiển thị toàn thân siêu sắc nét
   ========================================================================== */

html, body, #root {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
  background: #080617 !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
}

/* ÁP DỤNG TRONG CHẾ ĐỘ LIVE / TIKTOK LIVE STUDIO (9:16) */
html.live-mode, body.live-mode,
.live-mode #root, .live-mode .app, .live-mode main {
  margin: 0 !important;
  padding: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  overflow: hidden !important;
  background: #080617 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  position: relative !important;
}

.live-mode .main-shell {
  max-width: 100% !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.live-mode .arena-column {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  position: relative !important;
}

/* ẨN TOÀN BỘ CÁC PHẦN THỪA NGOÀI LỀ KHI LIVE */
.live-mode .right-sidebar,
.live-mode .left-sidebar,
.live-mode header,
.live-mode nav,
.live-mode .arena-top,
.live-mode .arena-toolbar,
.live-mode .flow-note,
.live-mode .team-damage,
.live-mode .app-header {
  display: none !important;
}

/* KHUNG ĐẤU TRƯỜNG CHUẨN XÁC 9:16 */
.live-mode .arena-frame {
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
  aspect-ratio: 9 / 16 !important;
  margin: 0 auto !important;
  padding: 0 !important;
  overflow: hidden !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background: #080617 !important;
  z-index: 10 !important;
}

.live-mode .canvas-host {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}

.live-mode .canvas-host canvas {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
}

/* 1. Header Boss Ma Zuzai & Thanh Máu (Căn chuẩn mép trên) */
.live-mode .boss-hud {
  position: absolute !important;
  top: 14px !important;
  left: 12px !important;
  right: 12px !important;
  width: auto !important;
  z-index: 30 !important;
  pointer-events: none !important;
}

.live-mode .boss-caption {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  font-size: 8.5px !important;
  letter-spacing: 0.8px !important;
  color: #d0bddd !important;
  margin-bottom: 2px !important;
}

.live-mode .boss-caption .boss-type-badge {
  font-size: 8.5px !important;
  font-weight: 800 !important;
  color: #e9d5ff !important;
}

.live-mode .boss-caption .raid-timer-hud {
  font-size: 8.5px !important;
}

.live-mode .boss-caption .level-tag {
  font-size: 8px !important;
  padding: 1px 6px !important;
}

.live-mode .boss-hud h2 {
  font-family: "Cinzel", "Georgia", serif !important;
  letter-spacing: 3px !important;
  font-size: 24px !important;
  margin: 3px 0 6px !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95), 0 0 16px rgba(217, 70, 239, 0.7) !important;
  font-weight: 800 !important;
  text-align: left !important;
  color: #fff !important;
  display: block !important;
  visibility: visible !important;
}

.live-mode .boss-health {
  height: 8px !important;
  border-radius: 2px !important;
  position: relative !important;
  margin-bottom: 4px !important;
}

.live-mode .health-meta {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  font-size: 8px !important;
}

/* 2. Khung SÁT THƯƠNG ĐÁNH BOSS (Góc trên bên TRÁI) */
.live-mode .combat-dmg-frame {
  position: absolute !important;
  top: 96px !important;
  left: 10px !important;
  right: auto !important;
  width: 155px !important;
  max-width: 44% !important;
  z-index: 28 !important;
  pointer-events: none !important;
  padding: 6px 9px !important;
  background: linear-gradient(135deg, rgba(32, 10, 18, 0.92) 0%, rgba(18, 6, 12, 0.95) 100%) !important;
  border: 1.2px solid rgba(239, 68, 68, 0.85) !important;
  border-radius: 6px !important;
  box-shadow: 0 0 14px rgba(239, 68, 68, 0.4), 0 4px 14px rgba(0, 0, 0, 0.8) !important;
  display: block !important;
  visibility: visible !important;
}

.live-mode .combat-dmg-frame .frame-title {
  font-size: 9.5px !important;
}

/* 3. Bảng TOP TU SĨ LỰC CHIẾN (Góc trên bên PHẢI) */
.live-mode .top-cultivators-board,
.live-mode .arena-right-boards .top-cultivators-board {
  position: absolute !important;
  top: 96px !important;
  right: 10px !important;
  left: auto !important;
  width: 168px !important;
  max-width: 47% !important;
  z-index: 28 !important;
  pointer-events: auto !important;
  padding: 6px 8px !important;
  background: rgba(15, 11, 26, 0.88) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: 1.2px solid rgba(168, 85, 247, 0.5) !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.7), 0 0 12px rgba(168, 85, 247, 0.25) !important;
  display: block !important;
  visibility: visible !important;
}

.live-mode .top-cultivators-board .board-title {
  font-size: 9.5px !important;
}

.live-mode .top-cultivators-board .board-badge {
  font-size: 7.5px !important;
}

/* 4. Bảng CÁCH ĐÁNH BOSS HƯỚNG DẪN (Góc dưới cùng bên PHẢI) */
.live-mode .raid-guide-board,
.live-mode .arena-right-boards .raid-guide-board {
  position: absolute !important;
  top: auto !important;
  bottom: 18px !important;
  right: 10px !important;
  left: auto !important;
  width: 165px !important;
  max-width: 48% !important;
  z-index: 28 !important;
  pointer-events: auto !important;
  padding: 6px 8px !important;
  background: rgba(14, 9, 24, 0.9) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: 1.2px solid rgba(168, 85, 247, 0.4) !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.7) !important;
  display: block !important;
  visibility: visible !important;
}

.live-mode .world-labels {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  pointer-events: none !important;
  z-index: 20 !important;
}
`;

const cssFiles = [
  path.join(__dirname, '..', 'assets', 'index-Cne2fmcZ.css'),
  path.join(__dirname, '..', 'public', 'assets', 'index-Cne2fmcZ.css')
];

for (const file of cssFiles) {
  if (!fs.existsSync(file)) continue;
  let css = fs.readFileSync(file, 'utf8');

  const marker = '/* ==========================================================================';
  const patterns = [
    'CHẾ ĐỘ LIVESTREAM FULL MÀN HÌNH',
    'PERFECT 9:16 RATIO NATIVE LIVE RAID',
    'CHUẨN GIAO DIỆN IPHONE 17 PRO MAX',
    'CHUẨN CHÍNH XÁC 100% TỶ LỆ 9:16'
  ];

  for (const pat of patterns) {
    const idx = css.indexOf(pat);
    if (idx !== -1) {
      const startIdx = css.lastIndexOf(marker, idx);
      if (startIdx !== -1) {
        css = css.slice(0, startIdx);
      }
    }
  }

  css = css.trim() + '\n\n' + perfect916CSS;
  fs.writeFileSync(file, css, 'utf8');
  console.log('Applied exact 9:16 CSS to', file);
}
