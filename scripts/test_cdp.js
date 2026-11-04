const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\ADMIN\\AppData\\Local\\Temp\\chrome_debug_' + Date.now();

const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9222',
  '--user-data-dir=' + userDataDir,
  'http://localhost:3000/'
]);

setTimeout(async () => {
  try {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        console.log('CDP targets:', d);
        chromeProc.kill();
      });
    }).on('error', (e) => {
      console.log('HTTP error:', e.message);
      chromeProc.kill();
    });
  } catch (e) {
    console.error(e);
    chromeProc.kill();
  }
}, 2000);
