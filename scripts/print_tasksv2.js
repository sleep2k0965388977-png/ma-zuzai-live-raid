const https = require('https');

https.get('https://cdn.meshy.ai/webapp-build-assets/production/_next/static/chunks/2p7ykyhecjxv8.js', (res) => {
  let code = '';
  res.on('data', c => code += c);
  res.on('end', () => {
    let p = code.indexOf('TasksV2:');
    if (p === -1) p = code.indexOf('TasksV2');
    while (p !== -1) {
      console.log('--- TasksV2 ---');
      console.log(code.substring(p - 50, p + 200));
      p = code.indexOf('TasksV2', p + 10);
    }
  });
});
