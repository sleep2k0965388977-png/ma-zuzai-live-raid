const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '../assets/index-CT5dfJfs.js');
let code = fs.readFileSync(jsPath, 'utf8');

// Target 1: The loadPrebuiltGeminiBoss method
const target1 = `async loadPrebuiltGeminiBoss(){const r="./assets/ma_zuzai_boss.png",img=new Image;img.crossOrigin="anonymous";await new Promise((res,rej)=>{img.onload=()=>res(img),img.onerror=rej,img.src=r});const cvs=document.createElement("canvas");cvs.width=img.width,cvs.height=img.height;const ctx=cvs.getContext("2d");ctx.drawImage(img,0,0);const tex=new Ob(cvs);tex.colorSpace=At,tex.needsUpdate=!0;const targetH=12.0,asp=cvs.width/cvs.height,targetW=targetH*Math.max(0.4,Math.min(2.5,asp)),geom=new Ua(targetW,targetH),mat=new dn({map:tex,transparent:!0,alphaTest:0.01,side:2,roughness:0.3,metalness:0.05,emissive:new Ne(16777215),emissiveMap:tex,emissiveIntensity:0.95}),msh=new mt(geom,mat);msh.castShadow=!0,msh.receiveShadow=!0,msh.position.y=targetH/2;const grp=new cn;grp.name="MA ZUZAI (Gemini AI Vision)",grp.userData={isImage:!0,geminiAnalyzed:!0,imageInfo:{fileName:"ma_zuzai_turnaround.jpg",bossName:"MA ZUZAI",glowColor:"#ff33cc",mode:"Gemini 2.5 Flash Vision AI Precision Crop",summary:"Nhân vật nữ linh thể voan trắng, xích vàng phong ấn và lõi sáng tím hồng rực rỡ."}},grp.add(msh);const cl=new bl("#ff33cc",4.5,12);cl.name="coreLight",cl.position.set(0,targetH*.82,.3),grp.add(cl);const fl=new bl("#ffffff",3.5,18);fl.position.set(0,targetH*.5,3),grp.add(fl);const c=new cn;c.name=grp.name,c.userData=grp.userData,c.add(grp),this.bossAnchor.clear(),this.boss!==this.bossOriginal&&this.disposeObject(this.boss),this.boss=c,this.bossAnchor.add(c),this.bossAnchor.visible=!0,this.bossAnchor.scale.setScalar(2.35),this.audio.play(!0),this.log("🤖 ĐÃ ÁP DỤNG THÀNH CÔNG MA ZUZAI TỪ GEMINI AI VÀO MÀN HÌNH LIVE RAID!","system"),this.publish();}`;

const repl1 = `async loadPrebuiltGeminiBoss(){try{const h=await new $E().loadAsync("./assets/boss_chained_radiance.glb"),a=h.scene,o=h.animations??[],l=new ri().setFromObject(a).getSize(new B),c=new cn;c.name="MA ZUZAI (Meshy 3D Chained Radiance)",c.userData={is3D:!0,isMeshy:!0,imageInfo:{fileName:"boss_chained_radiance.glb",bossName:"MA ZUZAI (Meshy 3D Chained Radiance)",glowColor:"#ff33cc",mode:"Meshy AI 3D Chained Radiance",summary:"Mô hình 3D nguyên bản từ Meshy AI với xích vàng phong ấn, linh thể voan trắng huyền ảo và hoạt ảnh cử động thực tế."}},c.add(a),a.scale.multiplyScalar(5.6/(l.y||1));const f=new ri().setFromObject(a),u=f.getCenter(new B);a.position.sub(Ft(u.x,f.min.y,u.z)),a.traverse(m=>{m instanceof mt&&(m.castShadow=!0,m.receiveShadow=!0,m.material&&(m.material.side=2,m.material.roughness=0.35,m.material.metalness=0.25))});const cl=new bl("#ff33cc",4.5,12);cl.name="coreLight",cl.position.set(0,4.2,0.4),a.add(cl);const fl=new bl("#ffffff",3,16);fl.position.set(0,2.5,2.5),a.add(fl),this.bossAnchor.clear(),this.boss!==this.bossOriginal&&this.disposeObject(this.boss),this.boss=c,this.bossAnchor.add(c),this.bossAnchor.visible=!0,this.bossAnchor.scale.setScalar(1.85),o.length>0&&(this.bossMixer=new fp(a),this.bossClips=o,this.playClip(this.bossMixer,o,"idle")),this.audio.play(!0),this.log("🔮 ĐÃ TẢI THÀNH CÔNG MÔ HÌNH 3D MESHY (CHAINED RADIANCE) VÀO ĐẤU TRƯỜNG!","system"),this.publish()}catch(err){console.error("Lỗi khi tải mô hình 3D Meshy:",err);}}`;

// Target 2: Auto-load on startup in useEffect
const target2 = `try{t.current=new RP(i.current,r)}catch(O){h(O instanceof Error?O.message:"Không thể khởi tạo WebGL.")}`;
const repl2 = `try{t.current=new RP(i.current,r);t.current.loadPrebuiltGeminiBoss();}catch(O){h(O instanceof Error?O.message:"Không thể khởi tạo WebGL.")}`;

if (!code.includes(target1)) {
  console.error('Target 1 not found!');
  process.exit(1);
}
if (!code.includes(target2)) {
  console.error('Target 2 not found!');
  process.exit(1);
}

code = code.replace(target1, repl1);
code = code.replace(target2, repl2);

fs.writeFileSync(jsPath, code, 'utf8');
console.log('SUCCESS: JS updated with Meshy 3D Boss!');
