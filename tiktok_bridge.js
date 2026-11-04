/**
 * TIKTOK LIVE BRIDGE SERVER - MA ZUZAI 3D LIVE RAID
 * Cầu nối thời gian thực giữa TikTok LIVE và Trò chơi Đấu Trùm 3D
 */

const WebSocket = require('ws');
const { TikTokLiveConnection } = require('tiktok-live-connector');

const PORT = 8081;
const wss = new WebSocket.Server({ port: PORT });

let tiktokConn = null;
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
    console.log(`[100K Stream Stats] 💬 ${stats.comments} tin nhắn/3s | 🎁 ${stats.gifts} quà | ❤️ ${stats.likes} tim`);
    stats = { comments: 0, gifts: 0, likes: 0 };
  }
}, 3000);

function broadcast(obj) {
  const json = JSON.stringify(obj);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(json);
    }
  }
}

console.log('========================================================');
console.log('   🔥 TIKTOK LIVE BRIDGE SERVER - MA ZUZAI 3D RAID 🔥    ');
console.log(`   Cổng kết nối WebSocket: ws://localhost:${PORT}        `);
console.log('========================================================\n');

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log(`[WebSocket] Game client đã kết nối! (Tổng số client: ${clients.size})`);

  // Gửi trạng thái hiện tại về cho game client
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
        // Hỗ trợ test mô phỏng sự kiện nhanh từ giao diện
        broadcast(data.event);
        console.log('[Simulate] Đã chuyển tiếp sự kiện mẫu:', data.event);
      }
    } catch (e) {
      console.error('[Error] Lỗi phân tích gói tin từ client:', e.message);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`[WebSocket] Game client ngắt kết nối. (Còn lại: ${clients.size})`);
  });
});

async function connectToTikTok(uniqueId) {
  if (tiktokConn) {
    disconnectFromTikTok();
  }

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

    // 1. Bình luận / Chat (Người xem chém Boss - Tối ưu 100K tin nhắn)
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

    // 2. Tặng quà / Xu (Kích hoạt Tuyệt Kỹ 5 cấp độ)
    tiktokConn.on('gift', (data) => {
      // Chỉ tính khi chuỗi tặng quà hoàn tất hoặc quà đơn lẻ
      if (data.giftType === 1 && !data.repeatEnd) {
        return; // Đang trong chuỗi combo, chờ kết thúc chuỗi để lấy tổng xu
      }

      const diamonds = (data.diamondCount || 1) * (data.repeatCount || 1);
      let skill = 'small';
      if (diamonds >= 150) skill = 'ten_dragons';
      else if (diamonds >= 80) skill = 'single_dragon';
      else if (diamonds >= 45) skill = 'sword_rain';
      else if (diamonds >= 20) skill = 'giant_sword';
      else if (diamonds >= 5) skill = 'small';

      console.log(`[Gift] @${data.uniqueId} tặng ${data.giftName} (Tổng: ${diamonds} Xu) -> Kích hoạt [${skill}]!`);

      broadcast({
        id: data.msgId || crypto.randomUUID(),
        type: 'gift',
        username: data.uniqueId || data.nickname || 'Cao Thủ',
        skill: skill,
        value: diamonds,
        giftName: data.giftName,
        timestamp: Date.now()
      });
    });

    // 3. Thả tim / Like (Tích lũy theo đợt)
    tiktokConn.on('like', (data) => {
      stats.likes += (data.likeCount || 1);
      accumulatedLikes += Math.min(50, data.likeCount || 1);
    });

    // 4. Người xem mới tham gia phòng live
    tiktokConn.on('member', (data) => {
      broadcast({
        id: crypto.randomUUID(),
        type: 'follow',
        username: data.uniqueId || data.nickname || 'Đạo Hữu Mới',
        value: 1,
        timestamp: Date.now()
      });
    });

    // 5. Follow & Share
    tiktokConn.on('follow', (data) => {
      console.log(`[Follow] @${data.uniqueId} đã theo dõi kênh!`);
      broadcast({
        id: crypto.randomUUID(),
        type: 'follow',
        username: data.uniqueId || data.nickname || 'Người Theo Dõi',
        value: 5,
        timestamp: Date.now()
      });
    });

    tiktokConn.on('share', (data) => {
      console.log(`[Share] @${data.uniqueId} đã chia sẻ phòng live!`);
      broadcast({
        id: crypto.randomUUID(),
        type: 'share',
        username: data.uniqueId || data.nickname || 'Tri Kỷ',
        value: 5,
        timestamp: Date.now()
      });
    });

    // 6. Kết nối thành công
    const state = await tiktokConn.connect();
    console.log(`\n🎉 KẾT NỐI TIKTOK LIVE THÀNH CÔNG!`);
    console.log(`Phòng LIVE ID: ${state.roomId}`);
    console.log(`Chủ phòng: @${uniqueId}\n`);

    broadcast({
      type: 'status',
      connected: true,
      uniqueId,
      message: `🟢 ĐÃ KẾT NỐI TRỰC TIẾP TIKTOK LIVE: @${uniqueId} (Room ID: ${state.roomId})`
    });

    tiktokConn.on('streamEnd', () => {
      console.log('[TikTok] Phiên LIVE đã kết thúc.');
      broadcast({
        type: 'status',
        connected: false,
        uniqueId,
        message: `🔴 Phiên LIVE của @${uniqueId} đã kết thúc.`
      });
    });

    tiktokConn.on('disconnected', () => {
      console.log('[TikTok] Mất kết nối tới TikTok LIVE.');
      broadcast({
        type: 'status',
        connected: false,
        uniqueId,
        message: `⚠️ Đã ngắt kết nối với phòng LIVE của @${uniqueId}.`
      });
    });

  } catch (err) {
    console.error('[TikTok Error]', err.message || err);
    let errMsg = err.message || 'Lỗi không xác định khi kết nối TikTok LIVE.';
    if (errMsg.includes('LIVE has ended') || errMsg.includes('offline') || errMsg.includes('RoomId not found')) {
      errMsg = `Phòng LIVE của @${uniqueId} hiện đang KHÔNG phát trực tiếp (Offline)! Hãy bấm Live trên TikTok trước.`;
    }
    broadcast({
      type: 'status',
      connected: false,
      uniqueId,
      message: `❌ ${errMsg}`
    });
  }
}

function disconnectFromTikTok() {
  if (tiktokConn) {
    try {
      tiktokConn.disconnect();
    } catch (e) {}
    tiktokConn = null;
    console.log('[TikTok] Đã ngắt kết nối phòng LIVE.');
  }
  broadcast({
    type: 'status',
    connected: false,
    uniqueId: currentUniqueId,
    message: '⚪ Đã ngắt kết nối TikTok LIVE.'
  });
}

// Bắt đầu nếu streamer truyền tham số qua dòng lệnh: node tiktok_bridge.js @your_username
const argUser = process.argv[2];
if (argUser) {
  connectToTikTok(argUser);
}
