const fs = require('fs');

const path = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(path, 'utf8');

// 1. Replace class PP with comprehensive Audio Synthesizer (BGM, Wind, Roar, Slashes, Skills, Impacts)
const targetPP = `class PP{constructor(){pt(this,"ctx",null);pt(this,"enabled",!1)}setEnabled(e){this.enabled=e,e&&(this.ctx??(this.ctx=new AudioContext),this.ctx.resume())}play(e=!1){if(!this.enabled||!this.ctx)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type=e?"sawtooth":"sine",t.frequency.setValueAtTime(e?110:480,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(40,this.ctx.currentTime+.3),n.gain.setValueAtTime(.06,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.4),t.connect(n),n.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.4)}dispose(){var e;(e=this.ctx)==null||e.close()}}`;

const replacePP = `class PP{
  constructor(){
    pt(this,"ctx",null);
    pt(this,"enabled",!1);
    this._bgmTimer=null;
    this._windNode=null;
  }
  setEnabled(e){
    this.enabled=e;
    if(e){
      if(!this.ctx){
        const AC=window.AudioContext||window.webkitAudioContext;
        if(AC)this.ctx=new AC();
      }
      if(this.ctx&&this.ctx.state==="suspended")this.ctx.resume();
      this.startBGM();
      this.playWind();
    }else{
      this.stopBGM();
      this.stopWind();
      if(this.ctx&&this.ctx.state==="running")this.ctx.suspend();
    }
  }
  playWind(){
    if(!this.enabled||!this.ctx||this._windNode)return;
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
      filter.frequency.value=380;
      filter.Q.value=2.4;

      const lfo=this.ctx.createOscillator();
      lfo.frequency.value=0.15;
      const lfoGain=this.ctx.createGain();
      lfoGain.gain.value=160;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      const gain=this.ctx.createGain();
      gain.gain.value=0.038;

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
    if(!this.enabled||!this.ctx||this._bgmTimer)return;
    const notes=[146.83, 174.61, 220.00, 261.63, 293.66, 349.23, 392.00];
    const bassNotes=[73.42, 87.31, 110.00, 65.41];
    let step=0;
    const tick=()=>{
      if(!this.enabled||!this.ctx)return;
      const now=this.ctx.currentTime;
      const bar=Math.floor(step/4)%bassNotes.length;
      if(step%4===0){
        const bOsc=this.ctx.createOscillator();
        const bGain=this.ctx.createGain();
        bOsc.type="sawtooth";
        bOsc.frequency.setValueAtTime(bassNotes[bar],now);
        const bFilt=this.ctx.createBiquadFilter();
        bFilt.type="lowpass";
        bFilt.frequency.setValueAtTime(175,now);
        bGain.gain.setValueAtTime(0.045,now);
        bGain.gain.exponentialRampToValueAtTime(0.001,now+2.2);
        bOsc.connect(bFilt);bFilt.connect(bGain);
        bGain.connect(this.ctx.destination);
        bOsc.start(now);bOsc.stop(now+2.2);

        const dOsc=this.ctx.createOscillator();
        const dGain=this.ctx.createGain();
        dOsc.type="sine";
        dOsc.frequency.setValueAtTime(115,now);
        dOsc.frequency.exponentialRampToValueAtTime(28,now+0.42);
        dGain.gain.setValueAtTime(0.09,now);
        dGain.gain.exponentialRampToValueAtTime(0.001,now+0.45);
        dOsc.connect(dGain);dGain.connect(this.ctx.destination);
        dOsc.start(now);dOsc.stop(now+0.45);
      }
      if(step%2===0){
        const note=notes[(step*3+bar*2)%notes.length];
        const mOsc=this.ctx.createOscillator();
        const mGain=this.ctx.createGain();
        mOsc.type="triangle";
        mOsc.frequency.setValueAtTime(note,now);
        mGain.gain.setValueAtTime(0.024,now);
        mGain.gain.exponentialRampToValueAtTime(0.001,now+0.8);
        mOsc.connect(mGain);mGain.connect(this.ctx.destination);
        mOsc.start(now);mOsc.stop(now+0.8);
      }
      step++;
    };
    tick();
    this._bgmTimer=setInterval(tick,540);
  }
  stopBGM(){
    if(this._bgmTimer){
      clearInterval(this._bgmTimer);
      this._bgmTimer=null;
    }
  }
  playBossRoar(type="growl"){
    if(!this.enabled||!this.ctx)return;
    const now=this.ctx.currentTime;
    const dur=type==="phase"?2.4:1.5;
    const osc1=this.ctx.createOscillator();
    const osc2=this.ctx.createOscillator();
    osc1.type="sawtooth";
    osc2.type="triangle";

    const startF=type==="phase"?125:95;
    const endF=type==="phase"?30:38;

    osc1.frequency.setValueAtTime(startF,now);
    osc1.frequency.exponentialRampToValueAtTime(endF,now+dur);
    osc2.frequency.setValueAtTime(startF*0.5,now);
    osc2.frequency.exponentialRampToValueAtTime(endF*0.5,now+dur);

    const lfo=this.ctx.createOscillator();
    lfo.frequency.value=type==="phase"?30:22;
    const lfoG=this.ctx.createGain();
    lfoG.gain.value=16;
    lfo.connect(lfoG);
    lfoG.connect(osc1.frequency);

    const filter=this.ctx.createBiquadFilter();
    filter.type="lowpass";
    filter.frequency.setValueAtTime(600,now);
    filter.frequency.exponentialRampToValueAtTime(140,now+dur);
    filter.Q.value=5.0;

    const gain=this.ctx.createGain();
    gain.gain.setValueAtTime(0.01,now);
    gain.gain.linearRampToValueAtTime(0.16,now+0.12);
    gain.gain.exponentialRampToValueAtTime(0.001,now+dur);

    osc1.connect(filter);osc2.connect(filter);
    filter.connect(gain);gain.connect(this.ctx.destination);

    osc1.start(now);osc2.start(now);lfo.start(now);
    osc1.stop(now+dur);osc2.stop(now+dur);lfo.stop(now+dur);
  }
  playSwordSlash(heavy=!1){
    if(!this.enabled||!this.ctx)return;
    const now=this.ctx.currentTime;
    const dur=heavy?0.32:0.2;
    const bSize=Math.floor(this.ctx.sampleRate*dur);
    const buf=this.ctx.createBuffer(1,bSize,this.ctx.sampleRate);
    const data=buf.getChannelData(0);
    for(let i=0;i<bSize;i++)data[i]=Math.random()*2-1;
    const noise=this.ctx.createBufferSource();
    noise.buffer=buf;

    const filter=this.ctx.createBiquadFilter();
    filter.type="bandpass";
    filter.frequency.setValueAtTime(heavy?1400:2100,now);
    filter.frequency.exponentialRampToValueAtTime(320,now+dur);
    filter.Q.value=3.8;

    const osc=this.ctx.createOscillator();
    osc.type="sine";
    osc.frequency.setValueAtTime(heavy?850:1350,now);
    osc.frequency.exponentialRampToValueAtTime(380,now+dur);

    const gain=this.ctx.createGain();
    gain.gain.setValueAtTime(heavy?0.11:0.07,now);
    gain.gain.exponentialRampToValueAtTime(0.001,now+dur);

    noise.connect(filter);filter.connect(gain);
    osc.connect(gain);gain.connect(this.ctx.destination);

    noise.start(now);osc.start(now);
    noise.stop(now+dur);osc.stop(now+dur);
  }
  playHitImpact(isBig=!1){
    if(!this.enabled||!this.ctx)return;
    const now=this.ctx.currentTime;
    const dur=isBig?0.55:0.25;
    const osc=this.ctx.createOscillator();
    osc.type="sine";
    osc.frequency.setValueAtTime(isBig?160:115,now);
    osc.frequency.exponentialRampToValueAtTime(26,now+dur);

    const gain=this.ctx.createGain();
    gain.gain.setValueAtTime(isBig?0.18:0.08,now);
    gain.gain.exponentialRampToValueAtTime(0.001,now+dur);

    osc.connect(gain);gain.connect(this.ctx.destination);
    osc.start(now);osc.stop(now+dur);
  }
  playSkillSound(skill){
    if(!this.enabled||!this.ctx)return;
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
          osc.frequency.setValueAtTime(220+i*80,t);
          osc.frequency.exponentialRampToValueAtTime(42,t+1.3);
          g.gain.setValueAtTime(0.07,t);
          g.gain.exponentialRampToValueAtTime(0.001,t+1.4);
          osc.connect(g);g.connect(this.ctx.destination);
          osc.start(t+i*0.07);osc.stop(t+1.4);
        }
      },350);
    }else if(skill==="single_dragon"){
      const osc=this.ctx.createOscillator();
      const g=this.ctx.createGain();
      osc.type="sawtooth";
      osc.frequency.setValueAtTime(310,now);
      osc.frequency.exponentialRampToValueAtTime(52,now+1.2);
      g.gain.setValueAtTime(0.13,now);
      g.gain.exponentialRampToValueAtTime(0.001,now+1.25);
      osc.connect(g);g.connect(this.ctx.destination);
      osc.start(now);osc.stop(now+1.25);
    }else if(skill==="sword_rain"){
      for(let i=0;i<7;i++){
        setTimeout(()=>{
          if(!this.enabled||!this.ctx)return;
          const t=this.ctx.currentTime;
          const osc=this.ctx.createOscillator();
          const g=this.ctx.createGain();
          osc.type="sine";
          osc.frequency.setValueAtTime(1750+i*110,t);
          osc.frequency.exponentialRampToValueAtTime(280,t+0.16);
          g.gain.setValueAtTime(0.05,t);
          g.gain.exponentialRampToValueAtTime(0.001,t+0.18);
          osc.connect(g);g.connect(this.ctx.destination);
          osc.start(t);osc.stop(t+0.18);
        },i*90);
      }
    }else if(skill==="giant_sword"){
      const osc=this.ctx.createOscillator();
      const g=this.ctx.createGain();
      osc.type="sawtooth";
      osc.frequency.setValueAtTime(450,now);
      osc.frequency.exponentialRampToValueAtTime(28,now+1.5);
      const filt=this.ctx.createBiquadFilter();
      filt.type="lowpass";
      filt.frequency.setValueAtTime(750,now);
      filt.frequency.exponentialRampToValueAtTime(110,now+1.5);
      g.gain.setValueAtTime(0.16,now);
      g.gain.exponentialRampToValueAtTime(0.001,now+1.6);
      osc.connect(filt);filt.connect(g);g.connect(this.ctx.destination);
      osc.start(now);osc.stop(now+1.6);
    }else{
      this.playSwordSlash(!0);
    }
  }
  playHealCheckpoint(){
    if(!this.enabled||!this.ctx)return;
    const now=this.ctx.currentTime;
    const chords=[261.63, 329.63, 392.00, 523.25, 659.25];
    chords.forEach((freq,i)=>{
      const osc=this.ctx.createOscillator();
      const g=this.ctx.createGain();
      osc.type="triangle";
      osc.frequency.setValueAtTime(freq,now+i*0.08);
      g.gain.setValueAtTime(0.065,now+i*0.08);
      g.gain.exponentialRampToValueAtTime(0.001,now+1.7);
      osc.connect(g);g.connect(this.ctx.destination);
      osc.start(now+i*0.08);osc.stop(now+1.8);
    });
  }
  playLegionWhoosh(){
    if(!this.enabled||!this.ctx)return;
    const now=this.ctx.currentTime;
    const osc=this.ctx.createOscillator();
    const g=this.ctx.createGain();
    osc.type="sine";
    osc.frequency.setValueAtTime(650+Math.random()*350,now);
    osc.frequency.exponentialRampToValueAtTime(220,now+0.16);
    g.gain.setValueAtTime(0.018,now);
    g.gain.exponentialRampToValueAtTime(0.001,now+0.18);
    osc.connect(g);g.connect(this.ctx.destination);
    osc.start(now);osc.stop(now+0.18);
  }
  play(e=!1){
    if(!this.enabled||!this.ctx)return;
    this.playHitImpact(e);
  }
  dispose(){
    this.stopBGM();
    this.stopWind();
    var e;(e=this.ctx)==null||e.close();
  }
}`;

