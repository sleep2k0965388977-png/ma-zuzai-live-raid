const fs = require('fs');

const helperFunctions = `
function getUsername(data) {
  if (!data) return 'Tu Sĩ';
  const u = data.user || {};
  return (
    data.uniqueId ||
    u.uniqueId ||
    data.nickname ||
    u.nickname ||
    'Tu Sĩ'
  ).replace(/^@/, '').trim() || 'Tu Sĩ';
}

function getCommentText(data) {
  if (!data) return '';
  return data.comment || data.content || '';
}

function getMsgId(data) {
  if (!data) return crypto.randomUUID();
  return data.msgId || (data.common && data.common.msgId) || crypto.randomUUID();
}
`;

['1/server.js', '1/tiktok_bridge.js'].forEach(filePath => {
  let code = fs.readFileSync(filePath, 'utf8');

  // Insert helpers before connectToTikTok if not present
  if (!code.includes('function getUsername(data)')) {
    code = code.replace('async function connectToTikTok', helperFunctions + '\nasync function connectToTikTok');
  }

  // Remove enableExtendedGiftInfo: true
  code = code.replace(/enableExtendedGiftInfo:\s*true,?\r?\n?/g, '');

  // Replace tiktokConn event listeners with robust extraction
  const oldChat = /tiktokConn\.on\('chat',[\s\S]*?if \(commentBatch\.length >= 80\)/;
  const newChat = `tiktokConn.on('chat', (data) => {
      stats.comments++;
      const username = getUsername(data);
      const comment = getCommentText(data);
      console.log(\`[Chat] @\${username}: "\${comment}"\`);
      commentBatch.push({
        id: getMsgId(data),
        type: 'comment',
        username: username,
        comment: comment,
        value: 1,
        timestamp: Date.now()
      });
      if (commentBatch.length >= 80)`;
  code = code.replace(oldChat, newChat);

  const oldGift = /tiktokConn\.on\('gift',[\s\S]*?broadcast\(\{\r?\n\s*id: data\.msgId/;
  const newGift = `tiktokConn.on('gift', (data) => {
      if (data.giftType === 1 && !data.repeatEnd) return;
      const diamonds = (data.diamondCount || 1) * (data.repeatCount || 1);
      let skill = 'small';
      if (diamonds >= 150) skill = 'ten_dragons';
      else if (diamonds >= 80) skill = 'single_dragon';
      else if (diamonds >= 45) skill = 'sword_rain';
      else if (diamonds >= 20) skill = 'giant_sword';
      else if (diamonds >= 1) skill = 'small';

      stats.gifts++;
      const username = getUsername(data);
      const giftName = data.giftName || (data.giftDetails && data.giftDetails.giftName) || 'Quà';
      console.log(\`[Gift] @\${username} tặng \${giftName} (\${diamonds} Xu) -> [\${skill}]!\`);
      broadcast({
        id: getMsgId(data)`;
  code = code.replace(oldGift, newGift);

  const oldMember = /tiktokConn\.on\('member',[\s\S]*?\}\);\r?\n\r?\n\s*tiktokConn\.on\('follow'/;
  const newMember = `tiktokConn.on('member', (data) => {
      const username = getUsername(data);
      console.log(\`[Member] @\${username} vừa vào phòng LIVE!\`);
      broadcast({
        id: getMsgId(data),
        type: 'follow',
        username: username,
        value: 1,
        timestamp: Date.now()
      });
    });

    tiktokConn.on('follow'`;
  code = code.replace(oldMember, newMember);

  fs.writeFileSync(filePath, code, 'utf8');
  console.log('Successfully patched', filePath);
});
