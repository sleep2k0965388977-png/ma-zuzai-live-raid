const fs = require('fs');
const path = require('path');

const jsFiles = [
  path.join(__dirname, '..', 'assets', 'index-CT5dfJfs.js'),
  path.join(__dirname, '..', 'public', 'assets', 'index-CT5dfJfs.js')
];

// 1. Frame JSX markup to inject right after raid-side-hud
const targetRaidSideHud = `  P.jsxs("span",{children:[P.jsx($h,{size:12})," ",Math.round(n.energy),"%"]})
]}),`;

const frameJSX = `  P.jsxs("span",{children:[P.jsx($h,{size:12})," ",Math.round(n.energy),"%"]})
]}),P.jsxs("div",{className:"combat-dmg-frame",children:[
  P.jsxs("div",{className:"combat-dmg-header",children:[
    P.jsxs("span",{className:"combat-title",children:["⚔️ SÁT THƯƠNG GÂY RA"]}),
    n.lastDamage>0?P.jsxs("span",{className:"combat-combo-badge",children:["🔥 x",n.combo]}):P.jsx("span",{className:"combat-live-dot",children:"● SẴN SÀNG"})
  ]}),
  n.lastDamage>0?P.jsxs("div",{className:"combat-dmg-body",key:n.combo,children:[
    P.jsxs("div",{className:"combat-attacker-name",children:["👤 @",(n.lastAttacker||"Tu sĩ").replace(/^@/,"")]}),
    P.jsx("div",{className:"combat-skill-tag",children:n.lastDamage>=20000?"🔥 Thập Long (150 Xu)":n.lastDamage>=8000?"🐉 Kim Long (80 Xu)":n.lastDamage>=5000?"🌧️ Mưa Kiếm (45 Xu)":n.lastDamage>=2500?"🗡️ Cự Kiếm (20 Xu)":n.lastDamage>=700?"✨ Kiếm Vàng (5 Xu)":"⚔️ Trảm Kích Kiếm Khí"}),
    P.jsxs("div",{className:\`combat-dmg-val \${n.lastDamage>=5000?"crit":""}\`,children:[
      P.jsx("span",{className:"minus",children:"−"}),
      Jr(n.lastDamage),
      P.jsx("span",{className:"dmg-unit",children:n.lastDamage>=5000?" CRIT!":" DMG"})
    ]}),
    P.jsx("div",{className:"combat-dmg-progress",children:P.jsx("div",{className:"combat-dmg-bar",style:{width:\`\${Math.min(100,Math.max(18,(n.lastDamage/25000)*100))}%\`}})})
  ]}):P.jsxs("div",{className:"combat-dmg-idle",children:[
    P.jsx("span",{className:"idle-icon",children:"⚡"}),
    P.jsx("span",{children:"Đang chờ xuất chiêu đánh Boss…"})
  ]})
]}),`;

for (const jsFile of jsFiles) {
  let code = fs.readFileSync(jsFile, 'utf8');
  if (!code.includes(targetRaidSideHud)) {
    throw new Error(`targetRaidSideHud not found in ${jsFile}`);
  }
  code = code.replace(targetRaidSideHud, frameJSX);
  fs.writeFileSync(jsFile, code, 'utf8');
  console.log(`[✓] Successfully injected combat-dmg-frame into ${jsFile}`);
}

// 2. Add CSS styles
const cssFile = path.join(__dirname, '..', 'assets', 'index-Cne2fmcZ.css');
let css = fs.readFileSync(cssFile, 'utf8');

