const fs = require('fs');

console.log('=== OPTIMIZING TIKTOK BRIDGE FOR 100K CONCURRENT SCALE ===');
const bridgePath = 'D:/1-20261103T120058Z-1-001/1/tiktok_bridge.js';
let bridgeCode = fs.readFileSync(bridgePath, 'utf8');

// Replace bridge event handling with high-throughput micro-batching
const oldChat = `    // 1. Bình luận / Chat (Người xem chém Boss)
    tiktokConn.on('chat', (data) => {
      console.log(\`[Chat] @\${data.uniqueId}: \${data.comment}\`);
      broadcast({
        id: data.msgId || crypto.randomUUID(),
        type: 'comment',
        username: data.uniqueId || data.nickname || 'Tu Sĩ',
        comment: data.comment,
        value: 1,
        timestamp: Date.now()
      });
    });`;

const newChat = `    // 1. Bình luận / Chat (Người xem chém Boss - Tối ưu 100K tin nhắn)
    tiktokConn.on('chat', (data) => {
      stats.comments++;
      commentBatch.push({
        id: data.msgId || crypto.randomUUID(),
        type: 'comment',
        username: data.uniqueId || data.nickname || 'Tu Sĩ',
        comment: data.comment,
        value: 1,
        timestamp: Date.now()
      });
      if (commentBatch.length >= 80) {
        broadcast({
          type: 'comment_batch',
          count: commentBatch.length,
          items: commentBatch,
          timestamp: Date.now()
        });
        commentBatch = [];
      }
    });`;

if (bridgeCode.includes(oldChat)) {
  bridgeCode = bridgeCode.replace(oldChat, newChat);
  console.log('✓ Upgraded chat listener to micro-batching in tiktok_bridge.js');
}

// Add batch buffers and flush timers if not present
if (!bridgeCode.includes('let commentBatch = [];')) {
  const insertBeforeConn = `let tiktokConn = null;\nlet currentUniqueId = '';\nconst clients = new Set();`;
  const batchVars = `let tiktokConn = null;
let currentUniqueId = '';
const clients = new Set();

// High-Throughput Micro-Batching Buffers (Hỗ trợ 100.000 tin nhắn / phút)
let commentBatch = [];
let accumulatedLikes = 0;
let stats = { comments: 0, gifts: 0, likes: 0 };

// Xả bộ đệm mỗi 40ms để duy trì độ trễ cực thấp (< 50ms)
setInterval(() => {
  if (commentBatch.length > 0) {
    if (commentBatch.length === 1) {
      broadcast(commentBatch[0]);
    } else {
      broadcast({
        type: 'comment_batch',
        count: commentBatch.length,
        items: commentBatch,
        timestamp: Date.now()
      });
    }
    commentBatch = [];
  }

  if (accumulatedLikes > 0) {
    broadcast({
      id: crypto.randomUUID(),
      type: 'like',
      username: 'Đạo Hữu',
      value: accumulatedLikes,
      timestamp: Date.now()
    });
    accumulatedLikes = 0;
  }
}, 40);

// Throttled thống kê mỗi 3 giây thay vì in console từng tin nhắn
setInterval(() => {
  if (stats.comments > 0 || stats.gifts > 0 || stats.likes > 0) {
    console.log(\`[100K Stream Stats] 💬 \${stats.comments} tin nhắn/3s | 🎁 \${stats.gifts} quà | ❤️ \${stats.likes} tim\`);
    stats = { comments: 0, gifts: 0, likes: 0 };
  }
}, 3000);`;

  bridgeCode = bridgeCode.replace(insertBeforeConn, batchVars);
  console.log('✓ Added batching loops and stats to tiktok_bridge.js');
}

// Update like listener in bridge
const oldLike = `    // 3. Thả tim / Like (Tăng năng lượng & Hồi phục tu sĩ)
    tiktokConn.on('like', (data) => {
      broadcast({
        id: crypto.randomUUID(),
        type: 'like',
        username: data.uniqueId || data.nickname || 'Đạo Hữu',
        value: Math.min(25, data.likeCount || 1),
        timestamp: Date.now()
      });
    });`;

const newLike = `    // 3. Thả tim / Like (Tích lũy theo đợt)
    tiktokConn.on('like', (data) => {
      stats.likes += (data.likeCount || 1);
      accumulatedLikes += Math.min(50, data.likeCount || 1);
    });`;

if (bridgeCode.includes(oldLike)) {
  bridgeCode = bridgeCode.replace(oldLike, newLike);
  console.log('✓ Upgraded like listener to accumulator in tiktok_bridge.js');
}

fs.writeFileSync(bridgePath, bridgeCode, 'utf8');
console.log('✅ tiktok_bridge.js updated successfully!');
