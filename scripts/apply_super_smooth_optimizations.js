const fs = require('fs');

const path = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(path, 'utf8');
const originalLen = code.length;

// 1. Disable ShadowMap & Set Pixel Ratio to 1.0
const targetShadow = 'this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.25)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=og';
const replaceShadow = 'this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.0)),this.renderer.shadowMap.enabled=!1,this.renderer.shadowMap.type=og';
if (!code.includes(targetShadow)) {
  console.error('Target shadow not found!');
  process.exit(1);
}
code = code.replace(targetShadow, replaceShadow);
console.log('1. ShadowMap disabled & Pixel Ratio set to 1.0');

// 2. Composer bloomPass & Ultra Smooth support
const targetComposer = 'this.composer=new JE(this.renderer),this.composer.addPass(new YE(this.scene,this.camera)),this.composer.addPass(new xs(new ue(400,720),.34,.5,1.05)),this.composer.addPass(new KE)';
const replaceComposer = 'this.ultraFastMode=!1,this.composer=new JE(this.renderer),this.composer.addPass(new YE(this.scene,this.camera)),this.bloomPass=new xs(new ue(256,256),.28,.4,1.1),this.composer.addPass(this.bloomPass),this.composer.addPass(new KE)';
if (!code.includes(targetComposer)) {
  console.error('Target composer not found!');
  process.exit(1);
}
code = code.replace(targetComposer, replaceComposer);
console.log('2. Composer downscaled bloomPass configured');

// 3. Resize optimization for Bloom
const targetResize = 'this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.composer.setSize(e,t)';
const replaceResize = 'this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t);const bw=Math.min(Math.round(e*.35),320),bh=Math.min(Math.round(t*.35),320);this.composer.setSize(e,t);if(this.bloomPass)this.bloomPass.setSize(bw,bh)';
if (!code.includes(targetResize)) {
  console.error('Target resize not found!');
  process.exit(1);
}
code = code.replace(targetResize, replaceResize);
console.log('3. Resize capped bloom resolution');

// 4. Render loop ultraFastMode direct render
const targetRender = 'this.composer.render(),this.publishTimer+=e';
const replaceRender = 'if(this.ultraFastMode){this.renderer.render(this.scene,this.camera)}else{this.composer.render()}this.publishTimer+=e';
if (!code.includes(targetRender)) {
  console.error('Target render loop not found!');
  process.exit(1);
}
code = code.replace(targetRender, replaceRender);
console.log('4. Render loop supports direct rendering');

// 5. BuildCrowd initial count 2000 & MeshBasicMaterial
const targetInitialCrowd = 'this.buildCrowd(10000);this.stars=this.buildSky()';
const replaceInitialCrowd = 'this.buildCrowd(2000);this.stars=this.buildSky()';
if (!code.includes(targetInitialCrowd)) {
  console.error('Target initial crowd not found!');
  process.exit(1);
}
code = code.replace(targetInitialCrowd, replaceInitialCrowd);

const targetCrowdMat = 'const curTex=textures[t],mat=new dn({map:curTex,transparent:!0,alphaTest:.08,side:2,roughness:.35,metalness:.08,emissive:new Ne(16777215),emissiveMap:curTex,emissiveIntensity:.25});';
const replaceCrowdMat = 'const curTex=textures[t],mat=new ii({map:curTex,transparent:!0,alphaTest:.18,side:0,depthWrite:!1});';
if (!code.includes(targetCrowdMat)) {
  console.error('Target crowd material not found!');
  process.exit(1);
}
code = code.replace(targetCrowdMat, replaceCrowdMat);
console.log('5. Crowd optimized with MeshBasicMaterial + FrontSide + alphaTest');

// 6. Pillar chains InstancedMesh
const targetPillarLoop = `    // Mắt xích vàng phong ấn đan xen 90 độ dọc theo đường cong
    const linkGeom=new Wn(0.25,0.065,8,14);
    const count=36;
    for(let i=0;i<=count;i++){
      const u=i/count;
      const pos=curve.getPointAt(u);
      const tan=curve.getTangentAt(u);
      const link=new mt(linkGeom,chainMat);
      link.position.copy(pos);
      link.quaternion.setFromUnitVectors(Ft(0,0,1),tan);
      if(i%2===0)link.rotateZ(Math.PI/2);
      link.castShadow=!1,grp.add(link);
    }`;

