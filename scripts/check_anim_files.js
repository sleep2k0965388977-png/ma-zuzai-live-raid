const https = require('https');

const baseUrl = 'https://assets.meshy.ai/9e1eb17a-ab49-4d79-807c-d50b2f5492f3/tasks/01a1a163-d096-7733-8002-6988f0c7139b/output/';
// We need the query string from the signed URL
const qs = 'Expires=1793836800&Signature=QVOwLKtDbZxI9qA58JgTxqv-1WHNmMD9u4imp95kAE3b50NoF4xq8YOMY9ycPEZQjKo-YJ7Mh9Yh4GW9kDMa6l8CgZrhJlc4eCJuOiTsexsFRiyNdbX8t~oOtKc5J808fEO5ZvuuLcVsaxLKKgEhj-DcoCTJ5s~mDkI1ohXM38GHiRSiquMijdAWLHwpx6vIsYyWbPnry9TZBZCo1Zu37ogeNO2zIHVEa7eCKJz52WcpvKybzK-L3mPW41fio3miETVv~9wnQ9R92-PKeOqGv6we4MpRDmE4zPrjEVTPiyaWofMaoHhnnM2gKmpj-2EErhwWo3WpmPXEQte4N057vw__&Key-Pair-Id=K1VGYTHIYLM9UM';

const filenames = [
  'model.glb',
  'animation.glb',
  'animated.glb',
  'rig.glb',
  'rigged.glb',
  'biped.glb',
  'anim.glb',
  'action.glb',
  'clip.glb',
  'animation_0.glb',
  'actions/idle.glb',
  'motion.glb',
  'mesh.glb'
];

async function checkFiles() {
  for (const fn of filenames) {
    const url = baseUrl + fn + '?' + qs;
    await new Promise((resolve) => {
      https.request(url, { method: 'HEAD' }, (res) => {
        console.log(res.statusCode, fn);
        resolve();
      }).on('error', resolve).end();
    });
  }
}
checkFiles();
