// CẤU HÌNH SUPABASE
const SB_URL = "https://wkdniqwwjvuifkubbrgu.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZG5pcXd3anZ1aWZrdWJicmd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNzE0MTIsImV4cCI6MjA4NzY0NzQxMn0.6hIZa3gRL2uVjBGvrFY50iK1Wl0rbyGZm6CXOClpg2E";

const _supabase = supabase.createClient(SB_URL, SB_KEY);

// Preview ảnh trước khi upload
function previewImage(input) {
    const preview = document.getElementById('imagePreview');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview" class="preview-img">`;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Upload ảnh lên Supabase Storage
async function uploadImage(file) {
    if (!file) return null;

    try {
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await _supabase.storage
            .from('wedding_wishes')
            .upload(`images/${fileName}`, file);

        if (error) {
            console.error('Upload error: ', error);
            alert('Lỗi upload ảnh: ' + error.message);
            return null;
        }

        const { data: url } = _supabase.storage
            .from('wedding_wishes')
            .getPublicUrl(`images/${fileName}`);

        return url.publicUrl;
    } catch (err) {
        console.error('Upload exception: ', err);
        return null;
    }
}

// Lấy danh sách lời chúc
async function fetchWishes() {
    try {
        const { data, error } = await _supabase
            .from('wedding_wishes')
            .select(' * ')
            .order('created_at', { ascending: false });

        const wishList = document.getElementById('wish - list');
        const loading = document.getElementById('loading');

        if (loading) {
            loading.style.display = 'none';
        }

        if (error) {
            console.error('Fetch error: ', error);
            wishList.innerHTML = ' < h3 > Lời chúc từ mọi người:</h3 > <p style="text-align:center;color:#999;">Không thể tải lời chúc. Vui lòng kiểm tra kết nối.</p>';
            return;
        }

        if (data && data.length > 0) {
            const html = data.map(w => `
                <div class="wish-item">
                    <div class="guest-name"> ${w.guest_name}</div>
                    <div class="wish-text">"${w.message}"</div>
                    ${w.image_url ? `<img src="${w.image_url}" alt="Gift">` : ''}
                </div >
            `).join('');
            wishList.innerHTML = '<h3> Lời chúc từ mọi người:</h3>' + html;
        } else {
            wishList.innerHTML = '<h3> Lời chúc từ mọi người:</h3><p style="text-align:center;color:#999;">Chưa có lời chúc nào. Hãy là người đầu tiên!</p>';
        }
    } catch (err) {
        console.error('Fetch exception:', err);
    }
}

// Gửi lời chúc kèm ảnh
async function sendWish() {
    try {
        const name = document.getElementById('guestName').value.trim();
        const msg = document.getElementById('guestMessage').value.trim();
        const fileInput = document.getElementById('guestImage');

        if (!name || !msg) {
            alert("Vui lòng nhập đủ tên và lời chúc nha!");
            return;
        }

        // Upload ảnh nếu có
        let imageUrl = null;
        if (fileInput.files[0]) {
            imageUrl = await uploadImage(fileInput.files[0]);
        }

        // Lưu vào database
        const { error } = await _supabase
            .from('wedding_wishes')
            .insert([{
                guest_name: name,
                message: msg,
                image_url: imageUrl
            }]);

        if (error) {
            alert("Có lỗi xảy ra: " + error.message);
        } else {
            alert("Cảm ơn lời chúc đặc biệt của bạn! ");
            document.getElementById('guestName').value = "";
            document.getElementById('guestMessage').value = "";
            document.getElementById('guestImage').value = "";
            document.getElementById('imagePreview').innerHTML = "";
            fetchWishes();
        }
    } catch (err) {
        console.error('Send wish exception:', err);
        alert("Có lỗi xảy ra!");
    }
}

// Real-time subscription (lắng nghe lời chúc mới)
function setupRealtime() {
    try {
        const subscription = _supabase
            .from('wedding_wishes')
            .on('*', payload => {
                console.log('New wish received:', payload);
                fetchWishes();
            })
            .subscribe();
    } catch (err) {
        console.warn('Real-time subscription setup warning:', err);
    }
}

// Khởi động
fetchWishes();
setupRealtime();
