const fs = require('fs');

const historyPath = 'D:/1-20261103T120058Z-1-001/1/CHAT_HISTORY.md';
let history = fs.readFileSync(historyPath, 'utf8');

const entry = `
---

## 32. Khắc Phục Triệt Để Lỗi "Lúc Thấy Nhân Vật Lúc Không" Khi Bay Lên Tung Chiêu
- **Yêu cầu từ người dùng**: *"t thấy đang gặp 1 lỗi là người chơi bay lên tung skill thì lúc thấy nhân vật lúc ko"*.
- **Phân Tích Nguyên Nhân Cốt Lõi**:
  1. **Lỗi Frustum Culling của Three.js**:
     - Mặc định các mesh 3D có \`frustumCulled = true\`. Khi nhân vật bay vút lên độ cao $Y = 8.8m$ sát mép trên khung hình, Three.js tính toán sai hình cầu bao quanh (\`boundingSphere\`) của nhân vật và tưởng rằng nhân vật đã ra ngoài tầm nhìn $\\rightarrow$ **Three.js tự động ngắt hiển thị khiến nhân vật biến mất vô hình giữa trời**!
  2. **Góc Camera Tĩnh Bị Cột Đền / Cảnh Vật Che Khuất**:
     - Khi người chơi ở rìa đấu trường bay lên, camera cận cảnh trước đây bị neo cố định ở tọa độ mặt đất (\`Y = 2.4m\`). Khi ngước nhìn chéo qua đấu trường, các cột đền cổ kính (\`monoliths\`), vạc lửa hoặc vòng hào quang Boss che khuất tầm nhìn khiến người xem không thấy nhân vật.
  3. **Thời Gian Giữ Nét Camera Bị Hết Sớm**:
     - Hoạt ảnh lơ lửng kéo dài $4.2$ giây nhưng bộ đếm camera trước đây chỉ giữ $3.0$ giây, khiến camera bị giật lùi về góc toàn cảnh giữa chừng khi nhân vật chưa kịp hạ cánh.
  4. **Giới Hạn 12 Nhân Vật 3D**:
     - Trước đây người chơi thứ 13 trở đi bị gán sang mô hình chibi phụ (\`SP(n)\`), một số người chơi thiếu mô hình 3D Meshy chất lượng cao.
- **Giải Pháp Khắc Phục Toàn Diện**:
  1. **Khóa Frustum Culling = false**:
     - Toàn bộ mesh con của nhân vật người chơi (\`Golden Crest Guardian\` & \`Scarlet Empress\`) được gán \`frustumCulled = false\`, đảm bảo nhân vật **LUÔN LUÔN hiển thị 100% trong mọi góc nhìn và mọi độ cao bay lượn**.
  2. **Chế Độ Quay Cẩu Điện Ảnh Tự Động (Dynamic Crane Camera Tracking)**:
     - Khi người chơi bay lên $Y = 8.8m$, camera tự động cẩu góc quay bay lên theo mượt mà (\`camElevY = curP.y - 0.4\`, \`camDistZ = 5.6m\`), luôn đứng trực diện phía trước nhân vật với góc nghiêng hoàn hảo, không còn bất kỳ cột đền hay vật cản nào có thể che khuất.
  3. **Độ Ưu Tiên Hiển Thị Tối Đa (\`renderOrder = 10\` & \`side = DoubleSide\`)**:
     - Đảm bảo nhân vật luôn vẽ nổi bật phía trên toàn bộ hiệu ứng phép thuật và quầng sáng của Boss.
  4. **Đồng Bộ Mô Hình 3D Meshy Cho Toàn Bộ Người Chơi**:
     - Bỏ giới hạn 12 người, toàn bộ dũng sĩ trên sàn đấu đều sở hữu mô hình 3D Meshy AI sắc nét, sống động.
`;

fs.writeFileSync(historyPath, history + entry, 'utf8');
console.log('Appended section 32 to CHAT_HISTORY.md');