if (!code.includes(targetPP)) {
  console.error('Target PP class not found!');
  process.exit(1);
}
code = code.replace(targetPP, replacePP);
console.log('1. Replaced class PP with advanced multi-track Web Audio synthesizer');

// 2. Hook sound calls into damage()
const targetDmgSound = `  const n=Math.min(e,this.state.hp);
  this.state.hp-=n,this.state.lastDamage=n,this.state.lastAttacker=t,this.state.combo++;`;
const replaceDmgSound = `  const n=Math.min(e,this.state.hp);
  this.state.hp-=n,this.state.lastDamage=n,this.state.lastAttacker=t,this.state.combo++;this.audio&&this.audio.playHitImpact(n>3000);`;

if (!code.includes(targetDmgSound)) {
  console.error('Target damage sound hook not found!');
  process.exit(1);
}
code = code.replace(targetDmgSound, replaceDmgSound);

// Checkpoint heal sound in damage()
const targetHealSound = `this.state.hp=this.state.maxHp; // TỰ ĐỘNG HỒI MÁU THÊM 1 CỌC (gọi là 2/4, 3/4, 4/4)`;
const replaceHealSound = `this.state.hp=this.state.maxHp;this.audio&&(this.audio.playHealCheckpoint(),this.audio.playBossRoar("phase")); // TỰ ĐỘNG HỒI MÁU THÊM 1 CỌC (gọi là 2/4, 3/4, 4/4)`;

