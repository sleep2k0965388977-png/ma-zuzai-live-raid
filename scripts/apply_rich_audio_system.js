const fs = require('fs');

const filePath = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(filePath, 'utf8');

console.log('=== UPGRADING AUDIO SYSTEM (RICH BGM & EPIC COMBAT SFX) ===');

const newPPClass = `class PP{
  constructor(){
    pt(this,"ctx",null);
    pt(this,"enabled",!1);
    this._bgmTimer=null;
    this._windNode=null;
    this._step=0;
  }
  initContext(){
    if(!this.ctx){
      const AC=window.AudioContext||window.webkitAudioContext;
      if(AC)this.ctx=new AC();
    }
    if(this.ctx&&this.ctx.state==="suspended"){
      this.ctx.resume().catch(()=>{});
    }
  }
  setEnabled(e){
    this.enabled=e;
    if(e){
      this.initContext();
      this.startBGM();
      this.playWind();
    }else{
      this.stopBGM();
      this.stopWind();
      if(this.ctx&&this.ctx.state==="running")this.ctx.suspend().catch(()=>{});
    }
  }
  playWind(){
    if(!this.enabled)return;
    this.initContext();
    if(!this.ctx||this._windNode)return;
    try{
      const bSize=this.ctx.sampleRate*2;
      const nBuf=this.ctx.createBuffer(1,bSize,this.ctx.sampleRate);
      const data=nBuf.getChannelData(0);
      for(let i=0;i<bSize;i++)data[i]=Math.random()*2-1;
      const whiteNoise=this.ctx.createBufferSource();
      whiteNoise.buffer=nBuf;
      whiteNoise.loop=!0;

      const filter=this.ctx.createBiquadFilter();
      filter.type="bandpass";
      filter.frequency.value=420;
      filter.Q.value=2.0;

      const lfo=this.ctx.createOscillator();
      lfo.frequency.value=0.18;
      const lfoGain=this.ctx.createGain();
      lfoGain.gain.value=220;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      const gain=this.ctx.createGain();
      gain.gain.value=0.085; // Âm lượng gió hú rõ ràng hơn

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      lfo.start();
      this._windNode={source:whiteNoise,lfo,gain};
    }catch(err){}
  }
  stopWind(){
    if(this._windNode){
      try{
        this._windNode.source.stop();
        this._windNode.lfo.stop();
      }catch(err){}
      this._windNode=null;
    }
  }
  startBGM(){
    if(!this.enabled)return;
    this.initContext();
    if(!this.ctx||this._bgmTimer)return;
    // Thang âm Tiên Hiệp Ngũ Cung (D-Minor Pentatonic Guzheng & Epic Taiko Drums)
    const guzhengNotes=[146.83, 174.61, 196.00, 220.00, 261.63, 293.66, 349.23, 392.00, 440.00];
    const bassChords=[73.42, 87.31, 110.00, 65.41]; // D2, F2, A2, C2
    this._step=0;

    const tick=()=>{
      if(!this.enabled||!this.ctx)return;
      const now=this.ctx.currentTime;
      const bar=Math.floor(this._step/4)%bassChords.length;

      // 1. Nhịp Trống Trận Taiko Trầm Hùng (Mỗi ô nhịp)
      if(this._step%4===0){
        // Trống Taiko Bass
        const dOsc=this.ctx.createOscillator();
        const dGain=this.ctx.createGain();
        dOsc.type="sine";
        dOsc.frequency.setValueAtTime(135,now);
        dOsc.frequency.exponentialRampToValueAtTime(26,now+0.48);
        dGain.gain.setValueAtTime(0.24,now); // Âm lượng trống mạnh mẽ
        dGain.gain.exponentialRampToValueAtTime(0.001,now+0.52);
        dOsc.connect(dGain);dGain.connect(this.ctx.destination);
        dOsc.start(now);dOsc.stop(now+0.52);

        // Hợp âm trầm bi tráng (Epic Drone Pad)
        const bOsc=this.ctx.createOscillator();
        const bGain=this.ctx.createGain();
        bOsc.type="sawtooth";
        bOsc.frequency.setValueAtTime(bassChords[bar],now);
        const bFilt=this.ctx.createBiquadFilter();
        bFilt.type="lowpass";
        bFilt.frequency.setValueAtTime(220,now);
        bGain.gain.setValueAtTime(0.12,now);
        bGain.gain.exponentialRampToValueAtTime(0.001,now+2.2);
        bOsc.connect(bFilt);bFilt.connect(bGain);
        bGain.connect(this.ctx.destination);
        bOsc.start(now);bOsc.stop(now+2.2);
      }

      // 2. Nhịp Trống Đệm Nhẹ (Nhịp 2 và 4)
      if(this._step%2===1){
        const sOsc=this.ctx.createOscillator();
        const sGain=this.ctx.createGain();
        sOsc.type="triangle";
        sOsc.frequency.setValueAtTime(85,now);
        sOsc.frequency.exponentialRampToValueAtTime(32,now+0.22);
        sGain.gain.setValueAtTime(0.09,now);
        sGain.gain.exponentialRampToValueAtTime(0.001,now+0.25);
        sOsc.connect(sGain);sGain.connect(this.ctx.destination);
        sOsc.start(now);sOsc.stop(now+0.25);
      }

      // 3. Tiếng Đàn Cổ Cầm / Guzheng Ngũ Cung Tiên Hiệp réo rắt
      const noteIdx=(this._step*3+bar*2)%guzhengNotes.length;
      const note=guzhengNotes[noteIdx];
      const mOsc=this.ctx.createOscillator();
      const mGain=this.ctx.createGain();
      mOsc.type="triangle";
      mOsc.frequency.setValueAtTime(note,now);
      mGain.gain.setValueAtTime(0.14,now); // Âm lượng đàn réo rắt
      mGain.gain.exponentialRampToValueAtTime(0.001,now+0.75);
      
      const mFilt=this.ctx.createBiquadFilter();
      mFilt.type="bandpass";
      mFilt.frequency.setValueAtTime(note*1.8,now);
      mFilt.Q.value=1.5;

      mOsc.connect(mFilt);mFilt.connect(mGain);
      mGain.connect(this.ctx.destination);
      mOsc.start(now);mOsc.stop(now+0.75);

      this._step++;
    };

    tick();
    this._bgmTimer=setInterval(tick,480);
  }
  stopBGM(){
    if(this._bgmTimer){
      clearInterval(this._bgmTimer);
      this._bgmTimer=null;
    }
  }
  playBossRoar(type="growl"){
    if(!this.enabled)return;
    this.initContext();
    if(!this.ctx)return;
    const now=this.ctx.currentTime;
    const dur=type==="phase"?2.5:1.6;
    const osc1=this.ctx.createOscillator();
    const osc2=this.ctx.createOscillator();
    osc1.type="sawtooth";
    osc2.type="triangle";

    const startF=type==="phase"?140:110;
    const endF=type==="phase"?32:42;

    osc1.frequency.setValueAtTime(startF,now);
    osc1.frequency.exponentialRampToValueAtTime(endF,now+dur);
    osc2.frequency.setValueAtTime(startF*0.5,now);
    osc2.frequency.exponentialRampToValueAtTime(endF*0.5,now+dur);

    const lfo=this.ctx.createOscillator();
    lfo.frequency.value=type==="phase"?32:24;
    const lfoG=this.ctx.createGain();
    lfoG.gain.value=24;
    lfo.connect(lfoG);
    lfoG.connect(osc1.frequency);

    const filter=this.ctx.createBiquadFilter();
    filter.type="lowpass";
    filter.frequency.setValueAtTime(750,now);
    filter.frequency.exponentialRampToValueAtTime(160,now+dur);
    filter.Q.value=5.5;

    const gain=this.ctx.createGain();
    gain.gain.setValueAtTime(0.28,now); // Tiếng Boss gầm to, uy nghiêm
    gain.gain.exponentialRampToValueAtTime(0.001,now+dur);

    osc1.connect(filter);osc2.connect(filter);
    filter.connect(gain);gain.connect(this.ctx.destination);

    osc1.start(now);osc2.start(now);lfo.start(now);
    osc1.stop(now+dur);osc2.stop(now+dur);lfo.stop(now+dur);
  }
  playSwordSlash(heavy=!1){
    if(!this.enabled)return;
    this.initContext();
    if(!this.ctx)return;
    const now=this.ctx.currentTime;
    const dur=heavy?0.32:0.22;
    const bSize=Math.floor(this.ctx.sampleRate*dur);
    const buf=this.ctx.createBuffer(1,bSize,this.ctx.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<bSize;i++)d[i]=Math.random()*2-1;

    const noise=this.ctx.createBufferSource();
    noise.buffer=buf;

    const filter=this.ctx.createBiquadFilter();
    filter.type="bandpass";
    filter.frequency.setValueAtTime(heavy?2600:3200,now);
    filter.frequency.exponentialRampToValueAtTime(360,now+dur);
    filter.Q.value=4.2;

    const osc=this.ctx.createOscillator();
    osc.type="sine";
    osc.frequency.setValueAtTime(heavy?950:1450,now);
    osc.frequency.exponentialRampToValueAtTime(420,now+dur);

    const gain=this.ctx.createGain();
    gain.gain.setValueAtTime(heavy?0.24:0.18,now); // Tiếng chém kim loại sắc lẹm
    gain.gain.exponentialRampToValueAtTime(0.001,now+dur);

    noise.connect(filter);filter.connect(gain);
    osc.connect(gain);gain.connect(this.ctx.destination);

    noise.start(now);osc.start(now);
    noise.stop(now+dur);osc.stop(now+dur);
  }
  playHitImpact(isBig=!1){
    if(!this.enabled)return;
    this.initContext();
    if(!this.ctx)return;
    const now=this.ctx.currentTime;
    const dur=isBig?0.6:0.3;
    const osc=this.ctx.createOscillator();
    osc.type="sine";
    osc.frequency.setValueAtTime(isBig?175:130,now);
    osc.frequency.exponentialRampToValueAtTime(28,now+dur);

    const gain=this.ctx.createGain();
    gain.gain.setValueAtTime(isBig?0.32:0.19,now); // Tiếng đập trúng Boss đanh thép

    osc.connect(gain);gain.connect(this.ctx.destination);
    osc.start(now);osc.stop(now+dur);
  }
  playSkillSound(skill){
    if(!this.enabled)return;
    this.initContext();
    if(!this.ctx)return;
    const now=this.ctx.currentTime;
    if(skill==="ten_dragons"){
      this.playBossRoar("phase");
      setTimeout(()=>{
        if(!this.enabled||!this.ctx)return;
        const t=this.ctx.currentTime;
        for(let i=0;i<4;i++){
          const osc=this.ctx.createOscillator();
          const g=this.ctx.createGain();
          osc.type="sawtooth";
          osc.frequency.setValueAtTime(260+i*90,t);
          osc.frequency.exponentialRampToValueAtTime(45,t+1.4);
          g.gain.setValueAtTime(0.22,t);
          g.gain.exponentialRampToValueAtTime(0.001,t+1.5);
          osc.connect(g);g.connect(this.ctx.destination);
          osc.start(t+i*0.06);osc.stop(t+1.5);
        }
      },300);
    }else if(skill==="single_dragon"){
      const osc=this.ctx.createOscillator();
      const g=this.ctx.createGain();
      osc.type="sawtooth";
      osc.frequency.setValueAtTime(340,now);
      osc.frequency.exponentialRampToValueAtTime(55,now+1.3);
      g.gain.setValueAtTime(0.26,now);
      g.gain.exponentialRampToValueAtTime(0.001,now+1.35);
      osc.connect(g);g.connect(this.ctx.destination);
      osc.start(now);osc.stop(now+1.35);
    }else if(skill==="sword_rain"){
      for(let i=0;i<7;i++){
        setTimeout(()=>{
          if(!this.enabled||!this.ctx)return;
          const t=this.ctx.currentTime;
          const osc=this.ctx.createOscillator();
          const g=this.ctx.createGain();
          osc.type="sine";
          osc.frequency.setValueAtTime(1850+i*120,t);
          osc.frequency.exponentialRampToValueAtTime(320,t+0.18);
          g.gain.setValueAtTime(0.14,t);
          g.gain.exponentialRampToValueAtTime(0.001,t+0.2);
          osc.connect(g);g.connect(this.ctx.destination);
          osc.start(t);osc.stop(t+0.2);
        },i*85);
      }
    }else if(skill==="giant_sword"){
      const osc=this.ctx.createOscillator();
      const g=this.ctx.createGain();
      osc.type="sawtooth";
      osc.frequency.setValueAtTime(480,now);
      osc.frequency.exponentialRampToValueAtTime(30,now+1.6);
      const filt=this.ctx.createBiquadFilter();
      filt.type="lowpass";
      filt.frequency.setValueAtTime(800,now);
      filt.frequency.exponentialRampToValueAtTime(120,now+1.6);
      g.gain.setValueAtTime(0.30,now);
      g.gain.exponentialRampToValueAtTime(0.001,now+1.7);
      osc.connect(filt);filt.connect(g);g.connect(this.ctx.destination);
      osc.start(now);osc.stop(now+1.7);
    }else{
      this.playSwordSlash(!0);
    }
  }
  playHealCheckpoint(){
    if(!this.enabled)return;
    this.initContext();
    if(!this.ctx)return;
    const now=this.ctx.currentTime;
    const chords=[261.63, 329.63, 392.00, 523.25, 659.25];
    chords.forEach((freq,i)=>{
      const osc=this.ctx.createOscillator();
      const g=this.ctx.createGain();
      osc.type="triangle";
      osc.frequency.setValueAtTime(freq,now+i*0.08);
      g.gain.setValueAtTime(0.18,now+i*0.08);
      g.gain.exponentialRampToValueAtTime(0.001,now+1.7);
      osc.connect(g);g.connect(this.ctx.destination);
      osc.start(now+i*0.08);osc.stop(now+1.8);
    });
  }
  playLegionWhoosh(){
    if(!this.enabled)return;
    this.initContext();
    if(!this.ctx)return;
    const now=this.ctx.currentTime;
    const osc=this.ctx.createOscillator();
    const g=this.ctx.createGain();
    osc.type="sine";
    osc.frequency.setValueAtTime(700+Math.random()*400,now);
    osc.frequency.exponentialRampToValueAtTime(240,now+0.18);
    g.gain.setValueAtTime(0.08,now);
    g.gain.exponentialRampToValueAtTime(0.001,now+0.2);
    osc.connect(g);g.connect(this.ctx.destination);
    osc.start(now);osc.stop(now+0.2);
  }
  play(e=!1){
    this.playHitImpact(e);
  }
  dispose(){
    this.stopBGM();
    this.stopWind();
    var e;(e=this.ctx)==null||e.close();
  }
}`;

