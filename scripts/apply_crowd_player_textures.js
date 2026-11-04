const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '../assets/index-CT5dfJfs.js');
let code = fs.readFileSync(jsPath, 'utf8');

// 1. Replace getCrowdTextures() with authentic Meshy 2D textures of the 2 characters
const oldGetCrowd = `getCrowdTextures(){const textures=[],ros=this.playerRoster||[];for(let i=0;i<ros.length;i++){const item=ros[i];if(item&&item.template){let f=null;item.template.traverse(m=>{m.material&&m.material.map&&!f&&(f=m.material.map)}),f&&textures.push(f)}}if(textures.length===0&&this.playerTemplate){let f=null;this.playerTemplate.traverse(m=>{m.material&&m.material.map&&!f&&(f=m.material.map)}),f&&textures.push(f)}return textures.length===0&&textures.push(this.createChibiKnightTexture()),textures}`;

const newGetCrowd = `getCrowdTextures(){
  if(this._cachedCrowdTextures&&this._cachedCrowdTextures.length>0){
    return this._cachedCrowdTextures;
  }
  const loader=new e0();
  const t1=loader.load("./assets/preview_golden_guardian.png",tex=>{
    tex.colorSpace=At,tex.needsUpdate=!0;
    if(this.crowdMeshes&&this.crowdMeshes.length>0)this.buildCrowd(this.crowdCount);
  });
  const t2=loader.load("./assets/preview_scarlet_empress.png",tex=>{
    tex.colorSpace=At,tex.needsUpdate=!0;
    if(this.crowdMeshes&&this.crowdMeshes.length>0)this.buildCrowd(this.crowdCount);
  });
  t1.colorSpace=At,t2.colorSpace=At;
  this._cachedCrowdTextures=[t1,t2];
  return this._cachedCrowdTextures;
}`;

if (!code.includes(oldGetCrowd)) {
  console.error('ERROR: oldGetCrowd not found!');
  process.exit(1);
}
code = code.replace(oldGetCrowd, newGetCrowd);
console.log('1. Replaced getCrowdTextures with authentic player character textures.');

// 2. Adjust geometry aspect ratio for full-body characters
const oldGeom = `geom=new Ua(.85,1.25);geom.translate(0,.625,0);`;
const newGeom = `geom=new Ua(.92,1.55);geom.translate(0,.775,0);`;

if (!code.includes(oldGeom)) {
  console.error('ERROR: oldGeom not found!');
  process.exit(1);
}
code = code.replace(oldGeom, newGeom);
console.log('2. Adjusted crowd geometry dimensions.');

// 3. Update UI Labels in sidebar
const oldUiTitle = `children:"⚔️ QUY MÔ QUÂN ĐOÀN HIỆP SĨ"}),P.jsx("span",{className:"tag",style:{background:"#6b21a8",color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:11,fontWeight:700},children:(n.crowdCount||10000).toLocaleString()+" Hiệp sĩ"`;
const newUiTitle = `children:"⚔️ QUY MÔ QUÂN ĐOÀN TU SĨ (ĐỒNG MINH)"}),P.jsx("span",{className:"tag",style:{background:"#6b21a8",color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:11,fontWeight:700},children:(n.crowdCount||10000).toLocaleString()+" Tu Sĩ"`;

if (code.includes(oldUiTitle)) {
  code = code.replace(oldUiTitle, newUiTitle);
  console.log('3. Updated UI label to QUÂN ĐOÀN TU SĨ.');
}

fs.writeFileSync(jsPath, code, 'utf8');
console.log('ALL PATCHES APPLIED SUCCESSFULLY!');
