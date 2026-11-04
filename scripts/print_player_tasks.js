const https = require('https');

async function printTask(id) {
  return new Promise((resolve) => {
    const url = 'https://api.meshy.ai/web/public/tasks/' + id;
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.meshy.ai/',
        'Origin': 'https://www.meshy.ai',
        'x-meshy-viewer-server': 'true'
      }
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        console.log('=== Task JSON for', id, '===');
        console.log(body);
        resolve();
      });
    }).on('error', resolve);
  });
}

async function run() {
  await printTask('01a1a17a-e8e0-77be-a1df-106669e7a18f');
  await printTask('01a1a1bc-ed01-710c-bc6d-a5e9ce3da037');
}
run();
