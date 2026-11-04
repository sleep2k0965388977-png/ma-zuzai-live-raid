const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '../assets/index-CT5dfJfs.js');
let code = fs.readFileSync(jsPath, 'utf8');

// 1. Remove auto-triggers on startup and reset
const oldStartup = `this.animate();setTimeout(()=>{this.triggerNewMatchTopSkills();},2200);}`;
const newStartup = `this.animate();}`;

if (!code.includes(oldStartup)) {
  console.error('ERROR: oldStartup not found!');
  process.exit(1);
}
code = code.replace(oldStartup, newStartup);
console.log('1. Removed auto-trigger on startup.');

const oldResetAuto = `if(this.topOpenerTimers){this.topOpenerTimers.forEach(clearTimeout);this.topOpenerTimers=[];}setTimeout(()=>{this.triggerNewMatchTopSkills();},1200);}`;
const newResetAuto = `if(this.topOpenerTimers){this.topOpenerTimers.forEach(clearTimeout);this.topOpenerTimers=[];}}`;

if (!code.includes(oldResetAuto)) {
  console.error('ERROR: oldResetAuto not found!');
  process.exit(1);
}
code = code.replace(oldResetAuto, newResetAuto);
console.log('2. Removed auto-trigger on reset.');

// 2. Reduce damage in pr dictionary to 1/3
const oldPr = `const pr={
  small:{label:"5 Xu (Kiếm Vàng)",damage:2200,energy:6},
  giant_sword:{label:"20 Xu (Cự Kiếm)",damage:7500,energy:15},
  sword_rain:{label:"45 Xu (Mưa Kiếm)",damage:16e3,energy:25},
  single_dragon:{label:"80 Xu (1 Thần Long)",damage:28e3,energy:35},
  ten_dragons:{label:"150 Xu (10 Thần Long)",damage:68e3,energy:50},
  medium:{label:"Kiếm tiên",damage:6200,energy:12},
  large:{label:"Rồng thiên",damage:16e3,energy:20},
  ultimate:{label:"Thiên kiếp",damage:38e3,energy:30}
};`;

const newPr = `const pr={
  small:{label:"5 Xu (Kiếm Vàng)",damage:750,energy:6},
  giant_sword:{label:"20 Xu (Cự Kiếm)",damage:2500,energy:15},
  sword_rain:{label:"45 Xu (Mưa Kiếm)",damage:5300,energy:25},
  single_dragon:{label:"80 Xu (1 Thần Long)",damage:9300,energy:35},
  ten_dragons:{label:"150 Xu (10 Thần Long)",damage:22500,energy:50},
  medium:{label:"Kiếm tiên",damage:2000,energy:12},
  large:{label:"Rồng thiên",damage:5300,energy:20},
  ultimate:{label:"Thiên kiếp",damage:12500,energy:30}
};`;

if (!code.includes(oldPr)) {
  console.error('ERROR: oldPr not found!');
  process.exit(1);
}
code = code.replace(oldPr, newPr);
console.log('3. Reduced damage in pr to 1/3.');

// 3. Reduce damage in activeSpecialSkills
// slash damage 2200 -> 750
const oldSlashDmg = `if(!sk.hit){
            sk.hit=!0;
            this.damage(2200);`;
const newSlashDmg = `if(!sk.hit){
            sk.hit=!0;
            this.damage(750);`;

if (!code.includes(oldSlashDmg)) {
  console.error('ERROR: oldSlashDmg not found!');
  process.exit(1);
}
code = code.replace(oldSlashDmg, newSlashDmg);
console.log('4. Reduced slash damage to 750.');

// giant_sword damage 7500 -> 2500
const oldGiantDmg = `sk.sword.position.y=2;
          this.damage(7500);`;
const newGiantDmg = `sk.sword.position.y=2;
          this.damage(2500);`;

if (!code.includes(oldGiantDmg)) {
  console.error('ERROR: oldGiantDmg not found!');
  process.exit(1);
}
code = code.replace(oldGiantDmg, newGiantDmg);
console.log('5. Reduced giant sword damage to 2500.');

// sword_rain damage 550 -> 180
const oldRainDmg = `sw.mesh.visible=!1;
                this.damage(550);`;
const newRainDmg = `sw.mesh.visible=!1;
                this.damage(180);`;

if (!code.includes(oldRainDmg)) {
  console.error('ERROR: oldRainDmg not found!');
  process.exit(1);
}
code = code.replace(oldRainDmg, newRainDmg);
console.log('6. Reduced sword rain damage per sword to 180.');

// dragon damage 4500 -> 1500
const oldDragonDmg = `if(t>=.95&&!sk.hit){
            sk.hit=!0;
            this.damage(4500);`;
const newDragonDmg = `if(t>=.95&&!sk.hit){
            sk.hit=!0;
            this.damage(1500);`;

if (!code.includes(oldDragonDmg)) {
  console.error('ERROR: oldDragonDmg not found!');
  process.exit(1);
}
code = code.replace(oldDragonDmg, newDragonDmg);
console.log('7. Reduced dragon damage to 1500.');

// 4. Update UI button text
const oldButtonText = `Đãi Ngộ Trận Mới (Top 1: 150Xu, Top 2: 80Xu, Top 3: 45Xu, Top 4: 20Xu, Top 5: 5Xu)`;
const newButtonText = `Đãi Ngộ Khai Trận Top 1 - 5 (1/3 Sức Mạnh Chuẩn)`;

if (code.includes(oldButtonText)) {
  code = code.replace(oldButtonText, newButtonText);
  console.log('8. Updated UI Button text.');
}

fs.writeFileSync(jsPath, code, 'utf8');
console.log('ALL CHANGES APPLIED SUCCESSFULLY!');