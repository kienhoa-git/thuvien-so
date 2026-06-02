import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Navigation from '../Navigation';

const ThuthuXacNhanTra = () => {
  const navigate = useNavigate();
  const { books, returnBook } = useAppContext();

  const tabs = [
    { path: '/thuthu', icon: '📚', label: 'Quản lý sách' },
    { path: '/thuthu/xac-nhan-tra', icon: '✅', label: 'Xác nhận trả' },
    { path: '/thuthu/bao-cao', icon: '📊', label: 'Báo cáo' },
  ];

  const borrowedBooks = books.filter(b => b.borrowedBy);

  return (
    <div className="dashboard">
      <Navigation role="thuthu" tabs={tabs} />

      <div className="dashboard-content">
        <div className="page-header">
          <h1>✅ Xác nhận Trả sách</h1>
          <span className="badge">{borrowedBooks.length} sách đang mượn</span>
        </div>

        {borrowedBooks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✅</div>
            <p>Tất cả sách đã được trả về! <br />Không có sách nào đang mượn.</p>
          </div>
        ) : (
          <div className="books-grid">
            {borrowedBooks.map((book) => (
              <div key={book.id} className="book-card">
                <div className="card-accent" style={{ background: '#f97316' }} />
                <div className="card-body">
                  <h3>{book.title}</h3>
                  <div className="meta">
                    <span className="tag author">✍️ {book.author}</span>
                    <span className="tag category">{book.category}</span>
                  </div>
                  <div className="detail-row" style={{ fontSize: 13 }}>
                    <span className="label">👤 Độc giả</span>
                    <span className="value">{book.borrowedBy}</span>
                  </div>
                  <div className="detail-row" style={{ fontSize: 13 }}>
                    <span className="label">📅 Ngày mượn</span>
                    <span className="value">{new Date(book.borrowDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="detail-row" style={{ fontSize: 13 }}>
                    <span className="label">⏰ Hạn trả</span>
                    <span className="value" style={{ color: '#ef4444' }}>
                      {new Date(book.dueDate).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-sm" onClick={() => {
                      returnBook(book.id, book.borrowedBy, 'USER001');
                      alert(`Đã xác nhận trả "${book.title}" thành công!`);
                    }}>
                      ✅ Xác nhận trả
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThuthuXacNhanTra;