const combatFrameCSS = `
/* COMBAT DAMAGE REPORTER FRAME (KHUNG BÁO SÁT THƯƠNG ĐỘNG) */
.combat-dmg-frame {
  position: absolute;
  left: 22px;
  top: 170px;
  width: 200px;
  background: linear-gradient(135deg, rgba(28, 16, 46, 0.94) 0%, rgba(15, 9, 26, 0.96) 100%);
  border: 1.5px solid rgba(244, 63, 94, 0.45);
  border-radius: 6px;
  padding: 8px 10px;
  box-shadow: 0 0 16px rgba(244, 63, 94, 0.25), inset 0 0 12px rgba(244, 63, 94, 0.12), 0 6px 18px rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 10;
  pointer-events: none;
  animation: combat-frame-glow 3s ease-in-out infinite alternate;
}

@keyframes combat-frame-glow {
  0% { border-color: rgba(244, 63, 94, 0.4); box-shadow: 0 0 14px rgba(244, 63, 94, 0.2); }
  100% { border-color: rgba(251, 191, 36, 0.7); box-shadow: 0 0 20px rgba(244, 63, 94, 0.35), 0 0 10px rgba(251, 191, 36, 0.3); }
}

.combat-dmg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  margin-bottom: 6px;
  border-bottom: 1px solid rgba(244, 63, 94, 0.3);
}

.combat-title {
  font-size: 8px;
  font-weight: 800;
  color: #fbbf24;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  text-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
}

.combat-combo-badge {
  font-size: 8px;
  font-weight: 800;
  background: linear-gradient(90deg, #ea580c, #dc2626);
  color: #fff;
  padding: 1px 6px;
  border-radius: 10px;
  border: 1px solid #fde047;
  box-shadow: 0 0 8px rgba(234, 88, 12, 0.6);
  animation: pulse-combo 0.6s ease-in-out infinite alternate;
}

@keyframes pulse-combo {
  0% { transform: scale(0.95); }
  100% { transform: scale(1.08); }
}

.combat-live-dot {
  font-size: 7.5px;
  color: #10b981;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.combat-dmg-body {
  animation: dmg-punch 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes dmg-punch {
  0% { transform: scale(1.22); filter: brightness(2.0); }
  50% { transform: scale(0.96); filter: brightness(1.2); }
  100% { transform: scale(1.0); filter: brightness(1.0); }
}

.combat-attacker-name {
  font-size: 9.5px;
  font-weight: 700;
  color: #fef08a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

.combat-skill-tag {
  font-size: 8px;
  font-weight: 700;
  color: #c084fc;
  background: rgba(168, 85, 247, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.3);
  padding: 1px 5px;
  border-radius: 3px;
  display: inline-block;
  margin-bottom: 4px;
}

.combat-dmg-val {
  font-size: 19px;
  font-weight: 900;
  color: #fbbf24;
  letter-spacing: -0.5px;
  line-height: 1.1;
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.6), 0 2px 4px rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.combat-dmg-val.crit {
  color: #f43f5e;
  text-shadow: 0 0 12px rgba(244, 63, 94, 0.8), 0 0 22px rgba(239, 68, 68, 0.6), 0 2px 4px rgba(0, 0, 0, 0.9);
}

.combat-dmg-val .minus {
  color: #f43f5e;
  font-size: 16px;
  font-weight: 800;
  margin-right: 1px;
}

.combat-dmg-val.crit .minus {
  color: #fbbf24;
}

.combat-dmg-val .dmg-unit {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #fca5a5;
  margin-left: 3px;
}

.combat-dmg-val.crit .dmg-unit {
  color: #fde047;
  text-shadow: 0 0 8px #f59e0b;
}

.combat-dmg-progress {
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: 6px;
  overflow: hidden;
}

.combat-dmg-bar {
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #ef4444);
  border-radius: 2px;
  box-shadow: 0 0 6px #ef4444;
  transition: width 0.3s ease;
}

.combat-dmg-idle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 8.5px;
  color: #94a3b8;
  padding: 8px 0;
  font-style: italic;
}

.combat-dmg-idle .idle-icon {
  color: #fbbf24;
  font-size: 11px;
  animation: pulse-combo 1.2s infinite ease-in-out;
}
`;

if (!css.includes('.combat-dmg-frame')) {
  css += '\n' + combatFrameCSS;
  fs.writeFileSync(cssFile, css, 'utf8');
  console.log(`[✓] Added combat-dmg-frame styles to ${cssFile}`);
}

// 3. Update index.html cache bust timestamp
const indexHtmlPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const now = Date.now();
indexHtml = indexHtml.replace(/index-CT5dfJfs\.js\?v=\d+/, `index-CT5dfJfs.js?v=${now}`);
indexHtml = indexHtml.replace(/index-Cne2fmcZ\.css\?v=\d+/, `index-Cne2fmcZ.css?v=${now}`);
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log(`[✓] Updated index.html cache bust to v=${now}`);
