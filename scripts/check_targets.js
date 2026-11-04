const fs = require('fs');
const code = fs.readFileSync('D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js', 'utf8');

function check(name, str) {
  const idx = code.indexOf(str);
  console.log(name, idx !== -1 ? 'FOUND at ' + idx : 'NOT FOUND');
  if (idx !== -1) {
    console.log('   Preview:', code.substring(idx - 40, idx + str.length + 40));
  }
}

check('ShadowMap line', 'this.renderer.shadowMap.enabled=!0');
check('Composer pass', 'this.composer.addPass(new xs(');
check('Crowd mat', 'const curTex=textures[t],mat=new dn(');
check('Pillar links', 'const linkGeom=new Wn(0.25,0.065,8,14)');
check('Veil traverse', 'o.name==="veil"&&o instanceof mt');
check('Player GLTF shadows', 'scene.traverse(m=>{if(m instanceof mt){m.castShadow=!0');
check('Spawn player count', 'curTmpl?p0(curTmpl):SP(n)');
check('AddPlayer count', 'for(let i=1;i<=count;i++)this.spawn(');
check('UI Button King', 'Đãi Ngộ Khai Trận Top 1 - 5');
