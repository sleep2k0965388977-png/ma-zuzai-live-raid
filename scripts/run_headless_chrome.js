const { execFile } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const args = [
  '--headless=new',
  '--disable-gpu',
  '--enable-logging=stderr',
  '--v=1',
  '--dump-dom',
  'http://localhost:3000/'
];

execFile(chromePath, args, { timeout: 10000 }, (err, stdout, stderr) => {
  console.log('Error:', err);
  console.log('STDOUT (DOM):', stdout.substring(0, 500));
  console.log('STDERR (Console):', stderr);
});
