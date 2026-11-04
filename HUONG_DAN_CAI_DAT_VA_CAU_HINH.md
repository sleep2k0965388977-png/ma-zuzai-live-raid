# 🛠️ HƯỚNG DẪN CÀI ĐẶT & CẤU HÌNH CHI TIẾT - MA ZUZAI 3D TIKTOK LIVE RAID

Tài liệu này hướng dẫn chi tiết từ A - Z cách cài đặt, cấu hình tài khoản TikTok, và tùy chỉnh các thông số trong game để bạn có thể phát trực tiếp (Live Stream) mượt mà nhất.

---

## 📌 PHẦN 1: YÊU CẦU HỆ THỐNG & CÀI ĐẶT MÔI TRƯỜNG

### 1. Yêu cầu máy tính:
- **Hệ điều hành**: Windows 10 / 11 (hoặc macOS / Linux).
- **Node.js**: Phiên bản 18 trở lên (Khuyên dùng bản LTS từ [https://nodejs.org/](https://nodejs.org/)).  
  *(Máy tính hiện tại của bạn đã cài sẵn Node.js v25).*
- **Trình duyệt**: Google Chrome, Cốc Cốc, Microsoft Edge (bật tăng tốc phần cứng WebGL).

### 2. Cài đặt thư viện dự án:
Mở cửa sổ dòng lệnh (PowerShell hoặc CMD) tại thư mục dự án và chạy:
```bash
npm install
```
> **Mẹo nhanh**: Bạn chỉ cần nhấp đúp vào tệp `START_GAME_LIVE.bat`, tệp sẽ **tự động kiểm tra và tự cài đặt thư viện** mà bạn không cần gõ lệnh thủ công.

---

## 🚀 PHẦN 2: CÁCH KHỞI CHẠY 1 CLICK

Trong thư mục `D:\1 lut\1`:
1. Nhấp đúp chuột vào file: **`START_GAME_LIVE.bat`**.
2. Hệ thống sẽ tự động thực hiện:
   - Khởi động Web Server Game 3D: `http://localhost:3000`.
   - Khởi động Cầu nối TikTok LIVE Bridge: `ws://localhost:8081`.
   - Tự động mở trình duyệt Chrome hiển thị màn hình đấu trường 3D.
3. **Lưu ý**: Cửa sổ terminal màu đen mở ra đang chạy ngầm dịch vụ, **không được tắt** trong suốt buổi live stream.

---

## 🔗 PHẦN 3: CÁCH CẤU HÌNH KẾT NỐI VÀO PHÒNG LIVE TIKTOK

### Bước 1: Mở phát trực tiếp trên TikTok
- Mở ứng dụng TikTok trên điện thoại hoặc **TikTok LIVE Studio** trên máy tính.
- Bấm **Bắt đầu phát trực tiếp**.
- **QUAN TRỌNG**: Phòng live **phải đang phát trực tiếp (Online)** thì máy chủ mới bắt được luồng dữ liệu Webcast từ TikTok.

### Bước 2: Nhập Username và Bấm Kết Nối trên Web Game
1. Nhìn sang bảng điều khiển bên phải màn hình Game (mục **SỰ KIỆN NGƯỜI XEM**):
2. Tại ô **Tên người xem**: Nhập chính xác Username ID kênh TikTok của bạn (ví dụ kênh là `@linh.nhi` thì nhập `linh.nhi`, không cần gõ dấu `@`).
3. Nhấp vào nút màu tím nổi bật: **`[ 🔗 Kết Nối Phòng LIVE @Tên người xem ]`**.
4. Chờ 2 - 3 giây, góc thông báo chuyển sang màu xanh:  
   `🟢 Đang kết nối trực tiếp phòng LIVE @linh.nhi` $\rightarrow$ Đã kết nối thành công!

---

## ⚙️ PHẦN 4: CẤU HÌNH TÙY CHỈNH THÔNG SỐ (ADVANCED)

Toàn bộ các thông số của hệ thống đều có thể tùy chỉnh dễ dàng:

### 1. Tùy chỉnh mức Xu để kích hoạt Tuyệt Kỹ:
Mở tệp `tiktok_bridge.js` (hoặc `server.js`), tìm đến đoạn dòng `164 - 170`:
```javascript
const diamonds = (data.diamondCount || 1) * (data.repeatCount || 1);
let skill = 'small';

if (diamonds >= 150) skill = 'ten_dragons';   // ≥ 150 Xu: Mọc cánh Thần Thoại & 10 Thần Long
else if (diamonds >= 80) skill = 'single_dragon'; // ≥ 80 Xu: Mọc cánh Kim Quang & 1 Rồng Vàng
else if (diamonds >= 45) skill = 'sword_rain';    // ≥ 45 Xu: Mưa kiếm 22 thanh
else if (diamonds >= 20) skill = 'giant_sword';   // ≥ 20 Xu: Cự kiếm 9m cắm xuống đất
else if (diamonds >= 5) skill = 'small';          // ≥ 5 Xu: Kiếm vàng xé gió
```
*Bạn có thể đổi số `150`, `80`, `45`, `20`, `5` thành bất kỳ mốc Xu nào bạn muốn khán giả donate.*

### 2. Tùy chỉnh Cổng kết nối (Ports):
Mặc định:
- Cổng Game Web: `3000` (`http://localhost:3000`)
- Cổng Cầu nối WebSocket: `8081` (`ws://localhost:8081`)  
*Nếu muốn đổi cổng, bạn chỉ cần sửa biến `PORT` và `WS_PORT` trong tệp `server.js`.*

---

## 🧪 PHẦN 5: KIỂM TRA THỬ NGHIỆM TRƯỚC KHI LÊN SÓNG LIVE

Để yên tâm 100% trước khi live thật, bạn có thể kiểm tra nhanh bằng 2 cách:

1. **Bấm nút [ ⚡ Test ]**:
   - Ngay cạnh nút Kết nối màu tím có nút `[ ⚡ Test ]`. Bấm vào để kiểm tra đường truyền WebSocket giữa Web Game và Server.
2. **Thử nghiệm các nút mô phỏng đòn đánh**:
   - Bấm `Bình luận tấn công` $\rightarrow$ Nhân vật bay lên chém Boss, Khung Báo Sát Thương bên trái hiện tên và số dame.
   - Bấm `5 Xu`, `20 Xu`, `45 Xu`, `80 Xu`, `150 Xu` $\rightarrow$ Kiểm tra các tuyệt chiêu Cự Kiếm, Mưa Kiếm và Thần Long rực lửa.
3. **Thử nghiệm mốc hồi máu 50%**:
   - Đánh Boss tụt xuống chấm vàng cuối cùng ($\le 25\%$), kiểm tra Boss tự hồi phục máu lên đúng ô vàng ở giữa ($50\%$) và đổi sang Giai đoạn 02.

---
*Tài liệu này được biên soạn cho dự án MA ZUZAI 3D LIVE RAID.*
