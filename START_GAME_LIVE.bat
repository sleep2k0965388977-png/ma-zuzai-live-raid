@echo off
chcp 65001 > nul
title MA ZUZAI 3D - TIKTOK LIVE LAUNCHER

echo ========================================================
echo   🔥 MA ZUZAI 3D LIVE RAID - TIKTOK LIVE LAUNCHER 🔥
echo ========================================================
echo.

:: 1. Kiểm tra Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [LỖI] Chưa cài đặt Node.js!
    echo Vui lòng tải và cài đặt Node.js từ: https://nodejs.org/ (bản LTS)
    echo Sau khi cài xong, mở lại file này.
    pause
    exit /b
)

:: 2. Kiểm tra và tự động cài đặt thư viện nếu chưa có
if not exist "node_modules\tiktok-live-connector" (
    echo [1/3] Đang tự động cài đặt các thư viện cần thiết (chỉ chạy lần đầu)...
    call npm install
    if %errorlevel% neq 0 (
        echo [LỖI] Cài đặt thư viện thất bại! Vui lòng kiểm tra kết nối mạng.
        pause
        exit /b
    )
    echo [OK] Đã cài đặt xong thư viện!
    echo.
)

:: 3. Khởi chạy Server All-in-One (Web Game 3D cổng 3000 + TikTok Bridge cổng 8081)
echo [2/3] Đang khởi động Máy chủ Game 3D & Cầu Nối TikTok...
start "MA ZUZAI Server (Web + TikTok Bridge)" cmd /k "node server.js"

:: 4. Chờ 2 giây để server sẵn sàng rồi tự động mở trình duyệt
timeout /t 2 > nul
echo.
echo [3/3] Đang mở trình duyệt Game 3D...
start http://localhost:3000

echo.
echo ========================================================
echo   ✅ TẤT CẢ ĐÃ KHỞI CHẠY THÀNH CÔNG!
echo   - Web Game 3D: http://localhost:3000
echo   - Cầu Nối TikTok LIVE: ws://localhost:8081
echo.
echo   HƯỚNG DẪN KẾT NỐI TIKTOK LIVE:
echo   1. Bật phát trực tiếp trên TikTok (bằng điện thoại hoặc TikTok Studio)
echo   2. Trên màn hình Game: Nhập username kênh vào ô 'Tên người xem'
echo   3. Bấm nút màu tím: [ 🔗 Kết Nối Phòng LIVE @Tên người xem ]
echo.
echo   (Vui lòng không đóng cửa sổ terminal màu đen đang chạy ngầm)
echo ========================================================
echo.
pause
