const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '../assets/index-CT5dfJfs.js');
let code = fs.readFileSync(jsPath, 'utf8');

// 1. Update `pr` object
const oldPr = `const pr={small:{label:"Hoa hồng",damage:1800,energy:6},medium:{label:"Kiếm tiên",damage:6200,energy:12},large:{label:"Rồng thiên",damage:16e3,energy:20},ultimate:{label:"Thiên kiếp",damage:38e3,energy:30}};`;

const newPr = `const pr={
  small:{label:"5 Xu (Kiếm Vàng)",damage:2200,energy:6},
  giant_sword:{label:"20 Xu (Cự Kiếm)",damage:7500,energy:15},
  sword_rain:{label:"45 Xu (Mưa Kiếm)",damage:16e3,energy:25},
  single_dragon:{label:"80 Xu (1 Thần Long)",damage:28e3,energy:35},
  ten_dragons:{label:"150 Xu (10 Thần Long)",damage:68e3,energy:50},
  medium:{label:"Kiếm tiên",damage:6200,energy:12},
  large:{label:"Rồng thiên",damage:16e3,energy:20},
  ultimate:{label:"Thiên kiếp",damage:38e3,energy:30}
};`;

if (!code.includes(oldPr)) {
  console.error('ERROR: oldPr not found!');
  process.exit(1);
}
code = code.replace(oldPr, newPr);
console.log('1. Replaced pr dictionary successfully.');

// 2. Enhance setCamera(e) to support zooming to specific player actor
const oldSetCamera = `setCamera(e){
  this.cameraTimer=e==="ultimate"?2.6:e==="attack"?1.6:e==="gift"?1.8:0;
  this.state.camera=e==="ultimate"?"Thiên kiếp":e==="attack"?"Xuất kiếm":e==="gift"?"Kỹ năng":e==="phase"?"Giai đoạn trùm":"Chính diện";
  this.cameraTarget=e==="ultimate"?Ft(1.8,4.8,10.5):e==="attack"?Ft(0.8,2.9,8.2):e==="gift"?Ft(-1.5,6.5,12.5):e==="phase"?Ft(0,15.0,36.0):Ft(0,14.5,40.0);
  this.lookTarget=e==="attack"?Ft(0,2.2,0.4):e==="ultimate"?Ft(0,3.0,-0.4):e==="gift"?Ft(0,6.8,0.2):Ft(0,6.0,-1.8);
}`;

const newSetCamera = `setCamera(e, actor = null){
  if(actor && actor.root){
    this.targetActor = actor;
    const pPos = actor.home || actor.root.position;
    this.cameraTimer = e === "gift" ? 3.0 : 1.8;
    this.state.camera = e === "gift" ? \`Tuyệt kỹ @\${actor.username || ""}\` : \`Cận cảnh @\${actor.username || ""}\`;
    const sideOffset = pPos.x >= 0 ? 1.5 : -1.5;
    this.cameraTarget = Ft(pPos.x * 0.75 + sideOffset, Math.max(2.4, pPos.y + 1.9), pPos.z + 4.2);
    this.lookTarget = Ft(pPos.x, pPos.y + 1.25, pPos.z);
    return;
  }
  this.targetActor = null;
  this.cameraTimer = e === "ultimate" ? 2.6 : e === "attack" ? 1.6 : e === "gift" ? 2.2 : 0;
  this.state.camera = e === "ultimate" ? "Thiên kiếp" : e === "attack" ? "Xuất kiếm" : e === "gift" ? "Kỹ năng" : e === "phase" ? "Giai đoạn trùm" : "Chính diện";
  this.cameraTarget = e === "ultimate" ? Ft(1.8, 4.8, 10.5) : e === "attack" ? Ft(0.8, 2.9, 8.2) : e === "gift" ? Ft(-1.5, 6.5, 12.5) : e === "phase" ? Ft(0, 15.0, 36.0) : Ft(0, 14.5, 40.0);
  this.lookTarget = e === "attack" ? Ft(0, 2.2, 0.4) : e === "ultimate" ? Ft(0, 3.0, -0.4) : e === "gift" ? Ft(0, 6.8, 0.2) : Ft(0, 6.0, -1.8);
}`;

if (!code.includes(oldSetCamera)) {
  console.error('ERROR: oldSetCamera not found!');
  process.exit(1);
}
code = code.replace(oldSetCamera, newSetCamera);
console.log('2. Replaced setCamera successfully.');

// 3. Update camera tracking in render loop
const oldCamLoop = `this.cameraTimer-=e,this.cameraTimer<=0&&this.state.camera!=="Chính diện"&&this.setCamera("main"),this.camera.position.lerp(this.cameraTarget,1-Math.exp(-e*3)),this.camera.lookAt(this.lookTarget),`;

