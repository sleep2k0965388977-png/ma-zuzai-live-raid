const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '../assets/index-CT5dfJfs.js');
let code = fs.readFileSync(jsPath, 'utf8');

// Target: inside buildArena() right after spiritSparks
const target = `this.spiritSparks=new jo(sparkGeo,sparkMat),this.scene.add(this.spiritSparks);`;

const methodCode = `this.spiritSparks=new jo(sparkGeo,sparkMat),this.scene.add(this.spiritSparks);this.buildPillarChains();`;

const newMethod = `buildPillarChains(){
  if(this.pillarChainsGrp){
    this.scene.remove(this.pillarChainsGrp);
  }
  const grp=new cn;grp.name="PillarSealingChains";
  const chainMat=new dn({color:"#facc15",emissive:"#ca8a04",emissiveIntensity:0.95,metalness:0.92,roughness:0.25});
  const shackleMat=new dn({color:"#eab308",emissive:"#b45309",emissiveIntensity:0.75,metalness:0.96,roughness:0.2});

  const paths=[
    // 1. Cột trên bên trái (sau)
    [Ft(-2.2,5.4,-1.9),Ft(-9.5,4.3,-5.8),Ft(-17.8,6.4,-9.8)],
    // 2. Cột dưới bên trái (trước)
    [Ft(-2.3,4.9,-1.6),Ft(-9.8,3.6,2.8),Ft(-17.8,6.4,6.8)],
    // 3. Cột trên bên phải (sau)
    [Ft(2.2,5.4,-1.9),Ft(9.5,4.3,-5.8),Ft(17.8,6.4,-9.8)],
    // 4. Cột dưới bên phải (trước)
    [Ft(2.3,4.9,-1.6),Ft(9.8,3.6,2.8),Ft(17.8,6.4,6.8)]
  ];

  paths.forEach((pts)=>{
    const curve=new Mr(pts);
    // Lõi xích liền mạch 3D
    const tubeGeom=new ws(curve,44,0.08,10,!1);
    const tubeMesh=new mt(tubeGeom,chainMat);
    tubeMesh.castShadow=!0,tubeMesh.receiveShadow=!0,grp.add(tubeMesh);

    // Mắt xích vàng phong ấn đan xen 90 độ dọc theo đường cong
    const linkGeom=new Wn(0.25,0.065,8,14);
    const count=36;
    for(let i=0;i<=count;i++){
      const u=i/count;
      const pos=curve.getPointAt(u);
      const tan=curve.getTangentAt(u);
      const link=new mt(linkGeom,chainMat);
      link.position.copy(pos);
      link.quaternion.setFromUnitVectors(Ft(0,0,1),tan);
      if(i%2===0)link.rotateZ(Math.PI/2);
      link.castShadow=!0,grp.add(link);
    }

    // Vòng cùm phong ấn khổng lồ neo vào đỉnh cột
    const endP=pts[pts.length-1];
    const shackle=new mt(new Wn(0.68,0.13,10,20),shackleMat);
    shackle.position.set(endP.x,endP.y,endP.z);
    shackle.rotation.x=Math.PI/2;
    grp.add(shackle);
  });

  this.scene.add(grp);
  this.pillarChainsGrp=grp;
}`;

if (!code.includes(target)) {
  console.error('Target not found!');
  process.exit(1);
}

// Replace target with method call
code = code.replace(target, methodCode);

// Add method right before ring(e,t,n,r){
const targetRing = `ring(e,t,n,r){`;
if (!code.includes(targetRing)) {
  console.error('targetRing not found!');
  process.exit(1);
}

code = code.replace(targetRing, newMethod + `\n` + targetRing);

fs.writeFileSync(jsPath, code, 'utf8');
console.log('SUCCESS: buildPillarChains added to engine!');
