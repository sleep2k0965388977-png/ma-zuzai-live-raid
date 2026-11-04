# HƯỚNG DẪN TRIỂN KHAI ONLINE & VPS CHO GAME MA ZUZAI 3D LIVE RAID
> *(Được đồng bộ cấu hình chuẩn 100% theo mẫu của App Chuyển Văn Bản Thành Giọng Nói `sleep2k`)*

Mã nguồn dự án đã được đồng bộ và đẩy lên GitHub cá nhân của bạn:
👉 **GitHub Repo:** `https://github.com/sleep2k0965388977-png/ma-zuzai-live-raid`

---

## CÁCH 1: Triển khai lên Railway (Khuyên dùng - Giống hệt App TTS `sleep2k`)
*(Không tốn 1% CPU/RAM của máy tính bạn, server chạy trên Cloud 24/7)*

1. Truy cập vào trang quản trị **Railway**: [railway.app](https://railway.app)
2. Bấm nút **"+ New Project"** -> Chọn **"Deploy from GitHub repo"**.
3. Chọn kho mã nguồn: **`sleep2k0965388977-png/ma-zuzai-live-raid`**.
4. Bấm **"Deploy Now"**.
   - Railway sẽ tự động nhận diện file `Dockerfile` và `Procfile`.
   - Cài đặt các gói `npm install` và khởi chạy server trên cổng đám mây.
5. Sau khi Deploy hoàn tất (khoảng 1 phút):
   - Vào tab **Settings** -> mục **Networking** -> Bấm **Generate Domain**.
   - Bạn sẽ nhận được đường dẫn dạng: `https://ma-zuzai-live-raid.up.railway.app`.
   - Mở link trên bất kỳ máy tính, điện thoại hoặc phần mềm OBS nào để phát LIVE!

---

## CÁCH 2: Triển khai lên Render (Miễn phí)
1. Truy cập [render.com](https://render.com) -> Đăng nhập bằng tài khoản GitHub.
2. Bấm **"New +"** -> Chọn **"Web Service"**.
3. Chọn repo `ma-zuzai-live-raid`.
4. Render sẽ tự động đọc file `render.yaml` có sẵn trong dự án:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Bấm **"Create Web Service"** và đợi khoảng 1-2 phút là có link chạy ngay.

---

## CÁCH 3: Triển khai lên VPS riêng (Ubuntu / Debian / Linux)

Nếu bạn có máy chủ VPS cá nhân (DigitalOcean, Vultr, Linode, OVH, v.v.):

### 1. Cài đặt môi trường trên VPS (nếu chưa có):
```bash
sudo apt update && sudo apt install -y git curl docker.io docker-compose
```

### 2. Kéo mã nguồn về VPS:
```bash
git clone https://github.com/sleep2k0965388977-png/ma-zuzai-live-raid.git
cd ma-zuzai-live-raid
```

### 3. Chạy bằng Docker (Khuyên dùng):
```bash
docker-compose up -d --build
```
> Trò chơi sẽ chạy nền 24/7 trên cổng `3000`. Truy cập qua `http://IP_VPS_CUA_BAN:3000`.

### Hoặc chạy bằng PM2 (Node.js):
```bash
npm install
sudo npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## CÁCH 4: Chạy Server Online nhanh với Cloudflare Tunnel (1 Click)
*(Tương tự file `chay_server_online.bat` của app TTS)*

Trong thư mục dự án trên máy tính của bạn:
1. Nhấp đúp chuột vào file:
   **`chay_server_online.bat`**
2. Cửa sổ dòng lệnh sẽ tự động khởi động máy chủ và tạo một đường dẫn HTTPS Cloudflare an toàn miễn phí (dạng `https://xxxx.trycloudflare.com`).
3. Trình duyệt sẽ tự động mở trang web game lên. Bạn có thể sao chép đường link này gửi sang máy khác hoặc nạp vào OBS.

---

## CÁC TÍNH NĂNG TỰ ĐỘNG ĐÃ TÍCH HỢP SẴN:
- **Tự động nhận diện giao thức WebSocket:** 
  - Khi chạy trên link HTTPS (Railway, Render, VPS SSL), client tự động chuyển sang `wss://domain/ws`.
  - Khi chạy local hoặc IP thường, tự động kết nối cổng thích hợp.
- **Tất cả trong 1 (All-in-One Server):** Cả Web Game Three.js và TikTok Live Bridge đều được hợp nhất trong `server.js` (không cần chạy 2 cửa sổ riêng biệt).
- **Chế độ máy yếu siêu nhẹ:** Giúp OBS bắt link web mượt mà, không giật lag.
