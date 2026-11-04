const fs = require('fs');
const acorn = require('acorn');

const files = [
  'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js',
  'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js'
];

for (const filePath of files) {
  if (!fs.existsSync(filePath)) continue;
  let code = fs.readFileSync(filePath, 'utf8');

  // 1. Update Boss creation & lights in loadPrebuiltGeminiBoss
  const oldBossSetup = 'const cl=new bl("#ff33cc",4.5,12);cl.name="coreLight",cl.position.set(0,4.2,0.4),a.add(cl);const fl=new bl("#ffffff",3,16);fl.position.set(0,2.5,2.5),a.add(fl);const baseS=a.scale.x;c.userData.update=function(s){c.position.y=Math.sin(s*1.5)*0.45,c.rotation.y=Math.sin(s*0.8)*0.09,c.rotation.z=Math.sin(s*1.1)*0.035,c.rotation.x=Math.sin(s*1.3)*0.025;const br=1+Math.sin(s*2)*0.025;a.scale.set(baseS*br,baseS*(2-br),baseS*br),cl&&(cl.intensity=4+Math.sin(s*3.2)*2.2);};';
  
  const newBossSetup = 'const cl=new bl("#ff33cc",2.4,14);cl.name="coreLight",cl.position.set(0,4.2,0.4),a.add(cl);const fl=new bl("#fbcfe8",1.2,16);fl.name="fillLight",fl.position.set(0,2.5,2.2),a.add(fl);const baseS=a.scale.x;c.userData.update=function(s,zoomDim=1.0){c.position.y=Math.sin(s*1.5)*0.45,c.rotation.y=Math.sin(s*0.8)*0.09,c.rotation.z=Math.sin(s*1.1)*0.035,c.rotation.x=Math.sin(s*1.3)*0.025;const br=1+Math.sin(s*2)*0.025;a.scale.set(baseS*br,baseS*(2-br),baseS*br);const zf=typeof zoomDim==="number"?zoomDim:1.0;if(cl)cl.intensity=(2.2+Math.sin(s*2.6)*0.45)*zf;if(fl)fl.intensity=(1.1+Math.sin(s*1.8)*0.25)*zf;if(a._materials){const emInt=0.22*zf;a._materials.forEach(mat=>{if(mat.emissiveIntensity!==undefined)mat.emissiveIntensity=emInt;});}};';

  if (code.includes(oldBossSetup)) {
    code = code.replace(oldBossSetup, newBossSetup);
    console.log(`[+] Replaced oldBossSetup in ${filePath}`);
  } else {
    console.warn(`[-] Could not find oldBossSetup in ${filePath}`);
  }

  // 1b. Collect materials in a.traverse inside loadPrebuiltGeminiBoss
  const oldTraverse = 'a.traverse(m=>{m instanceof mt&&(m.castShadow=!0,m.receiveShadow=!0,m.material&&(m.material.side=2,m.material.roughness=0.35,m.material.metalness=0.25))})';
  const newTraverse = 'a._materials=[];a.traverse(m=>{m instanceof mt&&(m.castShadow=!0,m.receiveShadow=!0,m.material&&(m.material.side=2,m.material.roughness=0.45,m.material.metalness=0.2,(Array.isArray(m.material)?m.material:[m.material]).forEach(mat=>{mat.emissiveIntensity=0.22;a._materials.push(mat);})))});';

  if (code.includes(oldTraverse)) {
    code = code.replace(oldTraverse, newTraverse);
    console.log(`[+] Replaced oldTraverse in ${filePath}`);
  } else {
    console.warn(`[-] Could not find oldTraverse in ${filePath}`);
  }

  // 2. Update render loop call to pass zoomDimFactor
  const oldCall = 'const a=this.boss.getObjectByName("coreLight");a&&(a.intensity=(2.2+Math.sin(s*2.3)*.5)*(.9+this.state.phase*.12)),(n=(t=this.boss.userData).update)==null||n.call(t,s);';
  const newCall = 'const _camDist=this.camera.position.distanceTo(this.bossAnchor.position);const _zoomDim=Math.min(1.0,Math.max(0.35,(_camDist-2.8)/6.2));const a=this.boss.getObjectByName("coreLight");a&&(a.intensity=(2.2+Math.sin(s*2.3)*.5)*(.9+this.state.phase*.12)*_zoomDim);const _fl=this.boss.getObjectByName("fillLight");_fl&&(_fl.intensity=(1.1+Math.sin(s*1.8)*.25)*_zoomDim);(n=(t=this.boss.userData).update)==null||n.call(t,s,_zoomDim);';

  if (code.includes(oldCall)) {
    code = code.replace(oldCall, newCall);
    console.log(`[+] Replaced oldCall in ${filePath}`);
  } else {
    console.warn(`[-] Could not find oldCall in ${filePath}`);
  }

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

console.log('All done!');
