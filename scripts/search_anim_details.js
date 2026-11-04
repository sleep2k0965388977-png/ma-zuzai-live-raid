const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'meshy_page.html'), 'utf8');

// Search for animation clips or action names
const terms = ['animationActions', 'animationType', 'animationSelection', 'clipPath', 'actions', 'action'];
for (const t of terms) {
  let idx = 0;
  while ((idx = html.indexOf(t, idx)) !== -1) {
    console.log(`--- ${t} in meshy_page.html ---`);
    console.log(html.substring(Math.max(0, idx - 60), Math.min(html.length, idx + 200)));
    idx += t.length + 10;
  }
}
