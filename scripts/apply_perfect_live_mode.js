const fs = require('fs');
const path = require('path');

const cssFiles = [
  path.join(__dirname, '..', 'assets', 'index-Cne2fmcZ.css'),
  path.join(__dirname, '..', 'public', 'assets', 'index-Cne2fmcZ.css')
];

const perfectedLiveModeCSS = `
/* ==========================================================================
   PERFECT 9:16 RATIO NATIVE LIVE RAID (TIKTOK LIVE STUDIO & OBS PREVIEW)
   Khóa cứng chuẩn tỷ lệ vàng 9:16 - Không bao giờ bị lệch hay tràn mép
   ========================================================================== */
html, body, #root {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
  background: #080617 !important;
}

/* Khi mở trên TikTok Live Studio, OBS hoặc thêm tham số ?live=1 */
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

/* Khung hiển thị Game chuẩn xác 9:16 như màn hình xem trước Ảnh 2 */
.live-mode .arena-frame {
  position: relative !important;
  height: 100vh !important;
  max-height: 100vh !important;
  width: calc(100vh * 9 / 16) !important;
  max-width: 100vw !important;
  aspect-ratio: 9 / 16 !important;
  margin: 0 auto !important;
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

/* Ẩn các thanh điều khiển thừa */
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

/* 1. Header Boss Ma Zuzai & Thanh Máu (Căn chuẩn trong khung 9:16) */
.live-mode .boss-hud {
  position: absolute !important;
  top: 18px !important;
  left: 14px !important;
  right: 14px !important;
  width: auto !important;
  z-index: 15 !important;
}

.live-mode .boss-caption {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  font-size: 8px !important;
  letter-spacing: 1px !important;
  color: #d0bddd !important;
}

.live-mode .boss-hud h2 {
  font-family: Georgia, serif !important;
  letter-spacing: 3px !important;
  font-size: 26px !important;
  margin: 6px 0 10px !important;
  text-shadow: 0 2px 10px #000 !important;
  font-weight: 400 !important;
  text-align: left !important;
}

.live-mode .boss-health {
  height: 8px !important;
  border-radius: 2px !important;
  position: relative !important;
}

.live-mode .health-meta {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  margin-top: 6px !important;
}

/* 2. Bảng TOP TU SĨ LỰC CHIẾN (Ghim góc trên bên phải, dưới thanh máu) */
.live-mode .top-cultivators-board {
  position: absolute !important;
  top: 130px !important;
  right: 14px !important;
  left: auto !important;
  width: 200px !important;
  max-width: 48% !important;
  z-index: 20 !important;
}

/* 3. Khung SÁT THƯƠNG ĐÁNH BOSS BÃO ĐỎ (Ghim góc trên bên trái) */
.live-mode .combat-dmg-frame {
  position: absolute !important;
  top: 182px !important;
  left: 14px !important;
  right: auto !important;
  width: 200px !important;
  max-width: 48% !important;
  z-index: 20 !important;
}

/* 4. Bảng CÁCH ĐÁNH BOSS HƯỚNG DẪN (Ghim chính xác góc dưới cùng bên phải) */
.live-mode .raid-guide-board {
  position: absolute !important;
  top: auto !important;
  bottom: 24px !important;
  right: 14px !important;
  left: auto !important;
  width: 175px !important;
  z-index: 20 !important;
}
`;

for (const file of cssFiles) {
  let css = fs.readFileSync(file, 'utf8');
  // Remove any previous liveModeCSS
  const marker = '/* ==========================================================================';
  const idx = css.indexOf('CHẾ ĐỘ LIVESTREAM FULL MÀN HÌNH');
  if (idx !== -1) {
    const startIdx = css.lastIndexOf(marker, idx);
    css = css.slice(0, startIdx);
  }
  css += perfectedLiveModeCSS;
  fs.writeFileSync(file, css, 'utf8');
  console.log('Applied perfectedLiveModeCSS to', file);
}
