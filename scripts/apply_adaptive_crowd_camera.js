const fs = require('fs');
const acorn = require('acorn');

const files = [
  'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js',
  'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js'
];

for (const filePath of files) {
  if (!fs.existsSync(filePath)) continue;
  let code = fs.readFileSync(filePath, 'utf8');
  console.log(`\n=== Processing ${filePath} ===`);

  // 1. Add getAdaptiveCameraTargets method to class RP right before setZoom
  const oldSetZoom = `setZoom(dist){
  const d=Math.max(6,Math.min(45,dist));
  const ratio=(d-6)/(45-6);
  this.cameraTarget.set(0,3.2+ratio*11.3,d);
  this.lookTarget.set(0,2.5+ratio*3.5,ratio*-1.8);
  this.camera.position.copy(this.cameraTarget);
  this.camera.lookAt(this.lookTarget);
  this.publish();
}`;

  const newCameraMethods = `getAdaptiveCameraTargets(){
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

  if (code.includes(oldSetZoom)) {
    code = code.replace(oldSetZoom, newCameraMethods);
    console.log('[+] Replaced setZoom and added getAdaptiveCameraTargets');
  } else {
    console.warn('[-] Could not find oldSetZoom');
  }

  // 2. In setCamera, use adaptive camera position for main view
  const oldSetCamMain = `this.state.camera = e === "ultimate" ? "Thiên kiếp" : e === "attack" ? "Xuất kiếm" : e === "gift" ? "Kỹ năng" : e === "phase" ? "Giai đoạn trùm" : "Chính diện";
  this.cameraTarget = e === "ultimate" ? Ft(1.8, 4.8, 10.5) : e === "attack" ? Ft(0.8, 2.9, 8.2) : e === "gift" ? Ft(-1.5, 6.5, 12.5) : e === "phase" ? Ft(0, 15.0, 36.0) : Ft(0, 14.5, 40.0);
  this.lookTarget = e === "attack" ? Ft(0, 2.2, 0.4) : e === "ultimate" ? Ft(0, 3.0, -0.4) : e === "gift" ? Ft(0, 6.8, 0.2) : Ft(0, 6.0, -1.8);`;

  const newSetCamMain = `const _adapt=this.getAdaptiveCameraTargets();
  this.state.camera = e === "ultimate" ? "Thiên kiếp" : e === "attack" ? "Xuất kiếm" : e === "gift" ? "Kỹ năng" : e === "phase" ? "Giai đoạn trùm" : _adapt.modeName;
  this.cameraTarget = e === "ultimate" ? Ft(1.8, 4.8, 10.5) : e === "attack" ? Ft(0.8, 2.9, 8.2) : e === "gift" ? Ft(-1.5, 6.5, 12.5) : e === "phase" ? Ft(0, 15.0, 36.0) : _adapt.camPos;
  this.lookTarget = e === "attack" ? Ft(0, 2.2, 0.4) : e === "ultimate" ? Ft(0, 3.0, -0.4) : e === "gift" ? Ft(0, 6.8, 0.2) : _adapt.lookPos;`;

  if (code.includes(oldSetCamMain)) {
    code = code.replace(oldSetCamMain, newSetCamMain);
    console.log('[+] Updated setCamera to use adaptive camera target');
  } else {
    console.warn('[-] Could not find oldSetCamMain');
  }

  // 3. In animate render loop, when cameraTimer <= 0, dynamically smooth-glide to adaptive camera position
  const oldCamGlide = 'this.cameraTimer-=e,this.cameraTimer<=0&&this.state.camera!=="Chính diện"&&(this.targetActor=null,this.setCamera("main")),this.camera.position.lerp(this.cameraTarget,1-Math.exp(-e*3.5)),this.camera.lookAt(this.lookTarget),';

  const newCamGlide = 'this.cameraTimer-=e,this.cameraTimer<=0&&(this.targetActor=null,!this.manualZoom&&(function(self){const ad=self.getAdaptiveCameraTargets();self.cameraTarget.lerp(ad.camPos,1-Math.exp(-e*2.2));self.lookTarget.lerp(ad.lookPos,1-Math.exp(-e*2.2));})(this)),this.camera.position.lerp(this.cameraTarget,1-Math.exp(-e*3.5)),this.camera.lookAt(this.lookTarget),';

  if (code.includes(oldCamGlide)) {
    code = code.replace(oldCamGlide, newCamGlide);
    console.log('[+] Updated render loop to smoothly glide to adaptive camera target');
  } else {
    console.warn('[-] Could not find oldCamGlide');
  }

  // 4. In UI zoom-control-box, update tag and buttons
  const oldZoomBoxTag = `P.jsx("span",{className:"tag",style:{background:"#059669",color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:10.5,fontWeight:700},children:"Cận cảnh người chơi"})`;

  const newZoomBoxTag = `P.jsx("span",{className:"tag",style:{background:n.players.length<=100?"#059669":"#2563eb",color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:10.5,fontWeight:700},children:n.players.length<=100?"🛡️ Tự động: Toàn đội 18m (≤100 người)":"🌐 Tự động: Toàn cảnh 35m (>100 người)"})`;

  if (code.includes(oldZoomBoxTag)) {
    code = code.replace(oldZoomBoxTag, newZoomBoxTag);
    console.log('[+] Updated zoom box tag to reflect auto adaptive crowd view');
  } else {
    console.warn('[-] Could not find oldZoomBoxTag');
  }

  // 4b. Add "Tự động" button to zoom options
  const oldZoomBtns = `[
    {label:"🔍 Siêu Sát (8m)",d:8.5},
    {label:"⚔️ Cận Cảnh (11m)",d:11.2},
    {label:"🛡️ Toàn Đội (18m)",d:18.0},
    {label:"🌐 Toàn Cảnh (35m)",d:35.0}
  ].map`;

  const newZoomBtns = `[
    {label:"🔄 Tự Động (Theo Số Người)",d:"auto"},
    {label:"🛡️ Toàn Đội (18m)",d:18.0},
    {label:"🌐 Toàn Cảnh (35m)",d:35.0},
    {label:"⚔️ Cận Cảnh (11m)",d:11.2}
  ].map`;

  if (code.includes(oldZoomBtns)) {
    code = code.replace(oldZoomBtns, newZoomBtns);
    console.log('[+] Added "Tự Động" option in zoom controls');
  } else {
    console.warn('[-] Could not find oldZoomBtns');
  }

  // Validate AST
  try {
    acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`[✓] Acorn AST validation SUCCESS for ${filePath}`);
    fs.writeFileSync(filePath, code, 'utf8');
  } catch (err) {
    console.error(`[X] AST ERROR in ${filePath}:`, err.message);
    process.exit(1);
  }
}

console.log('\nAdaptive crowd camera applied and verified successfully!');
