const fs = require('fs');

const filePath = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(filePath, 'utf8');

console.log('=== MAKING WEBSOCKET URL DYNAMIC FOR VPS & LOCAL ===');

const oldBridgeFn = `connectTikTokBridge(url="ws://localhost:8081"){`;
const newBridgeFn = `connectTikTokBridge(url){
  if(!url){
    try{
      const loc=window.location;
      if(loc.protocol==="https:"){
        url=\`wss://\${loc.host}/ws\`;
      }else if(loc.hostname&&loc.hostname!=="localhost"&&loc.hostname!=="127.0.0.1"){
        url=\`ws://\${loc.host}/ws\`;
      }else{
        url="ws://localhost:8081";
      }
    }catch(e){
      url="ws://localhost:8081";
    }
  }`;

if (code.includes(oldBridgeFn)) {
  code = code.replace(oldBridgeFn, newBridgeFn);
  console.log('✓ Successfully made connectTikTokBridge dynamic for VPS and Local');
} else {
  console.error('❌ Could not find exact oldBridgeFn');
}

fs.writeFileSync(filePath, code, 'utf8');
const pubPath = 'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js';
if (fs.existsSync(pubPath)) {
  fs.writeFileSync(pubPath, code, 'utf8');
}
console.log('✅ Client files saved!');
