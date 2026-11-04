const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'assets', 'index-CT5dfJfs.js'),
  path.join(__dirname, '..', 'public', 'assets', 'index-CT5dfJfs.js')
];

for (const filePath of files) {
  let code = fs.readFileSync(filePath, 'utf8');

  // 1. Add auto-connect in ws.onopen
  const targetWsOpen = `ws.onopen=()=>{
      this.state.tiktokConnected=!0;
      this.log("🟢 [TIKTOK LIVE] Đã kết nối thành công tới máy chủ Cầu Nối TikTok Live (Cổng 8081)!","system");
      this.publish();
    };`;

  const newWsOpen = `ws.onopen=()=>{
      this.state.tiktokConnected=!0;
      this.log("🟢 [TIKTOK LIVE] Đã kết nối thành công tới máy chủ Cầu Nối TikTok Live (Cổng 8081)!","system");
      this.publish();
      try{
        const _p=new URLSearchParams(window.location.search);
        const _auto=(_p.get("user")||_p.get("streamer")||_p.get("room")||localStorage.getItem("tiktok_streamer_username")||"").replace(/^@/,"").trim();
        if(_auto&&_auto!=="linh.nhi"){
          setTimeout(()=>{this.connectToTikTokStream(_auto);},1200);
        }
      }catch(e){}
    };`;

  if (code.includes(targetWsOpen)) {
    code = code.replace(targetWsOpen, newWsOpen);
    console.log('Replaced targetWsOpen in', filePath);
  } else {
    console.warn('targetWsOpen not found in', filePath);
  }

  // 2. Add localStorage fallback for React state
  const targetState = `[s,a]=Mt.useState("test"),[o,l]=Mt.useState("linh.nhi"),[c,f]=Mt.useState(!0)`;
  const newState = `[s,a]=Mt.useState("test"),[o,l]=Mt.useState(()=>{try{const _p=new URLSearchParams(window.location.search);return (_p.get("user")||_p.get("streamer")||_p.get("room")||localStorage.getItem("tiktok_streamer_username")||"linh.nhi").replace(/^@/,"").trim();}catch(e){return "linh.nhi";}}),[c,f]=Mt.useState(!0)`;

  if (code.includes(targetState)) {
    code = code.replace(targetState, newState);
    console.log('Replaced targetState in', filePath);
  } else {
    console.warn('targetState not found in', filePath);
  }

  // 3. Save to localStorage on input change
  const targetChange = `onChange:O=>l(O.target.value)`;
  const newChange = `onChange:O=>{const v=O.target.value;l(v);try{localStorage.setItem("tiktok_streamer_username",v.trim());}catch(e){}}`;

  if (code.includes(targetChange)) {
    code = code.replace(targetChange, newChange);
    console.log('Replaced targetChange in', filePath);
  } else {
    console.warn('targetChange not found in', filePath);
  }

  fs.writeFileSync(filePath, code, 'utf8');
}
console.log('Finished updating auto-connect logic!');
