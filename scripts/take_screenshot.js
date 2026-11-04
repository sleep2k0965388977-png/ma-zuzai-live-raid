const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\ADMIN\\AppData\\Local\\Temp\\chrome_debug_' + Date.now();

const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9225',
  '--window-size=1280,720',
  '--user-data-dir=' + userDataDir,
  'about:blank'
]);

setTimeout(async () => {
  http.get('http://127.0.0.1:9225/json', (res) => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', async () => {
      const list = JSON.parse(d);
      const page = list.find(x => x.type === 'page');
      if (!page) {
        chromeProc.kill();
        return;
      }
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Page.navigate', params: { url: 'http://localhost:3000/' } }));
      };

      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.method === 'Page.loadEventFired') {
          // Wait 3.5 seconds after DOM + 3D ready
          setTimeout(() => {
            ws.send(JSON.stringify({ id: 10, method: 'Page.captureScreenshot' }));
          }, 3500);
        } else if (data.id === 10) {
          const imgBase64 = data.result.data;
          fs.writeFileSync('D:/1-20261103T120058Z-1-001/1/scripts/verify_render.png', Buffer.from(imgBase64, 'base64'));
          console.log('✅ Screenshot captured after loadEventFired! Size:', imgBase64.length);
          ws.close();
          chromeProc.kill();
          process.exit(0);
        }
      };
    });
  });
}, 1500);
