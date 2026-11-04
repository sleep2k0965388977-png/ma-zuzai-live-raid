const fs = require('fs');
const path = require('path');

const chatHistoryPath = path.join(__dirname, '..', 'CHAT_HISTORY.md');
let content = fs.readFileSync(chatHistoryPath, 'utf8');

// Update TOC
const targetToc = `38. [Bảng Phân Loại Quà Tặng Toàn Diện & Tự Động Khởi Chạy 1-Click](#38-bảng-phân-loại-quà-tặng-toàn-diện--tự-động-khởi-chạy-1-click)`;
const replaceToc = `38. [Bảng Phân Loại Quà Tặng Toàn Diện & Tự Động Khởi Chạy 1-Click](#38-bảng-phân-loại-quà-tặng-toàn-diện--tự-động-khởi-chạy-1-click)
39. [Tối Ưu Hóa Khu Vực Xuất Hiện Người Chơi (Spawn Zone) Chuẩn Khung Vẽ](#39-tối-ưu-hóa-khu-vực-xuất-hiện-người-chơi-spawn-zone-chuẩn-khung-vẽ)`;

if (content.includes(targetToc)) {
  content = content.replace(targetToc, replaceToc);
}

const section39Entry = [
  "",
  "---",
  "",
  "## 39. Tối Ưu Hóa Khu Vực Xuất Hiện Người Chơi (Spawn Zone) Chuẩn Khung Vẽ",
  "- **Yêu cầu từ người dùng**:",
  '  > *"hãy chỉnh cho nhân vật người chơi xuất hiện trong khung t vẽ này"* (kèm ảnh khoanh vùng màu xanh lá cây rộng lớn phía trước bục đá của Boss trải dài khắp sàn đấu ma trận).',
  "- **Phân tích vấn đề & Giải pháp đã thực hiện**:",
  "  1. *Vấn đề trước đây*: Bán kính spawn tối thiểu `minR = 3.6m` quá nhỏ so với bán kính bục đá của Boss (4.75m), khiến các nhân vật bị dồn sát chân bục đá, các bảng tên VIP dính chùm che khuất thân Boss Ma Zuzai, trong khi toàn bộ sàn đấu phía trước lại bị bỏ trống.",
  "  2. *Thiết lập vùng xuất hiện mới chuẩn xác 100% theo khung vẽ*:",
  "     - **Bán kính phân bổ**: Mở rộng từ `minR = 7.5m` đến `maxR = 21.0m`.",
  "     - **Phía trên**: Bắt đầu từ mép ngoài bục đá trở ra, bảng tên của các tướng tiền tuyến nằm hoàn toàn phía dưới chân Boss, không còn che khuất ngực, mạng che mặt hay dây xích của Boss.",
  "     - **Phía dưới**: Trải dài xuống các vòng hào quang ngoài cùng của sàn đấu ma giới (`Z: 2.5m - 20.0m`).",
  "     - **Bề ngang**: Xòe rộng theo hình nan quạt góc 124 độ (`X: -16.9m đến +16.9m`), dàn trận đều đặn khắp sàn đấu.",
  "     - **Khoảng cách chống chồng đè**: Nâng khoảng cách tối thiểu giữa 2 người chơi lên `1.36m` (`minDistSq = 1.85`), giúp các nhân vật và bảng tên không còn bị đứng đè lên nhau.",
  "     - **Tự động hướng tâm**: Toàn bộ nhân vật trong khung xanh đều tự động quay mặt hướng chính diện về phía Boss Ma Zuzai.",
  ""
].join("\n");

content += section39Entry;
fs.writeFileSync(chatHistoryPath, content, 'utf8');
console.log('Successfully appended Section 39 to CHAT_HISTORY.md');
