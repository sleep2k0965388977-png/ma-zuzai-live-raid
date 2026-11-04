# 🚀 HƯỚNG DẪN DEPLOY LÊN GITHUB & VPS (TỪ A ĐẾN Z)
**Dự án**: Đấu trường Live Raid 3D Boss Thượng Cổ - MA ZUZAI  
**Mục tiêu**: Đẩy toàn bộ máy chủ Web và Cầu nối TikTok LIVE lên VPS để máy tính cá nhân nhẹ hoàn toàn 100%!

---

## 📌 BƯỚC 1: Đẩy Toàn Bộ Mã Nguồn Lên GitHub

1. Truy cập vào **[https://github.com](https://github.com)** và đăng nhập.
2. Bấm nút **"New repository"** (Tạo kho lưu trữ mới):
   - Đặt tên Repository: ví dụ `ma-zuzai-live-raid`
   - Chọn chế độ: **Public** hoặc **Private**
   - Không tick vào "Add a README file"
   - Bấm **"Create repository"**
3. Sao chép link Git URL của kho vừa tạo (ví dụ: `https://github.com/username/ma-zuzai-live-raid.git`).
4. Mở PowerShell hoặc Terminal trên máy tính, chạy 3 lệnh sau:

```bash
cd "D:\1-20261103T120058Z-1-001\1"
git remote add origin https://github.com/username/ma-zuzai-live-raid.git
git branch -M main
git push -u origin main
```
*(Toàn bộ 100+ files, mô hình 3D, server.js và web game sẽ được đưa lên GitHub an toàn 100%)*

---

## 📌 BƯỚC 2: Cài Đặt & Chạy Game Trên VPS (Ubuntu Linux)

Khi bạn thuê 1 VPS (ví dụ: Vultr, DigitalOcean, Linode, Hetzner, Vietnix, TinoHost...):

### Cách 1: Chạy Siêu Đơn Giản Bằng PM2 (Khuyên Dùng)

Kết nối vào VPS bằng SSH qua Terminal/PuTTY:
```bash
# 1. Cập nhật hệ thống & cài đặt Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git

# 2. Cài đặt PM2 (Quản lý tiến trình tự khởi động lại khi crash hoặc reboot)
sudo npm install -g pm2

# 3. Clone mã nguồn từ GitHub về VPS
git clone https://github.com/username/ma-zuzai-live-raid.git
cd ma-zuzai-live-raid

# 4. Cài đặt thư viện
npm install

# 5. Khởi động hệ thống chạy ngầm 24/7 bằng 1 lệnh duy nhất:
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Cách 2: Chạy Bằng Docker (Nếu VPS Đã Có Docker)
```bash
git clone https://github.com/username/ma-zuzai-live-raid.git
cd ma-zuzai-live-raid
docker compose up -d --build
```

---

## 📌 BƯỚC 3: Mở Cổng Firewall Trên VPS

Để người ngoài và máy tính của bạn truy cập được vào VPS:
```bash
sudo ufw allow 3000/tcp
sudo ufw allow 8081/tcp
sudo ufw reload
```

---

## 📌 BƯỚC 4: Trải Nghiệm & Lên Sóng Live Stream

1. Trên máy tính của bạn, mở trình duyệt và truy cập:
   👉 **`http://<IP_VPS_CỦA_BẠN>:3000`** (ví dụ: `http://103.123.45.67:3000`)
2. Bấm nút **[ 🔗 Kết Nối Phòng LIVE ]** nhập `@username` kênh của bạn.
3. Lúc này:
   - **Máy chủ VPS gánh 100%**: Xử lý Webcast TikTok, nhận hàng trăm nghìn bình luận, phân phối mạng.
   - **Máy tính của bạn**: Chỉ cần mở màn hình và đưa vào OBS / TikTok LIVE Studio, quạt êm ru, CPU mát rượi, 60 FPS mượt mà!

---

## 📌 Tùy Chọn Thêm Tên Miền & SSL (HTTPS & WSS) Với Nginx
Nếu bạn có tên miền riêng (ví dụ `raid.mychannel.com`), chỉ cần cài Nginx và trỏ proxy:
```nginx
server {
    listen 80;
    server_name raid.mychannel.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```
Sau đó chạy `sudo certbot --nginx -d raid.mychannel.com` để có SSL miễn phí (`https://` và `wss://`).
Trò chơi đã được tích hợp sẵn khả năng tự nhận diện `wss://` tự động mà không cần sửa code!
