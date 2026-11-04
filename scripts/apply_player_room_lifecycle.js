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

  // 1. Replace eliminatePlayers definition so active players are NEVER eliminated by the boss
  // and add playerLeaveRoom right next to it
  const idxElim = code.indexOf('eliminatePlayers(count,skillName="Đòn đánh Ma Tôn"){');
  if (idxElim !== -1) {
    const endElim = code.indexOf('shake(intensity,duration){', idxElim);
    if (endElim !== -1) {
      const newMethod = `eliminatePlayers(count,skillName="Đòn đánh Ma Tôn"){
  // Người chơi đang trong phòng LIVE không bao giờ bị Boss hạ gục
  return 0;
}
playerLeaveRoom(username){
  const actor=this.actors.get(username);
  if(actor&&actor.root){
    const pos=actor.root.position.clone();
    this.effect(pos,"#ef4444",!0,3.5);
    this.audio&&this.audio.playHitImpact(!0);
    if(actor.wings){actor.root.remove(actor.wings);this.disposeObject(actor.wings);actor.wings=null;}
    this.scene.remove(actor.root);
    this.disposeObject(actor.root);
    this.actors.delete(username);
  }
  const node=this.labelNodes.get(username);
  if(node){
    node.remove();
    this.labelNodes.delete(username);
  }
  this.state.players=this.state.players.filter(p=>p.username!==username);
  this.state.totalEliminated=(this.state.totalEliminated||0)+1;
  this.state.lastEliminated=1;
  this.state.lastEliminatedSkill="Thoát phòng";
  this.state.elimBannerTimer=Date.now();
  this.log(\`🚪 @\${username} đã thoát khỏi phòng LIVE · Ma Tôn trừng phạt xóa khỏi chiến trường!\`,"boss");
  this.publish();
}
`;
      code = code.slice(0, idxElim) + newMethod + code.slice(endElim);
      console.log('[+] Replaced eliminatePlayers and added playerLeaveRoom');
    }
  }

  // 2. In spawn(e, t), add lastActiveTime: Date.now()
  const oldSpawnPush = 'this.state.players.push({username:e,avatar:t,damage:0,hp:100,color:n%8});';
  const newSpawnPush = 'this.state.players.push({username:e,avatar:t,damage:0,hp:100,color:n%8,lastActiveTime:Date.now()});';
  if (code.includes(oldSpawnPush)) {
    code = code.replace(oldSpawnPush, newSpawnPush);
    console.log('[+] Added lastActiveTime in spawn()');
  }

  // 3. In consume(e), handle leave event and update lastActiveTime
  const oldConsumeStart = 'consume(e){if(this.state.defeated||this.state.failed)return;';
  const newConsumeStart = 'consume(e){if(this.state.defeated||this.state.failed)return;if(e.type==="leave"){this.playerLeaveRoom(e.username);return;}const _exP=this.state.players.find(r=>r.username===e.username);if(_exP){_exP.lastActiveTime=Date.now();_exP.hp=Math.max(_exP.hp,60);_exP.eliminated=!1;}';
  if (code.includes(oldConsumeStart)) {
    code = code.replace(oldConsumeStart, newConsumeStart);
    console.log('[+] Handled leave event and updated lastActiveTime in consume()');
  }

  // 4. In animate render loop, check inactivity every 10s (departed after 120s of zero activity)
  const oldTickEnd = 'this.updateLegionSwords(e),';
  const newTickEnd = '(s-(this._lastInactiveCheck||0)>10&&(this._lastInactiveCheck=s,(function(self){const now=Date.now();const dep=self.state.players.filter(p=>p.lastActiveTime&&(now-p.lastActiveTime>120000));dep.forEach(p=>self.playerLeaveRoom(p.username));})(this))),this.updateLegionSwords(e),';
  if (code.includes(oldTickEnd)) {
    code = code.replace(oldTickEnd, newTickEnd);
    console.log('[+] Added 120s inactivity auto-leave check in render loop');
  }

  // 5. In UI test tab, add "Thoát phòng" button next to "+1 người"
  const oldAddBtn = 'P.jsxs("button",{onClick:()=>{var O;return(O=t.current)==null?void 0:O.addPlayer(o.trim()||"kiemkhach",1)},children:[P.jsx(dy,{size:16,className:"green"})," +1 người"]})';
  const newAddBtn = 'P.jsxs("button",{onClick:()=>{var O;return(O=t.current)==null?void 0:O.addPlayer(o.trim()||"kiemkhach",1)},children:[P.jsx(dy,{size:16,className:"green"})," +1 người"]}),P.jsxs("button",{style:{background:"rgba(239,68,68,0.22)",border:"1px solid rgba(239,68,68,0.5)",color:"#fca5a5",cursor:"pointer"},onClick:()=>{var O;return(O=t.current)==null?void 0:O.playerLeaveRoom(o.trim()||"kiemkhach")},children:[P.jsx("span",{children:"🚪"})," Thoát phòng"]})';
  if (code.includes(oldAddBtn)) {
    code = code.replace(oldAddBtn, newAddBtn);
    console.log('[+] Added "Thoát phòng" test button in UI');
  }

  // 6. Expose window.playerLeaveRoom globally
  if (!code.includes('window.playerLeaveRoom=')) {
    code = code.replace('window.resetRaidGame=()=>this.resetAllData(),', 'window.resetRaidGame=()=>this.resetAllData(),window.playerLeaveRoom=(u)=>this.playerLeaveRoom(u),');
    console.log('[+] Exposed window.playerLeaveRoom globally');
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

console.log('\nPlayer room lifecycle updated successfully!');
