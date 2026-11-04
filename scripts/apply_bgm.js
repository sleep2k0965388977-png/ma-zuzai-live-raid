const fs = require('fs');
const path = require('path');

const files = [
  'D:\\1-20261103T120058Z-1-001\\1\\assets\\index-CT5dfJfs.js',
  'D:\\1-20261103T120058Z-1-001\\1\\public\\assets\\index-CT5dfJfs.js'
];

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const startMarker = 'startBGM(){';
  const endMarker = 'playBossRoar(';
  
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) {
    console.error('Could not find startMarker in', filePath);
    continue;
  }
  
  const endIdx = content.indexOf(endMarker, startIdx);
  if (endIdx === -1) {
    console.error('Could not find endMarker in', filePath);
    continue;
  }
  
  const newBgmCode = `startBGM(){
    if(!this.enabled)return;
    this.initContext();
    if(!this._bgmAudio){
      this._bgmAudio=new Audio('./assets/bgm_mashup.mp3');
      this._bgmAudio.loop=!0;
      this._bgmAudio.volume=0.40;
      this._bgmAudio.preload='auto';
      this._bgmAudio.onended=()=>{
        if(this.enabled&&this._bgmAudio){
          this._bgmAudio.currentTime=0;
          this._bgmAudio.play().catch(()=>{});
        }
      };
    }
    this._bgmAudio.volume=0.40;
    if(this._bgmAudio.paused){
      const p=this._bgmAudio.play();
      if(p&&typeof p.catch==='function'){
        p.catch(()=>{});
      }
    }
  }
  stopBGM(){
    if(this._bgmAudio){
      this._bgmAudio.pause();
    }
  }
  `;
  
  const newContent = content.slice(0, startIdx) + newBgmCode + content.slice(endIdx);
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Successfully updated BGM in', filePath);
}
