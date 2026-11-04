const fs = require('fs');

const filePath = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(filePath, 'utf8');

console.log('=== APPLYING 2-3 SECOND MID-AIR HOVER STRIKE ANIMATION ===');

const oldBlock = `if(o.attack){
  o.attack+=e;const h=o.attack;
  const isGift=o.isGift||o.skill!=="attack";
  const v=o.root.getObjectByName("swordArm");
  if(isGift){
    // TẶNG QUÀ / XU: BAY VÚT LÊN ĐỈNH ĐẦU BOSS (Y = 8.4M) CHÉM 1 CÁI PHÁT NỔ
    const d=h<.75?Math.min(1,h/.75):h>1.35?Math.max(0,1-(h-1.35)/.75):1,p=d*d*(3-2*d);
    const jumpArc=Math.sin(Math.min(1,Math.max(0,(h-.05)/2.05))*Math.PI);
    const soarY=Math.pow(jumpArc,.65)*8.4;
    o.root.position.lerpVectors(o.home,Ft(0,0,.35),p);
    o.root.position.y+=soarY;
    o.root.rotation.x=-Math.sin(p*Math.PI)*.65;
    if(v)v.rotation.x=-Math.sin(Math.min(1,Math.max(0,(h-.4)*3.5))*Math.PI)*2.8;
    if(h>.75&&!o.hit){
      o.hit=!0;const m=o.skill;
      let g=pr[m]?pr[m].damage:5000;
      if(o.isOpener||this.isOpeningCeremony){
        // Sát thương Đãi Ngộ Khai Trận Top 5: Chuẩn xác 1.3 / 4 cọc máu (Tổng 32.500 HP / 100.000 HP)
        const openerMap={ten_dragons:14000,single_dragon:8500,sword_rain:5200,giant_sword:3200,small:1600};
        if(openerMap[m]!==undefined)g=openerMap[m];
      }
      this.damage(g,l);
      this.effect(Ft(0,7.8,.2),"#fde047",!0,6.5);
      this.effect(Ft(0,7.2,.4),"#ec4899",!0,5.0);
      this.shake(.32,1.2);
    }
    if(h>2.1){
      o.attack=0;o.isGift=!1;o.root.position.copy(o.home);o.root.rotation.x=0;
      if(v)v.rotation.x=0;
      if(o.wings){o.root.remove(o.wings);this.disposeObject(o.wings);o.wings=null;}
      this.playClip(o.mixer,o.clips??[],"idle");
    }
  }else{
    const d=h<.65?Math.min(1,h/.65):h>1.15?Math.max(0,1-(h-1.15)/.7):1,p=d*d*(3-2*d);
    const jumpArc=Math.sin(Math.min(1,Math.max(0,(h-.08)/1.68))*Math.PI);
    const leapY=Math.pow(jumpArc,.72)*2.85;
    o.root.position.lerpVectors(o.home,Ft(o.home.x*.22,0,.35),p);
    o.root.position.y+=leapY;
    o.root.rotation.x=-Math.sin(p*Math.PI)*.28;
    if(v)v.rotation.x=-Math.sin(Math.min(1,Math.max(0,(h-.35)*3.2))*Math.PI)*2.4;
    if(h>.7&&!o.hit){
      o.hit=!0;
      const g=950+Math.round(this.state.energy*4);
      this.damage(g,l);
      this.effect(Ft(o.root.position.x,3.2,-.6),"#dbc0ff",!1,2.5);
    }
    if(h>1.85){
      o.attack=0;o.root.position.copy(o.home);o.root.rotation.x=0;
      if(v)v.rotation.x=0;
      this.playClip(o.mixer,o.clips??[],"idle");
    }
  }
}`;

