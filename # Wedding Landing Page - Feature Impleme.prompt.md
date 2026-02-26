# Wedding Landing Page - Feature Implementation Plan

## 🎯 Priority: Image Upload First + Modern & Simple UI

---

## 📋 Implementation Files

### 1️⃣ **assets/css/style.css** - Modern & Clean Design

**Key Features:**
- Modern sans-serif fonts
- Gradient backgrounds
- Smooth transitions & hover effects
- Mobile responsive
- Card-based layout

**Color Scheme:**
- Primary: #d63384 (Pink)
- Secondary: #667eea → #764ba2 (Purple gradient for social buttons)
- Background: Gradient from #fff5f5 to #ffe8ec
- Text: #2c3e50 (Dark blue-gray)

**Components:**
- Header with countdown & QR code
- Info section with embedded Google Maps
- Wish form with file upload preview
- Wish list cards with image support
- Share buttons section
- Chart section for statistics

---

### 2️⃣ **assets/js/main.js** - Supabase Integration + Image Handling

**Core Functions:**
- `previewImage(input)` - Preview images before upload
- `uploadImage(file)` - Upload to Supabase Storage
- `fetchWishes()` - Retrieve wishes from database
- `sendWish()` - Save wish with optional image
- `setupRealtime()` - Listen for new wishes in real-time

**Database Schema (wedding_wishes table):**
```
- id: UUID (primary key)
- guest_name: TEXT
- message: TEXT
- image_url: TEXT (nullable)
- created_at: TIMESTAMP
```

**Storage:**
- Bucket name: `wedding_wishes`
- Path: `images/{timestamp}_{filename}`

---

### 3️⃣ **Index.html** - Main Page Structure

**Key Sections:**
1. **Header**
   - Couple names
   - Date & time
   - Countdown (real-time)
   - QR Code (canvas element)

2. **Info Section**
   - Location & time details
   - Google Maps embed

3. **Wish Section**
   - Name input
   - Message textarea
   - Image file upload with preview
   - Send button
   - Wish list display (with images)
   - Share buttons
   - Chart placeholder

4. **Scripts**
   - Supabase JS
   - QRious library
   - Chart.js
   - Custom features.js
   - Custom main.js

---

## 🛠 Remaining Features (features.js)

### QR Code
```javascript
renderQRCode(link) - Generate QR with qrious library
- Size: 150px
- Color: #d63384
```

### Countdown Timer
```javascript
renderCountdown(targetDate) - Live countdown to wedding
- Target: 2026-12-12 18:00:00
- Updates every 1 second
```

### Google Maps
```javascript
renderMap() - Embed Google Maps iframe
- Location: Nhà hàng Tiệc cưới ABC, Quận 1, TP. HCM
- Size: 100% width, 250px height
```

### Share Buttons
```javascript
renderShareButtons(link) - Social media sharing
- Facebook
- Zalo
- URL auto-populated
```

### Statistics Chart
```javascript
renderChart() - Bar chart of wish sentiment
- Using Chart.js
- Demo data: Positive, Neutral, Negative counts
- Will be replaced with real data from Supabase
```

---

## 📱 Future Enhancements

- [ ] Multi-language support (i18next)
- [ ] Real-time sentiment analysis for chart
- [ ] Email notifications
- [ ] Guest list management
- [ ] RSVP tracking
- [ ] Admin dashboard (edit couple info, moderate wishes)
- [ ] PDF invitation generation
- [ ] Wish search & filter

---

## 🚀 Deployment Checklist

- [ ] Create Supabase project
- [ ] Create `wedding_wishes` table
- [ ] Create `wedding_wishes` storage bucket
- [ ] Set RLS policies (public read, anonymous insert)
- [ ] Copy files to workspace
- [ ] Test locally
- [ ] Commit & push to GitHub
- [ ] Enable GitHub Pages (Settings → Pages)
- [ ] Verify live at: `https://Ngophuc0609.github.io/wedding_wishes_landdingpage/`

---

## 🔒 Security Notes

**Supabase RLS Policies:**
1. **wedding_wishes table:**
   - SELECT: Public (anyone can view)
   - INSERT: Public with validation
   - UPDATE/DELETE: Only authenticated users or policy-based
   
2. **wedding_wishes storage:**
   - Allow public uploads to `images/` folder
   - Read: Public
   - Write: Authenticated or public with size limits

---

## 📊 Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | HTML5 + CSS3 | Structure & styling |
| Features | JavaScript (vanilla) | QR, countdown, maps, charts |
| Database | Supabase (PostgreSQL) | Wish storage |
| Storage | Supabase Storage | Image hosting |
| Hosting | GitHub Pages | Free, No backend |
| Real-time | Supabase Realtime | Live wish updates |
| Libraries | QRious, Chart.js, Supabase-js | Feature enhancement |

---

## 💡 Key Decisions

✅ **HTML Instead of React/Next.js**
- GitHub Pages only serves static files
- No build process needed
- All features work with vanilla JS + CDN libraries
- Faster deployment

✅ **Supabase Instead of Firebase**
- Free storage + database
- PostgreSQL (more flexible)
- Real-time subscriptions
- Easy RLS configuration

✅ **Modern CSS Over Bootstrap**
- Custom styling for cohesive brand
- Gradient effects for elegance
- Smaller file size
- Better mobile responsiveness

✅ **Image Upload Support**
- Makes wishes more memorable
- Supabase Storage handles hosting
- Cost-effective (free tier generous)
