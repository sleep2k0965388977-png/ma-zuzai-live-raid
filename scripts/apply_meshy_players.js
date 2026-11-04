const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '../assets/index-CT5dfJfs.js');
let code = fs.readFileSync(jsPath, 'utf8');

// 1. Target: Right after loadPrebuiltGeminiBoss() ends before applyModel(e="boss")
const targetGeminiEnd = `this.publish()}catch(err){console.error("Lỗi khi tải mô hình 3D Meshy:",err);}}`;

const newPlayerMethod = `async loadPrebuiltPlayerModels(){
  try{
    const loader=new $E();
    const modelDefs=[
      {name:"Golden Crest Guardian",file:"./assets/player_golden_guardian.glb",glow:"#facc15"},
      {name:"Scarlet Empress",file:"./assets/player_scarlet_empress.glb",glow:"#f43f5e"}
    ];
    this.playerRoster=[];

    for(const def of modelDefs){
      try{
        const gltf=await loader.loadAsync(def.file);
        const scene=gltf.scene;
        const box=new ri().setFromObject(scene);
        const size=box.getSize(new B);
        const targetH=2.45;
        scene.scale.multiplyScalar(targetH/(size.y||1));

        const updatedBox=new ri().setFromObject(scene);
        const center=updatedBox.getCenter(new B);
        scene.position.sub(Ft(center.x,updatedBox.min.y,center.z));

        scene.traverse(m=>{
          if(m instanceof mt){
            m.castShadow=!0;
            m.receiveShadow=!0;
            if(m.material){
              m.material.side=2;
              m.material.roughness=0.38;
              m.material.metalness=0.3;
            }
          }
        });

        const aura=new bl(def.glow,1.4,5.0);
        aura.position.set(0,1.35,0.35);
        scene.add(aura);

        const templateGrp=new cn();
        templateGrp.name=def.name;
        templateGrp.add(scene);
        templateGrp.userData={is3D:!0,isMeshy:!0,name:def.name};

        this.playerRoster.push({
          name:def.name,
          template:templateGrp,
          clips:gltf.animations||[]
        });
      }catch(err){
        console.warn("Lỗi nạp mô hình người chơi:",def.name,err);
      }
    }

    if(this.playerRoster.length>0){
      this.playerTemplate=this.playerRoster[0].template;
      this.playerClips=this.playerRoster[0].clips;
      this.refreshActors();
      this.log(\`✨ ĐÃ NẠP THÀNH CÔNG 2 NHÂN VẬT NGƯỜI CHƠI MESHY 3D (\${this.playerRoster.map(r=>r.name).join(" & ")})!\`,"system");
      this.publish();
    }
  }catch(e){
    console.error("loadPrebuiltPlayerModels error:",e);
  }
}`;

if (!code.includes(targetGeminiEnd)) {
  console.error('ERROR: targetGeminiEnd not found!');
  process.exit(1);
}
code = code.replace(targetGeminiEnd, targetGeminiEnd + '\n' + newPlayerMethod);
console.log('1. Added loadPrebuiltPlayerModels() method to class.');

// 2. Auto-load players at engine startup
const oldInit = `t.current=new RP(i.current,r);t.current.loadPrebuiltGeminiBoss();`;
const newInit = `t.current=new RP(i.current,r);t.current.loadPrebuiltGeminiBoss();t.current.loadPrebuiltPlayerModels();`;

if (!code.includes(oldInit)) {
  console.error('ERROR: oldInit not found!');
  process.exit(1);
}
code = code.replace(oldInit, newInit);
console.log('2. Updated engine startup to load player models.');

// 3. Add button to UI in models tab
const oldBtn = `await((z=t.current)==null?void 0:z.loadPrebuiltGeminiBoss()),setAppliedMsg("✨ Đã kích hoạt Boss MA ZUZAI chuẩn hóa bởi Gemini AI vào LIVE RAID!"),setAnalysis((z=t.current)==null?void 0:z.getAnalysis("boss")),setTimeout(()=>setAppliedMsg(""),6000)},children:[P.jsx(td,{size:15}),"🚀 KÍCH HOẠT BOSS MA ZUZAI (GEMINI AI ĐÃ PHÂN TÍCH)"]}),`;

const newBtn = `await((z=t.current)==null?void 0:z.loadPrebuiltGeminiBoss()),setAppliedMsg("✨ Đã kích hoạt Boss MA ZUZAI chuẩn hóa bởi Gemini AI vào LIVE RAID!"),setAnalysis((z=t.current)==null?void 0:z.getAnalysis("boss")),setTimeout(()=>setAppliedMsg(""),6000)},children:[P.jsx(td,{size:15}),"🚀 KÍCH HOẠT BOSS MA ZUZAI (GEMINI AI ĐÃ PHÂN TÍCH)"]}),
P.jsxs("button",{className:"apply-button",style:{background:"linear-gradient(135deg,#eab308,#f43f5e)",marginTop:4,marginBottom:8},onClick:async()=>{var z;await((z=t.current)==null?void 0:z.loadPrebuiltPlayerModels()),setAppliedMsg("✨ Đã kích hoạt 2 Nhân Vật Người Chơi Meshy 3D (Golden Guardian & Scarlet Empress)!"),setTimeout(()=>setAppliedMsg(""),6000)},children:[P.jsx(td,{size:15}),"🧙‍♂️ KÍCH HOẠT 2 NHÂN VẬT MESHY 3D (GOLDEN & SCARLET)"]}),`;

if (!code.includes(oldBtn)) {
  console.error('ERROR: oldBtn not found!');
  process.exit(1);
}
code = code.replace(oldBtn, newBtn);
console.log('3. Added UI Button to 3D Models tab.');

fs.writeFileSync(jsPath, code, 'utf8');
console.log('ALL PATCHES APPLIED SUCCESSFULLY!');