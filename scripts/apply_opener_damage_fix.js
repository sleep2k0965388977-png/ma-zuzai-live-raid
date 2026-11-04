const fs = require('fs');

const filePath = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(filePath, 'utf8');

console.log('=== CALIBRATING TOP 5 OPENER DAMAGE TO EXACTLY 1.3 / 4 BARS ===');

// 1. Pass isOpener to t in consume(e)
const oldAssign = 't.attack=.001,t.hit=!1,t.isGift=e.type==="gift",t.skill=e.type==="gift"?e.skill??"small":"attack";';
const newAssign = 't.attack=.001,t.hit=!1,t.isOpener=!!e.isOpener,t.isGift=e.type==="gift",t.skill=e.type==="gift"?e.skill??"small":"attack";';

if (code.includes(oldAssign)) {
  code = code.replace(oldAssign, newAssign);
  console.log('✓ 1. Passed isOpener onto actor t in consume()');
} else {
  console.log('⚠️ Could not find exact oldAssign');
}

// 2. Calibrate damage in o.attack for Top 5 Opener skills
const oldLeapDamage = `      o.hit=!0;const m=o.skill;
      const g=pr[m]?pr[m].damage:5000;
      this.damage(g,l);`;

const newLeapDamage = `      o.hit=!0;const m=o.skill;
      let g=pr[m]?pr[m].damage:5000;
      if(o.isOpener||this.isOpeningCeremony){
        // Sát thương Đãi Ngộ Khai Trận Top 5: Chuẩn xác 1.3 / 4 cọc máu (Tổng 32.500 HP / 100.000 HP)
        const openerMap={ten_dragons:14000,single_dragon:8500,sword_rain:5200,giant_sword:3200,small:1600};
        if(openerMap[m]!==undefined)g=openerMap[m];
      }
      this.damage(g,l);`;

if (code.includes(oldLeapDamage)) {
  code = code.replace(oldLeapDamage, newLeapDamage);
  console.log('✓ 2. Calibrated Top 5 opener skill damage in leap attack');
} else {
  console.log('⚠️ Could not find exact oldLeapDamage, searching partial...');
  const idx = code.indexOf('o.hit=!0;const m=o.skill;');
  console.log('Found at:', idx);
  if (idx !== -1) {
    const end = code.indexOf('this.damage(g,l);', idx) + 'this.damage(g,l);'.length;
    const slice = code.slice(idx, end);
    code = code.replace(slice, newLeapDamage);
    console.log('✓ 2. Replaced leap damage via slice match');
  }
}

// 3. Prevent duplicate double-dipping damage in activeSpecialSkills during Opening Ceremony
code = code.replace('this.damage(750);', 'if(!this.isOpeningCeremony&&!sk.isOpener)this.damage(750);');
code = code.replace('this.damage(2500);', 'if(!this.isOpeningCeremony&&!sk.isOpener)this.damage(2500);');
code = code.replace('this.damage(180);', 'if(!this.isOpeningCeremony&&!sk.isOpener)this.damage(180);');
code = code.replace('this.damage(1500);', 'if(!this.isOpeningCeremony&&!sk.isOpener)this.damage(1500);');
console.log('✓ 3. Prevented FX double-damage during Opening Ceremony');

// Write back
fs.writeFileSync(filePath, code, 'utf8');
const pubPath = 'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js';
if (fs.existsSync(pubPath)) {
  fs.writeFileSync(pubPath, code, 'utf8');
}
console.log('✅ Client files saved!');
