const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8081');

ws.on('open', () => {
  console.log('⚡ Connected to TikTok Bridge. Queuing 3 rapid skills in 100ms...');
  
  // Send 3 skills at the exact same moment
  for (let i = 1; i <= 3; i++) {
    ws.send(JSON.stringify({
      action: 'simulate',
      event: {
        id: 'pace_test_' + i,
        type: 'gift',
        username: 'tu_si_so_' + i,
        skill: i === 1 ? 'giant_sword' : (i === 2 ? 'sword_rain' : 'single_dragon'),
        value: i === 1 ? 20 : (i === 2 ? 45 : 80),
        timestamp: Date.now()
      }
    }));
  }
  
  console.log('✅ Queued 3 skills! In game, they will execute sequentially spaced 2-4 seconds apart.');
  setTimeout(() => {
    ws.close();
    process.exit(0);
  }, 1000);
});