const newBlock = `if(o.attack){
  o.attack+=e;const h=o.attack;
  const isGift=o.isGift||o.skill!=="attack";
  const v=o.root.getObjectByName("swordArm");
  if(isGift){
    // TẶNG QUÀ / TUYỆT KỸ: BAY VÚT LÊN (0.85s) -> DỪNG LƠ LỬNG TRÊN KHÔNG 2.5 GIÂY XUẤT CHIÊU (0.85s - 3.35s) -> HẠ CÁNH (3.35s - 4.2s)
    const d=h<.85?(h/.85):(h>3.35?Math.max(0,1-(h-3.35)/.85):1),p=d*d*(3-2*d);
    let soarY=0;
    if(h<.85){
      const t=h/.85;soarY=Math.sin(t*Math.PI*0.5)*8.8;
    }else if(h<=3.35){
      soarY=8.8+Math.sin((h-.85)*4.5)*0.22; // Bồng bềnh dừng lại trên không 2.5 giây
    }else if(h<=4.2){
      const t=Math.max(0,1-(h-3.35)/.85);soarY=Math.sin(t*Math.PI*0.5)*8.8;
    }
    o.root.position.lerpVectors(o.home,Ft(0,0,.35),p);
    o.root.position.y+=soarY;
    o.root.rotation.x=-Math.sin(p*Math.PI)*.55;
    if(v){
      if(h>=.85&&h<=3.35){
        v.rotation.x=-Math.sin((h-.85)*8.5)*2.8; // Vung kiếm liên hoàn trong 2.5 giây lơ lửng
      }else{
        v.rotation.x=-Math.sin(p*Math.PI)*1.5;
      }
    }
    if(h>1.2&&!o.hit){
      o.hit=!0;const m=o.skill;
      let g=pr[m]?pr[m].damage:5000;
      if(o.isOpener||this.isOpeningCeremony){
        const openerMap={ten_dragons:14000,single_dragon:8500,sword_rain:5200,giant_sword:3200,small:1600};
        if(openerMap[m]!==undefined)g=openerMap[m];
      }
      this.damage(g,l);
      this.effect(Ft(0,7.8,.2),"#fde047",!0,6.5);
      this.effect(Ft(0,7.2,.4),"#ec4899",!0,5.0);
      this.shake(.32,1.2);
    }
    if(h>4.2){
      o.attack=0;o.isGift=!1;o.root.position.copy(o.home);o.root.rotation.x=0;
      if(v)v.rotation.x=0;
      if(o.wings){o.root.remove(o.wings);this.disposeObject(o.wings);o.wings=null;}
      this.playClip(o.mixer,o.clips??[],"idle");
    }
  }else{
    // BÌNH LUẬN / CHÉM THƯỜNG: NHẢY LÊN (0.65s) -> DỪNG TRÊN KHÔNG 2.0 GIÂY CHÉM KIẾM (0.65s - 2.65s) -> ĐÁP XUỐNG (2.65s - 3.4s)
    const d=h<.65?(h/.65):(h>2.65?Math.max(0,1-(h-2.65)/.75):1),p=d*d*(3-2*d);
    let leapY=0;
    if(h<.65){
      const t=h/.65;leapY=Math.sin(t*Math.PI*0.5)*3.2;
    }else if(h<=2.65){
      leapY=3.2+Math.sin((h-.65)*5.0)*0.16; // Dừng trên không trung 2.0 giây
    }else if(h<=3.4){
      const t=Math.max(0,1-(h-2.65)/.75);leapY=Math.sin(t*Math.PI*0.5)*3.2;
    }
    o.root.position.lerpVectors(o.home,Ft(o.home.x*.22,0,.35),p);
    o.root.position.y+=leapY;
    o.root.rotation.x=-Math.sin(p*Math.PI)*.28;
    if(v){
      if(h>=.65&&h<=2.65){
        v.rotation.x=-Math.sin((h-.65)*8.0)*2.4; // Chém kiếm sắc lẹm trong 2.0 giây lơ lửng
      }else{
        v.rotation.x=-Math.sin(p*Math.PI)*1.2;
      }
    }
    if(h>.9&&!o.hit){
      o.hit=!0;
      const g=950+Math.round(this.state.energy*4);
      this.damage(g,l);
      this.effect(Ft(o.root.position.x,3.2,-.6),"#dbc0ff",!1,2.5);
    }
    if(h>3.4){
      o.attack=0;o.root.position.copy(o.home);o.root.rotation.x=0;
      if(v)v.rotation.x=0;
      this.playClip(o.mixer,o.clips??[],"idle");
    }
  }
}`;

if (code.includes(oldBlock)) {
  code = code.replace(oldBlock, newBlock);
  console.log('✓ Successfully replaced attack animation with 2-3s mid-air hover strike');
} else {
  console.error('❌ Could not find exact oldBlock match. Inspecting diff...');
  const idx = code.indexOf('if(o.attack){');
  console.log(code.slice(idx, idx + 300));
}

// Also update camera focus duration so the camera stays focused on the hovering player for the full 3.5s!
const oldCamTimer = 'this.cameraTimer=2.8';
if (code.includes(oldCamTimer)) {
  code = code.replace(oldCamTimer, 'this.cameraTimer=4.0');
  console.log('✓ Extended camera focus timer to 4.0s for hovering player');
}

fs.writeFileSync(filePath, code, 'utf8');
const pubPath = 'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js';
if (fs.existsSync(pubPath)) {
  fs.writeFileSync(pubPath, code, 'utf8');
}
console.log('✅ Client files saved!');
