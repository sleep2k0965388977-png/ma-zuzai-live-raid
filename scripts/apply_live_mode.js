const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'index-Cne2fmcZ.css');
const htmlPath = path.join(__dirname, '..', 'index.html');

// 1. Append live-mode CSS
const liveModeCSS = `
/* ==========================================================================
   CHẾ ĐỘ LIVESTREAM FULL MÀN HÌNH CHUẨN 9:16 (TIKTOK LIVE STUDIO & OBS NATIVE)
   ========================================================================== */
html.live-mode,
html.live-mode body,
body.live-mode,
.live-mode #root,
.live-mode .app,
.live-mode main {
  margin: 0 !important;
  padding: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
  overflow: hidden !important;
  background: #080617 !important;
  display: block !important;
}

.live-mode .arena-column {
  margin: 0 !important;
  padding: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
  display: block !important;
  position: relative !important;
}

.live-mode .arena-frame {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
  aspect-ratio: unset !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  z-index: 100 !important;
  margin: 0 !important;
  background: #080617 !important;
}

.live-mode .canvas-host {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
}

.live-mode .canvas-host canvas {
  width: 100vw !important;
  height: 100vh !important;
  display: block !important;
}

/* Ẩn triệt để thanh công cụ, sidebar điều khiển và tiêu đề thừa khi phát LIVE */
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

/* Tinh chỉnh HUD chuẩn tỷ lệ vàng trên màn hình dọc 1080x1920 */
.live-mode .boss-hud {
  top: 24px !important;
  left: 20px !important;
  right: 20px !important;
}

.live-mode .boss-hud h2 {
  font-size: 32px !important;
  letter-spacing: 4px !important;
}

.live-mode .boss-health {
  height: 10px !important;
}

.live-mode .raid-side-hud {
  top: 140px !important;
  left: 20px !important;
}
`;

let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('CHẾ ĐỘ LIVESTREAM FULL MÀN HÌNH CHUẨN 9:16')) {
  css += liveModeCSS;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Appended liveModeCSS to assets/index-Cne2fmcZ.css');
  
  // also copy to public/assets
  const pubCss = path.join(__dirname, '..', 'public', 'assets', 'index-Cne2fmcZ.css');
  fs.mkdirSync(path.dirname(pubCss), { recursive: true });
  fs.copyFileSync(cssPath, pubCss);
  console.log('Copied CSS to public/assets');
}

// 2. Update index.html to add early detection script
let html = fs.readFileSync(htmlPath, 'utf8');
const scriptTag = `<script>
      (function() {
        function checkLiveMode() {
          var p = new URLSearchParams(window.location.search);
          var isLiveParam = p.has('live') || p.has('obs') || p.has('stream') || p.has('studio');
          var isPortrait = (window.innerHeight > window.innerWidth) && (window.innerWidth <= 1200);
          if (isLiveParam || isPortrait) {
            document.documentElement.classList.add('live-mode');
            if (document.body) document.body.classList.add('live-mode');
          } else {
            document.documentElement.classList.remove('live-mode');
            if (document.body) document.body.classList.remove('live-mode');
          }
        }
        checkLiveMode();
        window.addEventListener('resize', checkLiveMode);
        document.addEventListener('DOMContentLoaded', checkLiveMode);
      })();
    </script>`;

if (!html.includes('checkLiveMode')) {
  html = html.replace('<head>', '<head>\n    ' + scriptTag);
}

const now = Date.now();
html = html.replace(/index-Cne2fmcZ\.css\?v=\d+/, 'index-Cne2fmcZ.css?v=' + now);
html = html.replace(/index-CT5dfJfs\.js\?v=\d+/, 'index-CT5dfJfs.js?v=' + now);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Updated index.html with live-mode detection script and cache buster', now);
