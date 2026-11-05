const fs = require('fs');
const path = require('path');

const jsFiles = [
  path.join(__dirname, '..', 'assets', 'index-CT5dfJfs.js'),
  path.join(__dirname, '..', 'public', 'assets', 'index-CT5dfJfs.js')
];

for (const f of jsFiles) {
  if (!fs.existsSync(f)) continue;
  let code = fs.readFileSync(f, 'utf8');

  // 1. Upgrade pixel ratio limit from 1.0 to 2.0 for razor-sharp HD rendering
  code = code.replace(
    'this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.0))',
    'this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2.0))'
  );

  // 2. Adjust resize() to dynamically handle vertical screens (iPhone 17 Pro Max & TikTok Studio)
  const oldResize = `resize(){const e=this.host.clientWidth,t=this.host.clientHeight;if(!e||!t)return;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.composer.setSize(e,t);const bw=Math.min(Math.round(e*.35),320),bh=Math.min(Math.round(t*.35),320);if(this.bloomPass)this.bloomPass.setSize(bw,bh);}`;

  const newResize = `resize(){
    const e=this.host.clientWidth,t=this.host.clientHeight;
    if(!e||!t)return;
    const aspect=e/t;
    this.camera.aspect=aspect;
    if(aspect<0.75){
      // Portrait mode (iPhone 17 Pro Max / TikTok LIVE 9:16 ~ 9:19.5):
      // Adjust FOV dynamically so Boss statue + aura + chains are 100% visible and centered!
      const targetFov = Math.min(84, Math.max(72, 72 * (0.62 / aspect)));
      this.camera.fov = targetFov;
    } else {
      this.camera.fov = 76;
    }
    this.camera.updateProjectionMatrix();
    const dpr = Math.min(window.devicePixelRatio||1, 2.0);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(e,t);
    this.composer.setSize(e,t);
    const bw=Math.min(Math.round(e*.4),480),bh=Math.min(Math.round(t*.4),480);
    if(this.bloomPass)this.bloomPass.setSize(bw,bh);
  }`;

  if (code.includes(oldResize)) {
    code = code.replace(oldResize, newResize);
    console.log('Replaced resize in', f);
  } else {
    console.log('oldResize signature not exact in', f, '- trying regex');
    code = code.replace(/resize\(\)\s*\{const e=this\.host\.clientWidth,t=this\.host\.clientHeight;[^}]+\}/, newResize);
    console.log('Applied newResize via regex to', f);
  }

  // 3. Adjust default lookTarget and cameraTarget in main mode for portrait screens so the boss is centered
  // Original: pt(this,"cameraTarget",Ft(0,14.5,40.0));pt(this,"lookTarget",Ft(0,6.0,-1.8));
  // In portrait, looking slightly lower (y: 4.8) brings the upper body and head of the boss into clear view!
  code = code.replace(
    'pt(this,"lookTarget",Ft(0,6.0,-1.8));',
    'pt(this,"lookTarget",Ft(0,4.6,-1.8));'
  );
  code = code.replace(
    ': Ft(0, 6.0, -1.8);',
    ': (this.camera && this.camera.aspect < 0.75 ? Ft(0, 4.6, -1.8) : Ft(0, 5.8, -1.8));'
  );

  fs.writeFileSync(f, code, 'utf8');
  console.log('Updated JS file:', f);
}
