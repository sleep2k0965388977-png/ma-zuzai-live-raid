const fs = require('fs');
const files = [
  'D:\\1-20261103T120058Z-1-001\\1\\assets\\index-CT5dfJfs.js',
  'D:\\1-20261103T120058Z-1-001\\1\\public\\assets\\index-CT5dfJfs.js'
];
for (const f of files) {
  let js = fs.readFileSync(f, 'utf8');
  const idx = js.indexOf('ws.onopen=()=>{');
  const end = js.indexOf('ws.onmessage=msg=>{', idx);
  const newSnippet = `ws.onopen=()=>{
      this.state.tiktokConnected=!0;
      this.log("🟢 [TIKTOK LIVE] Đã kết nối thành công tới máy chủ Cầu Nối TikTok Live!","system");
      this.publish();
      try{
        const _p=new URLSearchParams(window.location.search);
        const _auto=(_p.get("user")||_p.get("streamer")||_p.get("room")||localStorage.getItem("tiktok_streamer_username")||"").replace(/^@/,"").trim();
        if(_auto&&_auto!=="linh.nhi"){
          setTimeout(()=>{this.connectToTikTokStream(_auto);},1200);
        }
      }catch(e){}
    };
    `;
  js = js.slice(0, idx) + newSnippet + js.slice(end);
  fs.writeFileSync(f, js, 'utf8');
  console.log('Updated ws.onopen in', f);
}
