const fs = require('fs');
const path = require('path');

const perfectedUniversalCSS = `
/* ==========================================================================
   CHUẨN GIAO DIỆN IPHONE 17 PRO MAX (19.5:9) & TIKTOK LIVE STUDIO (FULL HD)
   - Tự động nhận diện:
     + Trên TikTok LIVE Studio (Màn hình dọc): Chiếm trọn 100% Full màn hình (1080x1920 / 1080x2340), không viền đen.
     + Trên Trình duyệt máy tính (PC): Hiển thị khung iPhone 17 Pro Max sang trọng, căn giữa, không bị méo hay vỡ giao diện.
   - Ẩn triệt để thanh công cụ thừa ngoài lề.
   - Bố cục HUD: Sát thương bên TRÁI, Top tu sĩ bên PHẢI, ở giữa dành trọn cho Boss Ma Zuzai sắc nét.
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
  text-rendering: optimizeLegibility !important;
}

/* KHI BẬT CHẾ ĐỘ LIVE (?live=1) HOẶC MỞ TRÊN TIKTOK LIVE STUDIO */
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

/* 1. TRÊN TIKTOK LIVE STUDIO / ĐIỆN THOẠI (MÀN HÌNH DỌC) */
@media (max-aspect-ratio: 1/1) {
  .live-mode .arena-frame {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    max-width: 100vw !important;
    max-height: 100vh !important;
    aspect-ratio: unset !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    background: #080617 !important;
    z-index: 10 !important;
  }
}

/* 2. TRÊN MÁY TÍNH / LAPTOP (MÀN HÌNH NGANG ĐỂ XEM THỬ / PREVIEW) */
@media (min-aspect-ratio: 1/1) {
  .live-mode .arena-frame {
    position: relative !important;
    height: 96vh !important;
    max-height: 96vh !important;
    aspect-ratio: 9 / 19.5 !important;
    width: calc(96vh * 9 / 19.5) !important;
    max-width: 480px !important;
    margin: auto !important;
    overflow: hidden !important;
    border: 2px solid rgba(168, 85, 247, 0.45) !important;
    border-radius: 28px !important;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(168, 85, 247, 0.3) !important;
    background: #080617 !important;
    z-index: 10 !important;
  }
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

/* 1. Header Boss Ma Zuzai & Thanh Máu */
.live-mode .boss-hud {
  position: absolute !important;
  top: 12px !important;
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

.live-mode .boss-hud h2 {
  font-family: Georgia, serif !important;
  letter-spacing: 2.5px !important;
  font-size: 22px !important;
  margin: 2px 0 6px !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9) !important;
  font-weight: 700 !important;
  text-align: left !important;
  color: #fff !important;
}

.live-mode .boss-health {
  height: 7px !important;
  border-radius: 2px !important;
  position: relative !important;
}

.live-mode .health-meta {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  margin-top: 4px !important;
  font-size: 8px !important;
}

/* 2. Khung SÁT THƯƠNG ĐÁNH BOSS (Góc trên bên TRÁI - Không bị đè) */
.live-mode .combat-dmg-frame {
  position: absolute !important;
  top: 90px !important;
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
}

.live-mode .combat-dmg-frame .frame-title {
  font-size: 9.5px !important;
}

/* 3. Bảng TOP TU SĨ LỰC CHIẾN (Góc trên bên PHẢI - Tách riêng biệt, KHÔNG ĐÈ LÊN BOSS) */
.live-mode .top-cultivators-board {
  position: absolute !important;
  top: 90px !important;
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
}

.live-mode .top-cultivators-board .board-title {
  font-size: 9.5px !important;
}

.live-mode .top-cultivators-board .board-badge {
  font-size: 7.5px !important;
}

/* 4. Bảng CÁCH ĐÁNH BOSS HƯỚNG DẪN (Góc dưới cùng bên PHẢI) */
.live-mode .raid-guide-board {
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
    'CHUẨN GIAO DIỆN IPHONE 17 PRO MAX'
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

  css = css.trim() + '\n\n' + perfectedUniversalCSS;
  fs.writeFileSync(file, css, 'utf8');
  console.log('Applied perfected universal CSS to', file);
}
