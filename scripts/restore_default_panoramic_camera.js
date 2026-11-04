const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'assets', 'index-CT5dfJfs.js'),
  path.join(__dirname, '..', 'public', 'assets', 'index-CT5dfJfs.js')
];

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');

  // 1. Remove getAdaptiveCameraTargets and restore clean setZoom
  const targetMethods = `getAdaptiveCameraTargets(){
  if(this.manualZoom&&this.manualZoom!=="auto"){
    const d=typeof this.manualZoom==="number"?this.manualZoom:18.0;
    const r=(d-6)/(45-6);
    return {
      camPos:Ft(0,3.2+r*11.3,d),
      lookPos:Ft(0,2.5+r*3.5,r*-1.8),
      modeName:\`Thủ công (\${d}m)\`,
      dist:d
    };
  }
  const count=Math.max(this.state.players.length,this.state.viewerCount||0);
  const isTeam=count<=100;
  const d=isTeam?18.0:35.0;
  const r=(d-6)/(45-6);
  return {
    camPos:Ft(0,3.2+r*11.3,d),
    lookPos:Ft(0,2.5+r*3.5,r*-1.8),
    modeName:isTeam?\`Toàn đội 18m (\${count} người)\`:\`Toàn cảnh 35m (\${count} người)\`,
    dist:d,
    isTeam:isTeam
  };
}
setZoom(dist){
  if(dist==="auto"||dist===0){
    this.manualZoom=null;
    const adapt=this.getAdaptiveCameraTargets();
    this.cameraTarget.copy(adapt.camPos);
    this.lookTarget.copy(adapt.lookPos);
    this.log(\`📷 Đã bật chế độ Góc Quay Tự Động: 1-100 người (18m) | >100 người (35m)\`,"system");
  }else{
    this.manualZoom=dist;
    const d=Math.max(6,Math.min(45,Number(dist)));
    const ratio=(d-6)/(45-6);
    this.cameraTarget.set(0,3.2+ratio*11.3,d);
    this.lookTarget.set(0,2.5+ratio*3.5,ratio*-1.8);
    this.log(\`📷 Đã chuyển sang góc quay thủ công: \${d}m\`,"system");
  }
  this.publish();
}`;

  const replaceMethods = `setZoom(dist){
  const d=Math.max(6,Math.min(45,Number(dist)||40.0));
  const ratio=(d-6)/(45-6);
  this.cameraTarget.set(0,3.2+ratio*11.3,d);
  this.lookTarget.set(0,2.5+ratio*3.5,ratio*-1.8);
  this.log(\`📷 Đã chuyển sang góc quay: \${d}m\`,"system");
  this.publish();
}`;

  if (!code.includes(targetMethods)) {
    throw new Error(`Target camera methods not found in ${file}`);
  }
  code = code.replace(targetMethods, replaceMethods);

  // 2. Restore setCamera to default panoramic main view (z=40.0, y=14.5)
  const targetSetCam = `const _adapt=this.getAdaptiveCameraTargets();
  this.state.camera = e === "ultimate" ? "Thiên kiếp" : e === "attack" ? "Xuất kiếm" : e === "gift" ? "Kỹ năng" : e === "phase" ? "Giai đoạn trùm" : _adapt.modeName;
  this.cameraTarget = e === "ultimate" ? Ft(1.8, 4.8, 10.5) : e === "attack" ? Ft(0.8, 2.9, 8.2) : e === "gift" ? Ft(-1.5, 6.5, 12.5) : e === "phase" ? Ft(0, 15.0, 36.0) : _adapt.camPos;
  this.lookTarget = e === "attack" ? Ft(0, 2.2, 0.4) : e === "ultimate" ? Ft(0, 3.0, -0.4) : e === "gift" ? Ft(0, 6.8, 0.2) : _adapt.lookPos;`;

  const replaceSetCam = `this.state.camera = e === "ultimate" ? "Thiên kiếp" : e === "attack" ? "Xuất kiếm" : e === "gift" ? "Kỹ năng" : e === "phase" ? "Giai đoạn trùm" : "Chính diện";
  this.cameraTarget = e === "ultimate" ? Ft(1.8, 4.8, 10.5) : e === "attack" ? Ft(0.8, 2.9, 8.2) : e === "gift" ? Ft(-1.5, 6.5, 12.5) : e === "phase" ? Ft(0, 15.0, 36.0) : Ft(0, 14.5, 40.0);
  this.lookTarget = e === "attack" ? Ft(0, 2.2, 0.4) : e === "ultimate" ? Ft(0, 3.0, -0.4) : e === "gift" ? Ft(0, 6.8, 0.2) : Ft(0, 6.0, -1.8);`;

  if (!code.includes(targetSetCam)) {
    throw new Error(`Target setCam not found in ${file}`);
  }
  code = code.replace(targetSetCam, replaceSetCam);

  // 3. Restore render loop camera glide
  const targetLoopGlide = `this.cameraTimer-=e,this.cameraTimer<=0&&(this.targetActor=null,!this.manualZoom&&(function(self){const ad=self.getAdaptiveCameraTargets();self.cameraTarget.lerp(ad.camPos,1-Math.exp(-e*2.2));self.lookTarget.lerp(ad.lookPos,1-Math.exp(-e*2.2));})(this)),this.camera.position.lerp(this.cameraTarget,1-Math.exp(-e*3.5)),this.camera.lookAt(this.lookTarget),`;
  const replaceLoopGlide = `this.cameraTimer-=e,this.cameraTimer<=0&&this.state.camera!=="Chính diện"&&(this.targetActor=null,this.setCamera("main")),this.camera.position.lerp(this.cameraTarget,1-Math.exp(-e*3.5)),this.camera.lookAt(this.lookTarget),`;

  if (!code.includes(targetLoopGlide)) {
    throw new Error(`Target loopGlide not found in ${file}`);
  }
  code = code.replace(targetLoopGlide, replaceLoopGlide);

  // 4. In UI zoom-control-box, restore tag & buttons to default panoramic
  const targetTag = `P.jsx("span",{className:"tag",style:{background:n.players.length<=100?"#059669":"#2563eb",color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:10.5,fontWeight:700},children:n.players.length<=100?"🛡️ Tự động: Toàn đội 18m (≤100 người)":"🌐 Tự động: Toàn cảnh 35m (>100 người)"})`;
  const replaceTag = `P.jsx("span",{className:"tag",style:{background:"#059669",color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:10.5,fontWeight:700},children:"Mặc định: Toàn cảnh (40m)"})`;

  if (code.includes(targetTag)) {
    code = code.replace(targetTag, replaceTag);
  }

  const targetBtns = `[
    {label:"🔄 Tự Động (Theo Số Người)",d:"auto"},
    {label:"🛡️ Toàn Đội (18m)",d:18.0},
    {label:"🌐 Toàn Cảnh (35m)",d:35.0},
    {label:"⚔️ Cận Cảnh (11m)",d:11.2}
  ].map`;

  const replaceBtns = `[
    {label:"🌐 Toàn Cảnh (40m)",d:40.0},
    {label:"🛡️ Toàn Đội (18m)",d:18.0},
    {label:"⚔️ Cận Cảnh (11m)",d:11.2},
    {label:"🔍 Siêu Sát (8m)",d:8.5}
  ].map`;

  if (code.includes(targetBtns)) {
    code = code.replace(targetBtns, replaceBtns);
  }

  fs.writeFileSync(file, code, 'utf8');
  console.log(`Successfully updated ${file}`);
}

// 5. Update cache bust in index.html
const indexHtmlPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const now = Date.now();
indexHtml = indexHtml.replace(/index-CT5dfJfs\.js\?v=\d+/, `index-CT5dfJfs.js?v=${now}`);
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log(`Updated index.html cache bust to v=${now}`);
