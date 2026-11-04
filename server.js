/**
 * PRODUCTION ALL-IN-ONE SERVER - MA ZUZAI 3D LIVE RAID
 * Tích hợp sẵn Web Server + TikTok Live Bridge WebSocket trên cùng 1 cổng
 * Thích hợp chạy trên VPS (Ubuntu/Debian), Docker, Render, Railway, v.v.
 */

const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const { TikTokLiveConnection } = require('tiktok-live-connector');

const app = express();
const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 8081;

// 1. Phục vụ toàn bộ static files (HTML, CSS, JS, GLB 3D models)
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.glb')) {
      res.setHeader('Content-Type', 'model/gltf-binary');
    }
  }
}));

// Route fallback về index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app);

// 2. WebSocket Server gắn trực tiếp vào HTTP Server (hỗ trợ /ws qua cổng chính)
const wssMain = new WebSocket.Server({ server, path: '/ws' });

// Đồng thời mở cổng phụ 8081 cho tương thích ngược nếu chạy local
let wssCompat = null;
try {
  wssCompat = new WebSocket.Server({ port: WS_PORT });
  console.log(`[WebSocket] Cổng phụ 8081 đã mở: ws://localhost:${WS_PORT}`);
} catch (e) {
  console.log(`[WebSocket] Cổng 8081 đang bận, dùng WebSocket qua cổng chính /ws`);
}

let tiktokConn = null;
let currentUniqueId = '';
const clients = new Set();

// Thêm client từ cả 2 websocket server
function attachWSS(wss) {
  if (!wss) return;
  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log(`[WebSocket] Client đã kết nối! (Tổng: ${clients.size})`);

    ws.send(JSON.stringify({
      type: 'status',
      connected: !!(tiktokConn && tiktokConn.isConnected),
      uniqueId: currentUniqueId,
      message: tiktokConn && tiktokConn.isConnected
        ? `🟢 Đang kết nối trực tiếp phòng LIVE @${currentUniqueId}`
        : '⚪ Sẵn sàng kết nối TikTok LIVE. Nhập username để bắt đầu.'
    }));

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);
        if (data.action === 'connect') {
          const uniqueId = (data.uniqueId || '').replace(/^@/, '').trim();
          if (!uniqueId) {
            ws.send(JSON.stringify({ type: 'status', message: '❌ Username TikTok không được để trống!' }));
            return;
          }
          await connectToTikTok(uniqueId);
        } else if (data.action === 'disconnect') {
          disconnectFromTikTok();
        } else if (data.action === 'simulate') {
          broadcast(data.event);
        }
      } catch (err) {}
    });

    ws.on('close', () => {
      clients.delete(ws);
      console.log(`[WebSocket] Client ngắt kết nối. (Còn lại: ${clients.size})`);
    });
  });
}

attachWSS(wssMain);
attachWSS(wssCompat);

function broadcast(obj) {
  const json = JSON.stringify(obj);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(json);
    }
  }
}

// Micro-batching buffer cho tải khủng 100k
let commentBatch = [];
let accumulatedLikes = 0;
let stats = { comments: 0, gifts: 0, likes: 0 };

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

setInterval(() => {
  if (stats.comments > 0 || stats.gifts > 0 || stats.likes > 0) {
    console.log(`[VPS Stats] 💬 ${stats.comments} tin nhắn/3s | 🎁 ${stats.gifts} quà | ❤️ ${stats.likes} tim`);
    stats = { comments: 0, gifts: 0, likes: 0 };
  }
}, 3000);