const newCamLoop = `if(this.targetActor&&this.targetActor.root&&this.cameraTimer>0){const curP=this.targetActor.root.position;this.lookTarget.lerp(Ft(curP.x,curP.y+1.25,curP.z),1-Math.exp(-e*5));}this.cameraTimer-=e,this.cameraTimer<=0&&this.state.camera!=="Chính diện"&&(this.targetActor=null,this.setCamera("main")),this.camera.position.lerp(this.cameraTarget,1-Math.exp(-e*3)),this.camera.lookAt(this.lookTarget),`;

if (!code.includes(oldCamLoop)) {
  console.error('ERROR: oldCamLoop not found!');
  process.exit(1);
}
code = code.replace(oldCamLoop, newCamLoop);
console.log('3. Replaced camera render loop successfully.');

// 4. Update consume(e) method to trigger effects and zoom to actor
const oldConsumeAction = `t.attack=.001,t.hit=!1,t.isGift=e.type==="gift",t.skill=e.type==="gift"?e.skill??"small":"attack",this.playClip(t.mixer,t.clips??[],t.skill==="attack"?"attack":"skill"),t.skill!=="attack"&&(this.state.lastGift=\`\${pr[t.skill].label} · @\${e.username}\`,this.state.energy=Math.min(100,this.state.energy+pr[t.skill].energy)),this.log(\`@\${e.username} · \${t.skill==="attack"?"xuất kiếm":pr[t.skill].label}\`,e.type),this.setCamera(t.skill==="ultimate"?"ultimate":t.skill==="attack"?"attack":"gift")`;

const newConsumeAction = `t.username=e.username,t.attack=.001,t.hit=!1,t.isGift=e.type==="gift",t.skill=e.type==="gift"?e.skill??"small":"attack",this.playClip(t.mixer,t.clips??[],t.skill==="attack"?"attack":"skill");const skInfo=pr[t.skill]||{label:t.skill,damage:5000,energy:15};if(t.isGift){this.state.lastGift=\`\${skInfo.label} · @\${e.username}\`,this.state.energy=Math.min(100,this.state.energy+(skInfo.energy||15)),this.log(\`@\${e.username} tặng [\${skInfo.label}] xuất tuyệt kỹ!\`,"gift");const pPos=t.home||t.root.position,bPos=Ft(0,3,-1.8);if(t.skill==="small"){this.createGoldenSlashFX(pPos,bPos,t);}else if(t.skill==="giant_sword"){this.createGiantSwordFX(bPos);}else if(t.skill==="sword_rain"){this.createSwordRainFX(pPos,bPos);}else if(t.skill==="single_dragon"){this.attachGoldenWings(t),this.createDragonFX(pPos.clone().add(Ft(0,2.5,0)),bPos,0.1,"#f59e0b",1.4);}else if(t.skill==="ten_dragons"){this.attachGoldenWings(t);for(let d=0;d<10;d++){const ang=(d/10)*Math.PI*2,r=24,start=Ft(Math.cos(ang)*r,16+(d%3)*3,Math.sin(ang)*r-1.8),cols=["#f59e0b","#fbbf24","#f43f5e","#ec4899","#a855f7","#38bdf8","#10b981","#eab308","#f97316","#ef4444"];this.createDragonFX(start,Ft(0,3+(d%2)*1.5,-1.8),d*.18,cols[d%cols.length],1.5);}}this.setCamera("gift",t);}else{this.log(\`@\${e.username} · xuất kiếm\`,e.type),this.setCamera("attack",t);}`;

if (!code.includes(oldConsumeAction)) {
  console.error('ERROR: oldConsumeAction not found!');
  process.exit(1);
}
code = code.replace(oldConsumeAction, newConsumeAction);
console.log('4. Replaced consume method successfully.');

// 5. Clean up wings when attack resets
const oldResetAttack = `if(h>2.1){
      o.attack=0;o.isGift=!1;o.root.position.copy(o.home);o.root.rotation.x=0;
      if(v)v.rotation.x=0;
      this.playClip(o.mixer,o.clips??[],"idle");
    }`;

const newResetAttack = `if(h>2.1){
      o.attack=0;o.isGift=!1;o.root.position.copy(o.home);o.root.rotation.x=0;
      if(v)v.rotation.x=0;
      if(o.wings){o.root.remove(o.wings);this.disposeObject(o.wings);o.wings=null;}
      this.playClip(o.mixer,o.clips??[],"idle");
    }`;

if (!code.includes(oldResetAttack)) {
  console.error('ERROR: oldResetAttack not found!');
  process.exit(1);
}
code = code.replace(oldResetAttack, newResetAttack);
console.log('5. Replaced resetAttack successfully.');

fs.writeFileSync(jsPath, code, 'utf8');
console.log('ALL DONE SUCCESSFULLY!');