if (!code.includes(targetHealSound)) {
  console.error('Target heal sound hook not found!');
  process.exit(1);
}
code = code.replace(targetHealSound, replaceHealSound);
console.log('2. Hooked hit impact and checkpoint heal sounds into damage()');

// 3. Hook sound calls into consume()
const targetConsumeSound = `t.skill=e.type==="gift"?e.skill??"small":"attack",this.playClip(t.mixer,t.clips??[],t.skill==="attack"?"attack":"skill");`;
const replaceConsumeSound = `t.skill=e.type==="gift"?e.skill??"small":"attack";if(e.type==="gift"){this.audio&&this.audio.playSkillSound(e.skill);}else{this.audio&&this.audio.playSwordSlash(!1);}this.playClip(t.mixer,t.clips??[],t.skill==="attack"?"attack":"skill");`;

if (!code.includes(targetConsumeSound)) {
  console.error('Target consume sound hook not found!');
  process.exit(1);
}
code = code.replace(targetConsumeSound, replaceConsumeSound);
console.log('3. Hooked skill sound and sword slash into consume()');

// 4. Hook sound calls into updateLegionSwords()
const targetLegionSound = `sword.arcHeight=0.4+Math.random()*2.2;`;
const replaceLegionSound = `sword.arcHeight=0.4+Math.random()*2.2;if(Math.random()<0.08)this.audio&&this.audio.playLegionWhoosh();`;