async function connectToTikTok(uniqueId) {
  if (tiktokConn) disconnectFromTikTok();
  currentUniqueId = uniqueId;
  console.log(`[TikTok] Đang kết nối tới phòng LIVE của @${uniqueId}...`);

  broadcast({
    type: 'status',
    connected: false,
    uniqueId,
    message: `⏳ Đang kết nối tới phòng LIVE của @${uniqueId}...`
  });

  try {
    tiktokConn = new TikTokLiveConnection(uniqueId, {
      processInitialData: true,
      fetchRoomInfoOnConnect: true,
      enableExtendedGiftInfo: true
    });

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
    });

    tiktokConn.on('gift', (data) => {
      if (data.giftType === 1 && !data.repeatEnd) return;
      const diamonds = (data.diamondCount || 1) * (data.repeatCount || 1);
      let skill = 'small';
      if (diamonds >= 150) skill = 'ten_dragons';
      else if (diamonds >= 80) skill = 'single_dragon';
      else if (diamonds >= 45) skill = 'sword_rain';
      else if (diamonds >= 20) skill = 'giant_sword';
      else if (diamonds >= 1) skill = 'small'; // Kích hoạt ngay từ 1 Xu (Hoa hồng, v.v.)

      stats.gifts++;
      console.log(`[Gift] @${data.uniqueId} tặng ${data.giftName} (${diamonds} Xu) -> [${skill}]!`);
      broadcast({
        id: data.msgId || crypto.randomUUID(),
        type: 'gift',
        username: data.uniqueId || data.nickname || 'Cao Thủ',
        skill,
        value: diamonds,
        giftName: data.giftName,
        timestamp: Date.now()
      });
    });

    tiktokConn.on('like', (data) => {
      stats.likes += (data.likeCount || 1);
      accumulatedLikes += Math.min(50, data.likeCount || 1);
    });

    tiktokConn.on('member', (data) => {
      broadcast({
        id: crypto.randomUUID(),
        type: 'follow',
        username: data.uniqueId || data.nickname || 'Đạo Hữu Mới',
        value: 1,
        timestamp: Date.now()
      });
    });

    tiktokConn.on('follow', (data) => {
      broadcast({
        id: crypto.randomUUID(),
        type: 'follow',
        username: data.uniqueId || data.nickname || 'Người Theo Dõi',
        value: 5,
        timestamp: Date.now()
      });
    });

    tiktokConn.on('share', (data) => {
      broadcast({
        id: crypto.randomUUID(),
        type: 'share',
        username: data.uniqueId || data.nickname || 'Người Chia Sẻ',
        value: 5,
        timestamp: Date.now()
      });
    });

    tiktokConn.on('streamEnd', () => {
      broadcast({ type: 'status', connected: false, uniqueId, message: '🔴 Buổi phát sóng TikTok LIVE đã kết thúc.' });
    });

    tiktokConn.on('disconnected', () => {
      broadcast({ type: 'status', connected: false, uniqueId, message: '⚠️ Phòng LIVE bị mất kết nối từ máy chủ TikTok.' });
    });

    const state = await tiktokConn.connect();
    console.log(`✅ Kết nối thành công tới phòng LIVE của @${uniqueId}! Room ID: ${state.roomId}`);
    broadcast({
      type: 'status',
      connected: true,
      uniqueId,
      message: `🟢 ĐÃ KẾT NỐI PHÒNG LIVE: @${uniqueId} (Room: ${state.roomId})`
    });
  } catch (err) {
    console.error(`[TikTok Error] Lỗi kết nối: ${err.message}`);
    broadcast({
      type: 'status',
      connected: false,
      uniqueId,
      message: `❌ Không thể kết nối tới @${uniqueId}. Hãy chắc chắn kênh ĐANG PHÁT TRỰC TIẾP!`
    });
  }
}

function disconnectFromTikTok() {
  if (tiktokConn) {
    try { tiktokConn.disconnect(); } catch (e) {}
    tiktokConn = null;
    broadcast({ type: 'status', connected: false, uniqueId: '', message: '⚪ Đã ngắt kết nối phòng LIVE.' });
  }
}

server.listen(PORT, () => {
  console.log('========================================================');
  console.log(`   🔥 MA ZUZAI 3D LIVE RAID - UNIFIED SERVER RUNNING 🔥  `);
  console.log(`   Web Game: http://localhost:${PORT}                   `);
  console.log(`   WebSocket: ws://localhost:${PORT}/ws                 `);
  console.log('========================================================\n');
});
