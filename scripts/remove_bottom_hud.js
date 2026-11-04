const fs = require('fs');
const path = require('path');

const jsFiles = [
  path.join(__dirname, '..', 'assets', 'index-CT5dfJfs.js'),
  path.join(__dirname, '..', 'public', 'assets', 'index-CT5dfJfs.js')
];

const targetBottomHud = `P.jsxs("div",{className:"bottom-hud",children:[P.jsxs("div",{className:"energy-info",children:[P.jsxs("span",{children:[P.jsx($h,{size:12})," NĂNG LƯỢNG ĐỘI"]}),P.jsxs("strong",{children:[Math.round(n.energy),P.jsx("small",{children:" / 100"})]})]}),P.jsx("div",{className:"energy-bar",children:P.jsx("i",{style:{width:\`\${n.energy}%\`}})}),P.jsxs("div",{className:"latest-hud",children:[P.jsx(sc,{size:14}),P.jsx("span",{children:n.lastGift==="—"?"Đang chờ quà tặng đầu tiên…":n.lastGift})]}),P.jsxs("div",{className:"camera-label",children:[P.jsxs("span",{children:["CAM • ",n.camera]}),P.jsx("span",{children:"1080 × 1920"})]})]})`;

for (const jsFile of jsFiles) {
  let code = fs.readFileSync(jsFile, 'utf8');
  if (!code.includes(targetBottomHud)) {
    throw new Error(`Target bottom-hud not found in ${jsFile}`);
  }
  code = code.replace(targetBottomHud, 'null');
  fs.writeFileSync(jsFile, code, 'utf8');
  console.log(`[✓] Successfully removed bottom-hud from ${jsFile}`);
}

// Update CSS to ensure .bottom-hud is hidden
const cssFile = path.join(__dirname, '..', 'assets', 'index-Cne2fmcZ.css');
let css = fs.readFileSync(cssFile, 'utf8');
css = css.replace('.bottom-hud{position:absolute;', '.bottom-hud{display:none !important;position:absolute;');
fs.writeFileSync(cssFile, css, 'utf8');
console.log(`[✓] Added display: none !important to .bottom-hud in ${cssFile}`);

// Update cache bust in index.html
const indexHtmlPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const now = Date.now();
indexHtml = indexHtml.replace(/index-CT5dfJfs\.js\?v=\d+/, `index-CT5dfJfs.js?v=${now}`);
indexHtml = indexHtml.replace(/index-Cne2fmcZ\.css\?v=\d+/, `index-Cne2fmcZ.css?v=${now}`);
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log(`[✓] Updated index.html cache bust to v=${now}`);
