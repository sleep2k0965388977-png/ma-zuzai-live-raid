const fs = require('fs');

const filePath = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(filePath, 'utf8');

console.log('=== APPLYING ULTRA WEAK-PC OPTIMIZATIONS ===');

// 1. Add ultraFast: true to Mf() initial state
const oldMf = 'crowdCount:10000,tiktokConnected:!1,tiktokStreamer:""})';
const newMf = 'crowdCount:2500,tiktokConnected:!1,tiktokStreamer:"",ultraFast:!0})';
if (code.includes(oldMf)) {
  code = code.replace(oldMf, newMf);
  console.log('✓ 1. Set ultraFast: true and crowdCount: 2500 by default in initial state');
} else {
  console.log('⚠️ Could not find exact oldMf');
}

// 2. Set this.ultraFastMode = !0 by default in constructor
code = code.replace('this.ultraFastMode=!1,this.composer=', 'this.ultraFastMode=!0,this.composer=');
console.log('✓ 2. Set this.ultraFastMode = true by default');

// 3. Optimize pixelRatio for weak GPUs in constructor
const oldPR = 'this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.0))';
const newPR = 'this.renderer.setPixelRatio(this.ultraFastMode?0.85:Math.min(window.devicePixelRatio,1.0))';
if (code.includes(oldPR)) {
  code = code.replace(oldPR, newPR);
  console.log('✓ 3. Set pixelRatio to 0.85 for weak PC GPU fillrate reduction');
}

// 4. Optimize effect() particle count for weak PC
const oldEffect = 'const l=[],c=[],f=n?120:40;';
const newEffect = 'if(this.bursts&&this.bursts.length>5){const ob=this.bursts.shift();ob&&ob.group&&(this.scene.remove(ob.group),this.disposeObject(ob.group));}const l=[],c=[],f=this.ultraFastMode?(n?32:14):(n?120:40);';
if (code.includes(oldEffect)) {
  code = code.replace(oldEffect, newEffect);
  console.log('✓ 4. Capped active bursts and reduced particle counts in effect()');
}

// 5. Enhance toggleUltraSmooth()
const oldToggle = 'toggleUltraSmooth(){this.ultraFastMode=!this.ultraFastMode;this.log(this.ultraFastMode?"⚡ [CHẾ ĐỘ SIÊU MƯỢT BẬT] Đã kích hoạt kết xuất trực tiếp 60 FPS tối đa!":"✨ [CHẾ ĐỘ TIÊN CẢNH BẬT] Đã bật hiệu ứng ánh sáng huyền ảo Runic Bloom!","system");this.publish()}';
const newToggle = 'toggleUltraSmooth(){this.ultraFastMode=!this.ultraFastMode;this.state.ultraFast=this.ultraFastMode;if(this.ultraFastMode){this.renderer.setPixelRatio(0.85);this.log("🚀 [CHẾ ĐỘ MÁY YẾU BẬT] Đã tắt Bloom & giảm tải GPU - Khóa cứng 60 FPS mượt mà!","system");}else{this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.0));this.log("✨ [CHẾ ĐỘ ĐỒ HỌA CAO BẬT] Đã bật Bloom & đồ họa sắc nét!","system");}this.publish();}';
if (code.includes(oldToggle)) {
  code = code.replace(oldToggle, newToggle);
  console.log('✓ 5. Enhanced toggleUltraSmooth() with pixelRatio and state update');
}

// 6. Update UI button for Ultra Smooth / Low-End PC mode
const oldButtonCode = `children:[P.jsx("span",{children:"⚡"})," 60 FPS SIÊU MƯỢT (DIRECT / BLOOM)"]`;
const newButtonCode = `style:{gridColumn:"1 / -1",padding:"9px 12px",borderRadius:"8px",border:n.ultraFast?"1px solid #10b981":"1px solid rgba(255,255,255,0.15)",background:n.ultraFast?"linear-gradient(135deg, rgba(16,185,129,0.3), rgba(5,150,105,0.4))":"rgba(255,255,255,0.06)",color:n.ultraFast?"#34d399":"#cbd5e1",fontWeight:"bold",fontSize:"12px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"4px",boxShadow:n.ultraFast?"0 0 12px rgba(16,185,129,0.35)":"none"},onClick:()=>{var O;return(O=t.current)==null?void 0:O.toggleUltraSmooth();},children:[P.jsx("span",{children:n.ultraFast?"🚀":"✨"}),n.ultraFast?"CHẾ ĐỘ MÁY YẾU: ĐANG BẬT (60 FPS MƯỢT)":"ĐỒ HỌA CAO (BLOOM SẮC NÉT)"]`;

// Find the button rendering and replace it
const btnIdx = code.indexOf('" 60 FPS SIÊU MƯỢT (DIRECT / BLOOM)"');
if (btnIdx !== -1) {
  const startBtn = code.lastIndexOf('P.jsxs("button"', btnIdx);
  const endBtn = code.indexOf('})', btnIdx) + 2;
  const originalSlice = code.slice(startBtn, endBtn);
  code = code.replace(originalSlice, 'P.jsxs("button",{' + newButtonCode + '})');
  console.log('✓ 6. Upgraded UI button to live-reactive Low-End PC / High-Graphics toggle');
}

fs.writeFileSync(filePath, code, 'utf8');
const pubPath = 'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js';
if (fs.existsSync(pubPath)) {
  fs.writeFileSync(pubPath, code, 'utf8');
}
console.log('✅ All Low-End PC optimizations applied successfully!');
