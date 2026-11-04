const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '../assets/index-CT5dfJfs.js');
let code = fs.readFileSync(jsPath, 'utf8');

const target = `const cl=new bl("#ff33cc",4.5,12);cl.name="coreLight",cl.position.set(0,4.2,0.4),a.add(cl);const fl=new bl("#ffffff",3,16);fl.position.set(0,2.5,2.5),a.add(fl),this.bossAnchor.clear(),this.boss!==this.bossOriginal&&this.disposeObject(this.boss),this.boss=c,this.bossAnchor.add(c),this.bossAnchor.visible=!0,this.bossAnchor.scale.setScalar(1.85),o.length>0&&(this.bossMixer=new fp(a),this.bossClips=o,this.playClip(this.bossMixer,o,"idle")),this.audio.play(!0),this.log("🔮 ĐÃ TẢI THÀNH CÔNG MÔ HÌNH 3D MESHY (CHAINED RADIANCE) VÀO ĐẤU TRƯỜNG!","system"),this.publish()`;

const replacement = `const cl=new bl("#ff33cc",4.5,12);cl.name="coreLight",cl.position.set(0,4.2,0.4),a.add(cl);const fl=new bl("#ffffff",3,16);fl.position.set(0,2.5,2.5),a.add(fl);const baseS=a.scale.x;c.userData.update=function(s){c.position.y=Math.sin(s*1.5)*0.45,c.rotation.y=Math.sin(s*0.8)*0.09,c.rotation.z=Math.sin(s*1.1)*0.035,c.rotation.x=Math.sin(s*1.3)*0.025;const br=1+Math.sin(s*2)*0.025;a.scale.set(baseS*br,baseS*(2-br),baseS*br),cl&&(cl.intensity=4+Math.sin(s*3.2)*2.2);};this.bossAnchor.clear(),this.boss!==this.bossOriginal&&this.disposeObject(this.boss),this.boss=c,this.bossAnchor.add(c),this.bossAnchor.visible=!0,this.bossAnchor.scale.setScalar(1.85),o.length>0&&(this.bossMixer=new fp(a),this.bossClips=o,this.playClip(this.bossMixer,o,"idle")),this.audio.play(!0),this.log("🔮 ĐÃ TẢI THÀNH CÔNG MÔ HÌNH 3D MESHY (CHAINED RADIANCE) KÈM CHUYỂN ĐỘNG VÀO ĐẤU TRƯỜNG!","system"),this.publish()`;

if (!code.includes(target)) {
  console.error('Target string not found!');
  process.exit(1);
}

code = code.replace(target, replacement);
fs.writeFileSync(jsPath, code, 'utf8');
console.log('SUCCESS: Dynamic floating breathing animation added to Meshy 3D Boss!');
