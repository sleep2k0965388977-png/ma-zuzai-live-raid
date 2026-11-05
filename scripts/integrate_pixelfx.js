const fs = require('fs');
const path = require('path');

// 1. Update index.html to include pixelfx-engine.js
const htmlPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');
if (!html.includes('pixelfx-engine.js')) {
  html = html.replace(
    '<script type="module" crossorigin src="./assets/index-CT5dfJfs.js',
    '<script src="./assets/pixelfx-engine.js?v=' + Date.now() + '"></script>\n    <script type="module" crossorigin src="./assets/index-CT5dfJfs.js'
  );
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Added pixelfx-engine.js script tag to index.html');
}

// 2. Patch JS bundles
const jsFiles = [
  path.join(__dirname, '..', 'assets', 'index-CT5dfJfs.js'),
  path.join(__dirname, '..', 'public', 'assets', 'index-CT5dfJfs.js')
];

for (const f of jsFiles) {
  if (!fs.existsSync(f)) continue;
  let code = fs.readFileSync(f, 'utf8');

  // A. Initialize pixelFX in constructor
  const targetHost = 'this.labels=document.createElement("div"),this.labels.className="world-labels",e.appendChild(this.labels),';
  const newHost = 'this.labels=document.createElement("div"),this.labels.className="world-labels",e.appendChild(this.labels),try{const PFX=window.PixelFXLib?window.PixelFXLib.PixelFXManager:window.PixelFXManager;if(PFX)this.pixelFX=new PFX(e);}catch(err){console.error(err);},';

  if (code.includes(targetHost)) {
    code = code.replace(targetHost, newHost);
    console.log('Hooked PixelFXManager initialization into', f);
  }

  // B. Render pixelFX in animate() right after composer.render()
  const targetRender = 'this.composer.render();this.publishTimer+=e';
  const newRender = 'this.composer.render();try{if(this.pixelFX)this.pixelFX.updateAndRender(e);}catch(err){};this.publishTimer+=e';

  if (code.includes(targetRender)) {
    code = code.replace(targetRender, newRender);
    console.log('Hooked PixelFX updateAndRender into animate in', f);
  }

  // C. Resize pixelFX in resize()
  const targetResize = 'if(this.bloomPass)this.bloomPass.setSize(bw,bh);';
  const newResize = 'if(this.bloomPass)this.bloomPass.setSize(bw,bh);try{if(this.pixelFX)this.pixelFX.resize();}catch(err){}';

  if (code.includes(targetResize)) {
    code = code.replace(targetResize, newResize);
    console.log('Hooked PixelFX resize in', f);
  }

  // D. Add triggerPixelFX method to the class
  const triggerPixelFXMethod = `
triggerPixelFX(name,worldPos,options={}){
  if(!this.pixelFX||!this.camera||!this.host)return;
  try{
    const B3=this.camera.position.constructor;
    const p=(worldPos?worldPos.clone():new B3(0,2.5,-1.8));
    p.project(this.camera);
    const w=this.host.clientWidth||window.innerWidth;
    const h=this.host.clientHeight||window.innerHeight;
    const sx=(p.x*0.5+0.5)*w;
    const sy=(-(p.y*0.5)+0.5)*h;
    this.pixelFX.spawn(name,sx,sy,options);
  }catch(err){}
}
`;

  // Attach triggerPixelFX to the prototype
  if (!code.includes('triggerPixelFX(name,worldPos')) {
    const classMarker = 'buildArena(){';
    code = code.replace(classMarker, triggerPixelFXMethod + '\n' + classMarker);
    console.log('Attached triggerPixelFX method to', f);
  }

  // E. Trigger PixelFX for Attacks and Skills!
  // 1. Normal slash hit
  code = code.replace(
    'this.effect(sk.target,"#fde047",!1,3);this.shake(.18,.6);',
    'this.effect(sk.target,"#fde047",!1,3);this.shake(.18,.6);this.triggerPixelFX(Math.random()>0.4?"crit-hit":"sword-slash",sk.target);'
  );

  // 2. Giant sword impact
  code = code.replace(
    'this.effect(sk.target,"#38bdf8",!0,5.5);this.shake(.42,1.6);',
    'this.effect(sk.target,"#38bdf8",!0,5.5);this.shake(.42,1.6);this.triggerPixelFX("plasma-explosion",sk.target,{zoom:2.8});this.triggerPixelFX("crit-hit",sk.target,{zoom:2.2});'
  );

  // 3. Giant sword creation (magic circle)
  code = code.replace(
    'createGiantSwordFX(targetPos){',
    'createGiantSwordFX(targetPos){this.triggerPixelFX("magic-circle",targetPos,{zoom:2.6});'
  );

  // 4. Sword rain hit
  code = code.replace(
    'sw.hit=!0;sw.mesh.visible=!1;if(!this.isOpeningCeremony&&!sk.isOpener)this.damage(1000+Math.floor(Math.random()*501));',
    'sw.hit=!0;sw.mesh.visible=!1;if(!this.isOpeningCeremony&&!sk.isOpener)this.damage(1000+Math.floor(Math.random()*501));this.triggerPixelFX("hit-spark",sw.target,{zoom:1.6});'
  );

  // 5. Small gift (golden slash)
  code = code.replace(
    'if(t.skill==="small"){this.createGoldenSlashFX(pPos,bPos,t);',
    'if(t.skill==="small"){this.createGoldenSlashFX(pPos,bPos,t);this.triggerPixelFX("double-slash",bPos,{zoom:2.4});this.triggerPixelFX("crit-hit",bPos,{zoom:2.0});'
  );

  // 6. Single dragon / Ten dragons (lightning strike & celestial effects)
  code = code.replace(
    'this.attachGoldenWings(t),this.createDragonFX(pPos.clone().add(Ft(0,2.5,0)),bPos,0.1,"#f59e0b",1.4);',
    'this.attachGoldenWings(t),this.createDragonFX(pPos.clone().add(Ft(0,2.5,0)),bPos,0.1,"#f59e0b",1.4);this.triggerPixelFX("lightning-strike",bPos,{zoom:2.7});this.triggerPixelFX("crit-hit",bPos,{zoom:2.2});'
  );

  // 7. Like / Healing / Energy
  code = code.replace(
    'this.effect(Ft(0,.2,4.8),"#70efba",!1,4),this.log(`@${e.username} · ${e.value} thích → +${Math.round(r)} năng lượng`,"like");',
    'this.effect(Ft(0,.2,4.8),"#70efba",!1,4);this.triggerPixelFX("heal-aoe",Ft(0,1.2,-1.8),{zoom:2.2});this.triggerPixelFX("blessing",Ft(0,2.2,-1.8),{zoom:1.8});this.log(`@${e.username} · ${e.value} thích → +${Math.round(r)} năng lượng`,"like");'
  );

  // 8. Boss retaliation (Ma Tôn bộc phát phản đòn)
  code = code.replace(
    'this.eliminatePlayers(Math.floor(Math.random()*2)+1,"Phóng chưởng"),this.audio&&this.audio.playBossRoar("growl"),this.effect(Ft(0,.5,4),"#b376ef",!0,4)',
    'this.eliminatePlayers(Math.floor(Math.random()*2)+1,"Phóng chưởng"),this.audio&&this.audio.playBossRoar("growl"),this.effect(Ft(0,.5,4),"#b376ef",!0,4),this.triggerPixelFX("dark-explosion",Ft(0,2.5,-1.8),{zoom:2.8}),this.triggerPixelFX("shadow-tendrils",Ft(0,1.2,-1.8),{zoom:2.2})'
  );

  fs.writeFileSync(f, code, 'utf8');
  console.log('Successfully integrated PixelFX into', f);
}
