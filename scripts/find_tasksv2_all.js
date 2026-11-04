const https = require('https');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'meshy_page.html'), 'utf8');

const regex = /<script[^>]+src="([^"]+)"/g;
let m;
const scripts = [];
while ((m = regex.exec(html)) !== null) {
  scripts.push(m[1]);
}

async function findTasksV2() {
  for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i];
    await new Promise((resolve) => {
      https.get(s, (res) => {
        let code = '';
        res.on('data', c => code += c);
        res.on('end', () => {
          let p = code.indexOf('TasksV2:"');
          if (p === -1) p = code.indexOf('TasksV2: "');
          if (p !== -1) {
            console.log(`FOUND in [${i}] ${s}`);
            console.log(code.substring(p - 50, p + 200));
          }
          resolve();
        });
      }).on('error', resolve);
    });
  }
}
findTasksV2();
