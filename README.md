# ⚔️ MA ZUZAI - LIVE RAID BOSS 3D (TIÊN HIỆP ĐẤU TRƯỜNG TIKTOK LIVE)

Đấu trường Live Raid Boss 3D tương tác thời gian thực dành cho buổi phát sóng trực tiếp (TikTok LIVE, Facebook Gaming, YouTube LIVE), lấy bối cảnh **Hắc Ám Tiên Hiệp**.

---

## 🌟 TÀI LIỆU HƯỚNG DẪN & LỊCH SỬ DỰ ÁN
- 👉 **[HUONG_DAN_CAI_DAT_VA_CAU_HINH.md](./HUONG_DAN_CAI_DAT_VA_CAU_HINH.md)**: Hướng dẫn cài đặt, cấu hình tài khoản TikTok LIVE và chạy 1-Click chi tiết từ A - Z.
- 👉 **[CHAT_HISTORY.md](./CHAT_HISTORY.md)**: Toàn bộ 38 chương mục lịch sử trao đổi, chi tiết kỹ thuật và danh sách tính năng đã thực hiện.

---

## 🚀 TÍNH NĂNG NỔI BẬT

- **Khởi Chạy 1-Click Cực Dễ**:
  - Nhấp đúp vào **`START_GAME_LIVE.bat`** để tự động chạy cả Web Game 3D (`http://localhost:3000`) và Cầu Nối TikTok LIVE (`ws://localhost:8081`).
- **Đồ họa WebGL 3D (Three.js)**:
  - Boss **Ma Zuzai** - Mô hình 3D Meshy AI với pháp trận đáy sàn 1024x1024, quầng nhật thực tím hồng, 4 dây xích nối 4 cột đền cổ kính.
  - Quân đoàn tu sĩ đồng minh Instanced GPU Vertex Shader, hỗ trợ bắn phi kiếm tự do 0 sát thương.
  - Camera điện ảnh toàn cảnh (40m) bao quát đấu trường, tự động zoom cận cảnh theo sát dũng sĩ khi tung chiêu.
- **Khung Báo Sát Thương Trảm Kích Động (Live Combat Damage Reporter)**:
  - Nằm góc bên trái ngay dưới cụm thông số người chơi.
  - Tự động hiển thị tên Đạo Hữu (`@username`), tag chiêu thức, số sát thương nảy giật nảy to (`dmg-punch`), hiệu ứng CRIT! bùng nổ và huy hiệu Combo nhấp nháy.
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
