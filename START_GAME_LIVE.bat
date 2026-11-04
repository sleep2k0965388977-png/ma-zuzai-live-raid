@echo off
chcp 65001 > nul
title MA ZUZAI 3D - TIKTOK LIVE LAUNCHER

echo ========================================================
echo   🔥 MA ZUZAI 3D LIVE RAID - TIKTOK LAUNCHER 🔥
echo ========================================================
echo.
echo [1/2] Đang khởi động TikTok Bridge Server (Cổng 8081)...
start "TikTok Bridge Server" cmd /k "node tiktok_bridge.js"

echo [2/2] Đang khởi động Web Server Game 3D (Cổng 3000)...
start "Web Game Server" cmd /k "python -m http.server 3000"

timeout /t 2 > nul
echo.
echo [3/3] Đang mở trình duyệt Game 3D...
start http://localhost:3000

echo.
echo ========================================================
echo   ✅ TẤT CẢ ĐÃ KHỞI CHẠY THÀNH CÔNG!
echo   - Web Game: http://localhost:3000
echo   - TikTok Bridge: ws://localhost:8081
echo   (Vui lòng không đóng 2 cửa sổ màu đen đang chạy ngầm)
echo ========================================================
echo.
pause
