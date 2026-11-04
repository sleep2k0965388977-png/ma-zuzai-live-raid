const https = require('https');

https.get('https://cdn.meshy.ai/webapp-build-assets/production/_next/static/chunks/34hdrsp49fcda.js', (res) => {
  let code = '';
  res.on('data', c => code += c);
  res.on('end', () => {
    let p = code.indexOf('917573');
    console.log(code.substring(p, p + 2000));
  });
});
