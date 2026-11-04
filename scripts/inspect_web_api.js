const https = require('https');

https.get('https://cdn.meshy.ai/webapp-build-assets/production/_next/static/chunks/3tty-lguqtgfi.js', (res) => {
  let code = '';
  res.on('data', c => code += c);
  res.on('end', () => {
    let idx = 0;
    while ((idx = code.indexOf('https://api.meshy.ai/web', idx)) !== -1) {
      console.log('--- API match ---');
      console.log(code.substring(Math.max(0, idx - 50), Math.min(code.length, idx + 150)));
      idx += 24;
    }
  });
});