const replacePillarLoop = `    // Mắt xích vàng phong ấn (InstancedMesh: 1 draw call thay vì 37)
    const linkGeom=new Wn(0.25,0.065,8,14);
    const count=36;
    const instLink=new Bl(linkGeom,chainMat,count+1);
    instLink.castShadow=!1,instLink.receiveShadow=!1;
    const dummyL=new cn;
    for(let i=0;i<=count;i++){
      const u=i/count;
      const pos=curve.getPointAt(u);
      const tan=curve.getTangentAt(u);
      dummyL.position.copy(pos);
      dummyL.quaternion.setFromUnitVectors(Ft(0,0,1),tan);
      if(i%2===0)dummyL.rotateZ(Math.PI/2);
      dummyL.updateMatrix();
      instLink.setMatrixAt(i,dummyL.matrix);
    }
    instLink.instanceMatrix.needsUpdate=!0;
    grp.add(instLink);`;

if (!code.includes(targetPillarLoop)) {
  console.error('Target pillar loop not found!');
  process.exit(1);
}
code = code.replace(targetPillarLoop, replacePillarLoop);
console.log('6. Pillar chains converted to InstancedMesh');

// 7. Player GLTF shadows disable in loadPrebuiltPlayerModels
const targetPlayerShadows = `scene.traverse(m=>{
          if(m instanceof mt){
            m.castShadow=!0;
            m.receiveShadow=!0;`;
const replacePlayerShadows = `scene.traverse(m=>{
          if(m instanceof mt){
            m.castShadow=!1;
            m.receiveShadow=!1;`;
if (!code.includes(targetPlayerShadows)) {
  console.error('Target player shadows not found!');
  process.exit(1);
}
code = code.replace(targetPlayerShadows, replacePlayerShadows);
console.log('7. Player GLTF castShadow disabled');

// 8. Spawn & AddPlayer 3D Model Capping (Max 12 foreground 3D models)
const targetSpawn = `  const ros=this.playerRoster||[],curTmpl=ros.length>0?ros[n%ros.length].template:(this.playerTemplate||null);
  const r=curTmpl?p0(curTmpl):SP(n);`;
const replaceSpawn = `  const max3D=12;
  const ros=this.playerRoster||[],curTmpl=n<max3D?(ros.length>0?ros[n%ros.length].template:(this.playerTemplate||null)):null;
  const r=curTmpl?p0(curTmpl):SP(n);`;
if (!code.includes(targetSpawn)) {
  console.error('Target spawn not found!');
  process.exit(1);
}
code = code.replace(targetSpawn, replaceSpawn);

const targetAddPlayer = `  }else{
    const start=this.actors.size;
    for(let i=1;i<=count;i++)this.spawn(\`\${base}.\${start+i}\`);
    this.state.recentJoin={username:\`@\${base}\`,count:count,time:Date.now()};
    this.log(\`+\${count.toLocaleString()}`;

const replaceAddPlayer = `  }else{
    const start=this.actors.size;
    const canSpawn3D=Math.max(0,12-start);
    const spawnNum=Math.min(count,canSpawn3D);
    for(let i=1;i<=spawnNum;i++)this.spawn(\`\${base}.\${start+i}\`);
    for(let i=spawnNum+1;i<=count;i++){
      const fakeName=\`\${base}.\${start+i}\`;
      this.state.players.push({username:fakeName,avatar:null,damage:0,hp:100,color:(start+i)%8});
    }
    this.setCrowdCount(Math.min(10000,this.crowdCount+count));
    this.state.recentJoin={username:\`@\${base}\`,count:count,time:Date.now()};
    this.log(\`+\${count.toLocaleString()}`;

if (!code.includes(targetAddPlayer)) {
  console.error('Target addPlayer not found!');
  process.exit(1);
}
code = code.replace(targetAddPlayer, replaceAddPlayer);
console.log('8. Spawn and AddPlayer capped to 12 3D models max');

