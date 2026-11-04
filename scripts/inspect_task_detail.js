const https = require('https');

https.get('https://api.meshy.ai/web/public/tasks/01a1a163-d096-7733-8002-6988f0c7139b', {
  headers: {
    'User-Agent': 'Mozilla/5.0',
    'x-meshy-viewer-server': 'true'
  }
}, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const json = JSON.parse(d);
    console.log('Result keys:', Object.keys(json.result || {}));
    console.log('Mode:', json.result.mode);
    console.log('Task args:', json.result.args);
    console.log('Task result keys:', Object.keys(json.result.result || {}));
    console.log('Task result:', JSON.stringify(json.result.result, null, 2));
    if (json.result.animationActions) {
      console.log('Animation actions:', json.result.animationActions);
    }
  });
});
