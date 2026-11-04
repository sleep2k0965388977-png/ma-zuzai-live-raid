const https = require('https');

https.get('https://cdn.meshy.ai/webapp-build-assets/production/_next/static/chunks/1h5rwyvoq4c8s.js', (res) => {
  let code = '';
  res.on('data', c => code += c);
  res.on('end', () => {
    let idx = code.indexOf('cdn_object');
    while (idx !== -1) {
      console.log('--- cdn_object match ---');
      console.log(code.substring(Math.max(0, idx - 100), Math.min(code.length, idx + 300)));
      idx = code.indexOf('cdn_object', idx + 10);
    }
  });
});
