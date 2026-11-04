const fs = require('fs');
const acorn = require('acorn');

const files = [
  'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js',
  'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js'
];

for (const filePath of files) {
  if (!fs.existsSync(filePath)) continue;
  let code = fs.readFileSync(filePath, 'utf8');

  console.log(`\n=== Processing ${filePath} ===`);

  // 1. FIX PLAYER VISIBILITY: Never hide actor.root.visible in eliminatePlayers
  const oldElimVisible = 'actor.root.visible=!1;';
  if (code.includes(oldElimVisible)) {
    code = code.replace(oldElimVisible, 'actor.root.visible=!0;');
    console.log('[+] Fixed eliminatePlayers to NEVER hide player 3D models');
  }

  // 1b. In consume(), ensure player model is always visible when attacking/revived
  const oldRevive = 'n&&n.hp<=0&&(n.hp=35,this.log(`@${e.username} hồi sinh để trở lại chiến đấu.`,"system")),t.username=e.username,t.attack=.001';
  const newRevive = 'n&&(n.hp<=0&&(n.hp=35,n.eliminated=!1,this.log(`@${e.username} hồi sinh để trở lại chiến đấu.`,"system"))),t.username=e.username,t.root&&(t.root.visible=!0),t.attack=.001';
  if (code.includes(oldRevive)) {
    code = code.replace(oldRevive, newRevive);
    console.log('[+] Enhanced consume() to auto-revive and ensure actor visibility');
  }

  // 1c. In spawn(), set player scale to 0.92 (prominent and clearly visible)
  const oldScale = 'r.scale.setScalar(.62);';
  const newScale = 'r.scale.setScalar(.92);r.visible=!0;';
  if (code.includes(oldScale)) {
    code = code.replace(oldScale, newScale);
    console.log('[+] Increased player scale from 0.62 to 0.92 for clear visibility');
  }

  // 1d. In animate render loop, ensure actors are always visible
  const oldLoopActor = 'const c=this.state.players.find(h=>h.username===l);if(o.attack){';
  const newLoopActor = 'const c=this.state.players.find(h=>h.username===l);if(o.root)o.root.visible=!0;if(o.attack){';
  if (code.includes(oldLoopActor)) {
    code = code.replace(oldLoopActor, newLoopActor);
    console.log('[+] Guaranteed o.root.visible = true in render loop');
  }

  // 2. REMOVE IMAGE 2 BUTTON (Weak PC toggle) and KEEP HIGH GRAPHICS PERMANENTLY
  const oldToggleBtnPattern = /P\.jsxs\("button",\{style:\{gridColumn:"1 \/ -1",padding:"9px 12px",borderRadius:"8px",border:n\.ultraFast[\s\S]*?n\.ultraFast\?"CHẾ ĐỘ MÁY YẾU: ĐANG BẬT \(60 FPS MƯỢT\)":"ĐỒ HỌA CAO \(BLOOM SẮC NÉT\)"\]\}\),/g;
  if (oldToggleBtnPattern.test(code)) {
    code = code.replace(oldToggleBtnPattern, '');
    console.log('[+] Removed Weak PC toggle button (Image 2) from UI');
  }

  // 2b. Set High Graphics permanently ON in constructor & resize
  code = code.replace('this.ultraFastMode=!0,this.composer=new JE', 'this.ultraFastMode=!1,this.composer=new JE');
  code = code.replace('if(this.ultraFastMode){this.renderer.render(this.scene,this.camera)}else{this.composer.render()}', 'this.composer.render();');
  code = code.replace('this.renderer.setPixelRatio(this.ultraFastMode?0.85:Math.min(window.devicePixelRatio,1.0))', 'this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.0))');
  console.log('[+] Hard-coded High Graphics (Full Bloom & Native Pixel Ratio) permanently');

  // 3. FIX OVER-BRIGHT BOSS (NO MORE BLINDING WHITE HEAD / CHEST)
  // In loadPrebuiltGeminiBoss():
  // - Move coreLight to (0, 3.2, -0.6) with intensity 1.2
  // - Move fillLight to (0, 3.0, 3.8) with intensity 0.6
  // - Set Boss material to pure black emissive and roughness 0.85 so baked textures are crisp and visible
  const oldBossLights = 'const cl=new bl("#ff33cc",2.4,14);cl.name="coreLight",cl.position.set(0,4.2,0.4),a.add(cl);const fl=new bl("#fbcfe8",1.2,16);fl.name="fillLight",fl.position.set(0,2.5,2.2),a.add(fl);const baseS=a.scale.x;c.userData.update=function(s,zoomDim=1.0){c.position.y=Math.sin(s*1.5)*0.45,c.rotation.y=Math.sin(s*0.8)*0.09,c.rotation.z=Math.sin(s*1.1)*0.035,c.rotation.x=Math.sin(s*1.3)*0.025;const br=1+Math.sin(s*2)*0.025;a.scale.set(baseS*br,baseS*(2-br),baseS*br);const zf=typeof zoomDim==="number"?zoomDim:1.0;if(cl)cl.intensity=(2.2+Math.sin(s*2.6)*0.45)*zf;if(fl)fl.intensity=(1.1+Math.sin(s*1.8)*0.25)*zf;if(a._materials){const emInt=0.22*zf;a._materials.forEach(mat=>{if(mat.emissiveIntensity!==undefined)mat.emissiveIntensity=emInt;});}};';
  
  const newBossLights = 'const cl=new bl("#ff33cc",1.1,18);cl.name="coreLight",cl.position.set(0,3.2,-0.5),a.add(cl);const fl=new bl("#fed7aa",0.65,22);fl.name="fillLight",fl.position.set(0,3.0,3.8),a.add(fl);const baseS=a.scale.x;c.userData.update=function(s,zoomDim=1.0){c.position.y=Math.sin(s*1.5)*0.45,c.rotation.y=Math.sin(s*0.8)*0.09,c.rotation.z=Math.sin(s*1.1)*0.035,c.rotation.x=Math.sin(s*1.3)*0.025;const br=1+Math.sin(s*2)*0.025;a.scale.set(baseS*br,baseS*(2-br),baseS*br);const zf=typeof zoomDim==="number"?zoomDim:1.0;if(cl)cl.intensity=(0.95+Math.sin(s*2.2)*0.2)*zf;if(fl)fl.intensity=(0.55+Math.sin(s*1.6)*0.1)*zf;};';

  if (code.includes(oldBossLights)) {
    code = code.replace(oldBossLights, newBossLights);
    console.log('[+] Replaced boss lights with gentle soft-fill positioning');
  }

  // 3b. Make Boss BakedMaterial matte and ZERO emissive so face & veil details are crystal clear
  const oldMatTraverse = 'a._materials=[];a.traverse(m=>{m instanceof mt&&(m.castShadow=!0,m.receiveShadow=!0,m.material&&(m.material.side=2,m.material.roughness=0.45,m.material.metalness=0.2,(Array.isArray(m.material)?m.material:[m.material]).forEach(mat=>{mat.emissiveIntensity=0.22;a._materials.push(mat);})))});';
  const newMatTraverse = 'a._materials=[];a.traverse(m=>{if(m instanceof mt){m.castShadow=!0;m.receiveShadow=!0;if(m.material){(Array.isArray(m.material)?m.material:[m.material]).forEach(mat=>{mat.side=2;mat.roughness=0.88;mat.metalness=0.04;if(mat.emissive)mat.emissive.set(0);if(mat.emissiveIntensity!==undefined)mat.emissiveIntensity=0;a._materials.push(mat);});}}});';

  if (code.includes(oldMatTraverse)) {
    code = code.replace(oldMatTraverse, newMatTraverse);
    console.log('[+] Set Boss material to matte non-emissive (perfect texture detail, zero glare)');
  }

  // 3c. Soften BloomPass strength from 0.28 to 0.18 and threshold 0.98 to eliminate washed out bloom
  code = code.replace('this.bloomPass=new xs(new ue(256,256),.28,.4,1.1)', 'this.bloomPass=new xs(new ue(256,256),.18,.4,0.98)');

  // Validate AST
  try {
    acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`[✓] Acorn AST validation SUCCESS for ${filePath}`);
    fs.writeFileSync(filePath, code, 'utf8');
  } catch (err) {
    console.error(`[X] AST ERROR in ${filePath}:`, err.message);
    process.exit(1);
  }
}

console.log('\nAll fixes applied and validated successfully!');
