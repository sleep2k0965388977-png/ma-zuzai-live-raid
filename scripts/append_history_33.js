const fs = require('fs');
const path = require('path');

const chatHistoryPath = path.join(__dirname, '..', 'CHAT_HISTORY.md');
let content = fs.readFileSync(chatHistoryPath, 'utf8');

// Update TOC
const targetToc = `32. [Khắc Phục Triệt Để Lỗi "Lúc Thấy Nhân Vật Lúc Không" Khi Bay Lên Tung Chiêu](#32-khắc-phục-triệt-để-lỗi-lúc-thấy-nhân-vật-lúc-không-khi-bay-lên-tung-chiêu)`;
const replaceToc = `32. [Khắc Phục Triệt Để Lỗi "Lúc Thấy Nhân Vật Lúc Không" Khi Bay Lên Tung Chiêu](#32-khắc-phục-triệt-để-lỗi-lúc-thấy-nhân-vật-lúc-không-khi-bay-lên-tung-chiêu)
33. [Chuẩn Hóa Logic: Tự Hồi Máu Lên Ô Vàng Ở Giữa (50%) & Chỉ Hồi Đúng 1 Lần Trong 1 Tiếng](#33-chuẩn-hóa-logic-tự-hồi-máu-lên-ô-vàng-ở-giữa-50--chỉ-hồi-đúng-1-lần-trong-1-tiếng)`;

if (content.includes(targetToc)) {
  content = content.replace(targetToc, replaceToc);
}

const section33Entry = [
  "",
  "---",
  "",
  "## 33. Chuẩn Hóa Logic: Tự Hồi Máu Lên Ô Vàng Ở Giữa (50%) & Chỉ Hồi Đúng 1 Lần Trong 1 Tiếng",
  "- **Yêu cầu từ người dùng**:",
  '  > *"khi người chơi đánh boss xuống còn 1 chấm vàng cuối cùng như t khoanh đỏ kia boss tự hồi máu cho bản thân chạm đến ô vàng ở giữa như t vẽ khung xanh kia hãy chỉnh lại cho chuẩn và một trận đấu 1 tiếng boss chỉ hồi máu đúng 1 lần"*',
  "- **Phân tích so sánh Logic cũ vs Logic mới chuẩn hóa**:",
  "  1. *Logic cũ (Section 21)*: Khi máu tụt xuống <= 25% (chấm vàng cuối cùng), Boss tự hồi đầy 100% máu (+100.000 HP) và lặp lại liên tiếp 3 lần chuyển cọc (1/4 -> 2/4 -> 3/4 -> 4/4), khiến trận đấu bị kéo dài sai lệch ý muốn của streamer.",
  "  2. *Logic mới chuẩn hóa theo đúng yêu cầu*:",
  "     - **Mốc kích hoạt**: Khi máu Boss bị người chơi đánh tụt xuống mốc **1 chấm vàng cuối cùng** (<= 25% HP, tức <= 25.000 HP - đúng vị trí ô khoanh đỏ).",
  "     - **Mức hồi máu**: Boss kích hoạt nội tại hộ thể, **tự hồi máu cho bản thân chạm đúng ô vàng ở giữa (50% HP = 50.000 HP)** theo đúng khung màu xanh người dùng vẽ trên hình ảnh.",
  "     - **Giới hạn số lần hồi máu**: Trong suốt trận đấu 1 tiếng (60 phút), Boss **CHỈ HỒI MÁU ĐÚNG 1 LẦN DUY NHẤT** (`bossHealed = true`).",
  "     - **Cơ chế sau khi hồi**: Sau khi máu đã hồi lên ô vàng ở giữa (50%), nếu người chơi tiếp tục tấn công đánh tụt qua mốc 25% một lần nữa, Boss **TUYỆT ĐỐI KHÔNG HỒI MÁU NỮA**. Máu tiếp tục tụt dần về 0 HP và Boss bị đánh bại hoàn toàn (Chiến thắng -> Bảng Vinh Danh -> Tự động đếm ngược 7 giây bắt đầu trận mới).",
  "     - **Bảo vệ đòn cực đại**: Trường hợp sát thương cực đại dồn một nhát từ >25% về <= 0 HP mà chưa từng hồi máu, hệ thống vẫn kích hoạt đúng 1 lần hồi thể lên 50% để đảm bảo tính thử thách của Boss.",
  "     - **Khởi tạo trận mới**: Khi trận đấu 1 tiếng kết thúc (hết giờ 60 phút, chiến thắng sau 7 giây, hoặc bấm nút Tạo phòng mới / Reset), cờ `bossHealed` được đặt lại về `false` để chuẩn bị cho trận đấu 1 tiếng tiếp theo.",
  "     - **Đồng bộ giao diện UI**:",
  "       - Cập nhật hiển thị giai đoạn thành: `🔥 GIAI ĐOẠN 01 / 02 · PHONG ẤN` -> sau khi hồi máu 50% chuyển sang `🔥 GIAI ĐOẠN 02 / 02 · THỨC TỈNH`.",
  "       - Thanh máu mượt mà chuyển động từ mốc 25% mở rộng chạm đến mốc kim cương 50% ở giữa.",
  ""
].join("\n");

content += section33Entry;
fs.writeFileSync(chatHistoryPath, content, 'utf8');
console.log('Successfully appended Section 33 to CHAT_HISTORY.md');
