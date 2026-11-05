const fs = require('fs');
const path = require('path');

const perfectHUDCSS = `
/* ==========================================================================
   CHUẨN CĂN CHỈNH BỐ CỤC 9:16 - KHÔNG BAO GIỜ BỊ ĐÈ HAY DÍNH CHỮ
   - Thanh Boss Header trên cùng: Gồm Title, Timer, Level, Tên MA ZUZAI, Thanh máu và Giai đoạn
   - Hai bên tách biệt hoàn toàn dưới thanh máu:
     + Bên TRÁI: Khung Sát Thương Đánh Boss (gọn gàng, vừa vặn góc trái)
     + Bên PHẢI: Khung TOP Tu Sĩ Lực Chiến (gọn gàng, vừa vặn góc phải)
   - Ở giữa hoàn toàn thoáng đãng, không đè lên nhau, không đè lên mặt Boss!
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

/* 1. Header Boss Ma Zuzai & Thanh Máu (Căn chuẩn sát mép trên) */
.live-mode .boss-hud {
  position: absolute !important;
  top: 10px !important;
  left: 10px !important;
  right: 10px !important;
  width: auto !important;
  z-index: 30 !important;
  pointer-events: none !important;
}

.live-mode .boss-caption {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  font-size: 8px !important;
  letter-spacing: 0.8px !important;
  color: #d0bddd !important;
  margin-bottom: 2px !important;
}

.live-mode .boss-caption .boss-type-badge {
  font-size: 8px !important;
  font-weight: 800 !important;
  color: #e9d5ff !important;
}

.live-mode .boss-caption .raid-timer-hud {
  font-size: 8px !important;
}

.live-mode .boss-caption .level-tag {
  font-size: 7.5px !important;
  padding: 1px 5px !important;
}

.live-mode .boss-hud h2 {
  font-family: "Cinzel", "Georgia", serif !important;
  letter-spacing: 3px !important;
  font-size: 22px !important;
  margin: 2px 0 4px !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95), 0 0 16px rgba(217, 70, 239, 0.7) !important;
  font-weight: 800 !important;
  text-align: left !important;
  color: #fff !important;
  display: block !important;
}

.live-mode .boss-health {
  height: 8px !important;
  border-radius: 2px !important;
  position: relative !important;
  margin-bottom: 4px !important;
}

/* Thanh Giai đoạn & Máu số hiển thị riêng biệt TRÊN cả 2 khung bên dưới */
.live-mode .health-meta {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100% !important;
  margin: 2px 0 6px !important;
  font-size: 7.5px !important;
}

.live-mode .health-meta .phase-pill {
  font-size: 7.5px !important;
  padding: 2px 6px !important;
}

.live-mode .health-meta .hp-text {
  font-size: 8px !important;
  font-weight: 800 !important;
  color: #fca5a5 !important;
}

/* 2. Khung SÁT THƯƠNG ĐÁNH BOSS (Nằm dưới thanh máu, góc bên TRÁI) */
.live-mode .combat-dmg-frame {
  position: absolute !important;
  top: 92px !important;
  left: 0 !important;
  right: auto !important;
  width: 148px !important;
  max-width: 46% !important;
  z-index: 28 !important;
  pointer-events: none !important;
  padding: 5px 8px !important;
  background: linear-gradient(135deg, rgba(32, 10, 18, 0.92) 0%, rgba(18, 6, 12, 0.95) 100%) !important;
  border: 1.2px solid rgba(239, 68, 68, 0.85) !important;
  border-radius: 6px !important;
  box-shadow: 0 0 14px rgba(239, 68, 68, 0.4), 0 4px 14px rgba(0, 0, 0, 0.8) !important;
  display: block !important;
}

.live-mode .combat-dmg-frame .combat-title {
  font-size: 8.5px !important;
  font-weight: 800 !important;
}

.live-mode .combat-dmg-frame .combat-waiting {
  font-size: 7.5px !important;
  padding: 3px 0 !important;
}

/* 3. Bảng TOP TU SĨ LỰC CHIẾN (Nằm dưới thanh máu, góc bên PHẢI - KHÔNG ĐÈ LÊN TRÁI HAY GIỮA) */
.live-mode .top-cultivators-board,
.live-mode .arena-right-boards .top-cultivators-board {
  position: absolute !important;
  top: 102px !important;
  right: 10px !important;
  left: auto !important;
  width: 155px !important;
  max-width: 47% !important;
  z-index: 28 !important;
  pointer-events: auto !important;
  padding: 5px 7px !important;
  background: rgba(15, 11, 26, 0.9) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: 1.2px solid rgba(168, 85, 247, 0.5) !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.7), 0 0 12px rgba(168, 85, 247, 0.25) !important;
  display: block !important;
}

.live-mode .top-cultivators-board .board-title {
  font-size: 8.5px !important;
  font-weight: 800 !important;
}

.live-mode .top-cultivators-board .board-badge {
  font-size: 7px !important;
  padding: 1px 4px !important;
}

.live-mode .top-cultivators-board .empty-cultivators {
  font-size: 8px !important;
  padding: 6px 3px !important;
  line-height: 1.3 !important;
}

.live-mode .top-cultivators-board .board-list {
  gap: 3px !important;
}

/* 4. Bảng CÁCH ĐÁNH BOSS HƯỚNG DẪN (Góc dưới cùng bên PHẢI) */
.live-mode .raid-guide-board,
.live-mode .arena-right-boards .raid-guide-board {
  position: absolute !important;
  top: auto !important;
  bottom: 14px !important;
  right: 10px !important;
  left: auto !important;
  width: 160px !important;
  max-width: 48% !important;
  z-index: 28 !important;
  pointer-events: auto !important;
  padding: 5px 7px !important;
  background: rgba(14, 9, 24, 0.9) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: 1.2px solid rgba(168, 85, 247, 0.4) !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.7) !important;
  display: block !important;
}

.live-mode .raid-guide-board .board-title {
  font-size: 8.5px !important;
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
    'CHUẨN CHÍNH XÁC 100% TỶ LỆ 9:16',
    'CHUẨN CĂN CHỈNH BỐ CỤC 9:16'
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

  css = css.trim() + '\n\n' + perfectHUDCSS;
  fs.writeFileSync(file, css, 'utf8');
  console.log('Applied perfected HUD CSS to', file);
}
