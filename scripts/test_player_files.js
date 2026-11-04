const fs = require('fs');
const path = require('path');

const g1 = path.join(__dirname, '../assets/player_golden_guardian.glb');
const g2 = path.join(__dirname, '../assets/player_scarlet_empress.glb');

console.log('File 1 exists:', fs.existsSync(g1), 'Size:', fs.statSync(g1).size);
console.log('File 2 exists:', fs.existsSync(g2), 'Size:', fs.statSync(g2).size);
