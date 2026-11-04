const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'assets', 'index-CT5dfJfs.js'),
  path.join(__dirname, '..', 'public', 'assets', 'index-CT5dfJfs.js')
];

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');

  // 1. Mf initial state: add bossHealed: !1
  const targetMf = `const Mf=()=>({hp:1e5,maxHp:1e5,phase:1,`;
  const replaceMf = `const Mf=()=>({hp:1e5,maxHp:1e5,phase:1,bossHealed:!1,`;
  if (!code.includes(targetMf)) {
    throw new Error(`Target Mf not found in ${file}`);
  }
  code = code.replace(targetMf, replaceMf);

  // 2. Update damage method with 1-time heal at last pin (25%) up to middle pin (50%)
  const targetDamage = `  const threshold=this.state.maxHp*0.25; // Chấm vàng cuối cùng (25% = 25.000 HP)
  if(this.state.hp<=threshold&&this.state.phase<4){
    const nextPhase=this.state.phase+1;
    this.state.phase=nextPhase;
    this.state.hp=this.state.maxHp;this.audio&&(this.audio.playHealCheckpoint(),this.audio.playBossRoar("phase")); // TỰ ĐỘNG HỒI MÁU THÊM 1 CỌC (gọi là 2/4, 3/4, 4/4)
    this.log(\`🛡️ MA TÔN XUỐNG CHẤM VÀNG CUỐI CÙNG: TỰ ĐỘNG HỒI MÁU THÊM 1 CỌC (CỌC 0\${nextPhase} / 04)!\`,"boss");
    this.effect(Ft(0,3,-1),"#10b981",!0,7); // Hào quang hồi máu xanh ngọc bích
    this.effect(Ft(0,4,-1),"#f59e0b",!0,6); // Kim quang hộ thể bùng nổ
    this.shake(.45,1.8);
    this.setCamera("phase");
    this.playClip(this.bossMixer,this.bossClips,\`phase\${nextPhase}\`);
  }else if(this.state.phase>=4&&this.state.hp<=0){
    this.state.hp=0;
    this.state.defeated=!0;
    this.queue.clear();
    this.log("🎉 MA TÔN ĐÃ BỊ ĐÁNH BẠI HOÀN TOÀN! CHIẾN THẮNG!","win");
    this.effect(Ft(0,5,-1),"#ffa5e8",!0,7);
    this.setCamera("phase");
    this.playClip(this.bossMixer,this.bossClips,"death");
  }`;

  const replaceDamage = `  const threshold=this.state.maxHp*0.25; // Chấm vàng cuối cùng khoanh đỏ (25% = 25.000 HP)
  const midPoint=this.state.maxHp*0.5;   // Ô vàng ở giữa khung xanh (50% = 50.000 HP)

  // 1 TRẬN ĐẤU 1 TIẾNG CHỈ HỒI MÁU ĐÚNG 1 LẦN: Khi chạm chấm vàng cuối cùng (<= 25%), boss tự hồi máu chạm ô vàng ở giữa (50%)
  if(this.state.hp<=threshold && !this.state.bossHealed){
    this.state.bossHealed=!0;
    this.state.phase=2;
    this.state.hp=midPoint;
    this.audio&&(this.audio.playHealCheckpoint(),this.audio.playBossRoar("phase"));
    this.log("🛡️ MA TÔN XUỐNG CHẤM VÀNG CUỐI CÙNG: TỰ ĐỘNG HỒI MÁU LÊN Ô VÀNG Ở GIỮA (50%) - DUY NHẤT 1 LẦN TRONG TRẬN!","boss");
    this.effect(Ft(0,3,-1),"#10b981",!0,7); // Hào quang hồi máu xanh ngọc bích
    this.effect(Ft(0,4,-1),"#f59e0b",!0,6); // Kim quang hộ thể bùng nổ
    this.shake(.45,1.8);
    this.setCamera("phase");
    this.playClip(this.bossMixer,this.bossClips,"phase2");
  }else if(this.state.bossHealed && this.state.hp<=0){
    this.state.hp=0;
    this.state.defeated=!0;
    this.queue.clear();
    this.log("🎉 MA TÔN ĐÃ BỊ ĐÁNH BẠI HOÀN TOÀN! CHIẾN THẮNG!","win");
    this.effect(Ft(0,5,-1),"#ffa5e8",!0,7);
    this.setCamera("phase");
    this.playClip(this.bossMixer,this.bossClips,"death");
  }else if(!this.state.bossHealed && this.state.hp<=0){
    this.state.bossHealed=!0;
    this.state.phase=2;
    this.state.hp=midPoint;
    this.audio&&(this.audio.playHealCheckpoint(),this.audio.playBossRoar("phase"));
    this.log("🛡️ MA TÔN CHỊU ĐÒN CỰC ĐẠI: KÍCH HOẠT HỒI THỂ DUY NHẤT LÊN Ô VÀNG Ở GIỮA (50%)!","boss");
    this.effect(Ft(0,3,-1),"#10b981",!0,7);
    this.effect(Ft(0,4,-1),"#f59e0b",!0,6);
    this.shake(.45,1.8);
    this.setCamera("phase");
    this.playClip(this.bossMixer,this.bossClips,"phase2");
  }`;

  if (!code.includes(targetDamage)) {
    throw new Error(`Target damage block not found in ${file}`);
  }
  code = code.replace(targetDamage, replaceDamage);

  // 3. Update setPhase
  const targetSetPhase = `setPhase(e){this.state.defeated=!1,this.bossAnchor.visible=!0,this.bossAnchor.scale.setScalar(1.85),this.state.hp=this.state.maxHp,this.state.phase=e,this.effect(Ft(0,3,-1),"#ff3f99",!0,5),this.log(\`Bắt đầu cọc máu 0\${e} / 04.\`,"boss"),this.setCamera("phase"),this.publish()}`;
  const replaceSetPhase = `setPhase(e){this.state.defeated=!1,this.bossAnchor.visible=!0,this.bossAnchor.scale.setScalar(1.85);if(e>=2){this.state.phase=2,this.state.bossHealed=!0,this.state.hp=this.state.maxHp*0.5,this.log("Bắt đầu giai đoạn 02 / 02 (Thức tỉnh - Đã hồi thể 50%).","boss");}else{this.state.phase=1,this.state.bossHealed=!1,this.state.hp=this.state.maxHp,this.log("Bắt đầu giai đoạn 01 / 02 (Phong ấn).","boss");}this.effect(Ft(0,3,-1),"#ff3f99",!0,5),this.setCamera("phase"),this.publish()}`;
  if (!code.includes(targetSetPhase)) {
    throw new Error(`Target setPhase not found in ${file}`);
  }
  code = code.replace(targetSetPhase, replaceSetPhase);

  // 4. Update jp array
  const targetJp = `jp=["Phong ấn","Thức tỉnh","Cuồng nộ","Tận diệt"]`;
  const replaceJp = `jp=["Phong ấn","Thức tỉnh"]`;
  if (code.includes(targetJp)) {
    code = code.replace(targetJp, replaceJp);
  }

  // 5. Update phase-pill in header
  const targetPill = `P.jsxs("span",{className:"phase-pill",children:["🔥 CỌC MÁU 0",n.phase," / 04 · ",jp[n.phase-1]]})`;
  const replacePill = `P.jsxs("span",{className:"phase-pill",children:["🔥 GIAI ĐOẠN 0",n.phase," / 02 · ",jp[n.phase-1]||"Thức tỉnh"]})`;
  if (code.includes(targetPill)) {
    code = code.replace(targetPill, replacePill);
  }

  // 6. Update sidebar stat-row
  const targetSidebar = `P.jsxs("strong",{className:"purple",children:["0",n.phase," / 04"]})})`;
  const replaceSidebar = `P.jsxs("strong",{className:"purple",children:["0",n.phase," / 02"]})})`;
  if (code.includes(targetSidebar)) {
    code = code.replace(targetSidebar, replaceSidebar);
  }

  // 7. Update test button
  const targetBtn = `P.jsx("button",{onClick:()=>{var O;return(O=t.current)==null?void 0:O.setPhase(2)},children:"Giai đoạn 2"}),P.jsx("button",{onClick:()=>{var O;return(O=t.current)==null?void 0:O.setPhase(3)},children:"Giai đoạn 3"})`;
  const replaceBtn = `P.jsx("button",{onClick:()=>{var O;return(O=t.current)==null?void 0:O.setPhase(2)},children:"Giai đoạn 2 (Hồi 50%)"}),P.jsx("button",{onClick:()=>{var O;return(O=t.current)==null?void 0:O.setPhase(1)},children:"Giai đoạn 1 (100% HP)"})`;
  if (code.includes(targetBtn)) {
    code = code.replace(targetBtn, replaceBtn);
  }

  fs.writeFileSync(file, code, 'utf8');
  console.log(`Successfully updated ${file}`);
}

// 8. Update index.html cache bust timestamp
const indexHtmlPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const now = Date.now();
indexHtml = indexHtml.replace(/index-CT5dfJfs\.js\?v=\d+/, `index-CT5dfJfs.js?v=${now}`);
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log(`Updated index.html cache bust to v=${now}`);
