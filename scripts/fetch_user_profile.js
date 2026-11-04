const https = require('https');

https.get('https://www.meshy.ai/@s17937082649e1eb', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body length:', body.length);
    // Find all post ids, slugs, tasks in body
    const matches = body.match(/\/posts\/[a-zA-Z0-9_\-]+/g) || [];
    console.log('Posts found:', [...new Set(matches)]);
    const shareMatches = body.match(/\/s\/[a-zA-Z0-9_\-]+/g) || [];
    console.log('Share links:', [...new Set(shareMatches)]);
    const uuids = body.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g) || [];
    console.log('UUIDs on profile:', [...new Set(uuids)]);
  });
});
