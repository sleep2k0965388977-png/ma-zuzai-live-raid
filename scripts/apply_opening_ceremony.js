const fs = require('fs');

const path = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(path, 'utf8');

// 1. Hook into constructor: auto-trigger opening ceremony
const targetConstructor = 'this.updateLabelRanks(),this.log("Đấu trường đã sẵn sàng. Hãy gửi sự kiện đầu tiên.","system"),this.animate();';
const replaceConstructor = 'this.updateLabelRanks(),this.log("Đấu trường đã sẵn sàng. Hãy gửi sự kiện đầu tiên.","system"),this.animate();this.triggerNewMatchTopSkills();';

if (!code.includes(targetConstructor)) {
  console.error('Target constructor not found!');
  process.exit(1);
}
code = code.replace(targetConstructor, replaceConstructor);
console.log('1. Auto-trigger triggerNewMatchTopSkills() on match start');

// 2. Hook into animate() render loop: pause queue consumption while isOpeningCeremony is active
const targetQueueLoop = 'const s=this.state.elapsed;if(this.eventTimer+=e,this.eventTimer>.42){this.eventTimer=0;const o=this.queue.next();o&&this.consume(o)}';
const replaceQueueLoop = 'const s=this.state.elapsed;if(!this.isOpeningCeremony&&this.queue){if(this.eventTimer+=e,this.eventTimer>.42){this.eventTimer=0;const o=this.queue.next();o&&this.consume(o)}}';

if (!code.includes(targetQueueLoop)) {
  console.error('Target queue loop not found!');
  process.exit(1);
}
code = code.replace(targetQueueLoop, replaceQueueLoop);
console.log('2. Paused queue.next() during opening ceremony');

// 3. Update triggerNewMatchTopSkills to manage isOpeningCeremony, sequential execution and completion
const targetTopSkills = `triggerNewMatchTopSkills(customList=null){
  if(this.topOpenerTimers){
    this.topOpenerTimers.forEach(clearTimeout);
  }
  this.topOpenerTimers=[];
  const topRankList=(customList&&customList.length>0)?customList:this.getTopRankPlayers(5);
  if(!topRankList||topRankList.length===0)return;

  const skillConfig=[
    {rank:1,skill:"ten_dragons",xu:150,title:"Quán Quân (Top 1)"},
    {rank:2,skill:"single_dragon",xu:80,title:"Á Quân (Top 2)"},
    {rank:3,skill:"sword_rain",xu:45,title:"Quý Quân (Top 3)"},
    {rank:4,skill:"giant_sword",xu:20,title:"Đại Cao Thủ (Top 4)"},
    {rank:5,skill:"small",xu:5,title:"Tiên Phong (Top 5)"}
  ];

  this.log("👑 [ĐÃI NGỘ TRẬN MỚI] Top 5 Tu Sĩ Lực Chiến lần lượt xuất Tuyệt Kỹ!","system");

  skillConfig.forEach((cfg,idx)=>{
    if(idx>=topRankList.length)return;
    const player=topRankList[idx];
    const timerId=setTimeout(()=>{
      if(this.state.failed||this.state.defeated)return;
      this.log(\`👑 [\${cfg.title}] @\${player.username} xuất Tuyệt Kỹ \${cfg.xu} Xu!\`,"gift");
      this.events.receive({
        id:crypto.randomUUID(),
        type:"gift",
        username:player.username,
        skill:cfg.skill,
        value:cfg.xu,
        timestamp:Date.now()
      });
    },idx*2400);
    this.topOpenerTimers.push(timerId);
  });
}`;

