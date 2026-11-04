const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '../assets/index-CT5dfJfs.js');
let code = fs.readFileSync(jsPath, 'utf8');

// 1. Crowd: disable castShadow on 10,000 crowd sprites
const oldCrowdShadow = `inst.name="crowdMesh_"+t,inst.castShadow=!0,inst.receiveShadow=!0;`;
const newCrowdShadow = `inst.name="crowdMesh_"+t,inst.castShadow=!1,inst.receiveShadow=!1;`;

if (!code.includes(oldCrowdShadow)) {
  console.error('ERROR: oldCrowdShadow not found!');
  process.exit(1);
}
code = code.replace(oldCrowdShadow, newCrowdShadow);
console.log('1. Disabled castShadow/receiveShadow on 10k crowd sprites.');

// 2. Chain links: disable castShadow on 144 chain links
const oldChainShadow = `link.castShadow=!0,grp.add(link);`;
const newChainShadow = `link.castShadow=!1,grp.add(link);`;

if (!code.includes(oldChainShadow)) {
  console.error('ERROR: oldChainShadow not found!');
  process.exit(1);
}
code = code.replace(oldChainShadow, newChainShadow);
console.log('2. Disabled castShadow on 144 chain links.');

// 3. Remove per-clone PointLight in loadPrebuiltPlayerModels
const oldPlayerLight = `const aura=new bl(def.glow,1.4,5.0);
        aura.position.set(0,1.35,0.35);
        scene.add(aura);`;

const newPlayerLight = `// Aura is handled by materials and shared formation light
        if(!this.playerCampLight){
          const pLight=new bl("#fef08a",1.8,24);
          pLight.position.set(0,4.2,6.5);
          this.scene.add(pLight);
          this.playerCampLight=pLight;
        }`;

if (!code.includes(oldPlayerLight)) {
  console.error('ERROR: oldPlayerLight not found!');
  process.exit(1);
}
code = code.replace(oldPlayerLight, newPlayerLight);
console.log('3. Replaced per-player cloned point lights with shared camp light.');

// 4. Optimize pixel ratio: Math.min(window.devicePixelRatio, 1.25)
const oldPixelRatio = `this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5))`;
const newPixelRatio = `this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.25))`;

if (!code.includes(oldPixelRatio)) {
  console.error('ERROR: oldPixelRatio not found!');
  process.exit(1);
}
code = code.replace(oldPixelRatio, newPixelRatio);
console.log('4. Optimized pixel ratio to 1.25 max.');

// 5. Label projection: reuse vector to stop GC thrashing
const oldLabelProj = `const f=this.labelNodes.get(l);if(f){const h=o.root.position.clone().add(Ft(0,1.55,0)).project(this.camera);f.style.left=\`\${(h.x*.5+.5)*100}%\`,f.style.top=\`\${(-h.y*.5+.5)*100}%\`,f.style.opacity=h.z<1?"1":"0",c.hp<=0?f.classList.add("down"):f.classList.remove("down")}`;

const newLabelProj = `const f=this.labelNodes.get(l);if(f){if(!this._lblVec)this._lblVec=new B;const h=this._lblVec.copy(o.root.position);h.y+=1.55;h.project(this.camera);f.style.left=\`\${(h.x*.5+.5)*100}%\`,f.style.top=\`\${(-h.y*.5+.5)*100}%\`,f.style.opacity=h.z<1?"1":"0",c.hp<=0?f.classList.add("down"):f.classList.remove("down")}`;

if (!code.includes(oldLabelProj)) {
  console.error('ERROR: oldLabelProj not found!');
  process.exit(1);
}
code = code.replace(oldLabelProj, newLabelProj);
console.log('5. Reused label projection vector to prevent GC spikes.');

fs.writeFileSync(jsPath, code, 'utf8');
console.log('ALL PERFORMANCE OPTIMIZATIONS APPLIED SUCCESSFULLY!');
