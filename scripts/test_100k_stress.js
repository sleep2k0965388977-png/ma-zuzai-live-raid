const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8081');

ws.on('open', () => {
  console.log('⚡ Connected to TikTok Bridge. Starting 1,000-message burst stress test...');
  const start = Date.now();
  let count = 0;

  const interval = setInterval(() => {
    for (let i = 0; i < 50; i++) {
      count++;
      ws.send(JSON.stringify({
        action: 'simulate',
        event: {
          id: 'stress_' + count,
          type: 'comment',
          username: 'dao_huu_' + (count % 500),
          comment: 'Chem Boss Ma Zuzai ' + count,
          value: 1,
          timestamp: Date.now()
        }
      }));
    }

    if (count >= 1000) {
      clearInterval(interval);
      const elapsed = Date.now() - start;
      console.log(`✅ Fired 1,000 messages in ${elapsed}ms (${Math.round(1000 / (elapsed / 1000))} msgs/sec)!`);
      setTimeout(() => {
        ws.close();
        process.exit(0);
      }, 1500);
    }
  }, 20);
});
