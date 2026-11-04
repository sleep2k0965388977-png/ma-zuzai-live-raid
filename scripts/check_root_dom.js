const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\ADMIN\\AppData\\Local\\Temp\\chrome_debug_' + Date.now();

const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9226',
  '--user-data-dir=' + userDataDir,
  'about:blank'
]);

function tryConnect(retries = 10) {
  http.get('http://127.0.0.1:9226/json', (res) => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      const list = JSON.parse(d);
      const page = list.find(x => x.type === 'page');
      if (!page) return;
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Page.navigate', params: { url: 'http://localhost:3000/' } }));
      };
      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id === 2) {
          setTimeout(() => {
            ws.send(JSON.stringify({ id: 3, method: 'Runtime.evaluate', params: { expression: 'document.getElementById("root").innerHTML.substring(0, 300)' } }));
          }, 2000);
        } else if (data.id === 3) {
          console.log('=== ROOT INNER HTML ===');
          console.log(data.params.result.value);
          ws.close();
          chromeProc.kill();
          process.exit(0);
        }
      };
    });
  }).on('error', () => {
    if (retries > 0) setTimeout(() => tryConnect(retries - 1), 500);
    else chromeProc.kill();
  });
}

setTimeout(() => tryConnect(), 1000);
