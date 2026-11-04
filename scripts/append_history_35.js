const fs = require('fs');
const path = require('path');

const chatHistoryPath = path.join(__dirname, '..', 'CHAT_HISTORY.md');
let content = fs.readFileSync(chatHistoryPath, 'utf8');

// Update TOC
const targetToc = `34. [Khôi Phục Góc Quay Toàn Cảnh Mặc Định (40m) & Gỡ Bỏ Quy Tắc Dưới 100 Người](#34-khôi-phục-góc-quay-toàn-cảnh-mặc-định-40m--gỡ-bỏ-quy-tắc-dưới-100-người)`;
const replaceToc = `34. [Khôi Phục Góc Quay Toàn Cảnh Mặc Định (40m) & Gỡ Bỏ Quy Tắc Dưới 100 Người](#34-khôi-phục-góc-quay-toàn-cảnh-mặc-định-40m--gỡ-bỏ-quy-tắc-dưới-100-người)
35. [Gỡ Bỏ Hoàn Toàn Khung Hiển Thị Năng Lượng Đội & Thông Báo Quà Tặng (Bottom HUD)](#35-gỡ-bỏ-hoàn-toàn-khung-hiển-thị-năng-lượng-đội--thông-báo-quà-tặng-bottom-hud)`;

if (content.includes(targetToc)) {
  content = content.replace(targetToc, replaceToc);
}

const section35Entry = [
  "",
  "---",
  "",
  "## 35. Gỡ Bỏ Hoàn Toàn Khung Hiển Thị Năng Lượng Đội & Thông Báo Quà Tặng (Bottom HUD)",
  "- **Yêu cầu từ người dùng**:",
  '  > *"bỏ cái hiển thị này đi"* (đính kèm hình ảnh crop khu vực thanh `NĂNG LƯỢNG ĐỘI 35 / 100` và khung `🎁 Đang chờ quà tặng đầu tiên...`)',
  "- **Phân tích lý do & tối ưu hóa không gian Live Stream**:",
  "  - Cụm hiển thị dưới đáy màn hình (`bottom-hud`) gồm: thanh Năng Lượng Đội (`energy-info`, `energy-bar`) và hộp thông báo quà tặng mới nhất (`latest-hud`).",
  "  - Trên nền tảng TikTok LIVE di động (khung dọc 1080x1920), khu vực đáy màn hình luôn bị che khuất bởi giao diện khung chat bình luận, quà tặng và ô nhập phím của ứng dụng TikTok.",
  "  - Việc loại bỏ hoàn toàn cụm này giúp giải phóng tầm nhìn thông thoáng cho đấu trường 3D và toàn bộ đội hình tu sĩ phía sau.",
  "- **Nội dung điều chỉnh chuẩn xác**:",
  "  1. Gỡ bỏ hoàn toàn phần tử `bottom-hud` khỏi React Component DOM trong cả `assets/index-CT5dfJfs.js` và `public/assets/index-CT5dfJfs.js`.",
  "  2. Thêm quy tắc CSS `.bottom-hud { display: none !important; }` trong `assets/index-Cne2fmcZ.css` bảo đảm không còn xuất hiện.",
  "  3. Cập nhật cache bust timestamp trong `index.html` cho cả CSS và JavaScript.",
  ""
].join("\n");

content += section35Entry;
fs.writeFileSync(chatHistoryPath, content, 'utf8');
console.log('Successfully appended Section 35 to CHAT_HISTORY.md');
