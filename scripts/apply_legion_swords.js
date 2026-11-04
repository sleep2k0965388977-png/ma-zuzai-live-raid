const fs = require('fs');

const path = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(path, 'utf8');

// 1. Hook into constructor: call this.initLegionSwords() after buildCrowd
const targetCrowdCall = 'this.buildCrowd(2000);this.stars=this.buildSky()';
const replaceCrowdCall = 'this.buildCrowd(2000);this.initLegionSwords(),this.stars=this.buildSky()';

if (!code.includes(targetCrowdCall)) {
  console.error('Target crowd call not found!');
  process.exit(1);
}
code = code.replace(targetCrowdCall, replaceCrowdCall);
console.log('1. Hooked initLegionSwords() into constructor');

// 2. Hook into animate() render loop: call this.updateLegionSwords(e)
const targetLoop = 'this.crowdMeshes&&this.crowdMeshes.forEach(cm=>{const sh=cm?.material?.userData?.shader;sh&&sh.uniforms&&(sh.uniforms.uTime&&(sh.uniforms.uTime.value=s),sh.uniforms.uCheer&&(sh.uniforms.uCheer.value=this.crowdCheer))}),';
const replaceLoop = 'this.crowdMeshes&&this.crowdMeshes.forEach(cm=>{const sh=cm?.material?.userData?.shader;sh&&sh.uniforms&&(sh.uniforms.uTime&&(sh.uniforms.uTime.value=s),sh.uniforms.uCheer&&(sh.uniforms.uCheer.value=this.crowdCheer))}),this.updateLegionSwords(e),';

if (!code.includes(targetLoop)) {
  console.error('Target render loop not found!');
  process.exit(1);
}
code = code.replace(targetLoop, replaceLoop);
console.log('2. Hooked updateLegionSwords(e) into render loop');

// 3. Hook into reset() method: clear/re-init legion swords
const targetReset = 'reset(){this.queue.clear(),';
const replaceReset = 'reset(){this.queue.clear(),this.initLegionSwords(),';

if (!code.includes(targetReset)) {
  console.error('Target reset not found!');
  process.exit(1);
}
code = code.replace(targetReset, replaceReset);
console.log('3. Hooked initLegionSwords() into reset()');

// 4. Define methods initLegionSwords() and updateLegionSwords(e) in RP class
const targetMethodLoc = 'toggleUltraSmooth(){';
const methodsCode = `initLegionSwords(){
  if(this.legionSwordsMesh){
    this.scene.remove(this.legionSwordsMesh);
    this.legionSwordsMesh.geometry&&this.legionSwordsMesh.geometry.dispose();
    this.legionSwordsMesh.material&&this.legionSwordsMesh.material.dispose();
  }
  const poolSize=65;
  this.legionSwordPoolSize=poolSize;
  const swGeo=new fr(0,0.08,1.35,4);
  swGeo.rotateX(Math.PI/2);
  const swMat=new ii({color:16777215,transparent:!0,opacity:0.95,blending:br});
  const inst=new Bl(swGeo,swMat,poolSize);
  inst.name="LegionBarrageSwords";
  inst.castShadow=!1;
  inst.receiveShadow=!1;

  const dummy=new cn();
  dummy.scale.set(0,0,0);
  dummy.updateMatrix();

  const colors=["#facc15","#38bdf8","#a855f7","#34d399","#f43f5e","#fde047","#60a5fa"];
  this.legionSwords=[];
  for(let i=0;i<poolSize;i++){
    inst.setMatrixAt(i,dummy.matrix);
    const colHex=colors[i%colors.length];
    inst.setColorAt(i,new Ne(colHex));
    this.legionSwords.push({
      active:!1,
      origin:new B(),
      target:new B(),
      progress:0,
      speed:1.0,
      arcHeight:1.0,
      color:colHex
    });
  }
  inst.instanceMatrix.needsUpdate=!0;
  if(inst.instanceColor)inst.instanceColor.needsUpdate=!0;
  this.scene.add(inst);
  this.legionSwordsMesh=inst;
  this.legionSwordTimer=0;
  this._legionDummy=dummy;
  this._lswP1=new B();
  this._lswP2=new B();
}
updateLegionSwords(e){
  if(!this.legionSwordsMesh||!this.legionSwords)return;
  if(this.state.defeated||this.state.paused)return;

  this.legionSwordTimer=(this.legionSwordTimer||0)-e;
  if(this.legionSwordTimer<=0){
    this.legionSwordTimer=0.045+Math.random()*0.085;
    const sword=this.legionSwords.find(s=>!s.active);
    if(sword){
      const maxR=Math.min(22,3.8+Math.sqrt(this.crowdCount||2000)*0.16);
      const r=3.6+Math.random()*(maxR-3.6);
      const ang=(Math.random()-0.5)*2.35;
      const originX=Math.sin(ang)*r+(Math.random()-0.5)*0.6;
      const originZ=Math.cos(ang)*r-1.8+(Math.random()-0.5)*0.6;
      const originY=0.6+Math.random()*0.9;

      const targetX=(Math.random()-0.5)*2.8;
      const targetY=1.8+Math.random()*3.6;
      const targetZ=-1.8+(Math.random()-0.5)*1.6;

      sword.active=!0;
      sword.origin.set(originX,originY,originZ);
      sword.target.set(targetX,targetY,targetZ);
      sword.progress=0;
      sword.speed=1.3+Math.random()*1.2;
      sword.arcHeight=0.4+Math.random()*2.2;
    }
  }

  const dummy=this._legionDummy||new cn();
  let hasUpdate=!1;
  const p1=this._lswP1||new B(),p2=this._lswP2||new B();

  for(let i=0;i<this.legionSwords.length;i++){
    const sw=this.legionSwords[i];
    if(!sw.active)continue;

    hasUpdate=!0;
    sw.progress+=e*sw.speed;

    if(sw.progress>=1.0){
      // HITS BOSS - NO DAMAGE (0 DMG, ambient combat effect only)
      sw.active=!1;
      dummy.scale.set(0,0,0);
      dummy.updateMatrix();
      this.legionSwordsMesh.setMatrixAt(i,dummy.matrix);

      if(Math.random()<0.25){
        this.effect(sw.target,sw.color,!1,0.6);
      }
    }else{
      p1.copy(sw.origin).lerp(sw.target,sw.progress);
      p1.y+=Math.sin(sw.progress*Math.PI)*sw.arcHeight;

      const nextProg=Math.min(1.0,sw.progress+0.04);
      p2.copy(sw.origin).lerp(sw.target,nextProg);
      p2.y+=Math.sin(nextProg*Math.PI)*sw.arcHeight;

      dummy.position.copy(p1);
      dummy.lookAt(p2);
      const sc=0.85+Math.sin(sw.progress*Math.PI*3)*0.15;
      dummy.scale.set(sc,sc,sc*1.3);
      dummy.updateMatrix();
      this.legionSwordsMesh.setMatrixAt(i,dummy.matrix);
    }
  }

  if(hasUpdate){
    this.legionSwordsMesh.instanceMatrix.needsUpdate=!0;
  }
}
toggleUltraSmooth(){`;

if (!code.includes(targetMethodLoc)) {
  console.error('Target method location not found!');
  process.exit(1);
}
code = code.replace(targetMethodLoc, methodsCode);
console.log('4. Defined initLegionSwords() and updateLegionSwords(e)');

fs.writeFileSync(path, code, 'utf8');
console.log('Successfully written legion swords system to index-CT5dfJfs.js!');
