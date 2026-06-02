# 🧪 KẾ HOẠCH KIỂM THỬ HỆ THỐNG THƯ VIỆN SỐ

## 1. Kiểm Thử Chức Năng Độc Giả

### 1.1 Tra cứu sách ✅
**Test Case: TC-001 - Tìm kiếm sách theo tên**
- **Mô tả**: Nhập tên sách vào ô tìm kiếm
- **Dữ liệu**: "To Hả"
- **Kỳ vọng**: Hiển thị đúng 1 cuốn sách "To Hả" của Nguyễn Nhật Ánh
- **Kết quả**: ✅ ĐẠT

**Test Case: TC-002 - Tìm kiếm sách theo tác giả**
- **Mô tả**: Nhập tên tác giả vào ô tìm kiếm
- **Dữ liệu**: "Nguyễn Nhật Ánh"
- **Kỳ vọng**: Hiển thị 2 cuốn sách của Nguyễn Nhật Ánh
- **Kết quả**: ✅ ĐẠT

**Test Case: TC-003 - Tìm kiếm sách theo thể loại**
- **Mô tả**: Nhập thể loại vào ô tìm kiếm
- **Dữ liệu**: "Truyện thiếu nhi"
- **Kỳ vọng**: Hiển thị 3 cuốn sách thuộc thể loại này
- **Kết quả**: ✅ ĐẠT

### 1.2 Mượn sách ⏳
**Test Case: TC-004 - Mượn sách khi còn số lượng**
- **Mô tả**: Đăng nhập với tên "Nguyễn Văn A", ID "USER001", mượn sách "To Hả"
- **Dữ liệu đầu vào**: 
  - Tên: "Nguyễn Văn A"
  - ID: "USER001"
  - Sách: "To Hả" (còn 3/5 bản)
- **Kỳ vọng**: 
  - Số lượng còn giảm từ 3 → 2
  - Thông tin mượn được lưu (ngày mượn, hạn trả +14 ngày)
  - Hiển thị thông báo thành công
- **Kết quả**: ⏳ CẦN TEST

**Test Case: TC-005 - Không thể mượn khi hết số**
- **Mô tả**: Thử mượn sách khi availableCopies = 0
- **Dữ liệu đầu vào**: Sách "Đất nước gọi tên" (hết số)
- **Kỳ vọng**: Hiển thị thông báo lỗi, không thực hiện mượn
- **Kết quả**: ⏳ CẦN TEST

### 1.3 Trả sách ⏳
**Test Case: TC-006 - Trả sách thành công**
- **Mô tả**: Trả lại cuốn sách đã mượn
- **Kỳ vọng**: 
  - availableCopies quay về số lượng ban đầu
  - borrowedBy = null
  - borrowDate, dueDate = null
- **Kết quả**: ⏳ CẦN TEST

### 1.4 Gia hạn thời gian ⏳
**Test Case: TC-007 - Gia hạn 7 ngày**
- **Mô tả**: Gia hạn cuốn sách đang mượn thêm 7 ngày
- **Kỳ vọng**: dueDate tăng thêm 7 ngày
- **Kết quả**: ⏳ CẦN TEST

### 1.5 Đặt trước sách ⏳
**Test Case: TC-008 - Đặt trước sách đang bị mượn**
- **Mô tả**: Đặt trước cuốn sách hết số lượng
- **Kỳ vọng**: 
  - onHoldBy = tên độc giả
  - holdQueue được thêm vào
  - Hiển thị thông báo thành công
- **Kết quả**: ⏳ CẦN TEST

---

## 2. Kiểm Thử Chức Năng Thủ Thư

### 2.1 Quản lý sách ✅
**Test Case: TC-009 - Thêm sách mới**
- **Mô tả**: Thêm cuốn sách "Sách mới" của tác giả "Tác giả mới"
- **Dữ liệu đầu vào**: 
  - Tên: "Sách mới"
  - Tác giả: "Tác giả mới"
  - Thể loại: "Khoa học"
  - Số lượng: 3
  - Vị trí: "Kệ F-01"
- **Kỳ vọng**: 
  - Sách được thêm vào danh sách
  - availableCopies = totalCopies = 3
  - ID tự động gán (9)
- **Kết quả**: ✅ ĐẠT

**Test Case: TC-010 - Xóa sách**
- **Mô tả**: Xóa cuốn sách đã thêm
- **Kỳ vọng**: Sách bị xóa khỏi danh sách
- **Kết quả**: ⏳ CẦN TEST

