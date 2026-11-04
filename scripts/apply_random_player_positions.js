const fs = require('fs');

const path = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(path, 'utf8');

// Target position calculation in spawn
const targetPositioning = `  const ring=Math.floor(Math.sqrt(n)*1.35);
  const rad=3.6+ring*.75+((n*11)%5)*.04;
  const maxAngle=1.15;
  const golden=2.399963;
  const ang=((n*golden)%(maxAngle*2))-maxAngle;
  const o=Ft(Math.sin(ang)*rad,0,Math.cos(ang)*rad-1.8);
  r.position.copy(o),r.rotation.y=Math.PI+ang*.82,this.scene.add(r);`;

const replacePositioning = `  // Vị trí ngẫu nhiên bất kỳ trên sàn đấu, không theo hàng lối từ trái qua phải
  let px=0, pz=0, attempts=0, foundSpot=!1;
  const minR=3.6, maxR=13.2;
  while(attempts<15&&!foundSpot){
    attempts++;
    const rad=minR+Math.random()*(maxR-minR);
    const ang=(Math.random()-0.5)*2.65;
    const testX=Math.sin(ang)*rad+(Math.random()-0.5)*0.9;
    const testZ=Math.cos(ang)*rad-1.8+(Math.random()-0.5)*0.9;
    let tooClose=!1;
    for(const act of this.actors.values()){
      if(act&&act.home){
        const dx=act.home.x-testX, dz=act.home.z-testZ;
        if(dx*dx+dz*dz<0.85){tooClose=!0;break;}
      }
    }
    if(!tooClose||attempts>=14){
      px=testX; pz=testZ; foundSpot=!0;
    }
  }
  const o=Ft(px,0,pz);
  r.position.copy(o);
  // Nhân vật tự động quay mặt hướng về Ma Tôn ở (0, 0, -1.8)
  const faceAngle=Math.atan2(-px,-(pz-(-1.8)));
  r.rotation.y=faceAngle;
  this.scene.add(r);`;

if (!code.includes(targetPositioning)) {
  console.error('Target positioning not found in spawn!');
  process.exit(1);
}
code = code.replace(targetPositioning, replacePositioning);
console.log('1. Replaced sequential arc positioning with organic random scattering');

// Update label check from n<60 to n<16
const targetLabelCheck = 'if(n<60){';
const replaceLabelCheck = 'if(n<16){';

if (!code.includes(targetLabelCheck)) {
  console.error('Target label check not found!');
  process.exit(1);
}
code = code.replace(targetLabelCheck, replaceLabelCheck);
console.log('2. Clamped floating labels to 16 to avoid screen clutter');

fs.writeFileSync(path, code, 'utf8');
console.log('Successfully written random player positioning to index-CT5dfJfs.js!');
