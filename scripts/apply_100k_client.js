const fs = require('fs');

const filePath = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(filePath, 'utf8');

console.log('=== APPLYING 100K CONCURRENT SCALE OPTIMIZATIONS TO CLIENT ===');

// 1. Support comment_batch in receive(e)
const oldReceive = `receive(e){if(!e.username||!Number.isFinite(e.value)||e.value<0)return;`;
const newReceive = `receive(e){if(e.type==="comment_batch"&&Array.isArray(e.items)){for(let i=0;i<e.items.length;i++)this.receive(e.items[i]);return;}if(!e.username||!Number.isFinite(e.value)||e.value<0)return;`;

if (code.includes(oldReceive)) {
  code = code.replace(oldReceive, newReceive);
  console.log('✓ 1. Added comment_batch handling in receive()');
} else {
  console.log('⚠️ Could not find exact oldReceive match');
}

// 2. Adaptive high-throughput event processing ticker
const oldTicker = `const s=this.state.elapsed;if(!this.isOpeningCeremony&&this.queue){if(this.eventTimer+=e,this.eventTimer>.42){this.eventTimer=0;const o=this.queue.next();o&&this.consume(o)}}`;

const newTicker = `const s=this.state.elapsed;if(!this.isOpeningCeremony&&this.queue){const qSize=this.queue.size,maxPerFrame=qSize>100?12:(qSize>30?4:(qSize>8?2:1)),trigTime=qSize>50?.015:(qSize>10?.05:.2);if(this.eventTimer+=e,this.eventTimer>=trigTime){this.eventTimer=0;for(let sp=0;sp<maxPerFrame;sp++){const o=this.queue.next();if(!o)break;this.consume(o);}if(this.queue.events.length>120){const uncons=this.queue.events.splice(0,Math.min(this.queue.events.length-30,80)),cmts=uncons.filter(x=>x.type==="comment");cmts.length>0&&this.triggerLegionVolley(cmts);}}}`;

if (code.includes(oldTicker)) {
  code = code.replace(oldTicker, newTicker);
  console.log('✓ 2. Upgraded event loop to adaptive multi-event drain & legion volley');
} else {
  console.log('⚠️ Could not find exact oldTicker match');
}

// 3. Add triggerLegionVolley method to RP class
if (!code.includes('triggerLegionVolley(comments){')) {
  const insertBefore = 'triggerNewMatchTopSkills(){';
  const volleyMethod = `triggerLegionVolley(comments){
  if(this.state.defeated||this.state.failed)return;
  const count=comments.length,totalDmg=Math.round(count*85);
  this.state.hp=Math.max(0,this.state.hp-totalDmg);
  this.state.combo+=count;
  this.state.energy=Math.min(100,this.state.energy+Math.min(25,count*.15));
  this.state.lastDamage=totalDmg;
  this.state.lastAttacker=\`@\${comments[0].username} +\${count-1} tu sĩ\`;
  this.shake(.28,.45);
  this.effect(Ft(0,1.8,4.2),"#fbbf24",!0,Math.min(8,3+Math.floor(count/15)));
  if(this.legionSwords){
    const fireCount=Math.min(16,Math.max(6,Math.floor(count/5)));
    for(let f=0;f<fireCount;f++){
      const sw=this.legionSwords[Math.floor(Math.random()*this.legionSwords.length)];
      if(sw&&!sw.active){sw.active=!0,sw.progress=0,sw.mesh.visible=!0;}
    }
  }
  this.audio&&this.audio.playSlash();
  this.log(\`⚔️ VẠN KIẾM QUY TÔNG: \${count} tu sĩ đồng loạt xuất kích gây -\${totalDmg.toLocaleString()} HP!\`,"comment");
  this.checkCheckpointHeal();
  this.publish();
}
`;
  code = code.replace(insertBefore, volleyMethod + insertBefore);
  console.log('✓ 3. Injected triggerLegionVolley() into class RP');
}

// 4. Update buildCrowd to support 100,000 instances
code = code.replace('Math.min(10000,targetCount)', 'Math.min(100000,targetCount)');
code = code.replace('inst.castShadow=!1,inst.receiveShadow=!1;', 'inst.castShadow=!1,inst.receiveShadow=!1,inst.frustumCulled=!1;');
console.log('✓ 4. Expanded buildCrowd upper bound to 100,000 instances with frustumCulled=false');

// 5. Update crowd buttons in Control Panel
const oldBtn = 'cnt===10000?"🔥 10.000 (Tối đa)":cnt.toLocaleString()';
const newBtn = 'cnt===100000?"⚡ 100.000 (Đại Quân)":cnt===10000?"🔥 10.000":cnt.toLocaleString()';
code = code.replace(oldBtn, newBtn);

code = code.replace('[100,500,1e3,2500,5e3,1e4]', '[500,2500,1e4,5e4,1e5]');
code = code.replace('max:10000', 'max:100000');
code = code.replace('max:1e4', 'max:1e5');
console.log('✓ 5. Added 100.000 Tu Sĩ presets and updated slider range');

// Write back
fs.writeFileSync(filePath, code, 'utf8');
const pubPath = 'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js';
if (fs.existsSync(pubPath)) {
  fs.writeFileSync(pubPath, code, 'utf8');
}
console.log('✅ Client files saved!');
