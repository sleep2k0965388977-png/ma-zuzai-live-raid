const fs = require('fs');
const path = require('path');

// 1. Update CHAT_HISTORY.md
const chatHistoryPath = path.join(__dirname, '..', 'CHAT_HISTORY.md');
let content = fs.readFileSync(chatHistoryPath, 'utf8');

const targetToc = `37. [Cơ Chế Định Danh Người Chơi & Hỗ Trợ Quà Tặng Từ 1 Xu (Hoa Hồng)](#37-cơ-chế-định-danh-người-chơi--hỗ-trợ-quà-tặng-từ-1-xu-hoa-hồng)`;
const replaceToc = `37. [Cơ Chế Định Danh Người Chơi & Hỗ Trợ Quà Tặng Từ 1 Xu (Hoa Hồng)](#37-cơ-chế-định-danh-người-chơi--hỗ-trợ-quà-tặng-từ-1-xu-hoa-hồng)
38. [Bảng Phân Loại Quà Tặng Toàn Diện & Tự Động Khởi Chạy 1-Click](#38-bảng-phân-loại-quà-tặng-toàn-diện--tự-động-khởi-chạy-1-click)`;

if (content.includes(targetToc)) {
  content = content.replace(targetToc, replaceToc);
}

const section38Entry = [
  "",
  "---",
  "",
  "## 38. Bảng Phân Loại Quà Tặng Toàn Diện & Tự Động Khởi Chạy 1-Click",
  "- **Yêu cầu từ người dùng**:",
  '  > *"bạn hãy xem tất cả quà tích tiktok bạn hãy phân loại như này rồi đúng ko"* và *"oke giờ đã có tất cả rồi hãy commit lưu lại đoạn hội thoại chát này lên git và tất cả những gì đã thay đổi"*',
  "- **Tổng kết toàn bộ 5 Cấp Độ Quà Tặng TikTok**:",
  "  | Cấp Độ | Dải Xu Thực Tế | Ví Dụ Quà Tặng Trên TikTok | Chiêu Thức Nhân Vật Tung Ra |",
  "  | :---: | :---: | :--- | :--- |",
  "  | **Cấp 1** | **1 – 19 Xu** | Hoa hồng (1 Xu), Nốt nhạc, Trái tim, Bánh Donut (10 Xu), Trà sữa (9 Xu)... | Đánh ra **1 Lưỡi Kiếm Vàng** ánh kim bay xé gió chém Boss |",
  "  | **Cấp 2** | **20 – 44 Xu** | Nước hoa (20 Xu), Nón lưỡi trai (25 Xu), Bánh kem (30 Xu), Kính mát mini... | Triệu hồi **1 Thanh Cự Kiếm 9m** cắm từ trời cao xuống đầu Boss gây nổ |",
  "  | **Cấp 3** | **45 – 79 Xu** | Bắn pháo hoa mini (49 Xu), Hộp quà bí mật, Cánh thiên thần (70 Xu)... | Khai mở **Pháp Trận Mưa Kiếm 22 thanh** liên hoàn oanh tạc dồn dập |",
  "  | **Cấp 4** | **80 – 149 Xu** | Kính râm sành điệu (99 Xu), Vương miện nhỏ (99 Xu), Trái tim khổng lồ (100 Xu)... | Mọc Cánh Kim Quang & Triệu hồi **1 Thần Long Vàng** lượn vòng cung bổ nhào |",
  "  | **Cấp 5** | **≥ 150 Xu** | Pháo hoa lớn (1088 Xu), Du thuyền (7499 Xu), Cá voi bay, Sư tử, Vũ trụ TikTok... | Mọc Cánh Thần Thoại & Triệu hồi **ĐÀN 10 CON THẦN LONG** vây hãm đại nổ liên hoàn! |",
  "- **Tính năng cộng dồn Combo (Repeat Gift)**:",
  "  - Hệ thống tự động nhân `diamonds = diamondCount * repeatCount`.",
  "  - Người xem gửi combo nhiều quà nhỏ liên tiếp (ví dụ 50 bông hoa hồng 1 xu = 50 Xu) sẽ tự động được nâng cấp lên tuyệt chiêu Cấp 3 (Mưa kiếm) ngay lập tức!",
  "- **Nâng cấp Launcher & Cẩm nang hướng dẫn**:",
  "  - Cập nhật `START_GAME_LIVE.bat`: Tự động kiểm tra Node.js, tự chạy `npm install` nếu thiếu và mở máy chủ Web + TikTok Bridge chỉ với 1 click.",
  "  - Biên soạn hoàn chỉnh tệp tài liệu `HUONG_DAN_CAI_DAT_VA_CAU_HINH.md` hướng dẫn từ A - Z.",
  ""
].join("\n");

