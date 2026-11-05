const fs = require('fs');
const vm = require('vm');

const targetFiles = ['1/assets/index-CT5dfJfs.js', '1/public/assets/index-CT5dfJfs.js'];

targetFiles.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');

  // 1. In class PP constructor: change enabled: false to enabled: true
  const targetCtor = 'constructor(){\r\n    pt(this,"ctx",null);\r\n    pt(this,"enabled",!1);';
  const targetCtorLF = 'constructor(){\n    pt(this,"ctx",null);\n    pt(this,"enabled",!1);';
  
  if (code.includes(targetCtor)) {
    code = code.replace(targetCtor, 'constructor(){\r\n    pt(this,"ctx",null);\r\n    pt(this,"enabled",!0);');
    console.log('Updated constructor (CRLF) in', file);
  } else if (code.includes(targetCtorLF)) {
    code = code.replace(targetCtorLF, 'constructor(){\n    pt(this,"ctx",null);\n    pt(this,"enabled",!0);');
    console.log('Updated constructor (LF) in', file);
  } else {
    console.warn('Constructor not matched directly, trying regex');
    code = code.replace(/constructor\(\)\{\s*pt\(this,"ctx",null\);\s*pt\(this,"enabled",!1\);/, 'constructor(){\n    pt(this,"ctx",null);\n    pt(this,"enabled",!0);');
  }

  // 2. In startBGM(): update volume to 0.20, absolute path /assets/bgm_mashup.mp3, and retry loop
  const bgmPattern = /startBGM\(\)\{[\s\S]*?stopBGM\(\)/;
  const newStartBGM = `startBGM(){
    if(!this.enabled)return;
    this.initContext();
    if(!this._bgmAudio){
      this._bgmAudio=new Audio('/assets/bgm_mashup.mp3');
      this._bgmAudio.loop=true;
      this._bgmAudio.volume=0.20;
      this._bgmAudio.preload='auto';
      this._bgmAudio.onended=()=>{
        if(this.enabled&&this._bgmAudio){
          this._bgmAudio.currentTime=0;
          this._bgmAudio.play().catch(()=>{});
        }
      };
    }
    this._bgmAudio.volume=0.20;
    this._bgmAudio.loop=true;
    const _playNow=()=>{
      if(this._bgmAudio&&this.enabled&&this._bgmAudio.paused){
        const p=this._bgmAudio.play();
        if(p&&typeof p.catch==='function'){
          p.catch(()=>{
            const _unlock=()=>{
              if(this._bgmAudio&&this.enabled)this._bgmAudio.play().catch(()=>{});
              if(this.ctx&&this.ctx.state==='suspended')this.ctx.resume().catch(()=>{});
              window.removeEventListener('click',_unlock);
              window.removeEventListener('pointerdown',_unlock);
              window.removeEventListener('keydown',_unlock);
            };
            window.addEventListener('click',_unlock,{once:true});
            window.addEventListener('pointerdown',_unlock,{once:true});
            window.addEventListener('keydown',_unlock,{once:true});
          });
        }
      }
    };
    _playNow();
    if(!this._bgmRetryTimer){
      this._bgmRetryTimer=setInterval(()=>{
        if(this.enabled&&this._bgmAudio&&this._bgmAudio.paused){
          _playNow();
        }
      },2000);
    }
  }
  stopBGM()`;

  if (bgmPattern.test(code)) {
    code = code.replace(bgmPattern, newStartBGM);
    console.log('Updated startBGM in', file);
  } else {
    console.error('Failed to find startBGM pattern in', file);
    process.exit(1);
  }

  // 3. In raidGame init: auto-start audio on initialize
  if (code.includes('this.resize();const _uAudio=')) {
    code = code.replace(
      'this.resize();const _uAudio=',
      'this.resize();this.audio&&this.audio.setEnabled(!0);const _uAudio='
    );
    console.log('Updated raidGame init in', file);
  } else if (!code.includes('this.audio&&this.audio.setEnabled(!0);const _uAudio=')) {
    console.warn('Could not find this.resize();const _uAudio=');
  }

  // Verify syntax with VM
  try {
    new vm.SourceTextModule(code);
    console.log('VM Parse: SUCCESS! Valid syntax for', file);
    fs.writeFileSync(file, code, 'utf8');
  } catch (err) {
    console.error('Syntax error for', file, err);
    process.exit(1);
  }
});
console.log('ALL FILES UPDATED SUCCESSFULLY!');
