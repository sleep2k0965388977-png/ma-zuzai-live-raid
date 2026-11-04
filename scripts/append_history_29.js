const fs = require('fs');

const historyPath = 'D:/1-20261103T120058Z-1-001/1/CHAT_HISTORY.md';
let history = fs.readFileSync(historyPath, 'utf8');

const entry = `
---

## 29. Cân Bằng Sát Thương Đãi Ngộ Khai Trận Top 5 (Chính Xác 1.3 / 4 Cọc Máu Boss)
- **Yêu cầu từ người dùng**: *"giảm sức manh đãi ngộ của tốp gây sát thương lên boss khi 5 người choi tốp gây sát thương lên tốp dùng đãi ngộ chỉ gây ra sat thương mất máu bót 1,3/4 cọc máu boss thôi chứ đang gây nhiều sát thương quá"*.
- **Phân Tích & Hiệu Chuẩn Sát Thương Toán Học**:
  1. **Quy mô Máu Boss**: Boss có tổng cộng 100.000 HP chia đều thành 4 cọc máu (mỗi cọc 25.000 HP).
  2. **Mục tiêu 1.3 / 4 cọc máu**: $1.3 \\times 25.000 = 32.500$ HP (tương đương 32.5% tổng máu Boss).
  3. **Nguyên nhân trước đây gây quá nhiều sát thương**:
     - Trước đây, đòn đánh vừa trừ máu trong hoạt ảnh phi thân chém Boss (\`o.attack\`), vừa tiếp tục trừ máu lần 2 trong vòng lặp hiệu ứng rồng/cự kiếm (\`activeSpecialSkills\`), dẫn đến tổng sát thương thực tế vượt quá 61.000 HP (~2.5 cọc máu).
  4. **Phân bổ sát thương chuẩn xác cho 5 vị trí Top**:
     - **Top 1 (Quán Quân - 10 Thần Long)**: **14.000 HP**
     - **Top 2 (Á Quân - 1 Thần Long)**: **8.500 HP**
     - **Top 3 (Quý Quân - Mưa Kiếm)**: **5.200 HP**
     - **Top 4 (Đại Cao Thủ - Cự Kiếm)**: **3.200 HP**
     - **Top 5 (Tiên Phong - Kiếm Vàng)**: **1.600 HP**
     - **Tổng cộng cả 5 người**: $14.000 + 8.500 + 5.200 + 3.200 + 1.600 = \\mathbf{32.500}$ **HP** (Đúng chuẩn mất **1.3 / 4 cọc máu**).
  5. **Kết quả trận đấu**:
     - Sau khi Top 5 khai trận xong, Boss tụt từ 100.000 HP xuống còn đúng **67.500 HP** (cọc 1 vỡ, cọc 2 mất 30%).
     - Boss còn lại nguyên vẹn **2.7 cọc máu** để toàn bộ người xem trong phòng live cùng nhau hợp sức chiến đấu, kéo dài sự kịch tính cho buổi livestream.
`;

fs.writeFileSync(historyPath, history + entry, 'utf8');
console.log('Appended section 29 to CHAT_HISTORY.md');
