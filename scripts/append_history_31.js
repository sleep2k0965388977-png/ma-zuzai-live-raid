const fs = require('fs');

const historyPath = 'D:/1-20261103T120058Z-1-001/1/CHAT_HISTORY.md';
let history = fs.readFileSync(historyPath, 'utf8');

const entry = `
---

## 31. Hoạt Ảnh Lơ Lửng Dừng Trên Không 2 - 3 Giây Khi Tung Chiêu (Mid-Air Hover Strike)
- **Yêu cầu từ người dùng**: *"tung chiêu thức hơi nhanh chậm khoảng 1-2 giây cho t người chơi đang bay lên tung phát xuống luôn nó đa quá nhanh hãy bay lên tung dừng khoảng 2-3 giây rồi mới xuống"*.
- **Thiết Kế Quỹ Đạo Điện Ảnh 3 Giai Đoạn (3-Stage Cinematic Trajectory)**:
  1. **Giai đoạn 1 - Bay vút lên đỉnh trời (0.65s - 0.85s)**:
     - Dũng sĩ phi thân vút lên không trung ($Y = 8.8m$ khi tặng quà/tuyệt kỹ, $Y = 3.2m$ khi chém thường).
     - Camera điện ảnh zoom cận cảnh mượt mà vào nhân vật.
  2. **Giai đoạn 2 - DỪNG LƠ LỬNG TRÊN KHÔNG 2.0 - 2.5 GIÂY (Mid-Air Hover & Multi-Slash)**:
     - Khi đạt đỉnh cao, nhân vật **dừng lại lơ lửng bồng bềnh giữa không trung suốt 2.0 - 2.5 giây** (\`soarY = 8.8 + Math.sin((h-0.85)*4.5)*0.22\`).
     - Đôi cánh kim quang mở rộng đập cánh nhẹ nhàng, cánh tay vung kiếm liên hoàn xé gió chém khí kiếm phát quang vào ngực Boss.
     - Triệu hồi Rồng Vàng bay lượn, Cự Kiếm cắm xuống đất hoặc Mưa Kiếm laser xé gió.
     - Người xem và streamer có đủ 2-3 giây trọn vẹn để chiêm ngưỡng nhân vật của mình tỏa sáng trên sóng live.
  3. **Giai đoạn 3 - Từ từ hạ cánh uyển chuyển (0.75s - 0.85s)**:
     - Sau khi chiêu thức hoàn tất, người chơi từ từ hạ cánh đáp xuống bục đá vị trí ban đầu (\`o.home\`), thu kiếm vào bao và trở về thế thủ \`idle\`.
  4. **Thời gian giữ nét Camera**:
     - Kéo dài thời gian camera tập trung vào dũng sĩ (\`cameraTimer = 4.0s\`), đảm bảo góc quay điện ảnh bao trọn toàn bộ quá trình bay lên $\\rightarrow$ lơ lửng 2.5 giây $\\rightarrow$ tiếp đất an toàn.
`;

fs.writeFileSync(historyPath, history + entry, 'utf8');
console.log('Appended section 31 to CHAT_HISTORY.md');