const replaceTopSkills = `triggerNewMatchTopSkills(customList=null){
  if(this.topOpenerTimers){
    this.topOpenerTimers.forEach(clearTimeout);
  }
  this.topOpenerTimers=[];
  const topRankList=(customList&&customList.length>0)?customList:this.getTopRankPlayers(5);
  if(!topRankList||topRankList.length===0)return;

  this.isOpeningCeremony=!0;
  this.state.isOpeningCeremony=!0;

  const skillConfig=[
    {rank:1,skill:"ten_dragons",xu:150,title:"Quán Quân (Top 1)"},
    {rank:2,skill:"single_dragon",xu:80,title:"Á Quân (Top 2)"},
    {rank:3,skill:"sword_rain",xu:45,title:"Quý Quân (Top 3)"},
    {rank:4,skill:"giant_sword",xu:20,title:"Đại Cao Thủ (Top 4)"},
    {rank:5,skill:"small",xu:5,title:"Tiên Phong (Top 5)"}
  ];

  this.log("👑 [KHAI TRẬN MỞ MÀN] Top 5 Tu Sĩ bắt đầu khai ngộ Tuyệt Kỹ đãi ngộ (Tạm hoãn quà/bình luận)!","system");
  this.publish();

  skillConfig.forEach((cfg,idx)=>{
    if(idx>=topRankList.length)return;
    const player=topRankList[idx];
    const delay=800+idx*2600;
    const timerId=setTimeout(()=>{
      if(this.state.failed||this.state.defeated)return;
      this.log(\`👑 [\${cfg.title}] @\${player.username} xuất Tuyệt Kỹ \${cfg.xu} Xu!\`,"gift");
      this.consume({
        id:crypto.randomUUID(),
        type:"gift",
        username:player.username,
        skill:cfg.skill,
        value:cfg.xu,
        timestamp:Date.now(),
        isOpener:!0
      });
    },delay);
    this.topOpenerTimers.push(timerId);
  });

  // Khi tốp 5 người chơi khai ngộ xong hết -> Mới bắt đầu tính người chơi tặng quà và bình luận
  const finishDelay=800+skillConfig.length*2600+600;
  const finishTimer=setTimeout(()=>{
    if(this.state.failed||this.state.defeated)return;
    this.isOpeningCeremony=!1;
    this.state.isOpeningCeremony=!1;
    this.setCamera("main");
    this.log("⚔️ [KHAI TRẬN HOÀN TẤT] Top 5 đã khai ngộ xong! Trận đấu chính thức mở cho toàn thể khán giả xuất kiếm & tặng quà!","system");
    this.publish();
  },finishDelay);
  this.topOpenerTimers.push(finishTimer);
}`;

if (!code.includes(targetTopSkills)) {
  console.error('Target top skills method not found!');
  process.exit(1);
}
code = code.replace(targetTopSkills, replaceTopSkills);
console.log('3. Updated triggerNewMatchTopSkills with isOpeningCeremony lifecycle');

// 4. Hook into reset() method: auto-restart opening ceremony on match reset
const targetReset = 'reset(){this.queue.clear(),this.initLegionSwords(),';
const replaceReset = 'reset(){this.queue.clear(),this.initLegionSwords(),if(this.topOpenerTimers){this.topOpenerTimers.forEach(clearTimeout);this.topOpenerTimers=[];}this.isOpeningCeremony=!1;';

if (!code.includes(targetReset)) {
  console.error('Target reset not found!');
  process.exit(1);
}
code = code.replace(targetReset, replaceReset);

// Also call triggerNewMatchTopSkills at the end of reset
const targetResetEnd = 'this.bossAnchor.visible=!0,this.bossAnchor.scale.setScalar(1.85),this.playClip(this.bossMixer,this.bossClips,"idle"),this.updateLabelRanks(),';
const replaceResetEnd = 'this.bossAnchor.visible=!0,this.bossAnchor.scale.setScalar(1.85),this.playClip(this.bossMixer,this.bossClips,"idle"),this.updateLabelRanks(),this.triggerNewMatchTopSkills(),';

if (!code.includes(targetResetEnd)) {
  console.error('Target reset end not found!');
  process.exit(1);
}
code = code.replace(targetResetEnd, replaceResetEnd);
console.log('4. Hooked auto-opener restart into reset()');

// 5. Update UI status indicator in LIVE RAID header
const targetUIHeader = 'P.jsx("small",{children:"• SỰ KIỆN THỬ NGHIỆM"})';
const replaceUIHeader = 'n.isOpeningCeremony?P.jsx("small",{style:{color:"#facc15",fontWeight:"bold"},children:"👑 ĐANG KHAI TRẬN: TOP 1 - 5 KHAI NGỘ..."}):P.jsx("small",{children:"• SỰ KIỆN THỬ NGHIỆM"})';

if (code.includes(targetUIHeader)) {
  code = code.replace(targetUIHeader, replaceUIHeader);
  console.log('5. Updated header UI with opening ceremony indicator');
}

fs.writeFileSync(path, code, 'utf8');
console.log('Successfully updated opening ceremony system in index-CT5dfJfs.js!');
