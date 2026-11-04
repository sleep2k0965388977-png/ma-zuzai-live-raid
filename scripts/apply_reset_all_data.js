const fs = require('fs');
const acorn = require('acorn');

const files = [
  'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js',
  'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js'
];

for (const filePath of files) {
  if (!fs.existsSync(filePath)) continue;
  let code = fs.readFileSync(filePath, 'utf8');

  // 1. Add resetAllData() method to class RP right after togglePause()
  const targetToggle = 'togglePause(){this.state.paused=!this.state.paused,this.publish()}';
  
  const resetAllDataMethod = `resetAllData(){this.queue.clear();if(this.topOpenerTimers){this.topOpenerTimers.forEach(clearTimeout);this.topOpenerTimers=[];}this.isOpeningCeremony=!1;this.actors.forEach(a=>{if(a.wings){a.root.remove(a.wings);this.disposeObject(a.wings);a.wings=null;}this.scene.remove(a.root);this.disposeObject(a.root);});this.actors.clear();this.labelNodes.forEach(node=>node.remove());this.labelNodes.clear();this.activeSpecialSkills&&this.activeSpecialSkills.forEach(sk=>{this.scene.remove(sk.grp);this.disposeObject(sk.grp);});this.activeSpecialSkills=[];this.bursts.forEach(e=>{this.scene.remove(e.group);this.disposeObject(e.group);});this.bursts=[];this.beamTimer=0;this.beamGroup&&(this.beamGroup.visible=!1);this.planetCrashActive=!1;this.planetExploded=!1;this.shakeDuration=0;this.skill3MinTimer=0;this.skill5MinTimer=0;this.state={...Mf(),players:[],feed:[]};this.bossAnchor.visible=!0;this.bossAnchor.scale.setScalar(1.85);this.playClip(this.bossMixer,this.bossClips,"idle");this.setCamera("main");this.initLegionSwords();this.log("🔄 [KHỞI ĐẦU MỚI] ĐÃ LÀM MỚI TOÀN BỘ TRẬN ĐẤU! Xóa sạch dữ liệu, không top, không người chơi. Sẵn sàng cho trận chiến mới!","system");this.publish();}`;

  if (!code.includes(targetToggle)) {
    console.error(`[-] Could not find targetToggle in ${filePath}`);
    process.exit(1);
  }

  code = code.replace(targetToggle, targetToggle + resetAllDataMethod);
  console.log(`[+] Added resetAllData() to class in ${filePath}`);

  // 2. Add UI button in boss-actions
  const oldActionGridEnd = 'P.jsxs("button",{className:"skill-5m-btn",onClick:()=>{var O;return(O=t.current)==null?void 0:O.trigger5MinPlanetCrash()},children:["Chiêu 5m (Hành Tinh Nổ) 💥"]})]';
  
  const newButtonUI = `P.jsxs("button",{className:"skill-5m-btn",onClick:()=>{var O;return(O=t.current)==null?void 0:O.trigger5MinPlanetCrash()},children:["Chiêu 5m (Hành Tinh Nổ) 💥"]}),P.jsxs("button",{className:"reset-all-btn",style:{background:"linear-gradient(135deg,#dc2626,#ea580c)",color:"#ffffff",fontWeight:700,border:"1px solid #f87171",gridColumn:"span 2"},onClick:()=>{var O;return(O=t.current)==null?void 0:O.resetAllData();},children:["🔄 KHỞI ĐẦU MỚI (XÓA SẠCH TOP & NGƯỜI CHƠI)"]})]`;

  if (code.includes(oldActionGridEnd)) {
    code = code.replace(oldActionGridEnd, newButtonUI);
    console.log(`[+] Added UI button to ${filePath}`);
  } else {
    console.warn(`[-] Could not find oldActionGridEnd in ${filePath}`);
  }

  // 3. Expose globally window.resetRaidGame
  const hookTarget = 'window.raidGame=this,';
  const newHook = 'window.raidGame=this,window.resetRaidGame=()=>this.resetAllData(),';
  if (code.includes(hookTarget) && !code.includes(newHook)) {
    code = code.replace(hookTarget, newHook);
    console.log(`[+] Exposed window.resetRaidGame in ${filePath}`);
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

console.log('Reset all data functionality added successfully!');
