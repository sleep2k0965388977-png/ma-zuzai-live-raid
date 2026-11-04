const fs = require('fs');
const path = require('path');

const jsFiles = [
  path.join(__dirname, '..', 'assets', 'index-CT5dfJfs.js'),
  path.join(__dirname, '..', 'public', 'assets', 'index-CT5dfJfs.js')
];

const targetSpawn = `  // Vị trí ngẫu nhiên bất kỳ trên sàn đấu, không theo hàng lối từ trái qua phải
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
  const faceAngle=Math.atan2(-px,-(pz-(-1.8)));`;

const replaceSpawn = `  // Khu vực xuất hiện người chơi: phân bổ rộng khắp sàn đấu theo đúng khung xanh (Z: 2.5m - 20.0m, X: -16m đến +16m)
  let px=0, pz=0, attempts=0, foundSpot=!1;
  const minR=7.5, maxR=21.0;
  while(attempts<35&&!foundSpot){
    attempts++;
    const rad=minR+Math.random()*(maxR-minR);
    const ang=(Math.random()-0.5)*2.15;
    const testX=Math.sin(ang)*rad+(Math.random()-0.5)*1.2;
    const testZ=Math.cos(ang)*rad-1.6+(Math.random()-0.5)*1.2;
    let tooClose=!1;
    for(const act of this.actors.values()){
      if(act&&act.home){
        const dx=act.home.x-testX, dz=act.home.z-testZ;
        if(dx*dx+dz*dz<1.85){tooClose=!0;break;}
      }
    }
    if(!tooClose||attempts>=34){
      px=testX; pz=testZ; foundSpot=!0;
    }
  }
  const o=Ft(px,0,pz);
  r.position.copy(o);
  // Nhân vật tự động quay mặt hướng về Ma Tôn ở (0, 0, -1.6)
  const faceAngle=Math.atan2(-px,-(pz-(-1.6)));`;

for (const jsFile of jsFiles) {
  let code = fs.readFileSync(jsFile, 'utf8');
  if (!code.includes(targetSpawn)) {
    throw new Error(`targetSpawn block not found in ${jsFile}`);
  }
  code = code.replace(targetSpawn, replaceSpawn);
  fs.writeFileSync(jsFile, code, 'utf8');
  console.log(`[✓] Successfully updated player spawn zone in ${jsFile}`);
}

// Update cache bust in index.html
const indexHtmlPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const now = Date.now();
indexHtml = indexHtml.replace(/index-CT5dfJfs\.js\?v=\d+/, `index-CT5dfJfs.js?v=${now}`);
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log(`[✓] Updated index.html cache bust to v=${now}`);
