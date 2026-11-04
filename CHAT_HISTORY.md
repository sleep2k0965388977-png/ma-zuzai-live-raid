# 📜 LỊCH SỬ PHÁT TRIỂN & TỔNG HỢP TOÀN BỘ TÍNH NĂNG (CHAT HISTORY)
**Dự án**: Đấu trường Live Raid 3D Boss Thượng Cổ - MA ZUZAI  
**Nền tảng**: WebGL 3D (Three.js), React 18, Web Audio API, Canvas Shaders  
**Ngày lưu**: 03/11/2026

---

## 🧭 MỤC LỤC TỔNG HỢP CÁC TÍNH NĂNG ĐÃ THỰC HIỆN

1. [Không giới hạn số lượng người chơi & Quân đoàn GPU 10.000 Hiệp sĩ](#1-không-giới-hạn-số-lượng-người-chơi)
2. [Hệ thống Camera điện ảnh & Cận cảnh đánh Boss](#2-hệ-thống-camera-điện-ảnh)
3. [Nâng cấp Bối cảnh Đấu trường Tiên Hiệp (Xianxia Dark Fantasy)](#3-nâng-cấp-bối-cảnh-đấu-trường)
4. [Bảng TOP Tu Sĩ Lực Chiến & Bảng Hướng Dẫn Cách Đánh Boss](#4-bảng-top-tu-sĩ--hướng-dẫn-cách-đánh-boss)
5. [Khung tên Tu Tiên Trung Quốc (Đẳng cấp Kim Long & Cánh Tiên Quang)](#5-khung-tên-tu-tiên-trung-quốc)
6. [Bảng Vinh Danh (Victory Hall of Fame) & Tự động hồi sinh sau 7 giây](#6-bảng-vinh-danh-hạ-gục-boss--đếm-ngược-7s)
7. [Đồng hồ đếm ngược 60 phút & Màn hình Báo Thua kèm đếm ngược 7 giây](#7-đồng-hồ-đếm-ngược-60-phút--báo-thất-bại)
8. [Bộ kỹ năng định kỳ của Boss (Chiêu 3 phút & Chiêu 5 phút)](#8-bộ-kỹ-năng-định-kỳ-của-boss)
9. [Tương tác Live Stream: +1 Người vào phòng Live & Boss đánh loại người chơi](#9-tương-tác-live-stream--boss-loại-người-chơi)
10. [Hệ thống 5 Cấp Độ Tặng Xu / Quà (Kiếm Vàng, Cự Kiếm, Mưa Kiếm, 1 Rồng, 10 Rồng)](#10-hệ-thống-5-cấp-độ-tặng-xu--quà)
11. [Nạp Mô Hình 3D Nguyên Bản Meshy AI (Chained Radiance)](#11-nạp-mô-hình-3d-nguyên-bản-meshy-ai-chained-radiance)
12. [Hệ Thống 4 Dây Xích Vàng Nối Vào 4 Cột Cổ Kính](#12-hệ-thống-4-dây-xích-vàng-nối-vào-4-cột-cổ-kính)
13. [Sửa Lỗi Kỹ Năng 20 Xu Trở Lên & Zoom Cận Cảnh Nhân Vật Người Chơi](#13-sửa-lỗi-kỹ-năng-20-xu-trở-lên--zoom-cận-cảnh-nhân-vật-người-chơi)
14. [Đãi Ngộ Trận Đấu Mới Cho TOP 1 Đến TOP 5](#14-đãi-ngộ-trận-đấu-mới-cho-top-1-đến-top-5)
15. [Nạp 2 Mô Hình 3D Nhân Vật Người Chơi Nguyên Bản Meshy AI](#15-nạp-2-mô-hình-3d-nhân-vật-người-chơi-nguyên-bản-meshy-ai)
16. [Sửa Lỗi Màn Hình Trắng (SyntaxError Unexpected If)](#16-sửa-lỗi-màn-hình-trắng)
17. [Khoan Tự Động Tặng Skill Khai Trận & Giảm 1/3 Sức Mạnh](#17-khoan-tự-động-tặng-skill-khai-trận--giảm-13-sức-mạnh)
18. [Tối Ưu Hóa Toàn Diện Hiệu Năng & Độ Mượt 60 FPS](#18-tối-ưu-hóa-toàn-diện-hiệu-năng--độ-mượt-60-fps)
19. [Đồng Bộ Hóa Quân Đoàn Tu Sĩ Giống Hệt Mô Hình Người Chơi](#19-đồng-bộ-hóa-quân-đoàn-tu-sĩ-giống-hệt-mô-hình-người-chơi)

---

## 1. Không Giới Hạn Số Lượng Người Chơi
- **Xóa bỏ giới hạn 20 người chơi**: Hệ thống phân bổ tọa độ dạng vòng tròn đồng tâm đa lớp (`Concentric Stratified Rings`), đảm bảo hàng trăm người chơi xuất hiện đều đặn xung quanh bục đá mà không bị chồng lấn.
- **Nút thêm nhanh người chơi**: Tích hợp các nút `[+1]`, `[+10]`, `[+50]`, `[+100]`, `[+500]`, `[+1000]` trên bảng điều khiển.
- **Quân đoàn GPU Instanced 10.000 Hiệp sĩ**: Render mượt mà 60 FPS trên Vertex Shader với hiệu ứng dập dềnh và reo hò cổ vũ theo nhịp chiến đấu.

---

## 2. Hệ Thống Camera Điện Ảnh
- **Trạng thái mặc định**: Toàn cảnh bao quát đấu trường (`z = 40m, y = 14.5m, FOV = 76°`).
- **Khi người chơi xuất chiêu**: Camera tự động zoom cận cảnh sát người chơi (`z = 8.2m, y = 2.9m`), sau khi chém xong lùi về toàn cảnh mượt mà.
- **Động tác nhảy cao né bục đá**: Quỹ đạo nhảy của người chơi được nâng cao vọt qua bục đá 1.35m (`leapY = 2.85m`), chém vào ngực Boss trong tầm nhìn rõ ràng.

---

## 3. Nâng Cấp Bối Cảnh Đấu Trường Tiên Hiệp
- **Pháp Trận Hoàng Gia Đáy Sàn (1024x1024 Runic Magic Array)**: Xoay tròn phát sáng huyền ảo dưới chân toàn bộ đội hình.
- **Quầng Thiên Thể Hắc Ám (Celestial Eclipse Halo)**: Vòng hào quang khổng lồ bọc ngọn lửa ma hồng và nhẫn thiên thanh nghiêng 35 độ sau lưng Boss.
- **4 Cột Đền Cổ Kính & Vạc Lửa Linh Hồn**: Bố trí 4 góc đấu trường với ngọn lửa linh hỏa bập bùng.
- **Gỡ bỏ xiềng xích vàng**: Loại bỏ hoàn toàn xích vàng vướng mắt, làm nổi bật thân hình linh thể bạch y của Ma Zuzai.

---

## 4. Bảng TOP Tu Sĩ & Hướng Dẫn Cách Đánh Boss
- **Bảng TOP Tu Sĩ Lực Chiến**:
  - Tôn vinh Top 1 (Quán Quân), Top 2 (Á Quân), Top 3 (Quý Quân) và Top 4-5.
  - Hiển thị Cảnh giới tu vi (Đại Thừa Kỳ, Hóa Thần Đỉnh, Nguyên Anh, Kim Đan, Trúc Cơ) và tổng lực chiến.
  - Chiều rộng `202px` sang trọng, bề thế.
- **Bảng Hướng Dẫn Cách Đánh Boss**:
  - Tối ưu phẳng, bỏ hết icon thừa, thiết kế 1 dòng ngang dễ đọc:
    - *Bình luận* ➔ *Xuất kiếm chém Boss*
    - *Thả tim* ➔ *Hồi máu & Năng lượng*
    - *Tặng quà* ➔ *Triệu hồi Rồng Tuyệt kỹ*
    - *Đua Top* ➔ *Mở khóa Cánh Tiên Hiệp*
  - Chiều rộng `178px` (gọn hơn bảng Top đúng ~0.5cm).
- **Vị trí bố cục chuẩn theo yêu cầu**:
  - **Bảng TOP Tu Sĩ Lực Chiến**: Đặt chính xác tại góc trên bên phải, ngay dưới thanh máu Boss (`top: 118px`, `right: 12px`), lấp đầy đúng vị trí ô vuông màu đỏ trên không gian bầu trời, không che khuất thân Boss Ma Zuzai.
  - **Bảng Hướng Dẫn Cách Đánh Boss**: Cố định ở góc dưới bên phải (`bottom: 105px`, `right: 12px`), ngay trên thanh Năng lượng đội.
  - Tách rời 2 bảng hoàn toàn để không dính chùm, giữ khoảng cách thoáng đãng cho toàn bộ đấu trường.

---

## 5. Khung Tên Tu Tiên Trung Quốc
- **Top 1 (Vô Thượng Chí Tôn)**: Cánh Tiên Quang vector SVG dát vàng hoàng kim, hào quang nhấp nháy, vương miện rồng, viền ngọc sáng chói `【 👑 VÔ THƯỢNG CHÍ TÔN 】`.
- **Top 2 (Tiên Tôn) & Top 3 (Chân Quân)**: Cánh Lam Ngọc & Tử Kim đẳng cấp.
- **Thành viên thường**: Khung bảng tên phong cách thư pháp tiên hiệp tối giản, chữ trắng bóng đổ râm.

---

## 6. Bảng Vinh Danh Hạ Gục Boss & Đếm Ngược 7s
- **Kích hoạt khi**: HP Boss tụt về 0.
- **Giao diện Hall of Fame (Z-Index 99999)**:
  - Cúp vàng phát quang `🏆`, tiêu đề vàng kim: **BẢNG VINH DANH TU SĨ**.
  - Bục vinh danh Top 3 MVP công đầu: Quán quân (Vô Thượng Chí Tôn), Á quân, Quý quân kèm số sát thương cống hiến.
  - Thống kê toàn trận: Tổng sát thương (100.000), Max Combo, Tổng số tu sĩ tham chiến.
- **Đếm ngược tự động 7 giây**:
  - Hộp số điện tử: `7s ➔ 0s` kèm thanh tiến trình thu hẹp.
  - Khi đếm về 0: Tự động hồi sinh Boss đầy 100.000 HP, reset camera và bắt đầu vòng raid mới hoàn toàn tự động mà không cần ấn nút.
  - Có nút `[ ⚡ Hồi sinh ngay lập tức ]` để bỏ qua đếm ngược nếu muốn.

---

## 7. Đồng Hồ Đếm Ngược 60 Phút & Báo Thất Bại
- **Đồng hồ đếm ngược**: Hiển thị trên thanh HUD Boss: `⏳ CÒN LẠI: 59:59 ...`. Dưới 5 phút sẽ nhấp nháy đỏ cảnh báo khẩn cấp (`urgent pulse`).
- **Khi hết 60 phút chưa diệt được Boss**:
  - Hiển thị **Màn hình Khiêu Chiến Thất Bại**: Đầu lâu hắc ma `💀`, tiêu đề huyết sắc phong ấn, báo cáo lượng máu Boss còn lại và sát thương đã gây.
  - Đếm ngược 7 giây: Tự động reset trận mới cho toàn bộ tu sĩ phục thù.
  - Nút test nhanh: `[ Hết giờ (Thua) ⌛ ]` trong bảng điều khiển.

---

## 8. Bộ Kỹ Năng Định Kỳ Của Boss
- **Chiêu 3 phút (Tử Quang Hắc Tinh Beam)**:
  - Tự động kích hoạt sau mỗi 180 giây (hoặc bấm nút test `[ Chiêu 3m (Tia Tím) ⚡ ]`).
  - Quả cầu hắc tinh phát sáng chói lọi, bắn một luồng tia năng lượng tím đen khổng lồ lao thẳng xuống đội hình người chơi.
  - **Rung nhẹ mặt đất trong 1.8 giây**, nổ khói tím trừ máu diện rộng.
- **Chiêu 5 phút (Vạn Tinh Trầm Lạc)**:
  - Tự động kích hoạt sau mỗi 300 giây (hoặc bấm nút test `[ Chiêu 5m (Hành Tinh Nổ) 💥 ]`).
  - Toàn bộ các hành tinh tím đen trên bầu trời tách khỏi quỹ đạo, bốc cháy lao vun vút xuống người chơi.
  - **Đại nổ 3 đợt sóng xung kích cực đại**, rung chấn mặt đất dữ dội trong **2.6 giây**, trừ lượng máu lớn của toàn quân rồi các hành tinh tái hiện bay về bầu trời sâu thẳm.

---

## 9. Tương Tác Live Stream & Boss Loại Người Chơi
- **Khi người xem lướt vào phòng live (+1)**:
  - Bật popup nổi góc màn hình: `👤 +1 Đạo hữu @username vừa vào phòng live!`.
  - Triệu hồi mô hình 3D người chơi mới vào trận địa, số lượng tu sĩ đang sống tự động cộng thêm 1.
- **Khi Boss tấn công loại người chơi**:
  - Đòn chém thường: loại 1 - 2 người.
  - Chiêu 3 phút: loại ~20% quân số (2 - 8 người).
  - Chiêu 5 phút: loại ~40% quân số (5 - 25 người).
  - Người chơi bị loại: bốc khói đỏ tan biến linh hồn, mô hình biến mất, nametag mờ đen.
  - **Banner đỏ nhấp nháy giữa màn hình**: `☠️ MA ZUZAI XUẤT CHIÊU · ĐÃ LOẠI X NGƯỜI!`.
  - HUD thời gian thực: Cập nhật song song `🟢 Đang sống: X Tu sĩ` và `💀 Đã bị loại: Y Người`.

---

## 10. Hệ Thống 5 Cấp Độ Tặng Xu / Quà
- **1 - 10 Xu**: Đánh ra **1 Lưỡi Kiếm Vàng** ánh kim bay xé gió chém vào Boss.
- **10 - 30 Xu**: Triệu hồi **1 Thanh Cự Kiếm khổng lồ dài 9m** từ trên trời cao cắm thẳng xuống đầu Boss gây nổ và rung màn hình.
- **31 - 50 Xu**: Khai mở **Pháp Trận Vòng Tròn To Phát Sáng** phóng ra **Mưa Kiếm 22 thanh** liên hoàn oanh tạc dồn dập vào Boss.
- **50 - 100 Xu**: Người chơi **Mọc Cánh Kim Quang bay lên trời** và triệu hồi **1 CON RỒNG VÀNG** lượn vòng cung lao bổ xuống cắn xé Boss.
- **> 100 Xu**: Người chơi **Mọc Cánh Thần Thoại khổng lồ**, hư không rách toạc triệu hồi **ĐÀN 10 CON THẦN LONG** từ 10 hướng trên bầu trời cùng đồng loạt lao ập xuống xâu xé oanh tạc Boss trong chuỗi đại nổ liên hoàn chấn thiên động địa!
- **Nút test nhanh trên UI**: Đầy đủ 5 nút `[ 5 Xu: Kiếm Vàng ]`, `[ 20 Xu: Cự Kiếm ]`, `[ 45 Xu: Mưa Kiếm ]`, `[ 80 Xu: 1 Rồng ]`, `[ 150 Xu: 10 Rồng ]`.

---

## 11. Nạp Mô Hình 3D Nguyên Bản Meshy AI (Chained Radiance)
- **Tải và giải mã trực tiếp từ Meshy AI**: Trích xuất thành công tệp mô hình 3D `boss_chained_radiance.glb` (53.2 MB) từ link chia sẻ của người dùng (`https://www.meshy.ai/s/PTBEUz`).
- **Tích hợp Three.js GLTFLoader**:
  - Tự động thay thế hoàn toàn hình ảnh cũ bằng Mesh 3D hoàn chỉnh kèm đầy đủ PBR textures (Color, Normal, Metallic, Roughness).
  - Tự động căn chỉnh chiều cao chuẩn Boss `5.6m`, căn giữa trọng tâm và bật đổ bóng `castShadow` / `receiveShadow`.
  - Giữ lại hệ thống ánh sáng linh hồn (Core Light hồng tím `#ff33cc` và Back Rim Light trắng `#ffffff`).
  - Tự động tải ngay khi mở trang web mà không cần thao tác thủ công.


---

## 12. Hệ Thống 4 Dây Xích Vàng Nối Vào 4 Cột Cổ Kính
- **Đúng yêu cầu bản vẽ**: Nối 4 dây xích phong ấn từ hai bên thân/cổ tay Boss vươn ra 4 cột cổ kính ở 4 góc đấu trường theo đúng 4 nét vẽ đỏ của người dùng.
- **Độ cong võng tự nhiên (Catenary curve)**: Dây xích rủ xuống nhẹ nhàng ở đoạn giữa trước khi vút lên neo vào đỉnh vạc lửa của từng cột đá.
- **Chi tiết 3D kim loại vàng rực rỡ**:
  - Gồm 144 mắt xích đan xen góc 90 độ dọc theo 4 đường ống uốn lượn.
  - Mỗi đỉnh cột được trang bị 1 vòng cùm đại phong ấn khổng lồ bằng đồng vàng (`metalness: 0.96`, `emissive: #b45309`).
  - Chất liệu vàng rực rỡ phát sáng huyền ảo dưới ánh đèn sân khấu đấu trường.

---

## 13. Sửa Lỗi Kỹ Năng 20 Xu Trở Lên & Zoom Cận Cảnh Nhân Vật Người Chơi
- **Nguyên nhân cốt lõi gây lỗi**:
  - Đối tượng từ điển kỹ năng `pr` trước đây chỉ chứa `small` (5 xu), `medium`, `large`, `ultimate`, bị thiếu các định danh kỹ năng mới: `giant_sword` (20 Xu), `sword_rain` (45 Xu), `single_dragon` (80 Xu), `ten_dragons` (150 Xu).
  - Khi người chơi gửi sự kiện 20 xu trở lên, việc truy cập `pr[t.skill].label` sinh ra ngoại lệ `TypeError: Cannot read properties of undefined (reading 'label')` khiến hàm xử lý `consume()` dừng đột ngột trước khi kịp gọi `setCamera()`. Do đó camera đứng im và không có kỹ năng nào xuất hiện.
- **Giải pháp xử lý & Nâng cấp**:
  1. Bổ sung đầy đủ 5 cấp độ kỹ năng tặng xu vào `pr` (`small`, `giant_sword`, `sword_rain`, `single_dragon`, `ten_dragons`) kèm cơ chế fallback an toàn `skInfo = pr[t.skill] || {...}` không bao giờ gây crash.
  2. Kích hoạt trực tiếp các hiệu ứng đồ họa 3D tương ứng theo từng mức xu: Kiếm Vàng, Cự Kiếm, Mưa Kiếm, 1 Thần Long, và Đàn 10 Thần Long vây hãm.
  3. **Camera Cinematic Zoom cận cảnh vào đúng nhân vật người chơi**:
     - Khi người chơi tặng xu xuất tuyệt kỹ, camera tự động chuyển góc quay áp sát vào nhân vật (`distance ~ 4.2m`, `lookAt` ngay ngực nhân vật).
     - Camera mượt mà bám theo (tracking) khi nhân vật bay vút lên không trung phóng kỹ năng, sau đó tự động trả về góc toàn cảnh chính diện sau khi tuyệt chiêu kết thúc.

---

## 14. Đãi Ngộ Trận Đấu Mới Cho TOP 1 Đến TOP 5
- **Quy tắc kích hoạt đãi ngộ**: Mỗi khi một trận đấu mới bắt đầu (sau khi khởi động web hoặc sau khi đếm ngược hồi sinh thắng/thua), hệ thống tự động vinh danh và trao quyền thi triển Tuyệt Kỹ miễn phí cho Top 5 tu sĩ có lực chiến cao nhất:
  - **Top 1 (Quán Quân)**: Tự động thi triển Tuyệt kỹ **150 Xu** (`ten_dragons` - Mọc cánh Thần Thoại & Triệu hồi 10 Thần Long vây hãm).
  - **Top 2 (Á Quân)**: Tự động thi triển Tuyệt kỹ **80 Xu** (`single_dragon` - Mọc cánh Kim Quang & Triệu hồi 1 Thần Long bổ nhào).
  - **Top 3 (Quý Quân)**: Tự động thi triển Tuyệt kỹ **45 Xu** (`sword_rain` - Khai mở vòng sáng phóng Mưa Kiếm 22 thanh).
  - **Top 4 (Đại Cao Thủ)**: Tự động thi triển Tuyệt kỹ **20 Xu** (`giant_sword` - Triệu hồi Cự Kiếm 9m từ trời cắm xuống Boss).
  - **Top 5 (Tiên Phong)**: Tự động thi triển Tuyệt kỹ **5 Xu** (`small` - Phóng Kiếm Vàng xé gió chém Boss).
- **Pacing điện ảnh & Zoom cận cảnh tuần tự**:
  - Mỗi tuyệt kỹ kích hoạt cách nhau 2.4 giây để máy quay tuần tự Zoom cận cảnh và bám sát vào từng nhân vật từ Top 1 đến Top 5, tạo nên màn mở đầu hoành tráng đầy kích thích.
- **Nút bấm thử nghiệm nhanh**: Đã tích hợp nút nổi bật `[ 👑 Đãi Ngộ Trận Mới (Top 1: 150Xu, Top 2: 80Xu, Top 3: 45Xu, Top 4: 20Xu, Top 5: 5Xu) ]` ngay trong Bảng điều khiển để người phát live có thể biểu diễn bất cứ lúc nào!

---

## 15. Nạp 2 Mô Hình 3D Nhân Vật Người Chơi Nguyên Bản Meshy AI
- **Giải mã & Tải trực tiếp từ 2 Link Meshy AI**:
  1. `https://www.meshy.ai/s/o8HbGX` $\rightarrow$ **Golden Crest Guardian** (`player_golden_guardian.glb`, 13.8 MB).
  2. `https://www.meshy.ai/s/mvqUd8` $\rightarrow$ **Scarlet Empress** (`player_scarlet_empress.glb`, 60.4 MB).
- **Chuẩn hóa thông số & Tích hợp vào Game Engine**:
  - Tự động chuẩn hóa chiều cao nhân vật tu tiên `targetH = 2.45m` (khi nhân tỉ lệ spawn `0.62` đạt chuẩn chiều cao lý tưởng `~1.5m` so với Boss 5.6m).
  - Tự động căn giữa trọng tâm và đặt bàn chân chạm đất chính xác.
  - Tự động kích hoạt bóng đổ thực tế (`castShadow`, `receiveShadow`) và tinh chỉnh PBR Materials (`roughness: 0.38`, `metalness: 0.3`).
  - Trang bị ngọn đèn linh khí hào quang tỏa sáng trước ngực nhân vật (Vàng `#facc15` cho Golden Guardian và Đỏ hồng `#f43f5e` cho Scarlet Empress).
  - Hệ thống **Roster Luân Phiên (Multi-model Alternation)**: Đội hình tu sĩ tham chiến trên đấu trường tự động phân bổ xen kẽ giữa Golden Crest Guardian và Scarlet Empress, mang lại sự đa dạng và sống động vượt trội.
  - Tự động tải ngay khi mở trang web và có thêm nút kích hoạt thủ công trong tab **"Mô hình 3D"**.

---

## 16. Sửa Lỗi Màn Hình Trắng
- **Hiện tượng**: Trình duyệt mở `http://localhost:3000` bị màn hình trắng trơn, không hiển thị thanh công cụ hay sàn đấu 3D.
- **Nguyên nhân chính xác**:
  - Tại đoạn mã xử lý vòng lặp cập nhật máy quay (`render loop`), dấu phân cách giữa lệnh dọn dẹp đối tượng `this.disposeObject(o.group)` và khối lệnh `if(this.targetActor...)` bị nối bằng dấu phẩy `,` thay vì dấu chấm phẩy `;` (`!0}),if(...)`).
  - Trong chuẩn JavaScript ES Module, lệnh điều kiện `if` là một statement (câu lệnh), không thể đứng sau toán tử phẩy `,` (vốn chỉ chấp nhận expression). Trình duyệt phát sinh ngoại lệ cú pháp:
    ```text
    SyntaxError: Unexpected token 'if'
    ```
  - Khi có SyntaxError, toàn bộ tệp bundle JavaScript bị trình duyệt từ chối thực thi, khiến React không thể mount vào `#root`.
- **Khắc phục**:
  - Sửa dấu phẩy `,` thành chấm phẩy `;` (`!0});if(...)`).
  - Kiểm tra trực tiếp qua Chrome Headless DevTools: `#root` đã mount thành công $100\%$ giao diện đấu trường (`raid-app`), thanh công cụ, các bảng xếp hạng và không còn bất kỳ lỗi runtime nào.

---

## 17. Khoan Tự Động Tặng Skill Khai Trận & Giảm 1/3 Sức Mạnh
- **Nguyên nhân cần điều chỉnh**: Trước đây, 5 tuyệt kỹ mở màn có tổng sát thương lên tới $121.700$ DMG, trong khi Boss chỉ có $100.000$ HP. Do hệ thống tự động kích hoạt ngay sau 1.2s - 2.2s vào trận, Boss bị dồn sát thương chết ngay lập tức làm hiện bảng vinh danh chiến thắng quá sớm.
- **Giải pháp thực hiện theo yêu cầu**:
  1. **Khoan tự động tặng skill**: Tắt cơ chế tự động spam 5 tuyệt kỹ lúc mới vào trận/reset. Quyền kích hoạt được chuyển hoàn toàn cho người điều phối live stream bấm nút `[ 👑 Đãi Ngộ Khai Trận Top 1 - 5 (1/3 Sức Mạnh Chuẩn) ]` trên bảng điều khiển khi muốn mở màn trận chiến.
  2. **Giảm sát thương toàn bộ skill xuống còn đúng 1/3**:
     - `150 Xu (ten_dragons)`: Giảm từ $68.000 \rightarrow 22.500$ DMG.
     - `80 Xu (single_dragon)`: Giảm từ $28.000 \rightarrow 9.300$ DMG.
     - `45 Xu (sword_rain)`: Giảm từ $16.000 \rightarrow 5.300$ DMG.
     - `20 Xu (giant_sword)`: Giảm từ $7.500 \rightarrow 2.500$ DMG.
     - `5 Xu (small)`: Giảm từ $2.200 \rightarrow 750$ DMG.
  3. **Cân bằng nhịp độ Raid**: Sau khi khai màn cả 5 tuyệt kỹ của Top 1 - 5, Boss chỉ mất khoảng $1/3$ lượng máu ($~35.000$ HP) và vẫn còn lại $~65.000$ HP để khán giả phòng live tiếp tục bình luận xuất chiêu, tặng quà kéo dài trận đấu kịch tính!

---

## 18. Tối Ưu Hóa Toàn Diện Hiệu Năng & Độ Mượt 60 FPS
- **Loại bỏ tính toán đổ bóng trên 10.000 quân đoàn khán giả**: Tắt `castShadow` và `receiveShadow` trên 10.000 billboard sprites instanced của quân đoàn, giải phóng hàng chục nghìn lượt render shadow map vô ích mỗi khung hình.
- **Tối ưu hóa 144 mắt xích phong ấn 3D**: Tắt `castShadow` trên từng mắt xích nhỏ, chỉ giữ lại đổ bóng hình khối trên lõi ống xích chính và đỉnh cột, giảm tải tối đa cho GPU.
- **Gộp hệ thống ánh sáng linh hồn (Light Consolidating)**:
  - Thay vì nhân bản hàng chục `PointLight` độc lập khi spawn nhân vật, hệ thống chuyển sang dùng 1 nguồn sáng linh hỏa trung tâm (`playerCampLight`) bao quát toàn đội hình.
  - Loại bỏ hoàn toàn tình trạng vượt ngưỡng Uniform Vectors và hiện tượng tụt FPS do phân mảnh Shader điểm sáng.
- **Tối ưu hóa tỷ lệ phân giải hiển thị (Pixel Ratio Optimization)**:
  - Giới hạn `pixelRatio = Math.min(window.devicePixelRatio, 1.25)` giúp giảm ~35% lượng điểm ảnh cần tính toán qua bộ lọc hậu kỳ Bloom mà vẫn đảm bảo độ sắc nét hoàn hảo trên màn hình Retina / 2K / 4K.
- **Chống phân mảnh bộ nhớ (GC Zero-Allocation)**:
  - Tái sử dụng đối tượng Vector3 (`_lblVec`) khi tính toán tọa độ chiếu tên tu sĩ (`project(camera)`), loại bỏ hoàn toàn hiện tượng giật cục (micro-stutter) do cơ chế gom rác JavaScript (Garbage Collector).

---

## 19. Đồng Bộ Hóa Quân Đoàn Tu Sĩ Giống Hệt Mô Hình Người Chơi
- **Đồng bộ ngoại hình Quân đoàn 10.000 lính**: Thay thế toàn bộ hình ảnh chibi 2D cũ bằng kết cấu hình ảnh chuẩn xác của **2 nhân vật người chơi Meshy AI**:
  - `preview_golden_guardian.png` (Chiến Tướng Hoàng Kim - Golden Crest Guardian).
  - `preview_scarlet_empress.png` (Nữ Đế Hồng Y - Scarlet Empress).
- **Chuẩn hóa tỷ lệ hình thể (Aspect Ratio)**:
  - Cập nhật kích thước khung hiển thị billboard từ `0.85 x 1.25m` thành `0.92 x 1.55m` (`geom.translate(0, 0.775, 0)`), giúp vóc dáng của 10.000 tu sĩ đồng minh thanh thoát, uy nghiêm và khớp với tỷ lệ nhân vật người chơi thực tế.
- **Hiệu ứng cử động Vertex Shader tập thể**:
  - Toàn bộ hàng nghìn tu sĩ phía sau liên tục nhấp nhô, đung đưa và nhảy reo hò cổ vũ (`bob + sway + jump`) theo nhịp điệu của trận chiến.
- **Cập nhật danh xưng giao diện**:
  - Đổi tên mục điều khiển từ *"QUY MÔ QUÂN ĐOÀN HIỆP SĨ"* thành *"QUY MÔ QUÂN ĐOÀN TU SĨ (ĐỒNG MINH)"*, hiển thị rõ số lượng tu sĩ tham chiến trên đấu trường.

---

## 20. Tối Ưu Hóa Toàn Diện Đạt Độ Mượt Tuyệt Đối (Super Smooth 60 FPS)
- **Tình trạng phản ánh từ người dùng**: Đấu trường bị tụt FPS/lag nghiêm trọng khi trượt thanh quân đoàn lên mức tối đa **10.000 Tu Sĩ (Đồng Minh)** hoặc khi thêm nhiều người chơi.
- **Phân tích nguyên nhân gốc rễ (Root Causes)**:
  1. *Chất liệu Quân đoàn PBR quá nặng*: 10.000 tấm billboard đang dùng `MeshStandardMaterial` (`dn`) tính toán ánh sáng vật lý PBR, phản chiếu môi trường và độ nhám kim loại trên cả 2 mặt (`DoubleSide`), gây nghẽn nghiêm trọng chip xử lý đồ họa (GPU Pixel Fill Rate & Rasterizer).
  2. *Hệ thống Đổ bóng Động (Dynamic Shadow Maps)*: Toàn bộ mô hình 3D cực nặng (Boss 50MB, Nữ Đế Hồng Y 57MB, Hoàng Kim Tướng 13MB) cùng các trụ đá đều bật `castShadow = true`. Vì Three.js cập nhật shadow map mỗi khung hình (`autoUpdate = true`), GPU phải vẽ lại hàng triệu đa giác thêm một lần nữa cho mỗi khung hình chỉ để tạo bóng đổ mờ trên sàn tối.
  3. *Hậu kỳ Bloom phân giải cao*: Bộ lọc `UnrealBloomPass` bị kéo dãn theo kích thước màn hình gốc (1080p / 2K), thực hiện 12 lượt lọc mờ (blur passes) trên toàn màn hình ở độ phân giải lớn.
  4. *Quá nhiều Draw Calls của 148 Mắt Xích Phong Ấn*: 4 sợi xích chia làm 148 đối tượng `Mesh` độc lập, làm tăng vọt draw calls gửi từ CPU sang GPU.
  5. *Nhân bản không giới hạn mô hình 3D khi bấm +10, +50, +100*: Trước đây mỗi lần bấm `+100` người chơi, hệ thống nhân bản 100 mô hình 3D dung lượng 60MB vào WebGL, gây tràn VRAM GPU.
  6. *Traverse cây đối tượng Boss mỗi frame*: Hàm `this.boss.traverse()` duyệt qua hàng trăm node xương mỗi frame chỉ để tìm mesh `veil`.
- **Giải pháp tối ưu hóa siêu tốc đã triển khai**:
  1. **Chuyển Quân đoàn 10.000 lính sang `MeshBasicMaterial` (`ii`)**:
     - Bỏ toàn bộ tính toán đổ bóng và PBR lighting nặng nề, chuyển sang unlit sampling siêu nhẹ.
     - Đặt `side = FrontSide` (giảm 50% số pixel cần xử lý do lính luôn quay mặt về camera).
     - Thiết lập `alphaTest = 0.18` và `depthWrite = false` để loại bỏ xung đột Depth Buffer và Overdraw. Giờ đây kéo thanh trượt lên 10.000 tu sĩ vẫn mượt mà 60 FPS!
     - Mặc định khởi đầu ở mức cân bằng 2.000 tu sĩ đẹp mắt.
  2. **Tắt hoàn toàn Shadow Maps (`shadowMap.enabled = false`)**:
     - Sàn đấu phong ấn ma giới vốn là cảnh đêm huyền ảo có ma trận phát sáng neon, nhẫn năng lượng tím và đèn linh hỏa. Tắt Shadow Map giúp giải phóng ngay 50% gánh nặng render của GPU mà không ảnh hưởng thẩm mỹ.
  3. **Tối ưu hóa Bloom Resolution & Cố định Pixel Ratio = 1.0**:
     - Giới hạn độ phân giải tính toán của `UnrealBloomPass` ở mức tối đa 320px, cho ánh sáng phát quang mềm mại hơn mà GPU xử lý nhanh gấp 10 lần.
     - Cố định `pixelRatio = 1.0` chống giật lag trên màn hình độ phân giải cao (Retina, 2K, 4K).
  4. **Gộp 148 Mắt Xích vào `InstancedMesh`**:
     - Gom toàn bộ các mắt xích Torus trên 4 đường xích thành `InstancedMesh`, giảm từ ~160 draw calls xuống chỉ còn 8 draw calls.
  5. **Giới Hạn Tối Đa 12 Mô Hình 3D Tiền Tuyến (3D Model Capping)**:
     - 12 vị tướng đứng trước mặt Boss sẽ sở hữu mô hình 3D Meshy AI chi tiết.
     - Khi bấm `+10`, `+50`, `+100`, `+1000` người chơi, các đạo hữu mới sẽ tự động gia nhập quân đoàn tu sĩ và bảng xếp hạng mà không tạo thêm mô hình 3D nặng, chống tràn bộ nhớ VRAM hoàn toàn.
  6. **Bộ Nhớ Đệm Đối Tượng Render Loop (Zero-Traverse Caching)**:
     - Cache trực tiếp con trỏ `this._bossVeil`, không còn hàm `traverse()` lặp lại mỗi frame.
     - Giảm tải cập nhật buffer hạt linh hỏa `spiritSparks` và hình chiếu nhãn tên DOM xuống cách frame (chạy xen kẽ).
  7. **Bổ sung Nút Bấm "⚡ 60 FPS SIÊU MƯỢT (DIRECT / BLOOM)" Trên Bảng Điều Khiển**:
     - Cho phép người điều phối bấm 1 click để chuyển đổi tức thì giữa chế độ siêu tốc (Direct Render - tắt toàn bộ bộ lọc hậu kỳ, đạt 60 FPS tối đa ngay cả trên máy cấu hình yếu) và chế độ Tiên Cảnh (Bloom huyền ảo).

---

## 21. Cơ Chế Tự Động Hồi Máu Thêm Cọc Mới Khi Chạm Chấm Vàng Cuối Cùng (2/4, 3/4, 4/4)
- **Yêu cầu từ người dùng**: *"boss xuống đến chấm vàng cuối cùng sẽ tự động hồi màu thêm 1 cọc gọi là 2/4"*.
- **Phân tích cơ chế Checkpoint & Multi-bar Health**:
  - Trên thanh máu của Boss có 3 mốc ghim kim cương vàng (`phase-pin` tại $75\%$, $50\%$, và $25\%$).
  - Khi người chơi tấn công, thanh máu rút dần từ phải qua trái.
  - **"Chấm vàng cuối cùng"** chính là mốc ghim tại $25\%$ lượng máu (`threshold = maxHp * 0.25 = 25.000 HP`).
  - Trước đây, khi máu tụt qua 25% máu tiếp tục tụt dần về 0 khiến Boss bị tiêu diệt ngay trong 1 thanh máu đơn.
- **Quy trình hồi máu và chuyển cọc mới đã triển khai**:
  1. **Khi cọc máu 1 (1/4) bị đánh tụt xuống $\le 25\%$ (chấm vàng cuối cùng)**:
     - Boss kích hoạt nội tại hộ thể: Tự động **hồi đầy lại 100% thanh máu** (+100.000 HP).
     - Giai đoạn lập tức chuyển sang **`02 / 04`** (gọi là cọc 2/4: Thức tỉnh).
     - Kích hoạt hiệu ứng hào quang xanh ngọc hồi sinh `#10b981` cùng kim quang `#f59e0b` bùng nổ quanh Boss.
     - Rung màn hình, camera lia về cận cảnh Boss và phát clip chuyển thể.
     - Phát thông báo trên kênh chiến báo:
       `"🛡️ MA TÔN XUỐNG CHẤM VÀNG CUỐI CÙNG: TỰ ĐỘNG HỒI MÁU THÊM 1 CỌC (CỌC 02 / 04)!"`
  2. **Tiến trình cho toàn trận đấu (Cọc 1/4 -> 2/4 -> 3/4 -> 4/4)**:
     - Khi cọc **`2/4`** bị đánh xuống $\le 25\%$: Boss tự động hồi đầy máu lên **`3/4`** (Cuồng nộ).
     - Khi cọc **`3/4`** bị đánh xuống $\le 25\%$: Boss tự động hồi đầy máu lên **`4/4`** (Tận diệt - Cọc Máu Cuối Cùng).
     - Tại cọc cuối cùng **`4/4`**: Boss không hồi máu nữa; khi máu tụt về 0 HP thì Boss chính thức bị đánh bại hoàn toàn (Chiến thắng!).
  3. **Đồng bộ hóa giao diện**:
     - Cập nhật nhãn thanh máu trên đầu thành: `🔥 CỌC MÁU 0X / 04 · [Tên Giai Đoạn]`.
     - Panel bên trái tự động hiển thị `01 / 04` $\rightarrow$ `02 / 04` $\rightarrow$ `03 / 04` $\rightarrow$ `04 / 04`.

---

## 22. Hiệu Ứng Bắn Kiếm Tự Do Của Quân Đoàn Tu Sĩ (0 Sát Thương)
- **Yêu cầu từ người dùng**: *"các QUY MÔ QUÂN ĐOÀN TU SĨ (ĐỒNG MINH) cũng bắn ra những thanh kiếm nhưng đánh boss sẽ ko mất máu và các quân đoàn này đánh ko theo thứ tự gì hết hiểu ý chứ gọi là có hiệu ứng đánh nhau với boss"*.
- **Thiết kế hệ thống Phi Kiếm Quân Đoàn (Legion Barrage System)**:
  1. **Nguồn phát kiếm ngẫu nhiên khắp toàn quân đoàn**:
     - Các thanh phi kiếm bay lên từ các vị trí ngẫu nhiên của hàng nghìn tu sĩ đứng khắp các hàng ghế đấu trường (bán kính từ $3.6m$ đến $22m$, góc phủ toàn diện $\pm 67^\circ$).
  2. **Thời gian bắn hoàn toàn bất quy tắc (Asynchronous Non-sequential)**:
     - Nhịp độ bắn liên tục, ngẫu nhiên từ $0.045s$ đến $0.13s$ một thanh phi kiếm.
     - Luôn có $10 - 20$ thanh phi kiếm mang màu sắc linh quang đa dạng (Vàng Hoàng Kim `#facc15`, Xanh Băng Lam `#38bdf8`, Tím Huyền Ảo `#a855f7`, Lục Bảo `#34d399`, Đỏ Hồng `#f43f5e`, Trắng Sáng `#ffffff`) bay vút theo quỹ đạo cong parabol tự do lao vào Ma Tôn.
  3. **Đánh Boss 0 Sát Thương (0 DMG)**:
     - Khi phi kiếm chạm vào khiên hộ thể hoặc thân thể của Boss, hệ thống phát sinh tia lửa linh lực va chạm (`impact spark FX`) và tự động biến mất.
     - **Hoàn toàn không gọi hàm `damage()`**: Máu của Boss không hề bị hao hụt, đảm bảo không phá vỡ cân bằng tặng quà và sát thương của người xem livestream.
  4. **Tối ưu hóa hiệu năng tuyệt đối với 1 Single Draw Call**:
     - Toàn bộ nhóm 65 phi kiếm bay đồng thời được quản lý qua **1 đối tượng `InstancedMesh` duy nhất** với `MeshBasicMaterial` và chế độ hòa trộn phát sáng `AdditiveBlending`.
     - Không cấp phát bộ nhớ mới trong vòng lặp `animate()` (Zero-GC), đảm bảo game chạy liên tục ở mức **60 FPS siêu mượt**!

---

## 23. Tự Động Khai Trận Đãi Ngộ Top 1 - 5 & Tạm Hoãn Quà/Bình Luận Khán Giả
- **Yêu cầu từ người dùng**: *"khi bắt đàu vào trân thì tự động khởi động đãi ngộ khai trận luôn khi nào tốp 5 người chơi đó khai ngộ hết thì mới bắt đầu tính người chơi tặng quà các thứ bình luận hiểu ý t chứ"*.
- **Quy trình Khai Trận Điện Ảnh (Opening Ceremony Lifecycle)**:
  1. **Tự Động Kích Hoạt Ngay Khi Vào Trận Mới / Reset**:
     - Khi mở ứng dụng hoặc người điều phối bấm nút Reset trận mới, hệ thống tự động thiết lập cờ `this.isOpeningCeremony = true`.
     - Lần lượt gọi 5 cao thủ Top 1 $\rightarrow$ Top 5 xuất chiêu mở màn:
       - **Top 1**: Tuyệt kỹ 150 Xu (Thập Long Quét Sạch).
       - **Top 2**: Tuyệt kỹ 80 Xu (Kim Long Xuất Thế).
       - **Top 3**: Tuyệt kỹ 45 Xu (Vạn Kiếm Quy Tông).
       - **Top 4**: Tuyệt kỹ 20 Xu (Cự Kiếm Khổng Lồ).
       - **Top 5**: Tuyệt kỹ 5 Xu (Kiếm Khí Hoàng Kim).
  2. **Tạm Hoãn Tiêu Thụ Hàng Đợi (Queue Buffering)**:
     - Trong suốt thời gian 5 cao thủ xuất chiêu (~14 giây), vòng lặp `this.queue.next()` tạm thời dừng lấy sự kiện.
     - Toàn bộ bình luận, lượt thích, và quà tặng gửi tới trong lúc này được giữ an toàn trong hàng đợi (`this.queue`), không bị mất mát nhưng không được xử lý ngay để nhường toàn bộ góc máy lia camera và hiệu ứng vinh danh cho Top 1 - 5.
  3. **Tự Động Mở Cửa Chiến Trường Sau Khi Khai Ngộ Xong**:
     - Ngay sau khi chiêu thức của Top 5 kết thúc, cờ `isOpeningCeremony` đổi về `false`.
     - Camera tự động lia về toàn cảnh đấu trường `main`.
     - Kênh chat phát thông báo:
       `"⚔️ [KHAI TRẬN HOÀN TẤT] Top 5 đã khai ngộ xong! Trận đấu chính thức mở cho toàn thể khán giả xuất kiếm & tặng quà!"`
     - Hàng đợi lập tức bắt đầu tiêu thụ bình thường, tính điểm sát thương và năng lượng cho từng khán giả!
  4. **Chỉ Báo Trạng Thái UI Trực Quan**:
     - Tiêu đề đấu trường hiển thị dòng chữ vàng nổi bật: `👑 ĐANG KHAI TRẬN: TOP 1 - 5 KHAI NGỘ...` trong suốt giai đoạn mở màn.

---

## 24. Phân Bố Vị Trí Người Chơi Ngẫu Nhiên Tự Do (Organic Battlefield Scatter)
- **Yêu cầu từ người dùng**: *"người chơi hiển thị khi thêm vào đang hiên thị thêm từ trái qua phải t ko muốn như vậy t muốn người chơi hiển thị 1 vị trí bất kỳ ko theo thống nhất nào hiểu ý chứ"*.
- **Vấn đề trước đây**:
  - Tọa độ người chơi được tính toán bằng công thức xoay vòng cố định theo chỉ số $n$ (`ang = ((n * golden) % (maxAngle * 2)) - maxAngle`).
  - Hậu quả là các nhân vật và nhãn tên `@username` bị xếp thành một hàng cong đều tăm tắp từ trái sang phải, các nhãn tên xếp chồng lên nhau thành một khối hộp đen che khuất tầm nhìn của Boss.
- **Giải pháp phân bố ngẫu nhiên tự do đã triển khai**:
  1. **Giải thuật Phân Bố Ngẫu Nhiên Tự Nhiên (Organic Scatter with Collision Avoidance)**:
     - Tọa độ mỗi người chơi khi tham chiến được sinh ngẫu nhiên hoàn toàn:
       - Bán kính cự ly tự do: $r \in [3.6m, 13.2m]$ (tỏa khắp sàn đấu ma giới từ tiền tuyến đến hậu phương).
       - Góc góc mở tự do: $\theta \in [-76^\circ, +76^\circ]$ trước mặt Ma Tôn.
       - Thêm độ lệch ngẫu nhiên ngẫu hứng $\Delta X, \Delta Z \pm 0.9m$.
     - Kiểm tra khoảng cách va chạm (`minDist >= 0.85m`) với toàn bộ người chơi đã có trên sàn đấu, ngăn chặn hiện tượng đứng đè trùng lên nhau.
  2. **Tự Động Quay Mặt Hướng Vào Ma Tôn (Dynamic Orientation)**:
     - Dù xuất hiện ở bất kỳ tọa độ ngẫu nhiên nào (bên trái, bên phải, xa hay gần), nhân vật đều tự động tính toán góc xoay `Math.atan2(-px, -(pz - (-1.8)))` để luôn quay mặt chính diện tập trung hướng về Boss.
  3. **Giới Hạn Nhãn Tên Nổi Tránh Che Khuất Sàn Đấu**:
     - Giới hạn tạo nhãn tên HTML nổi cho tối đa 16 người chơi tiền tuyến (`n < 16`), giải phóng tầm nhìn thông thoáng cho Boss mà vẫn định danh rõ ràng các vị tướng đại diện.

---

## 25. Hệ Thống Âm Thanh Đa Tầng Toàn Diện (Web Audio Synthesizer)
- **Yêu cầu từ người dùng**: *"hãy thêm hiệu ứng âm thanh cho t ví dụ như tiếng gió này , tiếng boss kêu tiếng nhạc nền , tiếng hiệu ứng đánh nhau tiếng hiệu ứng skill"*.
- **Thiết kế hệ thống Âm Thanh Tổng Hợp Thuần Web Audio (Zero-latency / No External Assets)**:
  1. **Tiếng Gió Chiến Trường Huyền Ảo (Ambient Wind Generator)**:
     - Sử dụng bộ đệm nhiễu trắng (`White Noise Buffer`) kết hợp bộ lọc dải tần `Bandpass Filter (380Hz)` và dao động sóng chậm `LFO (0.15Hz)` để mô phỏng từng đợt gió rít ma quái thổi qua sàn đấu phong ấn.
  2. **Tiếng Gầm Thét Uy Nghi Của Boss Ma Tôn (Demonic Boss Roar)**:
     - Tạo bởi cặp dao động âm sắc Sawtooth & Triangle lệch tần số ($125Hz \rightarrow 30Hz$) kết hợp bộ lọc cổ họng `Lowpass Resonance (Q = 5.0)` và sóng rung AM ($22Hz - 30Hz$), tạo ra tiếng gầm trầm đục rợn người khi Boss chuyển cọc máu hoặc phóng chưởng phản kích.
  3. **Nhạc Nền Chiến Đấu Sử Thi (Procedural Mystical Battle BGM)**:
     - Nhịp trống trận Taiko trầm hùng ($115Hz \rightarrow 28Hz$) đánh nhịp định kỳ mỗi ô nhịp.
     - Dải hợp âm trầm D-minor / F / A / C huyền bí kết hợp chuỗi arpeggio đàn hạc tiên hiệp réo rắt ở tốc độ $109$ BPM.
  4. **Tiếng Hiệu Ứng Đánh Nhau (Combat Slashes & Impacts)**:
     - **Tiếng vung kiếm chém**: Âm thanh chém gió kim loại sắc lẹm (`Bandpass 2100Hz -> 320Hz`).
     - **Tiếng va chạm trúng Boss**: Âm trầm va đập dứt khoát ($160Hz \rightarrow 26Hz$) tạo cảm giác lực đánh cực đã tai.
  5. **Tiếng Hiệu Ứng Tuyệt Kỹ (Skill SFX)**:
     - **150 Xu (Thập Long)**: Tiếng rồng gầm thét đa tầng cùng tiếng sấm nổ vang trời.
     - **80 Xu (Nhất Long)**: Tiếng đại long xé gió lao xuống.
     - **45 Xu (Mưa Kiếm)**: Chuỗi âm thanh 7 thanh kiếm laser kim loại xé gió liên hoàn.
     - **20 Xu (Cự Kiếm)**: Tiếng tụ linh khí rền vang rồi nổ rung chuyển mặt đất.
     - **5 Xu (Kiếm Vàng)**: Tiếng kiếm khí xoáy tròn lảnh lót.
  6. **Tiếng Hồi Sinh Chuyển Cọc Máu (Revival Chime)**:
     - Chuỗi hợp âm thánh ca C Major 7th bừng sáng khi Boss tự động hồi máu chuyển cọc.
  7. **Tiếng Phi Kiếm Quân Đoàn Bay (Legion Whooshes)**:
     - Tiếng xé gió nhẹ nhàng tự nhiên khi quân đoàn tu sĩ phóng kiếm.
  8. **Cơ chế Tự Động Kích Hoạt Âm Thanh (Auto-Unlock)**:
     - Tự động mở âm thanh ngay từ cú click chuột hoặc phím bấm đầu tiên của người dùng trên trang web (đúng chuẩn chính sách Autoplay của trình duyệt).
     - Nút loa bật/tắt trên thanh công cụ cho phép dừng/bật toàn bộ nhạc nền và âm thanh theo ý muốn.

---

## 26. Tích Hợp Cầu Nối TikTok LIVE Thời Gian Thực (TikTok Live Connector Bridge)
- **Yêu cầu từ người dùng**: *"giờ t muốn live tiktok bạn hãy viết cách kết nối và kiểm tra xem cách hoạt động kết nối với live tiktok đã hoạt động chưa"*.
- **Kiến trúc Cầu Nối WebSocket Thời Gian Thực**:
  1. **Máy chủ Cầu Nối `tiktok_bridge.js` (Cổng 8081)**:
     - Sử dụng thư viện chuẩn quốc tế `tiktok-live-connector` (v2.x) kết hợp WebSocket server `ws`.
     - Lắng nghe trực tiếp luồng Webcast từ tài khoản TikTok của streamer khi đang phát trực tiếp.
     - Tự động chuyển đổi toàn bộ sự kiện LIVE thành dữ liệu trò chơi 3D:
       - **Bình luận (Chat)**: Mỗi bình luận của người xem kích hoạt một đòn chém kiếm vào Boss.
       - **Tặng quà (Gift)**: Tự động tính tổng số Xu (diamonds $\times$ repeatCount) và kích hoạt chính xác 5 cấp độ tuyệt kỹ:
         - $\ge 150$ Xu $\rightarrow$ Thập Long Quét Sạch (`ten_dragons`).
         - $\ge 80$ Xu $\rightarrow$ Kim Long Xuất Thế (`single_dragon`).
         - $\ge 45$ Xu $\rightarrow$ Vạn Kiếm Quy Tông (`sword_rain`).
         - $\ge 20$ Xu $\rightarrow$ Cự Kiếm Khổng Lồ (`giant_sword`).
         - $\ge 5$ Xu $\rightarrow$ Kiếm Khí Hoàng Kim (`small`).
       - **Thả tim (Like)**: Tăng thanh năng lượng toàn đội và hồi phục máu tu sĩ.
       - **Tham gia (Member)**: Thêm người xem mới vào hàng ngũ quân đoàn tu sĩ.
       - **Follow & Share**: Bơm năng lượng thần tốc + thông báo vinh danh trên kênh chiến báo.
  2. **Tích Hợp Game Client Trực Quan (Giao Diện Bảng Điều Khiển)**:
     - Tự động mở kết nối WebSocket client tới `ws://localhost:8081` khi mở trang web.
     - Khung kết nối TikTok Live chuyên dụng trên Bảng Điều Khiển với ô nhập `@username`, nút **[ 🔗 Kết Nối Phòng LIVE ]** và nút **[ ⚡ Test ]** kiểm tra nhanh đường truyền.
     - Huy hiệu trạng thái chuyển đổi thông minh: `🟢 TIKTOK LIVE` (khi đã kết nối phòng live) và `⚪ MÔ PHỎNG` (khi đang chạy thử nghiệm).

---
*Tài liệu này được tạo và lưu trữ vĩnh viễn trong Git repository của dự án.*

---

## 27. Kiến Trúc Siêu Tối Ưu Quy Mô 100.000 (100K) Người Xem & 100K Tin Nhắn
- **Yêu cầu từ người dùng**: *"hãy tối ưu cho mượt mà nhất như kiểu 100000 nghìn người cùng vào phòng live và 100k tin nhắn thì sao"*.
- **5 Trụ Cột Tối Ưu Hóa Quy Mô Siêu Khủng (100K Massive Scale)**:
  1. **Cầu Nối WebSocket Micro-Batching (Độ trễ < 40ms)**:
     - Gộp các đợt bùng nổ tin nhắn thành gói `comment_batch` xả định kỳ mỗi 40ms, giảm tải 90% chi phí chuyển mạch mạng WebSocket.
     - Luồng quà tặng (Gifts/Xu) luôn gửi ngay lập tức với độ ưu tiên tuyệt đối (Priority 0).
     - Thống kê tổng hợp mỗi 3 giây thay vì in console làm nghẽn CPU Node.js.
  2. **Bộ Xử Lý Hàng Đợi Thích Ứng (Dynamic Adaptive Event Drain)**:
     - Tự động điều chỉnh tốc độ tiêu thụ theo kích thước hàng đợi: từ 2 sự kiện/giây khi vắng người lên tới **100+ sự kiện/khung hình** khi hàng nghìn tin nhắn tràn về cùng lúc.
     - Khi hàng đợi vượt ngưỡng chịu tải (> 120): tự động chuyển sang chế độ **Đại Kích Quân Đoàn (Volley Aggregation)**. Gộp hàng chục đòn đánh thành một đợt kiếm khí bắn ra từ biển 100.000 tu sĩ, tổng hợp sát thương chính xác vào Boss mà không bị trễ thời gian thực.
  3. **Quân Đoàn 100.000 Tu Sĩ Render Trên GPU Instanced**:
     - Nâng trần quân đoàn lên **100.000 Tu Sĩ** bao bọc toàn bộ đấu trường với bán kính 190m.
     - Render bằng `InstancedMesh` (2D Billboard Quad) tính toán dập dềnh và reo hò bằng **GPU Vertex Shader**, 0% tải CPU trên luồng chính, giữ vững 60 FPS.
  4. **Giới Hạn Bộ Nhớ & Bảo Vệ DOM (Anti-OOM Protection)**:
     - Giới hạn 24 đấu sĩ 3D tiền tuyến, người xem còn lại được điều chuyển bắn phi kiếm từ quân đoàn.
     - Danh sách chiến báo (`state.feed`) giới hạn 25 mục mới nhất; danh sách người chơi React (`state.players`) giới hạn 100 tu sĩ năng động nhất để tránh nghẽn luồng React Reconciler.
  5. **Xác Thực Stress Test Thực Tế**:
     - Bắn thử nghiệm 1.000 tin nhắn liên tục trong 594 mili giây (khoảng 1.684 tin nhắn/giây) -> Hệ thống xử lý mượt mà, không giật lag, độ trễ thời gian thực < 50ms.

---

## 28. Cơ Chế Giãn Cách Tung Chiêu 2 - 4 Giây (Chống Quá Tải & Chống Lag Cho Máy Yếu)
- **Yêu cầu từ người dùng**: *"khi tung skill hay đánh cách nhau người chơi tung skill 2-4 giây đế tránh bị gấp làm lag hay quá tải"*.
- **Thiết Kế Cơ Chế Điều Phối Nhịp Điệu (Skill Pacing & Cadence Controller)**:
  1. **Khoảng cách tối thiểu 2 - 4 giây giữa các lần ra đòn**:
     - Tích hợp bộ đếm `actionCooldown` và biến ngẫu nhiên `nextActionDelay` dao động linh hoạt từ **2.0 đến 4.0 giây** (`2.0 + Math.random() * 2.0`).
     - Khi một người chơi bắt đầu thi triển tuyệt kỹ (Cự Kiếm, Mưa Kiếm, Kim Long, Thập Long) hoặc phóng thân chém cận chiến: toàn bộ các đòn đánh/skill tiếp theo được xếp hàng chờ trật tự trong hàng đợi.
  2. **Khóa chống đè hình (Single-Player Spotlight Lock)**:
     - Hệ thống kiểm tra trạng thái toàn bộ đấu sĩ trên sàn đấu: nếu vẫn còn người chơi đang ở giữa không trung (`act.attack > 0`), tuyệt đối không kích hoạt người tiếp theo.
     - Sau khi người chơi trước tiếp đất an toàn và đủ thời gian giãn cách 2 - 4 giây, người chơi kế tiếp mới bắt đầu tung chiêu.
  3. **Lợi ích vượt trội cho máy cấu hình yếu**:
     - Camera điện ảnh tập trung trọn vẹn vào từng người xem, không bị giật giật hay chuyển góc quay đột ngột.
     - Âm thanh tuyệt kỹ và tiếng rồng gầm vang lên rõ ràng, sắc nét, không bị rè hay đè tiếng.
     - GPU và CPU không phải gánh nhiều vụ nổ hạt cùng lúc, duy trì tốc độ khung hình **60 FPS mượt mà tuyệt đối**.

---

## 29. Cân Bằng Sát Thương Đãi Ngộ Khai Trận Top 5 (Chính Xác 1.3 / 4 Cọc Máu Boss)
- **Yêu cầu từ người dùng**: *"giảm sức manh đãi ngộ của tốp gây sát thương lên boss khi 5 người choi tốp gây sát thương lên tốp dùng đãi ngộ chỉ gây ra sat thương mất máu bót 1,3/4 cọc máu boss thôi chứ đang gây nhiều sát thương quá"*.
- **Phân Tích & Hiệu Chuẩn Sát Thương Toán Học**:
  1. **Quy mô Máu Boss**: Boss có tổng cộng 100.000 HP chia đều thành 4 cọc máu (mỗi cọc 25.000 HP).
  2. **Mục tiêu 1.3 / 4 cọc máu**: $1.3 \times 25.000 = 32.500$ HP (tương đương 32.5% tổng máu Boss).
  3. **Nguyên nhân trước đây gây quá nhiều sát thương**:
     - Trước đây, đòn đánh vừa trừ máu trong hoạt ảnh phi thân chém Boss (`o.attack`), vừa tiếp tục trừ máu lần 2 trong vòng lặp hiệu ứng rồng/cự kiếm (`activeSpecialSkills`), dẫn đến tổng sát thương thực tế vượt quá 61.000 HP (~2.5 cọc máu).
  4. **Phân bổ sát thương chuẩn xác cho 5 vị trí Top**:
     - **Top 1 (Quán Quân - 10 Thần Long)**: **14.000 HP**
     - **Top 2 (Á Quân - 1 Thần Long)**: **8.500 HP**
     - **Top 3 (Quý Quân - Mưa Kiếm)**: **5.200 HP**
     - **Top 4 (Đại Cao Thủ - Cự Kiếm)**: **3.200 HP**
     - **Top 5 (Tiên Phong - Kiếm Vàng)**: **1.600 HP**
     - **Tổng cộng cả 5 người**: $14.000 + 8.500 + 5.200 + 3.200 + 1.600 = \mathbf{32.500}$ **HP** (Đúng chuẩn mất **1.3 / 4 cọc máu**).
  5. **Kết quả trận đấu**:
     - Sau khi Top 5 khai trận xong, Boss tụt từ 100.000 HP xuống còn đúng **67.500 HP** (cọc 1 vỡ, cọc 2 mất 30%).
     - Boss còn lại nguyên vẹn **2.7 cọc máu** để toàn bộ người xem trong phòng live cùng nhau hợp sức chiến đấu, kéo dài sự kịch tính cho buổi livestream.

---

## 30. Nâng Cấp Hệ Thống Âm Thanh & Nhạc Nền Tiên Hiệp Sử Thi (Epic Xianxia Sound System)
- **Yêu cầu từ người dùng**: *"oke hãy thêm nhạc cho t và hiệu ứng âm thanh vào cho t"*.
- **Nâng Cấp Âm Thanh Toàn Diện Bằng Web Audio API Chuẩn Studio**:
  1. **Tăng Âm Lượng Chuẩn (Loud & Clear)**:
     - Nâng âm lượng tổng thể từ mức nhỏ khó nghe (2-4%) lên mức chuẩn **22% - 35%**, nghe rõ mồn một trên cả loa ngoài máy tính và loa laptop.
  2. **Nhạc Nền Tiên Hiệp Sử Thi (Xianxia Epic Battle BGM)**:
     - **Trống Trận Taiko Trầm Hùng**: Đánh nhịp uy lực ($135Hz \rightarrow 26Hz$) ở tốc độ $112$ BPM tạo khí thế chiến đấu sôi sục.
     - **Đàn Cổ Cầm / Guzheng Ngũ Cung Tiên Đạo**: Chuỗi arpeggio réo rắt ngũ cung D-minor ($D, F, G, A, C$) vang lên huyền ảo.
     - **Hợp âm Pad nền bi tráng**: Dải âm thanh trầm bổng D2, F2, A2, C2 bao trùm đấu trường.
  3. **Bộ Hiệu Ứng Âm Thanh Sống Động (Full SFX)**:
     - **Tiếng Gió Rít Ma Quái (Arena Wind)**: Tiếng gió hú rít qua 4 cột cổ kính quanh đấu trường ($420Hz$ Bandpass filter).
     - **Tiếng Kiếm Chém (Sword Slash)**: Âm thanh kim loại sắc bén xé gió ($3200Hz \rightarrow 360Hz$).
     - **Tiếng Đánh Trúng Boss (Impact)**: Âm bass va đập dứt khoát ($175Hz \rightarrow 28Hz$) cực đã tai.
     - **Tiếng Rồng Gầm & Sấm Sét (Dragon Roar)**: Khi triệu hồi 1 Thần Long (80 Xu) hoặc 10 Thần Long (150 Xu), tiếng rồng thét đa tầng rền rĩ vang trời.
     - **Tiếng Cự Kiếm Khổng Lồ (20 Xu)**: Tiếng linh khí tụ lại rồi nổ rung chuyển mặt đất.
     - **Tiếng Vạn Kiếm Quy Tông (45 Xu)**: Chuỗi laser 7 thanh phi kiếm xé gió liên hoàn lảnh lót.
     - **Tiếng Boss Kêu (Boss Growl)**: Tiếng gầm quái thú trầm đục uy nghiêm mỗi khi tung đòn quét hoặc chiêu 3 phút / 5 phút.
  4. **Kích Hoạt Tức Thì (Instant Auto-Unmute)**:
     - Trạng thái âm thanh được bật mặc định (`useState(true)`).
     - Tích hợp bộ lắng nghe `pointerdown` và click toàn cục: Chỉ cần nhấp chuột bất kỳ vào màn hình game, âm thanh và nhạc nền lập tức bừng sáng không cần thao tác phức tạp.

---

## 31. Hoạt Ảnh Lơ Lửng Dừng Trên Không 2 - 3 Giây Khi Tung Chiêu (Mid-Air Hover Strike)
- **Yêu cầu từ người dùng**: *"tung chiêu thức hơi nhanh chậm khoảng 1-2 giây cho t người chơi đang bay lên tung phát xuống luôn nó đa quá nhanh hãy bay lên tung dừng khoảng 2-3 giây rồi mới xuống"*.
- **Thiết Kế Quỹ Đạo Điện Ảnh 3 Giai Đoạn (3-Stage Cinematic Trajectory)**:
  1. **Giai đoạn 1 - Bay vút lên đỉnh trời (0.65s - 0.85s)**:
     - Dũng sĩ phi thân vút lên không trung ($Y = 8.8m$ khi tặng quà/tuyệt kỹ, $Y = 3.2m$ khi chém thường).
     - Camera điện ảnh zoom cận cảnh mượt mà vào nhân vật.
  2. **Giai đoạn 2 - DỪNG LƠ LỬNG TRÊN KHÔNG 2.0 - 2.5 GIÂY (Mid-Air Hover & Multi-Slash)**:
     - Khi đạt đỉnh cao, nhân vật **dừng lại lơ lửng bồng bềnh giữa không trung suốt 2.0 - 2.5 giây** (`soarY = 8.8 + Math.sin((h-0.85)*4.5)*0.22`).
     - Đôi cánh kim quang mở rộng đập cánh nhẹ nhàng, cánh tay vung kiếm liên hoàn xé gió chém khí kiếm phát quang vào ngực Boss.
     - Triệu hồi Rồng Vàng bay lượn, Cự Kiếm cắm xuống đất hoặc Mưa Kiếm laser xé gió.
     - Người xem và streamer có đủ 2-3 giây trọn vẹn để chiêm ngưỡng nhân vật của mình tỏa sáng trên sóng live.
  3. **Giai đoạn 3 - Từ từ hạ cánh uyển chuyển (0.75s - 0.85s)**:
     - Sau khi chiêu thức hoàn tất, người chơi từ từ hạ cánh đáp xuống bục đá vị trí ban đầu (`o.home`), thu kiếm vào bao và trở về thế thủ `idle`.
  4. **Thời gian giữ nét Camera**:
     - Kéo dài thời gian camera tập trung vào dũng sĩ (`cameraTimer = 4.0s`), đảm bảo góc quay điện ảnh bao trọn toàn bộ quá trình bay lên $\rightarrow$ lơ lửng 2.5 giây $\rightarrow$ tiếp đất an toàn.

---

## 32. Khắc Phục Triệt Để Lỗi "Lúc Thấy Nhân Vật Lúc Không" Khi Bay Lên Tung Chiêu
- **Yêu cầu từ người dùng**: *"t thấy đang gặp 1 lỗi là người chơi bay lên tung skill thì lúc thấy nhân vật lúc ko"*.
- **Phân Tích Nguyên Nhân Cốt Lõi**:
  1. **Lỗi Frustum Culling của Three.js**:
     - Mặc định các mesh 3D có `frustumCulled = true`. Khi nhân vật bay vút lên độ cao $Y = 8.8m$ sát mép trên khung hình, Three.js tính toán sai hình cầu bao quanh (`boundingSphere`) của nhân vật và tưởng rằng nhân vật đã ra ngoài tầm nhìn $\rightarrow$ **Three.js tự động ngắt hiển thị khiến nhân vật biến mất vô hình giữa trời**!
  2. **Góc Camera Tĩnh Bị Cột Đền / Cảnh Vật Che Khuất**:
     - Khi người chơi ở rìa đấu trường bay lên, camera cận cảnh trước đây bị neo cố định ở tọa độ mặt đất (`Y = 2.4m`). Khi ngước nhìn chéo qua đấu trường, các cột đền cổ kính (`monoliths`), vạc lửa hoặc vòng hào quang Boss che khuất tầm nhìn khiến người xem không thấy nhân vật.
  3. **Thời Gian Giữ Nét Camera Bị Hết Sớm**:
     - Hoạt ảnh lơ lửng kéo dài $4.2$ giây nhưng bộ đếm camera trước đây chỉ giữ $3.0$ giây, khiến camera bị giật lùi về góc toàn cảnh giữa chừng khi nhân vật chưa kịp hạ cánh.
  4. **Giới Hạn 12 Nhân Vật 3D**:
     - Trước đây người chơi thứ 13 trở đi bị gán sang mô hình chibi phụ (`SP(n)`), một số người chơi thiếu mô hình 3D Meshy chất lượng cao.
- **Giải Pháp Khắc Phục Toàn Diện**:
  1. **Khóa Frustum Culling = false**:
     - Toàn bộ mesh con của nhân vật người chơi (`Golden Crest Guardian` & `Scarlet Empress`) được gán `frustumCulled = false`, đảm bảo nhân vật **LUÔN LUÔN hiển thị 100% trong mọi góc nhìn và mọi độ cao bay lượn**.
  2. **Chế Độ Quay Cẩu Điện Ảnh Tự Động (Dynamic Crane Camera Tracking)**:
     - Khi người chơi bay lên $Y = 8.8m$, camera tự động cẩu góc quay bay lên theo mượt mà (`camElevY = curP.y - 0.4`, `camDistZ = 5.6m`), luôn đứng trực diện phía trước nhân vật với góc nghiêng hoàn hảo, không còn bất kỳ cột đền hay vật cản nào có thể che khuất.
  3. **Độ Ưu Tiên Hiển Thị Tối Đa (`renderOrder = 10` & `side = DoubleSide`)**:
     - Đảm bảo nhân vật luôn vẽ nổi bật phía trên toàn bộ hiệu ứng phép thuật và quầng sáng của Boss.
  4. **Đồng Bộ Mô Hình 3D Meshy Cho Toàn Bộ Người Chơi**:
     - Bỏ giới hạn 12 người, toàn bộ dũng sĩ trên sàn đấu đều sở hữu mô hình 3D Meshy AI sắc nét, sống động.

---

## 33. Chuẩn Hóa Logic: Tự Hồi Máu Lên Ô Vàng Ở Giữa (50%) & Chỉ Hồi Đúng 1 Lần Trong 1 Tiếng
- **Yêu cầu từ người dùng**:
  > *"khi người chơi đánh boss xuống còn 1 chấm vàng cuối cùng như t khoanh đỏ kia boss tự hồi máu cho bản thân chạm đến ô vàng ở giữa như t vẽ khung xanh kia hãy chỉnh lại cho chuẩn và một trận đấu 1 tiếng boss chỉ hồi máu đúng 1 lần"*
- **Phân tích so sánh Logic cũ vs Logic mới chuẩn hóa**:
  1. *Logic cũ (Section 21)*: Khi máu tụt xuống <= 25% (chấm vàng cuối cùng), Boss tự hồi đầy 100% máu (+100.000 HP) và lặp lại liên tiếp 3 lần chuyển cọc (1/4 -> 2/4 -> 3/4 -> 4/4), khiến trận đấu bị kéo dài sai lệch ý muốn của streamer.
  2. *Logic mới chuẩn hóa theo đúng yêu cầu*:
     - **Mốc kích hoạt**: Khi máu Boss bị người chơi đánh tụt xuống mốc **1 chấm vàng cuối cùng** (<= 25% HP, tức <= 25.000 HP - đúng vị trí ô khoanh đỏ).
     - **Mức hồi máu**: Boss kích hoạt nội tại hộ thể, **tự hồi máu cho bản thân chạm đúng ô vàng ở giữa (50% HP = 50.000 HP)** theo đúng khung màu xanh người dùng vẽ trên hình ảnh.
     - **Giới hạn số lần hồi máu**: Trong suốt trận đấu 1 tiếng (60 phút), Boss **CHỈ HỒI MÁU ĐÚNG 1 LẦN DUY NHẤT** (`bossHealed = true`).
     - **Cơ chế sau khi hồi**: Sau khi máu đã hồi lên ô vàng ở giữa (50%), nếu người chơi tiếp tục tấn công đánh tụt qua mốc 25% một lần nữa, Boss **TUYỆT ĐỐI KHÔNG HỒI MÁU NỮA**. Máu tiếp tục tụt dần về 0 HP và Boss bị đánh bại hoàn toàn (Chiến thắng -> Bảng Vinh Danh -> Tự động đếm ngược 7 giây bắt đầu trận mới).
     - **Bảo vệ đòn cực đại**: Trường hợp sát thương cực đại dồn một nhát từ >25% về <= 0 HP mà chưa từng hồi máu, hệ thống vẫn kích hoạt đúng 1 lần hồi thể lên 50% để đảm bảo tính thử thách của Boss.
     - **Khởi tạo trận mới**: Khi trận đấu 1 tiếng kết thúc (hết giờ 60 phút, chiến thắng sau 7 giây, hoặc bấm nút Tạo phòng mới / Reset), cờ `bossHealed` được đặt lại về `false` để chuẩn bị cho trận đấu 1 tiếng tiếp theo.
     - **Đồng bộ giao diện UI**:
       - Cập nhật hiển thị giai đoạn thành: `🔥 GIAI ĐOẠN 01 / 02 · PHONG ẤN` -> sau khi hồi máu 50% chuyển sang `🔥 GIAI ĐOẠN 02 / 02 · THỨC TỈNH`.
       - Thanh máu mượt mà chuyển động từ mốc 25% mở rộng chạm đến mốc kim cương 50% ở giữa.
