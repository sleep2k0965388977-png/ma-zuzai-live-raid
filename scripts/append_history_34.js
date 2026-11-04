const fs = require('fs');
const path = require('path');

const chatHistoryPath = path.join(__dirname, '..', 'CHAT_HISTORY.md');
let content = fs.readFileSync(chatHistoryPath, 'utf8');

// Update TOC
const targetToc = `33. [Chuẩn Hóa Logic: Tự Hồi Máu Lên Ô Vàng Ở Giữa (50%) & Chỉ Hồi Đúng 1 Lần Trong 1 Tiếng](#33-chuẩn-hóa-logic-tự-hồi-máu-lên-ô-vàng-ở-giữa-50--chỉ-hồi-đúng-1-lần-trong-1-tiếng)`;
const replaceToc = `33. [Chuẩn Hóa Logic: Tự Hồi Máu Lên Ô Vàng Ở Giữa (50%) & Chỉ Hồi Đúng 1 Lần Trong 1 Tiếng](#33-chuẩn-hóa-logic-tự-hồi-máu-lên-ô-vàng-ở-giữa-50--chỉ-hồi-đúng-1-lần-trong-1-tiếng)
34. [Khôi Phục Góc Quay Toàn Cảnh Mặc Định (40m) & Gỡ Bỏ Quy Tắc Dưới 100 Người](#34-khôi-phục-góc-quay-toàn-cảnh-mặc-định-40m--gỡ-bỏ-quy-tắc-dưới-100-người)`;

if (content.includes(targetToc)) {
  content = content.replace(targetToc, replaceToc);
}

const section34Entry = [
  "",
  "---",
  "",
  "## 34. Khôi Phục Góc Quay Toàn Cảnh Mặc Định (40m) & Gỡ Bỏ Quy Tắc Dưới 100 Người",
  "- **Yêu cầu từ người dùng**:",
  '  > *"bỏ cái quy luật dưới 100 người đi để mặc định giống như trước cho t kiểu toàn cảnh ý"*',
  "- **Nội dung điều chỉnh chuẩn xác**:",
  "  1. **Gỡ bỏ quy tắc thích ứng dưới 100 người**:",
  "     - Loại bỏ hoàn toàn phương thức tự động thu hẹp góc máy `18m` khi số người tham gia <= 100.",
  "  2. **Khôi phục góc quay toàn cảnh mặc định nguyên bản**:",
  "     - Góc quay chính diện mặc định trở về toàn cảnh bao quát hùng tráng (`z = 40.0m`, `y = 14.5m`, `lookAt: (0, 6.0, -1.8)`).",
  "     - Bao quát trọn vẹn toàn bộ đấu trường ma giới, 4 cột đền cổ kính, quầng sáng của Boss và toàn bộ các hàng ghế của quân đoàn tu sĩ.",
  "  3. **Khôi phục cơ chế tự động trả về toàn cảnh sau chiêu thức**:",
  "     - Sau khi người chơi thực hiện xong đòn chém hoặc tuyệt kỹ bay lượn cận cảnh, camera tự động lướt lùi về góc toàn cảnh `Chính diện` (40m).",
  "  4. **Cập nhật giao diện thanh điều khiển góc quay**:",
  "     - Nhãn trạng thái: `Mặc định: Toàn cảnh (40m)` màu xanh lục bảo nổi bật.",
  "     - Các nút zoom góc quay chuẩn: `[ 🌐 Toàn Cảnh (40m) ]`, `[ 🛡️ Toàn Đội (18m) ]`, `[ ⚔️ Cận Cảnh (11m) ]`, `[ 🔍 Siêu Sát (8m) ]`.",
  ""
].join("\n");

content += section34Entry;
fs.writeFileSync(chatHistoryPath, content, 'utf8');
console.log('Successfully appended Section 34 to CHAT_HISTORY.md');
