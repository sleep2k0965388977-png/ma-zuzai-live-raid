const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\ADMIN\\AppData\\Local\\Temp\\chrome_debug_' + Date.now();

const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9223',
  '--user-data-dir=' + userDataDir,
  'about:blank'
]);

setTimeout(async () => {
  http.get('http://127.0.0.1:9223/json', (res) => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', async () => {
      const list = JSON.parse(d);
      const page = list.find(x => x.type === 'page');
      if (!page) {
        console.log('No page found');
        chromeProc.kill();
        return;
      }
      console.log('Connecting to WS:', page.webSocketDebuggerUrl);
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      ws.onopen = () => {
        console.log('WS opened, enabling domains');
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
        ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
        ws.send(JSON.stringify({ id: 4, method: 'Page.navigate', params: { url: 'http://localhost:3000/' } }));
      };

      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.method === 'Runtime.exceptionThrown') {
          console.error('=== RUNTIME EXCEPTION ===');
          console.error(JSON.stringify(data.params.exceptionDetails, null, 2));
        } else if (data.method === 'Runtime.consoleAPICalled') {
          console.log('=== CONSOLE LOG [' + data.params.type + '] ===');
          console.log(data.params.args.map(a => a.value || a.description).join(' '));
        } else if (data.method === 'Log.entryAdded') {
          console.log('=== LOG ENTRY ===', data.params.entry.text);
        }
      };

      setTimeout(() => {
        ws.close();
        chromeProc.kill();
        process.exit(0);
      }, 5000);
    });
  });
}, 1500);
