const https = require('https');

https.get('https://cdn.meshy.ai/webapp-build-assets/production/_next/static/chunks/34hdrsp49fcda.js', (res) => {
  let code = '';
  res.on('data', c => code += c);
  res.on('end', () => {
    let p = code.indexOf('726169');
    while (p !== -1) {
      console.log('--- 726169 ---');
      console.log(code.substring(p - 50, p + 500));
      p = code.indexOf('726169', p + 10);
    }
  });
});
