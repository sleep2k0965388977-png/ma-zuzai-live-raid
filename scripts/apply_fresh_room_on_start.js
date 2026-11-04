const fs = require('fs');
const acorn = require('acorn');

const files = [
  'D:/1-20261103T120058Z-1-001/1/assets/index-CT5dfJfs.js',
  'D:/1-20261103T120058Z-1-001/1/public/assets/index-CT5dfJfs.js'
];

for (const filePath of files) {
  if (!fs.existsSync(filePath)) continue;
  let code = fs.readFileSync(filePath, 'utf8');
  console.log(`\n=== Processing ${filePath} ===`);

  // 1. Remove hardcoded fake players and top skills from constructor
  const oldStartup = '["linh.nhi","kiemkhach","tieu.long","ngoc.anh","thien.vu","bach.lien","minh.nguyet","vo.danh"].forEach(l=>this.spawn(l)),window.raidGame=this,window.resetRaidGame=()=>this.resetAllData(),window.playerLeaveRoom=(u)=>this.playerLeaveRoom(u),window.addEventListener("pointerdown",()=>{if(window.raidGame&&window.raidGame.audio){window.raidGame.audio.initContext();if(!window.raidGame.audio.enabled)window.raidGame.audio.setEnabled(!0);}},{passive:!0});this.connectTikTokBridge(),this.updateLabelRanks(),this.log("Đấu trường đã sẵn sàng. Hãy gửi sự kiện đầu tiên.","system"),this.animate();this.triggerNewMatchTopSkills();';

  const newStartup = 'window.raidGame=this,window.resetRaidGame=()=>this.resetAllData(),window.playerLeaveRoom=(u)=>this.playerLeaveRoom(u),window.addEventListener("pointerdown",()=>{if(window.raidGame&&window.raidGame.audio){window.raidGame.audio.initContext();if(!window.raidGame.audio.enabled)window.raidGame.audio.setEnabled(!0);}},{passive:!0});this.connectTikTokBridge(),this.resetAllData(),this.animate();';

  if (code.includes(oldStartup)) {
    code = code.replace(oldStartup, newStartup);
    console.log('[+] Removed fake player spawning on startup -> Fresh Clean Room by default!');
  } else {
    console.warn('[-] Could not find oldStartup');
  }

  // 2. In resetAllData(), ensure message says "Bắt đầu ngày mới / Phòng mới sạch 100%"
  const oldResetLog = '🔄 [KHỞI ĐẦU MỚI] ĐÃ LÀM MỚI TOÀN BỘ TRẬN ĐẤU! Xóa sạch dữ liệu, không top, không người chơi. Sẵn sàng cho trận chiến mới!';
  const newResetLog = '🌅 [BẮT ĐẦU NGÀY MỚI] ĐÃ TẠO PHÒNG MỚI! Không có top, không có người chơi ảo, Boss đầy 100% máu. Sẵn sàng đón người chơi vào phòng LIVE!';
  if (code.includes(oldResetLog)) {
    code = code.replace(oldResetLog, newResetLog);
    console.log('[+] Updated resetAllData log message');
  }

  // 3. In Top Cultivators Board UI: if topList is empty, show attractive empty state
  const oldTopBoard = 'P.jsx("div",{className:"board-list",children:topList.map((cp,cIdx)=>P.jsxs("div",{';
  const newTopBoard = 'P.jsx("div",{className:"board-list",children:topList.length===0?P.jsx("div",{style:{padding:"18px 10px",textAlign:"center",color:"#c084fc",fontSize:"11.5px",fontWeight:700,fontStyle:"italic"},children:"⚔️ ĐANG CHỜ ĐẠO HỮU VÀO PHÒNG LIVE THAM CHIẾN..."}):topList.map((cp,cIdx)=>P.jsxs("div",{';

  if (code.includes(oldTopBoard)) {
    code = code.replace(oldTopBoard, newTopBoard);
    console.log('[+] Updated Top Cultivators Board to display empty waiting message when room is fresh');
  } else {
    console.warn('[-] Could not find oldTopBoard');
  }

  // 4. Update Button text to "🌅 BẮT ĐẦU NGÀY MỚI / TẠO PHÒNG MỚI (BOSS ĐẦY MÁU, KHÔNG TOP)"
  const oldResetBtn = '🔄 KHỞI ĐẦU MỚI (XÓA SẠCH TOP & NGƯỜI CHƠI)';
  const newResetBtn = '🌅 BẮT ĐẦU NGÀY MỚI (TẠO PHÒNG MỚI, KHÔNG TOP, BOSS ĐẦY MÁU)';
  if (code.includes(oldResetBtn)) {
    code = code.replace(oldResetBtn, newResetBtn);
    console.log('[+] Updated reset button label in UI');
  }

  // Validate AST
  try {
    acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`[✓] Acorn AST validation SUCCESS for ${filePath}`);
    fs.writeFileSync(filePath, code, 'utf8');
  } catch (err) {
    console.error(`[X] AST ERROR in ${filePath}:`, err.message);
    process.exit(1);
  }
}

console.log('\nFresh clean room on startup applied successfully!');
