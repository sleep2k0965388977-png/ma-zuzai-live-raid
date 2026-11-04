const fs = require('fs');

const path = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(path, 'utf8');

// 1. Update Mf initial state with tiktok properties
const targetMf = 'lastDamage:0,lastAttacker:"—",lastGift:"—",fps:60,elapsed:0,crowdCount:10000})';
const replaceMf = 'lastDamage:0,lastAttacker:"—",lastGift:"—",fps:60,elapsed:0,crowdCount:10000,tiktokConnected:!1,tiktokStreamer:""})';

if (!code.includes(targetMf)) {
  console.error('Target Mf not found!');
  process.exit(1);
}
code = code.replace(targetMf, replaceMf);
console.log('1. Added tiktokConnected and tiktokStreamer to Mf state');

// 2. Hook connectTikTokBridge into RP constructor
const targetCtor = 'this.updateLabelRanks(),this.log("Đấu trường đã sẵn sàng. Hãy gửi sự kiện đầu tiên.","system"),this.animate();this.triggerNewMatchTopSkills();';
const replaceCtor = 'window.raidGame=this,this.connectTikTokBridge(),this.updateLabelRanks(),this.log("Đấu trường đã sẵn sàng. Hãy gửi sự kiện đầu tiên.","system"),this.animate();this.triggerNewMatchTopSkills();';

if (!code.includes(targetCtor)) {
  console.error('Target constructor not found!');
  process.exit(1);
}
code = code.replace(targetCtor, replaceCtor);
console.log('2. Exposed window.raidGame and hooked connectTikTokBridge into constructor');

// 3. Define connectTikTokBridge, connectToTikTokStream, disconnectTikTokStream in RP class
const targetMethodsLoc = 'toggleUltraSmooth(){';
const bridgeMethods = `connectTikTokBridge(url="ws://localhost:8081"){
  if(this.wsBridge){
    try{this.wsBridge.close();}catch(e){}
  }
  try{
    const ws=new WebSocket(url);
    ws.onopen=()=>{
      this.state.tiktokConnected=!0;
      this.log("🟢 [TIKTOK LIVE] Đã kết nối thành công tới máy chủ Cầu Nối TikTok Live (Cổng 8081)!","system");
      this.publish();
    };
    ws.onmessage=msg=>{
      try{
        const data=JSON.parse(msg.data);
        if(data.type==="status"){
          this.log(data.message,"system");
          if(data.connected!==undefined){
            this.state.tiktokStreamer=data.uniqueId||"";
            this.state.tiktokConnected=data.connected;
            this.publish();
          }
        }else if(this.events){
          this.events.receive(data);
        }
      }catch(e){}
    };
    ws.onclose=()=>{
      if(this.state.tiktokConnected){
        this.state.tiktokConnected=!1;
        this.log("⚠️ [TIKTOK LIVE] Mất kết nối Cầu Nối Cổng 8081. Đang kết nối lại...","system");
        this.publish();
      }
      setTimeout(()=>{if(!this.state.tiktokConnected)this.connectTikTokBridge(url);},4000);
    };
    ws.onerror=()=>{};
    this.wsBridge=ws;
  }catch(err){}
}
connectToTikTokStream(uniqueId){
  if(this.wsBridge&&this.wsBridge.readyState===WebSocket.OPEN){
    this.wsBridge.send(JSON.stringify({action:"connect",uniqueId}));
    this.log(\`⏳ Đang gửi yêu cầu kết nối tới phòng LIVE của @\${uniqueId}...\`,"system");
  }else{
    this.log("❌ Chưa mở TikTok Live Bridge! Hãy chạy lệnh: node tiktok_bridge.js","system");
  }
}
disconnectTikTokStream(){
  if(this.wsBridge&&this.wsBridge.readyState===WebSocket.OPEN){
    this.wsBridge.send(JSON.stringify({action:"disconnect"}));
    this.log("⚪ Đã gửi yêu cầu ngắt kết nối phòng LIVE.","system");
  }
}
toggleUltraSmooth(){`;

if (!code.includes(targetMethodsLoc)) {
  console.error('Target methods location not found!');
  process.exit(1);
}
code = code.replace(targetMethodsLoc, bridgeMethods);
console.log('3. Defined connectTikTokBridge methods in RP class');

// 4. Add TikTok Live Connection Box in UI Control Panel right under SỰ KIỆN NGƯỜI XEM
const targetUIKicker = `P.jsxs("div",{className:"section-kicker",children:[P.jsx("span",{children:"SỰ KIỆN NGƯỜI XEM"}),P.jsx("span",{className:"simulation-tag",children:"MÔ PHỎNG"})]}),`;
const replaceUIKicker = `P.jsxs("div",{className:"section-kicker",children:[P.jsx("span",{children:"SỰ KIỆN NGƯỜI XEM"}),P.jsx("span",{className:"simulation-tag",style:{background:n.tiktokConnected?"rgba(16,185,129,0.25)":"rgba(244,63,94,0.18)",color:n.tiktokConnected?"#34d399":"#fb7185",borderColor:n.tiktokConnected?"#059669":"#e11d48"},children:n.tiktokConnected?"🟢 TIKTOK LIVE":"MÔ PHỎNG"})]}),P.jsxs("div",{style:{background:"linear-gradient(135deg, rgba(244,63,94,0.12), rgba(168,85,247,0.14))",border:"1px solid rgba(244,63,94,0.35)",borderRadius:"8px",padding:"8px 10px",marginBottom:"8px",display:"flex",flexDirection:"column",gap:"6px"},children:[P.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[P.jsx("span",{style:{fontSize:"11px",fontWeight:"bold",color:n.tiktokConnected?"#34d399":"#fb7185"},children:n.tiktokConnected?("🟢 ĐÃ KẾT NỐI: @"+(n.tiktokStreamer||"LIVE")):"⚪ KẾT NỐI TIKTOK LIVE"}),P.jsx("span",{style:{fontSize:"10px",color:"#94a3b8"},children:"Cổng 8081"})]}),P.jsxs("div",{style:{display:"flex",gap:"6px"},children:[P.jsx("button",{style:{flex:1,background:n.tiktokConnected?"linear-gradient(135deg, #ef4444, #dc2626)":"linear-gradient(135deg, #ec4899, #8b5cf6)",color:"#fff",border:"none",borderRadius:"5px",padding:"6px 10px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"},onClick:()=>{var O;n.tiktokConnected?((O=t.current)==null?void 0:O.disconnectTikTokStream()):((O=t.current)==null?void 0:O.connectToTikTokStream(o.trim()||"streamer"))},children:n.tiktokConnected?"🔴 Ngắt Kết Nối LIVE":"🔗 Kết Nối Phòng LIVE @Tên người xem"}),P.jsx("button",{style:{background:"rgba(255,255,255,0.08)",color:"#e2e8f0",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"5px",padding:"6px 8px",fontSize:"10px",cursor:"pointer"},title:"Gửi sự kiện mẫu qua Bridge",onClick:()=>{var O;(O=t.current)==null?void 0:O.events.receive({id:crypto.randomUUID(),type:"gift",username:o.trim()||"linh.nhi",skill:"ten_dragons",value:150,timestamp:Date.now()})},children:"⚡ Test"})]})]}),`;

if (!code.includes(targetUIKicker)) {
  console.error('Target UI kicker not found!');
  process.exit(1);
}
code = code.replace(targetUIKicker, replaceUIKicker);
console.log('4. Added TikTok Live connection box in UI Control Panel');

fs.writeFileSync(path, code, 'utf8');
console.log('Successfully updated index-CT5dfJfs.js with TikTok Live integration!');
