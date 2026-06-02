# 📚 Hệ Thống Thư Viện Số

Ứng dụng web quản lý thư viện hiện đại với **2 vai trò: Độc giả & Thủ thư**, được xây dựng theo quy trình Công nghệ Phần mềm.

---

## 🎯 Quy Trình Công Nghệ Phần Mềm

### **1. Xác Định Yêu Cầu** ✅
- Hệ thống thư viện số với 2 vai trò chính: **Độc giả** và **Thủ thư**
- Chức năng cho Độc giả: Tra cứu sách, Mượn sách, Trả sách, Gia hạn, Đặt trước
- Chức năng cho Thủ thư: Quản lý độc giả, Thêm sách mới, Xác nhận trả, Báo cáo thống kê

### **2. Phân Tích** ✅
- Mô hình UML với 2 actor: Độc giả và Thủ thư
- Mỗi actor có các chức năng riêng biệt
- Dữ liệu lưu trữ ở Local Storage (client-side) - không cần backend

### **3. Thiết Kế** ✅
- Công nghệ: React 18 + Vite
- State management: Context API
- UI/UX: Modern gradient design với responsive layout hoàn toàn

### **4. Hiện Thực** ✅
- ✅ Component Login với lựa chọn vai trò + menu nhanh
- ✅ Component Tra cứu sách cho Độc giả (Tìm kiếm, Chi tiết)
- ✅ Component Mượn/Trả sách cho Độc giả (Mượn, Trả, Gia hạn, Đặt trước)
- ✅ Component Quản lý sách cho Thủ thư (Thêm, Xóa, Quản lý thể loại)
- ✅ Component Xác nhận trả sách cho Thủ thư
- ✅ Component Báo cáo thống kê cho Thủ thư

### **5. Kiểm Thử** 📝
- ✅ Test tra cứu sách theo tên/tác giả/thể loại
- ✅ Test thêm sách mới
- ✅ Test mượn/trả/gia hạn sách
- ⏳ Cần test đầy đủ với nhiều scenario

---

## 🚀 Cách Chạy Ứng Dụng

```bash
cd /home/kienhoa/Coding/thuvien-so

# Cài đặt dependencies (đã làm)
npm install

# Chạy development server
npm run dev
```

Sau đó mở trình duyệt và truy cập vào URL được hiển thị.

---

## 📖 Chức Năng Chính

### **👤 Độc Giả**

#### 1️⃣ Tra cứu sách
- 🔍 Tìm kiếm sách theo: tên sách, tác giả, thể loại
- 📚 Xem danh sách sách với thông tin chi tiết
- 🏷️ Lọc theo thể loại

#### 2️⃣ Mượn sách
- 📖 Mượn sách khi còn số lượng
- ⏰ Thời hạn mượn: **14 ngày**
- 👤 Nhập tên và ID độc giả
- 📅 Xem ngày mượn và hạn trả

#### 3️⃣ Trả sách
- ✅ Trả sách đã mượn
- 🔄 Hệ thống tự động cập nhật số lượng bản có sẵn

#### 4️⃣ Gia hạn thời gian
- 🔄 Gia hạn thêm **7 ngày**
- ⏰ Chỉ được gia hạn khi chưa quá hạn trả

#### 5️⃣ Đặt trước sách
- ⏳ Đặt trước sách đang bị mượn
- 📋 Xem danh sách đặt trước
- 🔔 Thông báo khi sách được trả về

---

### **👨‍💼 Thủ Thư**

#### 1️⃣ Quản lý độc giả
- 👥 Nhập tên và ID độc giả khi mượn sách
- 📝 Lưu thông tin độc giả tự động

#### 2️⃣ Thêm sách mới vào thư viện
- ➕ Form thêm sách với đầy đủ thông tin:
  - Tên sách, Tác giả
  - Thể loại (6 thể loại)
  - Số lượng bản, Vị trí kệ
- 📚 Dữ liệu tự động lưu vào Local Storage

#### 3️⃣ Xác nhận trả sách
- ✅ Danh sách sách đang mượn
- 🔍 Xem thông tin độc giả đã mượn
- ⏰ Kiểm tra hạn trả
- 🔄 Xác nhận trả để cập nhật số lượng

#### 4️⃣ Lập báo cáo thống kê
- 📊 Thống kê tổng quan:
  - Tổng số sách, bản còn lại, đang mượn
  - Tỷ lệ mượn theo thể loại
- 🏷️ Lọc theo thể loại và thời gian
- 📥 Xuất báo cáo (PDF/Excel)