const ppStart = code.indexOf('class PP{');
const ppEnd = code.indexOf('const Mf=', ppStart);

if (ppStart !== -1 && ppEnd !== -1) {
  code = code.slice(0, ppStart) + newPPClass + code.slice(ppEnd);
  console.log('✓ Successfully replaced class PP with Epic Xianxia procedural audio system');
} else {
  console.error('❌ Could not locate class PP');
}

// Update initial audio state [c, f] = Mt.useState(!0) so UI shows UNMUTED by default
const oldHook = ',[c,f]=Mt.useState(!1),';
const newHook = ',[c,f]=Mt.useState(!0),';
if (code.includes(oldHook)) {
  code = code.replace(oldHook, newHook);
  console.log('✓ Initialized audio state [c, f] to TRUE (Unmuted by default)');
}

// In _uAudio, also sync f(true)
const oldUAudio = 'const _uAudio=()=>{this.audio&&this.audio.setEnabled(!0);window.removeEventListener("click",_uAudio);window.removeEventListener("keydown",_uAudio);};';
const newUAudio = 'const _uAudio=()=>{this.audio&&this.audio.setEnabled(!0);window.removeEventListener("click",_uAudio);window.removeEventListener("keydown",_uAudio);};';
// Ensure global click and keydown resume audio at all times
if (!code.includes('window.addEventListener("pointerdown",()=>')) {
  const resumeHook = 'window.addEventListener("pointerdown",()=>{if(window.raidGame&&window.raidGame.audio){window.raidGame.audio.initContext();if(!window.raidGame.audio.enabled)window.raidGame.audio.setEnabled(!0);}},{passive:!0});';
  code = code.replace('window.raidGame=this,', 'window.raidGame=this,' + resumeHook);
  console.log('✓ Added pointerdown global auto-unmute hook');
}

fs.writeFileSync(filePath, code, 'utf8');
const pubPath = 'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js';
if (fs.existsSync(pubPath)) {
  fs.writeFileSync(pubPath, code, 'utf8');
}
console.log('✅ Client files saved!');
