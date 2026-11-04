const fs = require('fs');

const filePath = 'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js';
let code = fs.readFileSync(filePath, 'utf8');

console.log('=== APPLYING 2-4 SECOND SKILL & ATTACK PACING ===');

const oldTickerSection = `if(!this.isOpeningCeremony&&this.queue){const qSize=this.queue.size,maxPerFrame=qSize>100?12:(qSize>30?4:(qSize>8?2:1)),trigTime=qSize>50?.015:(qSize>10?.05:.2);if(this.eventTimer+=e,this.eventTimer>=trigTime){this.eventTimer=0;for(let sp=0;sp<maxPerFrame;sp++){const o=this.queue.next();if(!o)break;this.consume(o);}if(this.queue.events.length>120){const uncons=this.queue.events.splice(0,Math.min(this.queue.events.length-30,80)),cmts=uncons.filter(x=>x.type==="comment");cmts.length>0&&this.triggerLegionVolley(cmts);}}}`;

const newTickerSection = `if(!this.isOpeningCeremony&&this.queue){if(!this.nextActionDelay)this.nextActionDelay=2.0+Math.random()*2.0;if(!this.actionCooldown)this.actionCooldown=2.5;this.actionCooldown+=e;let isAnyActorAttacking=!1;for(const act of this.actors.values()){if(act&&act.attack>0){isAnyActorAttacking=!0;break;}}if(this.actionCooldown>=this.nextActionDelay&&!isAnyActorAttacking){const o=this.queue.next();if(o){this.actionCooldown=0;this.nextActionDelay=2.0+Math.random()*2.0;this.consume(o);}}if(this.queue.events.length>80){const uncons=this.queue.events.splice(0,Math.min(this.queue.events.length-20,40)),cmts=uncons.filter(x=>x.type==="comment");if(cmts.length>0)this.triggerLegionVolley(cmts);}}`;

if (code.includes(oldTickerSection)) {
  code = code.replace(oldTickerSection, newTickerSection);
  console.log('✓ Successfully upgraded ticker with 2-4 second skill pacing & single-player focus');
} else {
  console.error('❌ Could not find exact oldTickerSection match. Searching partial...');
  const idx = code.indexOf('if(!this.isOpeningCeremony&&this.queue){');
  console.log('Found at:', idx);
}

// Write back
fs.writeFileSync(filePath, code, 'utf8');
const pubPath = 'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js';
if (fs.existsSync(pubPath)) {
  fs.writeFileSync(pubPath, code, 'utf8');
}
console.log('✅ Client files saved!');
