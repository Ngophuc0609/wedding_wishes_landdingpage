// QR code, countdown, Google Maps, share, chart features
// Tính năng demo, chưa cần dùng DB

// QR code tạo bằng thư viện qrious
function renderQRCode(link) {
    const qrDiv = document.getElementById('qr-code');
    if (!qrDiv) return;
    const qr = new QRious({
        element: qrDiv,
        value: link,
        size: 150,
        background: 'white',
        foreground: '#d63384'
    });
}

// Countdown
function renderCountdown(targetDate) {
    const countdownDiv = document.getElementById('countdown');
    if (!countdownDiv) return;
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) {
            countdownDiv.innerHTML = 'Đã đến ngày cưới!';
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        countdownDiv.innerHTML = `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Google Maps embed
function renderMap() {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;
    mapDiv.innerHTML = '<iframe src="https://www.google.com/maps?q=Nhà+hàng+Tiệc+cưới+ABC,+Quận+1,+TP.+HCM&output=embed" width="100%" height="250" style="border:0;border-radius:10px;"></iframe>';
}

// Share buttons
function renderShareButtons(link) {
    const shareDiv = document.getElementById('share');
    if (!shareDiv) return;
    shareDiv.innerHTML = `
        <button onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}')">Chia sẻ Facebook</button>
        <button onclick="window.open('https://zalo.me/share?url=${encodeURIComponent(link)}')">Chia sẻ Zalo</button>
    `;
}

// Biểu đồ demo (Chart.js)
function renderChart() {
    const chartDiv = document.getElementById('chart');
    if (!chartDiv) return;
    chartDiv.innerHTML = '<canvas id="wishChart" width="300" height="150"></canvas>';
    const ctx = document.getElementById('wishChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tích cực', 'Trung lập', 'Tiêu cực'],
            datasets: [{
                label: 'Lời chúc',
                data: [12, 3, 1], // demo
                backgroundColor: ['#d63384', '#ffe3e3', '#4a4a4a']
            }]
        }
    });
}
