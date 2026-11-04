const fs = require('fs');

const filePath = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(filePath, 'utf8');

console.log('=== FIXING PLAYER VISIBILITY & CAMERA TRACKING DURING MID-AIR HOVER ===');

// 1. In spawn(e, t), ensure ALL player meshes have frustumCulled = false, renderOrder = 10, DoubleSide
const oldSpawnTemplate = `const ros=this.playerRoster||[],curTmpl=n<max3D?(ros.length>0?ros[n%ros.length].template:(this.playerTemplate||null)):null;
  const r=curTmpl?p0(curTmpl):SP(n);
  r.scale.setScalar(.62);`;

const newSpawnTemplate = `const ros=this.playerRoster||[],curTmpl=(ros.length>0)?ros[n%ros.length].template:(this.playerTemplate||null);
  const r=curTmpl?p0(curTmpl):SP(n);
  r.scale.setScalar(.62);
  r.renderOrder=10;
  r.traverse(ch=>{
    if(ch.isMesh||ch instanceof mt){
      ch.frustumCulled=!1;
      ch.castShadow=!1;
      ch.receiveShadow=!1;
      if(ch.material){
        ch.material.side=2;
        ch.material.depthWrite=!0;
      }
    }
  });`;

if (code.includes(oldSpawnTemplate)) {
  code = code.replace(oldSpawnTemplate, newSpawnTemplate);
  console.log('✓ 1. Upgraded spawn() to give all players 3D models with frustumCulled=false and renderOrder=10');
} else {
  console.log('⚠️ Could not find exact oldSpawnTemplate, searching partial...');
  const idx = code.indexOf('const r=curTmpl?p0(curTmpl):SP(n);');
  console.log('Found at:', idx);
  if (idx !== -1) {
    const start = code.lastIndexOf('const ros=', idx);
    const end = idx + 'const r=curTmpl?p0(curTmpl):SP(n);\n  r.scale.setScalar(.62);'.length;
    code = code.slice(0, start) + newSpawnTemplate + code.slice(end);
    console.log('✓ 1. Replaced spawn template via partial slice');
  }
}

// 2. In loadPrebuiltPlayerModels, ensure frustumCulled = false on template meshes
const oldTraverse = `scene.traverse(m=>{
          if(m instanceof mt){
            m.castShadow=!1;
            m.receiveShadow=!1;
            if(m.material){
              m.material.side=2;
              m.material.roughness=0.38;
              m.material.metalness=0.3;
            }
          }
        });`;

const newTraverse = `scene.traverse(m=>{
          if(m instanceof mt){
            m.castShadow=!1;
            m.receiveShadow=!1;
            m.frustumCulled=!1;
            m.renderOrder=10;
            if(m.material){
              m.material.side=2;
              m.material.roughness=0.38;
              m.material.metalness=0.3;
              m.material.depthWrite=!0;
            }
          }
        });`;

if (code.includes(oldTraverse)) {
  code = code.replace(oldTraverse, newTraverse);
  console.log('✓ 2. Added frustumCulled=false and renderOrder=10 in loadPrebuiltPlayerModels');
} else {
  console.log('⚠️ Could not find exact oldTraverse');
}

// 3. Dynamic Crane Camera Tracking in animate ticker
const oldCamTrack = `if(this.targetActor&&this.targetActor.root&&this.cameraTimer>0){const curP=this.targetActor.root.position;this.lookTarget.lerp(Ft(curP.x,curP.y+1.25,curP.z),1-Math.exp(-e*5));}this.cameraTimer-=e,this.cameraTimer<=0&&this.state.camera!=="Chính diện"&&(this.targetActor=null,this.setCamera("main")),this.camera.position.lerp(this.cameraTarget,1-Math.exp(-e*3)),this.camera.lookAt(this.lookTarget),`;

const newCamTrack = `if(this.targetActor&&this.targetActor.root&&this.cameraTimer>0){const curP=this.targetActor.root.position;this.lookTarget.lerp(Ft(curP.x,curP.y+1.1,curP.z),1-Math.exp(-e*6));const isGift=this.targetActor.isGift||this.targetActor.skill!=="attack",camDistZ=isGift?5.6:4.8,camElevY=isGift?Math.max(3.2,curP.y-0.4):Math.max(2.4,curP.y+0.2),sideX=(curP.x>=0?1.5:-1.5)*(isGift?0.8:0.6),targetCamPos=Ft(curP.x*0.4+sideX,camElevY,curP.z+camDistZ);this.cameraTarget.lerp(targetCamPos,1-Math.exp(-e*5.5));}this.cameraTimer-=e,this.cameraTimer<=0&&this.state.camera!=="Chính diện"&&(this.targetActor=null,this.setCamera("main")),this.camera.position.lerp(this.cameraTarget,1-Math.exp(-e*3.5)),this.camera.lookAt(this.lookTarget),`;

if (code.includes(oldCamTrack)) {
  code = code.replace(oldCamTrack, newCamTrack);
  console.log('✓ 3. Upgraded to Dynamic Crane Camera Tracking - Character is ALWAYS 100% visible & centered!');
} else {
  console.error('❌ Could not find exact oldCamTrack match');
}

// 4. Update cameraTimer in setCamera so it stays on the player for the FULL hover duration (4.6s for gift, 3.6s for attack)
const oldSetCam = `this.cameraTimer = e === "gift" ? 3.0 : 1.8;`;
const newSetCam = `this.cameraTimer = e === "gift" ? 4.6 : 3.6;`;

if (code.includes(oldSetCam)) {
  code = code.replace(oldSetCam, newSetCam);
  console.log('✓ 4. Extended setCamera timer to 4.6s / 3.6s to match hover duration');
} else {
  console.log('⚠️ Could not find exact oldSetCam');
}

fs.writeFileSync(filePath, code, 'utf8');
const pubPath = 'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js';
if (fs.existsSync(pubPath)) {
  fs.writeFileSync(pubPath, code, 'utf8');
}
console.log('✅ Client files saved!');
