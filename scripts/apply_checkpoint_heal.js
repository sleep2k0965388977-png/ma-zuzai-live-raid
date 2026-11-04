const fs = require('fs');

const path = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(path, 'utf8');

// Inspect current damage method
const targetDamage = `damage(e,t="Đội hình"){if(this.state.defeated||this.state.failed)return;const n=Math.min(e,this.state.hp);this.state.hp-=n,this.state.lastDamage=n,this.state.lastAttacker=t,this.state.combo++;const r=this.state.players.find(a=>a.username===t);r&&(r.damage+=n);const s=EP.phase(this.state.hp,this.state.maxHp);s!==this.state.phase&&(this.state.phase=s,this.log(\`MA ZUZAI chuyển sang giai đoạn \${s}!\`,"boss"),this.effect(Ft(0,3,-1),"#ff3f99",!0,5),this.setCamera("phase"),this.playClip(this.bossMixer,this.bossClips,\`phase\${s}\`)),this.state.hp||(this.state.defeated=!0,this.queue.clear(),this.log("MA ZUZAI đã bị đánh bại. Chiến thắng!","win"),this.effect(Ft(0,5,-1),"#ffa5e8",!0,7),this.setCamera("phase"),this.playClip(this.bossMixer,this.bossClips,"death")),this.publish()}`;

const replaceDamage = `damage(e,t="Đội hình"){
  if(this.state.defeated||this.state.failed)return;
  const n=Math.min(e,this.state.hp);
  this.state.hp-=n,this.state.lastDamage=n,this.state.lastAttacker=t,this.state.combo++;
  const r=this.state.players.find(a=>a.username===t);r&&(r.damage+=n);

  const threshold=this.state.maxHp*0.25; // Chấm vàng cuối cùng (25% = 25.000 HP)
  if(this.state.hp<=threshold&&this.state.phase<4){
    const nextPhase=this.state.phase+1;
    this.state.phase=nextPhase;
    this.state.hp=this.state.maxHp; // TỰ ĐỘNG HỒI MÁU THÊM 1 CỌC (gọi là 2/4, 3/4, 4/4)
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
  }
  this.publish();
}`;

if (!code.includes(targetDamage)) {
  console.error('Target damage method not found!');
  process.exit(1);
}
code = code.replace(targetDamage, replaceDamage);
console.log('1. Updated damage method with 25% threshold auto-heal into next cọc (2/4, 3/4, 4/4)');

// Update setPhase so each phase starts with full 100k HP bar
const targetSetPhase = `setPhase(e){this.state.defeated=!1,this.bossAnchor.visible=!0,this.bossAnchor.scale.setScalar(1.85),this.state.hp=e===2?69e3:e===3?39e3:9e3,this.state.phase=e,this.effect(Ft(0,3,-1),"#ff3f99",!0,5),this.log(\`Bắt đầu giai đoạn \${e}.\`,"boss"),this.setCamera("phase"),this.publish()}`;
const replaceSetPhase = `setPhase(e){this.state.defeated=!1,this.bossAnchor.visible=!0,this.bossAnchor.scale.setScalar(1.85),this.state.hp=this.state.maxHp,this.state.phase=e,this.effect(Ft(0,3,-1),"#ff3f99",!0,5),this.log(\`Bắt đầu cọc máu 0\${e} / 04.\`,"boss"),this.setCamera("phase"),this.publish()}`;

if (!code.includes(targetSetPhase)) {
  console.error('Target setPhase not found!');
  process.exit(1);
}
code = code.replace(targetSetPhase, replaceSetPhase);
console.log('2. Updated setPhase to full HP bar per cọc');

// Update header badge to show Cọc 0{phase} / 04
const targetHeader = `P.jsxs("span",{className:"phase-pill",children:["🔥 GIAI ĐOẠN 0",n.phase," · ",jp[n.phase-1]]})`;
const replaceHeader = `P.jsxs("span",{className:"phase-pill",children:["🔥 CỌC MÁU 0",n.phase," / 04 · ",jp[n.phase-1]]})`;

if (code.includes(targetHeader)) {
  code = code.replace(targetHeader, replaceHeader);
  console.log('3. Updated header phase pill to display Cọc Máu 0X / 04');
}

fs.writeFileSync(path, code, 'utf8');
console.log('Successfully written to', path);
