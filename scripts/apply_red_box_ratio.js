const fs = require('fs');
const path = require('path');

const redBoxRatioCSS = `
/* ==========================================================================
   CHUẨN TỶ LỆ 3:4 (KHỚP CHÍNH XÁC Ô ĐỎ NGƯỜI DÙNG YÊU CẦU)
   - Tỷ lệ khung đấu trường: 3 / 4 (Rộng rãi, thoáng đãng, tuyệt đối không bị đè)
   - Chiều rộng: 650px - 720px (đầy đủ không gian cho cả 2 bên Trái và Phải)
   - Căn chỉnh HUD hoàn hảo:
     + Dòng Máu & Giai Đoạn nằm riêng biệt TRÊN 2 khung
     + Góc TRÁI: Khung Sát Thương Đánh Boss (rộng 200px, 40%)
     + Góc PHẢI: Bảng TOP Tu Sĩ Lực Chiến (rộng 215px, 42%)
     + Khoảng giữa: 18% khoảng cách thoáng đãng cho Boss Ma Zuzai
     + Góc dưới bên PHẢI: Bảng Hướng Dẫn Cách Đánh Boss (rộng 185px)
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

/* ÁP DỤNG TRONG CHẾ ĐỘ LIVE / TIKTOK LIVE STUDIO (KHỚP Ô ĐỎ 3:4) */
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
  max-width: 100vw !important;
  width: 100vw !important;
  height: 100vh !important;
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

/* KHUNG ĐẤU TRƯỜNG CHUẨN XÁC TỶ LỆ 3:4 NHƯ Ô ĐỎ ĐÃ VẼ */
.arena-frame,
.live-mode .arena-frame {
  position: relative !important;
  aspect-ratio: 3 / 4 !important;
  height: 96vh !important;
  max-height: 96vh !important;
  width: calc(96vh * 3 / 4) !important;
  max-width: 96vw !important;
  margin: auto !important;
  padding: 0 !important;
  overflow: hidden !important;
  border: 2px solid rgba(168, 85, 247, 0.45) !important;
  border-radius: 16px !important;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.9), 0 0 25px rgba(168, 85, 247, 0.25) !important;
  background: #080617 !important;
  z-index: 10 !important;
}

.canvas-host,
.live-mode .canvas-host {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}

.canvas-host canvas,
.live-mode .canvas-host canvas {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
}

/* 1. Header Boss Ma Zuzai & Thanh Máu (Căn chuẩn sát mép trên) */
.boss-hud,
.live-mode .boss-hud {
  position: absolute !important;
  top: 12px !important;
  left: 14px !important;
  right: 14px !important;
  width: auto !important;
  z-index: 30 !important;
  pointer-events: none !important;
}

.boss-caption,
.live-mode .boss-caption {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  font-size: 8.5px !important;
  letter-spacing: 0.8px !important;
  color: #d0bddd !important;
  margin-bottom: 2px !important;
}

.boss-caption .boss-type-badge,
.live-mode .boss-caption .boss-type-badge {
  font-size: 8.5px !important;
  font-weight: 800 !important;
  color: #e9d5ff !important;
}

.boss-caption .raid-timer-hud,
.live-mode .boss-caption .raid-timer-hud {
  font-size: 8.5px !important;
}

.boss-caption .level-tag,
.live-mode .boss-caption .level-tag {
  font-size: 8px !important;
  padding: 1px 6px !important;
}

.boss-hud h2,
.live-mode .boss-hud h2 {
  font-family: "Cinzel", "Georgia", serif !important;
  letter-spacing: 3.5px !important;
  font-size: 26px !important;
  margin: 3px 0 6px !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95), 0 0 16px rgba(217, 70, 239, 0.7) !important;
  font-weight: 800 !important;
  text-align: left !important;
  color: #fff !important;
  display: block !important;
}

.boss-health,
.live-mode .boss-health {
  height: 9px !important;
  border-radius: 3px !important;
  position: relative !important;
  margin-bottom: 5px !important;
}

/* Thanh Giai đoạn & Máu số hiển thị riêng biệt TRÊN cả 2 khung bên dưới */
.health-meta,
.live-mode .health-meta {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100% !important;
  margin: 2px 0 8px !important;
  font-size: 8px !important;
}

.health-meta .phase-pill,
.live-mode .health-meta .phase-pill {
  font-size: 8px !important;
  padding: 2px 7px !important;
}

.health-meta .hp-text,
.live-mode .health-meta .hp-text {
  font-size: 8.5px !important;
  font-weight: 800 !important;
  color: #fca5a5 !important;
}

/* 2. Khung SÁT THƯƠNG ĐÁNH BOSS (Nằm dưới thanh máu, góc bên TRÁI) */
.combat-dmg-frame,
.live-mode .combat-dmg-frame {
  position: absolute !important;
  top: 108px !important;
  left: 0 !important;
  right: auto !important;
  width: 185px !important;
  max-width: 42% !important;
  z-index: 28 !important;
  pointer-events: none !important;
  padding: 6px 10px !important;
  background: linear-gradient(135deg, rgba(32, 10, 18, 0.92) 0%, rgba(18, 6, 12, 0.95) 100%) !important;
  border: 1.2px solid rgba(239, 68, 68, 0.85) !important;
  border-radius: 6px !important;
  box-shadow: 0 0 14px rgba(239, 68, 68, 0.4), 0 4px 14px rgba(0, 0, 0, 0.8) !important;
  display: block !important;
}

.combat-dmg-frame .combat-title,
.live-mode .combat-dmg-frame .combat-title {
  font-size: 9px !important;
  font-weight: 800 !important;
}

.combat-dmg-frame .combat-waiting,
.live-mode .combat-dmg-frame .combat-waiting {
  font-size: 8px !important;
  padding: 4px 0 !important;
}

/* 3. Bảng TOP TU SĨ LỰC CHIẾN (Nằm dưới thanh máu, góc bên PHẢI - KHÔNG ĐÈ LÊN TRÁI HAY GIỮA) */
.top-cultivators-board,
.arena-right-boards .top-cultivators-board,
.live-mode .top-cultivators-board,
.live-mode .arena-right-boards .top-cultivators-board {
  position: absolute !important;
  top: 120px !important;
  right: 14px !important;
  left: auto !important;
  width: 195px !important;
  max-width: 44% !important;
  z-index: 28 !important;
  pointer-events: auto !important;
  padding: 6px 9px !important;
  background: rgba(15, 11, 26, 0.9) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: 1.2px solid rgba(168, 85, 247, 0.5) !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.7), 0 0 12px rgba(168, 85, 247, 0.25) !important;
  display: block !important;
}

.top-cultivators-board .board-title,
.live-mode .top-cultivators-board .board-title {
  font-size: 9px !important;
  font-weight: 800 !important;
}

.top-cultivators-board .board-badge,
.live-mode .top-cultivators-board .board-badge {
  font-size: 7.5px !important;
  padding: 1px 5px !important;
}

.top-cultivators-board .empty-cultivators,
.live-mode .top-cultivators-board .empty-cultivators {
  font-size: 8.5px !important;
  padding: 8px 4px !important;
  line-height: 1.35 !important;
}

.top-cultivators-board .board-list,
.live-mode .top-cultivators-board .board-list {
  gap: 3.5px !important;
}

/* 4. Bảng CÁCH ĐÁNH BOSS HƯỚNG DẪN (Góc dưới cùng bên PHẢI) */
.raid-guide-board,
.arena-right-boards .raid-guide-board,
.live-mode .raid-guide-board,
.live-mode .arena-right-boards .raid-guide-board {
  position: absolute !important;
  top: auto !important;
  bottom: 16px !important;
  right: 14px !important;
  left: auto !important;
  width: 175px !important;
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
}

.raid-guide-board .board-title,
.live-mode .raid-guide-board .board-title {
  font-size: 9px !important;
}

.world-labels,
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
    'CHUẨN CĂN CHỈNH BỐ CỤC 9:16',
    'CHUẨN TỶ LỆ 3:4'
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

  css = css.trim() + '\n\n' + redBoxRatioCSS;
  fs.writeFileSync(file, css, 'utf8');
  console.log('Applied 3:4 Red Box Ratio CSS to', file);
}
