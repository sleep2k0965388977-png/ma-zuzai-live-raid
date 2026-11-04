const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '../assets/index-CT5dfJfs.js');
let code = fs.readFileSync(jsPath, 'utf8');

// 1. Add getTopRankPlayers and triggerNewMatchTopSkills methods to engine class
// We can insert them right before triggerTimeout()
const targetTriggerTimeout = `triggerTimeout(){if(this.state.defeated||this.state.failed)return;`;

const newMethods = `getTopRankPlayers(count=5){
  if(!this.state.players||this.state.players.length===0)return[];
  return[...this.state.players].map(p=>{
    const d=p.damage||0;
    const base=85000+(Math.abs(p.username.charCodeAt(0)*1337+p.username.length*997)%45000);
    const power=base+d*4;
    return{...p,power};
  }).sort((a,b)=>b.power-a.power).slice(0,count);
}
triggerNewMatchTopSkills(customList=null){
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
}
` + targetTriggerTimeout;

if (!code.includes(targetTriggerTimeout)) {
  console.error('ERROR: targetTriggerTimeout not found!');
  process.exit(1);
}
code = code.replace(targetTriggerTimeout, newMethods);
console.log('1. Added getTopRankPlayers and triggerNewMatchTopSkills successfully.');

// 2. Update reset() to capture champions and auto-trigger Top skills
const oldResetEnd = `this.state.totalEliminated=0,this.state.lastEliminated=0,this.state.recentJoin=null,this.setCamera("main"),this.log("Một trận raid mới bắt đầu.","system"),this.publish()}`;

const newResetEnd = `this.state.totalEliminated=0,this.state.lastEliminated=0,this.state.recentJoin=null,this.setCamera("main"),this.log("Một trận raid mới bắt đầu.","system"),this.publish();if(this.topOpenerTimers){this.topOpenerTimers.forEach(clearTimeout);this.topOpenerTimers=[];}setTimeout(()=>{this.triggerNewMatchTopSkills();},1200);}`;

if (!code.includes(oldResetEnd)) {
  console.error('ERROR: oldResetEnd not found!');
  process.exit(1);
}
code = code.replace(oldResetEnd, newResetEnd);
console.log('2. Updated reset() to auto-trigger Top skills.');

// 3. Auto-trigger on initial arena startup
const oldInitLog = `this.log("Đấu trường đã sẵn sàng. Hãy gửi sự kiện đầu tiên.","system"),this.animate()}`;

const newInitLog = `this.log("Đấu trường đã sẵn sàng. Hãy gửi sự kiện đầu tiên.","system"),this.animate();setTimeout(()=>{this.triggerNewMatchTopSkills();},2200);}`;

if (!code.includes(oldInitLog)) {
  console.error('ERROR: oldInitLog not found!');
  process.exit(1);
}
code = code.replace(oldInitLog, newInitLog);
console.log('3. Added auto-trigger on initial startup.');

// 4. Add UI Button in Control Panel
const oldButtonMatch = `P.jsxs("button",{onClick:()=>D("gift","ten_dragons",150),children:[P.jsx("span",{style:{color:"#ec4899"}},"🔥")," 150 Xu (10 Rồng)"]}),`;

const newButtonMatch = `P.jsxs("button",{onClick:()=>D("gift","ten_dragons",150),children:[P.jsx("span",{style:{color:"#ec4899"}},"🔥")," 150 Xu (10 Rồng)"]}),
P.jsxs("button",{
  style:{gridColumn:"1 / -1",background:"linear-gradient(135deg, rgba(234,179,8,0.32), rgba(236,72,153,0.32))",borderColor:"#eab308",color:"#fef08a",fontWeight:"bold",padding:"8px 10px",fontSize:"12.5px",boxShadow:"0 0 12px rgba(234,179,8,0.3)"},
  onClick:()=>{var O;return(O=t.current)==null?void 0:O.triggerNewMatchTopSkills();},
  children:[P.jsx("span",{children:"👑"})," Đãi Ngộ Trận Mới (Top 1: 150Xu, Top 2: 80Xu, Top 3: 45Xu, Top 4: 20Xu, Top 5: 5Xu)"]
}),`;

if (!code.includes(oldButtonMatch)) {
  console.error('ERROR: oldButtonMatch not found!');
  process.exit(1);
}
code = code.replace(oldButtonMatch, newButtonMatch);
console.log('4. Added UI Button successfully.');

fs.writeFileSync(jsPath, code, 'utf8');
console.log('ALL PATCHES APPLIED SUCCESSFULLY!');