const https = require('https');
const fs = require('fs');
const path = require('path');

const url = "https://assets.meshy.ai/9e1eb17a-ab49-4d79-807c-d50b2f5492f3/tasks/01a1a163-d096-7733-8002-6988f0c7139b/output/model.glb?Expires=1793836800&Signature=QVOwLKtDbZxI9qA58JgTxqv-1WHNmMD9u4imp95kAE3b50NoF4xq8YOMY9ycPEZQjKo-YJ7Mh9Yh4GW9kDMa6l8CgZrhJlc4eCJuOiTsexsFRiyNdbX8t~oOtKc5J808fEO5ZvuuLcVsaxLKKgEhj-DcoCTJ5s~mDkI1ohXM38GHiRSiquMijdAWLHwpx6vIsYyWbPnry9TZBZCo1Zu37ogeNO2zIHVEa7eCKJz52WcpvKybzK-L3mPW41fio3miETVv~9wnQ9R92-PKeOqGv6we4MpRDmE4zPrjEVTPiyaWofMaoHhnnM2gKmpj-2EErhwWo3WpmPXEQte4N057vw__&Key-Pair-Id=K1VGYTHIYLM9UM";

console.log('Downloading model.glb...');
const dest = path.join(__dirname, '../assets/boss_chained_radiance.glb');
const file = fs.createWriteStream(dest);

https.get(url, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Content-Length:', res.headers['content-length']);
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    const stat = fs.statSync(dest);
    console.log('DOWNLOAD COMPLETE! File size:', stat.size, 'bytes');
  });
}).on('error', (err) => {
  console.error('Download error:', err);
});
