const fs = require('fs');
const vm = require('vm');

const targetFiles = ['1/assets/index-CT5dfJfs.js', '1/public/assets/index-CT5dfJfs.js'];

targetFiles.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');

  // Find the queue consumption block
  const oldQueueRegex = /let isAnyActorAttacking=!1;for\(const act of this\.actors\.values\(\)\)\{if\(act&&act\.attack>0\)\{isAnyActorAttacking=!0;break;\}\}if\(this\.actionCooldown>=this\.nextActionDelay&&!isAnyActorAttacking\)\{const o=this\.queue\.next\(\);if\(o\)\{this\.actionCooldown=0;this\.nextActionDelay=2\.0\+Math\.random\(\)\*2\.0;this\.consume\(o\);\}\}/;

  const newQueueCode = `let activeAttackers=0;for(const act of this.actors.values()){if(act&&act.attack>0)activeAttackers++;}
const maxConcurrent=(this.queue.events.length>10)?12:(this.queue.events.length>4?8:5);
const batchLimit=(this.queue.events.length>6)?3:1;
for(let b=0;b<batchLimit;b++){
  if(activeAttackers<maxConcurrent&&(this.actionCooldown>=this.nextActionDelay||(this.queue.events[0]&&this.queue.events[0].type==='gift'))){
    const o=this.queue.next();
    if(o){
      this.actionCooldown=0;
      this.nextActionDelay=(o.type==='gift')?0.04:(0.08+Math.random()*0.12);
      activeAttackers++;
      this.consume(o);
    }
  }
}`;

  if (!oldQueueRegex.test(code)) {
    console.error('Could not match old queue code in', file);
    process.exit(1);
  }

  code = code.replace(oldQueueRegex, newQueueCode);
  console.log('Replaced queue bottleneck in', file);

  // Validate syntax
  try {
    new vm.SourceTextModule(code);
    console.log('Syntax check: SUCCESS for', file);
    fs.writeFileSync(file, code, 'utf8');
  } catch (e) {
    console.error('Syntax error in', file, e);
    process.exit(1);
  }
});

// Bump cachebuster in index.html
let html = fs.readFileSync('1/index.html', 'utf8');
const now = Date.now();
html = html.replace(/\?v=\d+/g, '?v=' + now);
fs.writeFileSync('1/index.html', html, 'utf8');
console.log('Updated index.html cachebuster to', now);
