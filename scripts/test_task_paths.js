const https = require('https');

const refId = '01a1a163-d096-7733-8002-6988f0c7139b';
const coverItemId = '01a1a16a-ee15-72fa-b097-0cce456d4d9f';
const postId = '01a1a16a-ee20-75ad-9a91-05fc400beeb4';

const paths = [
  `/v2/tasks/${refId}`,
  `/tasks/${refId}`,
  `/tasks-v2/${refId}`,
  `/public/tasks/${refId}`,
  `/public/tasks-v2/${refId}`,
  `/community/tasks/${refId}`,
  `/v2/tasks/${coverItemId}`,
  `/tasks/${coverItemId}`,
  `/v2/tasks/${postId}`,
  `/tasks/${postId}`
];

async function testAll() {
  for (const p of paths) {
    const url = 'https://api.meshy.ai/web' + p;
    await new Promise((resolve) => {
      https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.meshy.ai/',
          'Origin': 'https://www.meshy.ai',
          'x-meshy-viewer-server': 'true'
        }
      }, (res) => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          console.log(res.statusCode, p, d.substring(0, 150));
          if (res.statusCode === 200) {
            console.log('SUCCESS DATA:', d);
          }
          resolve();
        });
      }).on('error', resolve);
    });
  }
}
testAll();