// 9. Boss veil traverse caching & loop throttling
const targetBossVeil = `this.boss.traverse(o=>{if(o.name==="veil"&&o instanceof mt&&o.userData.original instanceof Float32Array){const l=o.geometry.attributes.position,c=o.userData.original;for(let f=0;f<l.count;f++)l.setZ(f,c[f*3+2]+Math.sin(s*1.7+c[f*3]*3+c[f*3+1])*.045);l.needsUpdate=!0}})`;
const replaceBossVeil = `if(!this._bossVeil&&this.boss){this.boss.traverse(o=>{if(o.name==="veil"&&o instanceof mt&&o.userData.original instanceof Float32Array)this._bossVeil=o})}if(this._bossVeil){const l=this._bossVeil.geometry.attributes.position,c=this._bossVeil.userData.original;for(let f=0;f<l.count;f++)l.setZ(f,c[f*3+2]+Math.sin(s*1.7+c[f*3]*3+c[f*3+1])*.045);l.needsUpdate=!0}`;
if (!code.includes(targetBossVeil)) {
  console.error('Target boss veil not found!');
  process.exit(1);
}
code = code.replace(targetBossVeil, replaceBossVeil);

// Spirit sparks throttling to every 2nd frame
const targetSparks = `this.spiritSparks&&(function(sp){`;
const replaceSparks = `if(!this._simFrame)this._simFrame=0;this._simFrame++;this.spiritSparks&&(this._simFrame%2===0)&&(function(sp){`;
if (!code.includes(targetSparks)) {
  console.error('Target sparks not found!');
  process.exit(1);
}
code = code.replace(targetSparks, replaceSparks);
console.log('9. Boss veil cached & spirit sparks throttled to alternate frames');

// 10. Add toggleUltraSmooth() method to RP class
const targetMethod = `setCrowdCount(num){`;
const replaceMethod = `toggleUltraSmooth(){this.ultraFastMode=!this.ultraFastMode;this.log(this.ultraFastMode?"⚡ [CHẾ ĐỘ SIÊU MƯỢT BẬT] Đã kích hoạt kết xuất trực tiếp 60 FPS tối đa!":"✨ [CHẾ ĐỘ TIÊN CẢNH BẬT] Đã bật hiệu ứng ánh sáng huyền ảo Runic Bloom!","system");this.publish()}setCrowdCount(num){`;
if (!code.includes(targetMethod)) {
  console.error('Target method not found!');
  process.exit(1);
}
code = code.replace(targetMethod, replaceMethod);
console.log('10. toggleUltraSmooth method added');

// 11. Add UI Button on Control Panel
const targetUIButton = `onClick:()=>{var O;return(O=t.current)==null?void 0:O.triggerNewMatchTopSkills();},
  children:[P.jsx("span",{children:"👑"})," Đãi Ngộ Khai Trận Top 1 - 5 (1/3 Sức Mạnh Chuẩn)"]
}),`;

const replaceUIButton = `onClick:()=>{var O;return(O=t.current)==null?void 0:O.triggerNewMatchTopSkills();},
  children:[P.jsx("span",{children:"👑"})," Đãi Ngộ Khai Trận Top 1 - 5 (1/3 Sức Mạnh Chuẩn)"]
}),P.jsxs("button",{
  className:"ultra-smooth-toggle-btn",
  style:{gridColumn:"1 / -1",background:"linear-gradient(135deg, rgba(16,185,129,0.22), rgba(6,182,212,0.18))",border:"1px solid rgba(16,185,129,0.55)",color:"#6ee7b7",padding:"9px 12px",borderRadius:"8px",fontWeight:"bold",fontSize:"12px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"4px",boxShadow:"0 2px 8px rgba(16,185,129,0.2)"},
  onClick:()=>{var O;return(O=t.current)==null?void 0:O.toggleUltraSmooth();},
  children:[P.jsx("span",{children:"⚡"})," 60 FPS SIÊU MƯỢT (DIRECT / BLOOM)"]
}),`;

if (!code.includes(targetUIButton)) {
  console.error('Target UI button not found!');
  process.exit(1);
}
code = code.replace(targetUIButton, replaceUIButton);
console.log('11. UI Ultra Smooth button added to control panel');

// Write back to file
fs.writeFileSync(path, code, 'utf8');
console.log('Successfully updated index-CT5dfJfs.js! Old len:', originalLen, 'New len:', code.length);