#### 5️⃣ Quản lý danh mục thể loại
- 🏷️ 6 thể loại:
  - Truyện thiếu nhi
  - Tiểu thuyết
  - Khoa học
  - Sử học
  - Giáo dục
  - Kinh điển
- ✏️ Có thể thêm/sửa sau

---

## 🛠️ Công Nghệ Sử Dụng

| Công nghệ | Mục đích |
|-----------|----------|
| **React 18** | Framework frontend hiện đại |
| **Vite** | Build tool siêu nhanh |
| **Context API** | State management toàn cục |
| **Local Storage** | Lưu trữ dữ liệu client-side |
| **CSS3** | Styling với gradient & responsive |
| **React Router** | Navigation giữa các trang |

---

## 📂 Cấu Trúc Dự Án

```
thuvien-so/
├── src/
│   ├── components/
│   │   ├── docgia/
│   │   │   ├── DocGiaTraCuu.jsx       ✅ Tìm kiếm sách
│   │   │   └── DocGiaMMuonTra.jsx     ✅ Mượn/Trả/Gia hạn
│   │   ├── thuthu/
│   │   │   ├── ThuthuQuanLySach.jsx   ✅ Thêm/Xóa sách
│   │   │   ├── ThuthuXacNhanTra.jsx   ✅ Xác nhận trả
│   │   │   └── ThuthuBaoCao.jsx       ✅ Báo cáo thống kê
│   │   └── Login.jsx                  ✅ Đăng nhập + Menu
│   ├── context/
│   │   └── AppContext.jsx             ✅ State management
│   ├── data/
│   │   └── books.js                   ✅ Dữ liệu mẫu (8 cuốn)
│   ├── styles/
│   │   └── App.css                    ✅ CSS styling
│   ├── App.jsx                        ✅ Main app component
│   └── main.jsx                       ✅ Entry point
├── index.html
├── package.json
└── README.md
```

---

## 🎨 Giao Diện

### **Trang đăng nhập**
- Chọn vai trò: Độc giả / Thủ thư
- Nhập thông tin tên và ID
- Menu nhanh để truy cập chức năng

### **Trang tra cứu sách (Độc giả)**
- Thanh tìm kiếm nổi bật
- Danh sách sách với status còn/số
- Modal chi tiết sách với các thao tác

### **Trang mượn/trả (Độc giả)**
- Xem sách đang mượn của mình
- Mượn/Trả/Gia hạn trực tiếp
- Đặt trước sách đang bị mượn

### **Trang quản lý sách (Thủ thư)**
- Form thêm sách đầy đủ
- Danh sách sách với thông tin chi tiết
- Xóa sách, quản lý thể loại

### **Trang xác nhận trả (Thủ thư)**
- Danh sách sách đang mượn cần xử lý
- Xem thông tin độc giả đã mượn
- Xác nhận trả nhanh

### **Trang báo cáo thống kê (Thủ thư)**
- Thống kê tổng quan 4 chỉ số
- Chi tiết theo thể loại
- Tỷ lệ mượn, danh sách sách
- Lọc theo thời gian

---

## ⚠️ Lưu Ý Quan Trọng

1. **Dữ liệu Local Storage**: Tất cả dữ liệu được lưu trong trình duyệt
   - Dữ liệu sẽ mất khi xóa cache hoặc khởi động lại máy
   - Để reset: Mở DevTools → Application → Local Storage → Clear

2. **Thời gian mượn**: Mặc định 14 ngày, có thể gia hạn thêm 7 ngày

3. **Số lượng bản**: Hệ thống tự động kiểm tra còn số lượng trước khi mượn

4. **Đặt trước**: Khi sách được trả, độc giả đặt trước sẽ được ưu tiên mượn

---

## 📱 Responsive Design

- ✅ Desktop: Grid layout với nhiều cột
- ✅ Tablet: Tự động điều chỉnh số cột
- ✅ Mobile: 1 cột, menu đầy đủ

---

## 🎯 Kế Hoặc Phát Triển

Các tính năng có thể thêm sau này:
- 🔐 Đăng nhập thật (JWT/Auth0)
- 💾 Backend API (Node.js/Python)
- 📧 Gửi email thông báo đặt trước
- 🖨️ Xuất báo cáo PDF/Excel thật
- 📊 Biểu đồ thống kê (Chart.js)

---

**Phát triển bởi**: kienhoa 🌸  
**Ngày**: Tháng 6/2024  
**Công nghệ**: React + Vite + Local Storage
