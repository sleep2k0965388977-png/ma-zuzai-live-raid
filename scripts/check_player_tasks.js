const https = require('https');

const tasks = [
  { name: 'Golden-Crest-Guardian', ids: ['01a1a17a-e8e0-77be-a1df-106669e7a18f', '01a1a176-9c0d-7477-b54c-adbd31b41bda'] },
  { name: 'Scarlet-Empress', ids: ['01a1a1bc-ed01-710c-bc6d-a5e9ce3da037', '01a1a1ad-8ff3-7651-b1dd-71e4a0128626'] }
];

async function checkTask(id) {
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
        console.log('Task', id, 'Status:', res.statusCode);
        if (res.statusCode === 200) {
          try {
            const data = JSON.parse(body);
            console.log('Task', id, 'Type:', data.task_type || data.type);
            console.log('Model URLs:', data.model_urls);
            resolve({ id, data });
            return;
          } catch (e) {
            console.log('Parse error:', e);
          }
        }
        resolve(null);
      });
    }).on('error', (e) => {
      console.error(e);
      resolve(null);
    });
  });
}

async function run() {
  for (const t of tasks) {
    console.log('=== Checking for', t.name, '===');
    for (const id of t.ids) {
      await checkTask(id);
    }
  }
}
run();
