const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'meshy_page.html'), 'utf8');

const regex = /<script[^>]+src="([^"]+)"/g;
let m;
const scripts = [];
while ((m = regex.exec(html)) !== null) {
  scripts.push(m[1]);
}
console.log('Total scripts:', scripts.length);
for (const s of scripts) {
  console.log(s);
}
