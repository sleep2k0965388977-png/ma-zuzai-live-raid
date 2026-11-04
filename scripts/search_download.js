const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'meshy_page.html'), 'utf8');

// Search for download in html
let idx = 0;
while ((idx = html.indexOf('download', idx)) !== -1) {
  const snippet = html.substring(Math.max(0, idx - 50), Math.min(html.length, idx + 100));
  if (snippet.includes('api') || snippet.includes('http') || snippet.includes('onClick') || snippet.includes('href')) {
    console.log('Snippet:', snippet);
  }
  idx += 8;
}
