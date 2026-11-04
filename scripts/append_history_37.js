const fs = require('fs');
const path = require('path');

const chatHistoryPath = path.join(__dirname, '..', 'CHAT_HISTORY.md');
let content = fs.readFileSync(chatHistoryPath, 'utf8');

// Update TOC
const targetToc = `36. [Khung Báo Sát Thương Trảm Kích Động (Live Combat Damage Reporter Frame)](#36-khung-báo-sát-thương-trảm-kích-động-live-combat-damage-reporter-frame)`;
const replaceToc = `36. [Khung Báo Sát Thương Trảm Kích Động (Live Combat Damage Reporter Frame)](#36-khung-báo-sát-thương-trảm-kích-động-live-combat-damage-reporter-frame)
37. [Cơ Chế Định Danh Người Chơi & Hỗ Trợ Quà Tặng Từ 1 Xu (Hoa Hồng)](#37-cơ-chế-định-danh-người-chơi--hỗ-trợ-quà-tặng-từ-1-xu-hoa-hồng)`;

if (content.includes(targetToc)) {
  content = content.replace(targetToc, replaceToc);
}

const section37Entry = [
  "",
  "---",
  "",
  "## 37. Cơ Chế Định Danh Người Chơi & Hỗ Trợ Quà Tặng Từ 1 Xu (Hoa Hồng)",
  "- **Yêu cầu từ người dùng**:",
  '  > *"và t thấy làm sao để xác định được đúng nhân vật người chơi ví dụ tiktok 1 người chơi tặng 1 xu thì nhân vật tên đó phải lên tung chiêu thức đúng theo số xu đó tặng"*',
  "- **Cơ chế định danh chính xác 100%**:",
  "  1. **Định danh bằng `uniqueId` (Username TikTok)**:",
  "     - Khi khán giả tặng quà, cầu nối trích xuất chính xác ID TikTok của người đó (`data.uniqueId`).",
  "     - Game lưu trữ mỗi người chơi thành một thực thể 3D độc lập trong `this.actors` theo khóa `username`.",
  "     - Mỗi nhân vật đều có bảng tên HTML riêng trên đầu: `[@username]`.",
  "  2. **Camera theo sát đúng người tặng quà**:",
  "     - Khi người chơi tặng quà, camera điện ảnh tự động lia góc máy zoom cận cảnh vào đúng nhân vật mang bảng tên `[@username]` của người đó.",
  "     - Đúng nhân vật đó bay vút lên trời, mọc cánh và xuất chiêu theo cấp độ quà tặng.",
  "     - Khung Báo Sát Thương góc trái hiện rõ: `👤 @username` kèm chiêu thức và số dame.",
  "  3. **Hỗ trợ toàn diện quà tặng từ 1 Xu (Hoa Hồng)**:",
  "     - Mở rộng sàn kích hoạt Tuyệt Kỹ: Bất kỳ quà tặng nào từ **1 Xu trở lên** (1 bông hoa hồng, trái tim, v.v.) đều kích hoạt ngay chiêu thức **Kiếm Vàng** xé gió chém Boss!",
  "     - Cập nhật đồng bộ trong `tiktok_bridge.js`, `server.js` và toàn bộ giao diện bảng điều khiển.",
  ""
].join("\n");

content += section37Entry;
fs.writeFileSync(chatHistoryPath, content, 'utf8');
console.log('Successfully appended Section 37 to CHAT_HISTORY.md');