if (!code.includes(targetLegionSound)) {
  console.error('Target legion sound hook not found!');
  process.exit(1);
}
code = code.replace(targetLegionSound, replaceLegionSound);
console.log('4. Hooked legion whoosh into updateLegionSwords()');

// 5. Hook boss roar into retaliation
const targetRetaliation = `this.eliminatePlayers(Math.floor(Math.random()*2)+1,"Phóng chưởng"),`;
const replaceRetaliation = `this.eliminatePlayers(Math.floor(Math.random()*2)+1,"Phóng chưởng"),this.audio&&this.audio.playBossRoar("growl"),`;

if (!code.includes(targetRetaliation)) {
  console.error('Target retaliation not found!');
  process.exit(1);
}
code = code.replace(targetRetaliation, replaceRetaliation);
console.log('5. Hooked boss roar into retaliation');

// 6. Auto-enable audio on first user click or keypress
const targetAudioListener = `this.observer.observe(e),this.resize(),`;
const replaceAudioListener = `this.observer.observe(e),this.resize();const _uAudio=()=>{this.audio&&this.audio.setEnabled(!0);window.removeEventListener("click",_uAudio);window.removeEventListener("keydown",_uAudio);};window.addEventListener("click",_uAudio);window.addEventListener("keydown",_uAudio);`;

if (!code.includes(targetAudioListener)) {
  console.error('Target audio listener hook not found!');
  process.exit(1);
}
code = code.replace(targetAudioListener, replaceAudioListener);
console.log('6. Added auto-unlock audio on user click');

fs.writeFileSync(path, code, 'utf8');
console.log('Successfully written full Audio system to index-CT5dfJfs.js!');
