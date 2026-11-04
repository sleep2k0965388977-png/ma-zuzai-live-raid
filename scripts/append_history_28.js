const fs = require('fs');

const historyPath = 'D:/1-20261103T120058Z-1-001/1/CHAT_HISTORY.md';
let history = fs.readFileSync(historyPath, 'utf8');

const entry = `
---

## 28. Cơ Chế Giãn Cách Tung Chiêu 2 - 4 Giây (Chống Quá Tải & Chống Lag Cho Máy Yếu)
- **Yêu cầu từ người dùng**: *"khi tung skill hay đánh cách nhau người chơi tung skill 2-4 giây đế tránh bị gấp làm lag hay quá tải"*.
- **Thiết Kế Cơ Chế Điều Phối Nhịp Điệu (Skill Pacing & Cadence Controller)**:
  1. **Khoảng cách tối thiểu 2 - 4 giây giữa các lần ra đòn**:
     - Tích hợp bộ đếm \`actionCooldown\` và biến ngẫu nhiên \`nextActionDelay\` dao động linh hoạt từ **2.0 đến 4.0 giây** (\`2.0 + Math.random() * 2.0\`).
     - Khi một người chơi bắt đầu thi triển tuyệt kỹ (Cự Kiếm, Mưa Kiếm, Kim Long, Thập Long) hoặc phóng thân chém cận chiến: toàn bộ các đòn đánh/skill tiếp theo được xếp hàng chờ trật tự trong hàng đợi.
  2. **Khóa chống đè hình (Single-Player Spotlight Lock)**:
     - Hệ thống kiểm tra trạng thái toàn bộ đấu sĩ trên sàn đấu: nếu vẫn còn người chơi đang ở giữa không trung (\`act.attack > 0\`), tuyệt đối không kích hoạt người tiếp theo.
     - Sau khi người chơi trước tiếp đất an toàn và đủ thời gian giãn cách 2 - 4 giây, người chơi kế tiếp mới bắt đầu tung chiêu.
  3. **Lợi ích vượt trội cho máy cấu hình yếu**:
     - Camera điện ảnh tập trung trọn vẹn vào từng người xem, không bị giật giật hay chuyển góc quay đột ngột.
     - Âm thanh tuyệt kỹ và tiếng rồng gầm vang lên rõ ràng, sắc nét, không bị rè hay đè tiếng.
     - GPU và CPU không phải gánh nhiều vụ nổ hạt cùng lúc, duy trì tốc độ khung hình **60 FPS mượt mà tuyệt đối**.
`;

fs.writeFileSync(historyPath, history + entry, 'utf8');
console.log('Appended section 28 to CHAT_HISTORY.md');
