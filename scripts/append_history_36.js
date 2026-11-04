const fs = require('fs');
const path = require('path');

const chatHistoryPath = path.join(__dirname, '..', 'CHAT_HISTORY.md');
let content = fs.readFileSync(chatHistoryPath, 'utf8');

// Update TOC
const targetToc = `35. [Gỡ Bỏ Hoàn Toàn Khung Hiển Thị Năng Lượng Đội & Thông Báo Quà Tặng (Bottom HUD)](#35-gỡ-bỏ-hoàn-toàn-khung-hiển-thị-năng-lượng-đội--thông-báo-quà-tặng-bottom-hud)`;
const replaceToc = `35. [Gỡ Bỏ Hoàn Toàn Khung Hiển Thị Năng Lượng Đội & Thông Báo Quà Tặng (Bottom HUD)](#35-gỡ-bỏ-hoàn-toàn-khung-hiển-thị-năng-lượng-đội--thông-báo-quà-tặng-bottom-hud)
36. [Khung Báo Sát Thương Trảm Kích Động (Live Combat Damage Reporter Frame)](#36-khung-báo-sát-thương-trảm-kích-động-live-combat-damage-reporter-frame)`;

if (content.includes(targetToc)) {
  content = content.replace(targetToc, replaceToc);
}

const section36Entry = [
  "",
  "---",
  "",
  "## 36. Khung Báo Sát Thương Trảm Kích Động (Live Combat Damage Reporter Frame)",
  "- **Yêu cầu từ người dùng**:",
  '  > *"làm 1 cái khung ở đây khi người chơi tấn công boss sẽ hiển thị số điểm sát thương gây ra boss sẽ báo ở đây khi mỗi lần tấn công hãy làm nó thật sinh động lên"* (kèm ảnh vẽ khung xanh góc bên trái, ngay dưới cụm 3 chỉ số đang sống/loại/năng lượng).',
  "- **Thiết kế & Bố cục chuẩn xác**:",
  "  1. **Vị trí phong cách Tiên Hiệp Ma Giới**:",
  "     - Đặt tại tọa độ `left: 22px`, `top: 170px`, `width: 200px` (ngay dưới 3 nút trạng thái bên trái, đối xứng và cân bằng với Bảng TOP Tu Sĩ bên phải).",
  "     - Nền kính mờ chuyển màu xianxia huyền ảo `linear-gradient(135deg, rgba(28, 16, 46, 0.94), rgba(15, 9, 26, 0.96))`.",
  "     - Viền neon phát quang ma mị chuyển màu từ đỏ hồng `#f43f5e` sang vàng kim `#fbbf24` theo nhịp thở (`combat-frame-glow`).",
  "  2. **Hiệu ứng sát thương cực kỳ sinh động (Impact Damage Punch)**:",
  "     - **Tên Người Tấn Công**: `👤 @username` màu vàng kim sắc nét.",
  "     - **Tag Tuyệt Kỹ Động**: Tự động nhận diện đòn đánh: `⚔️ Trảm Kích Kiếm Khí`, `✨ Kiếm Vàng (5 Xu)`, `🗡️ Cự Kiếm (20 Xu)`, `🌧️ Mưa Kiếm (45 Xu)`, `🐉 Kim Long (80 Xu)`, `🔥 Thập Long (150 Xu)`.",
  "     - **Con số sát thương nảy số cực mạnh (Punch Scale)**:",
  "       - Số to sắc nét: `− 14,000 DMG` (hoặc `− 22,500 CRIT!`).",
  "       - Mỗi lần ra đòn, hiệu ứng `@keyframes dmg-punch` giật nảy `1.22 -> 0.96 -> 1.0` với ánh sáng bừng lên chói lọi.",
  "       - Khi sát thương lớn >= 5.000 DMG: Tự động đổi sang chế độ `CRIT!` đỏ rực với quầng lửa phát quang.",
  "     - **Huy hiệu Combo**: `🔥 x[combo]` màu cam đỏ viền vàng nhấp nháy liên tục theo từng nhịp trảm.",
  "     - **Thanh đo cường độ sát thương (Mini Damage Bar)**: Co giãn theo mức độ mạnh yếu của đòn đánh.",
  "     - **Trạng thái ban đầu**: Khi chưa ai đánh hiển thị `⚡ Đang chờ xuất chiêu đánh Boss…` nhấp nháy tinh tế.",
  ""
].join("\n");

content += section36Entry;
fs.writeFileSync(chatHistoryPath, content, 'utf8');
console.log('Successfully appended Section 36 to CHAT_HISTORY.md');