### 2.2 Xác nhận trả sách ⏳
**Test Case: TC-011 - Xác nhận trả sách**
- **Mô tả**: Thủ thư xác nhận độc giả đã trả cuốn sách
- **Kỳ vọng**: availableCopies được cập nhật, thông tin mượn bị xóa
- **Kết quả**: ⏳ CẦN TEST

### 2.3 Báo cáo thống kê ⏳
**Test Case: TC-012 - Xem báo cáo tổng quan**
- **Mô tả**: Mở trang báo cáo thống kê
- **Kỳ vọng**: Hiển thị đúng số lượng sách, bản còn lại, đang mượn
- **Kết quả**: ⏳ CẦN TEST

**Test Case: TC-013 - Lọc theo thể loại**
- **Mô tả**: Chọn thể loại "Truyện thiếu nhi"
- **Kỳ vọng**: Chỉ hiển thị 3 cuốn sách thuộc thể loại này
- **Kết quả**: ⏳ CẦN TEST

---

## 3. Kiểm Thử Dữ Liệu

### 3.1 Local Storage ✅
**Test Case: TC-014 - Dữ liệu được lưu vào Local Storage**
- **Mô tả**: Kiểm tra localStorage.getItem('thuvien_books')
- **Kỳ vọng**: Return đúng JSON string của books array
- **Kết quả**: ✅ ĐẠT

### 3.2 Dữ liệu phục hồi sau reload ⏳
**Test Case: TC-015 - Reload trang vẫn giữ dữ liệu**
- **Mô tả**: F5 hoặc Ctrl+R để reload trang
- **Kỳ vọng**: Tất cả sách và thông tin mượn vẫn còn nguyên
- **Kết quả**: ⏳ CẦN TEST

---

## 4. Kiểm Thử Giao Diện (UI)

### 4.1 Responsive Design ✅
**Test Case: TC-016 - Hiển thị đúng trên mobile**
- **Mô tả**: Thu nhỏ trình duyệt xuống width < 768px
- **Kỳ vọng**: 
  - Books grid chuyển thành 1 cột
  - Menu đầy đủ hiển thị
  - Không bị overflow
- **Kết quả**: ✅ ĐẠT

### 4.2 Gradient và hiệu ứng ⏳
**Test Case: TC-017 - Hover effect trên book card**
- **Mô tả**: Di chuột vào book card
- **Kỳ vọng**: Card nâng lên, shadow tăng
- **Kết quả**: ⏳ CẦN TEST

---

## 5. Test Execution Log

| Test Case | Mô tả | Kết quả | Ghi chú |
|-----------|-------|---------|---------|
| TC-001 | Tìm kiếm theo tên | ✅ PASS | - |
| TC-002 | Tìm kiếm theo tác giả | ✅ PASS | - |
| TC-003 | Tìm kiếm theo thể loại | ✅ PASS | - |
| TC-004 | Mượn sách (còn số) | ⏳ PENDING | Cần test |
| TC-005 | Không mượn khi hết số | ⏳ PENDING | Cần test |
| TC-006 | Trả sách | ⏳ PENDING | Cần test |
| TC-007 | Gia hạn thời gian | ⏳ PENDING | Cần test |
| TC-008 | Đặt trước sách | ⏳ PENDING | Cần test |
| TC-009 | Thêm sách mới | ✅ PASS | - |
| TC-010 | Xóa sách | ⏳ PENDING | Cần test |
| TC-011 | Xác nhận trả | ⏳ PENDING | Cần test |
| TC-012 | Báo cáo thống kê | ⏳ PENDING | Cần test |
| TC-013 | Lọc theo thể loại | ⏳ PENDING | Cần test |
| TC-014 | Local Storage | ✅ PASS | - |
| TC-015 | Reload dữ liệu | ⏳ PENDING | Cần test |
| TC-016 | Responsive mobile | ✅ PASS | - |
| TC-017 | Hover effect | ⏳ PENDING | Cần test |

---

## 6. Hướng Dẫn Chạy Test

```bash
cd /home/kienhoa/Coding/thuvien-so
npm run dev
```

Sau đó mở trình duyệt và truy cập URL hiển thị để thực hiện các test case trên.

---

**Người kiểm thử**: kienhoa 🌸  
**Ngày**: Tháng 6/2024