content += section38Entry;
fs.writeFileSync(chatHistoryPath, content, 'utf8');
console.log('[✓] Appended Section 38 to CHAT_HISTORY.md');

// 2. Update README.md
const readmePath = path.join(__dirname, '..', 'README.md');
const readmeContent = `# ⚔️ MA ZUZAI - LIVE RAID BOSS 3D (TIÊN HIỆP ĐẤU TRƯỜNG TIKTOK LIVE)

Đấu trường Live Raid Boss 3D tương tác thời gian thực dành cho buổi phát sóng trực tiếp (TikTok LIVE, Facebook Gaming, YouTube LIVE), lấy bối cảnh **Hắc Ám Tiên Hiệp**.

---

## 🌟 TÀI LIỆU HƯỚNG DẪN & LỊCH SỬ DỰ ÁN
- 👉 **[HUONG_DAN_CAI_DAT_VA_CAU_HINH.md](./HUONG_DAN_CAI_DAT_VA_CAU_HINH.md)**: Hướng dẫn cài đặt, cấu hình tài khoản TikTok LIVE và chạy 1-Click chi tiết từ A - Z.
- 👉 **[CHAT_HISTORY.md](./CHAT_HISTORY.md)**: Toàn bộ 38 chương mục lịch sử trao đổi, chi tiết kỹ thuật và danh sách tính năng đã thực hiện.

---

## 🚀 TÍNH NĂNG NỔI BẬT

- **Khởi Chạy 1-Click Cực Dễ**:
  - Nhấp đúp vào **\`START_GAME_LIVE.bat\`** để tự động chạy cả Web Game 3D (\`http://localhost:3000\`) và Cầu Nối TikTok LIVE (\`ws://localhost:8081\`).
- **Đồ họa WebGL 3D (Three.js)**:
  - Boss **Ma Zuzai** - Mô hình 3D Meshy AI với pháp trận đáy sàn 1024x1024, quầng nhật thực tím hồng, 4 dây xích nối 4 cột đền cổ kính.
  - Quân đoàn tu sĩ đồng minh Instanced GPU Vertex Shader, hỗ trợ bắn phi kiếm tự do 0 sát thương.
  - Camera điện ảnh toàn cảnh (40m) bao quát đấu trường, tự động zoom cận cảnh theo sát dũng sĩ khi tung chiêu.
- **Khung Báo Sát Thương Trảm Kích Động (Live Combat Damage Reporter)**:
  - Nằm góc bên trái ngay dưới cụm thông số người chơi.
  - Tự động hiển thị tên Đạo Hữu (\`@username\`), tag chiêu thức, số sát thương nảy giật nảy to (\`dmg-punch\`), hiệu ứng CRIT! bùng nổ và huy hiệu Combo nhấp nháy.
- **Cơ Chế Hồi Máu Chuẩn Xác (Trận 1 Tiếng Chỉ Hồi 1 Lần)**:
  - Khi Boss bị đánh tụt xuống chấm vàng cuối cùng (mốc 25% HP), Boss kích hoạt nội tại tự động hồi máu chạm đúng ô vàng ở giữa (50% HP) - **kích hoạt duy nhất đúng 1 lần trong suốt trận đấu**.
  - Sau khi đã hồi máu 50%, người chơi đánh tụt máu về 0 HP để giành chiến thắng.
- **Hệ Thống 5 Cấp Độ Quà Tặng TikTok (Từ 1 Xu)**:
  - **1 – 19 Xu**: Đánh ra **1 Lưỡi Kiếm Vàng** ánh kim bay xé gió chém Boss.
  - **20 – 44 Xu**: Triệu hồi **1 Thanh Cự Kiếm 9m** cắm từ trời cao xuống đầu Boss gây nổ.
  - **45 – 79 Xu**: Khai mở **Pháp Trận Mưa Kiếm 22 thanh** liên hoàn oanh tạc dồn dập.
  - **80 – 149 Xu**: Mọc Cánh Kim Quang & Triệu hồi **1 Thần Long Vàng** lượn vòng cung bổ nhào.
  - **≥ 150 Xu**: Mọc Cánh Thần Thoại & Triệu hồi **ĐÀN 10 CON THẦN LONG** vây hãm đại nổ liên hoàn chấn thiên động địa!
- **Tương Tác TikTok LIVE Thời Gian Thực**:
  - Tự động kết nối Webcast TikTok: Bình luận, Thả tim, Tặng quà, Vào phòng, Chia sẻ và Theo dõi.
  - Người xem vào phòng live tự động xuất hiện nhân vật 3D trên sàn đấu mang nhãn tên của chính người đó.
`;

fs.writeFileSync(readmePath, readmeContent, 'utf8');
console.log('[✓] Updated README.md');
