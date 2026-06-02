import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Navigation from '../Navigation';
import Pagination from '../Pagination';

const ITEMS_PER_PAGE = 15;

const accentColors = {
  'Truyện thiếu nhi': '#f59e0b',
  'Tiểu thuyết': '#6366f1',
  'Khoa học': '#10b981',
  'Sử học': '#ec4899',
  'Giáo dục': '#3b82f6',
  'Kinh điển': '#8b5cf6'
};

const ThuthuQuanLySach = () => {
  const navigate = useNavigate();
  const { books, addBook, deleteBook } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newBook, setNewBook] = useState({
    title: '', author: '', category: 'Truyện thiếu nhi', totalCopies: 1, location: ''
  });

  const tabs = [
    { path: '/thuthu', icon: '📚', label: 'Quản lý sách' },
    { path: '/thuthu/xac-nhan-tra', icon: '✅', label: 'Xác nhận trả' },
    { path: '/thuthu/bao-cao', icon: '📊', label: 'Báo cáo' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;
    addBook({
      ...newBook,
      publishedYear: new Date().getFullYear(),
      availableCopies: parseInt(newBook.totalCopies)
    });
    setNewBook({ title: '', author: '', category: 'Truyện thiếu nhi', totalCopies: 1, location: '' });
    setShowAddForm(false);
    alert('Đã thêm sách mới thành công!');
  };

  const handleDelete = (bookId, title) => {
    if (window.confirm(`Xóa "${title}"?`)) deleteBook(bookId);
  };

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const paginatedBooks = books.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="dashboard">
      <Navigation role="thuthu" tabs={tabs} />

      <div className="dashboard-content">
        <div className="page-header">
          <h1>📚 Quản lý Sách</h1>
          <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? '✕ Đóng' : '➕ Thêm sách'}
          </button>
        </div>

        {showAddForm && (
          <div className="form-panel">
            <h3>Thêm sách mới</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Tên sách *</label>
                  <input type="text" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} placeholder="Nhập tên sách..." />
                </div>
                <div className="form-group">
                  <label>Tác giả *</label>
                  <input type="text" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} placeholder="Nhập tác giả..." />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Thể loại</label>
                  <select value={newBook.category} onChange={e => setNewBook({ ...newBook, category: e.target.value })}>
                    {['Truyện thiếu nhi', 'Tiểu thuyết', 'Khoa học', 'Sử học', 'Giáo dục', 'Kinh điển'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Số lượng</label>
                  <input type="number" min="1" value={newBook.totalCopies} onChange={e => setNewBook({ ...newBook, totalCopies: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vị trí</label>
                  <input type="text" value={newBook.location} onChange={e => setNewBook({ ...newBook, location: e.target.value })} placeholder="VD: Kệ A-12" />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Thêm sách</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Hủy</button>
              </div>
            </form>
          </div>
        )}

        <div className="page-header" style={{ marginTop: 8 }}>
          <span style={{ fontSize: 14, color: '#64748b' }}>
            Tổng số: <strong>{books.length}</strong> cuốn sách
          </span>
        </div>

        <div className="books-grid">
          {paginatedBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="card-accent" style={{ background: accentColors[book.category] || '#6366f1' }} />
              <div className="card-body">
                <h3>{book.title}</h3>
                <div className="meta">
                  <span className="tag author">✍️ {book.author}</span>
                  <span className="tag category">{book.category}</span>
                </div>
                <div className="info-row">
                  <span className="location">📍 {book.location || 'Chưa xác định'}</span>
                  <span className={`status-badge ${book.availableCopies > 0 ? 'available' : 'unavailable'}`}>
                    {book.availableCopies}/{book.totalCopies}
                  </span>
                </div>
                {book.borrowedBy && (
                  <p style={{ fontSize: 12, color: '#f97316', marginTop: 6 }}>
                    📖 Đang mượn bởi: {book.borrowedBy}
                  </p>
                )}
                <div className="card-actions">
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book.id, book.title)}>
                    🗑️ Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {books.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>Chưa có sách. Hãy thêm sách mới!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThuthuQuanLySach;
