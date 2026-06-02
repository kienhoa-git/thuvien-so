import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
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

const DocGiaMMuonTra = () => {
  const navigate = useNavigate();
  const { books, borrowBook, returnBook, renewBook, placeHold } = useAppContext();
  const [selectedBook, setSelectedBook] = useState(null);
  const [readerName, setReaderName] = useState('Độc giả');
  const [pageAvailable, setPageAvailable] = useState(1);
  const [pageHeld, setPageHeld] = useState(1);

  const tabs = [
    { path: '/docgia', icon: '🔍', label: 'Tra cứu' },
    { path: '/docgia/muon-tra', icon: '📖', label: 'Mượn / Trả' },
  ];

  const myBooks = books.filter(b => b.borrowedBy === readerName);
  const availableBooks = books.filter(b => b.borrowedBy !== readerName && b.availableCopies > 0);
  const heldBooks = books.filter(b => b.availableCopies === 0 && b.borrowedBy !== readerName);

  const totalPagesAvailable = Math.ceil(availableBooks.length / ITEMS_PER_PAGE);
  const totalPagesHeld = Math.ceil(heldBooks.length / ITEMS_PER_PAGE);
  const paginatedAvailable = availableBooks.slice(
    (pageAvailable - 1) * ITEMS_PER_PAGE, pageAvailable * ITEMS_PER_PAGE
  );
  const paginatedHeld = heldBooks.slice(
    (pageHeld - 1) * ITEMS_PER_PAGE, pageHeld * ITEMS_PER_PAGE
  );

  const handleBorrow = (book) => {
    if (!readerName.trim()) { alert('Vui lòng nhập tên độc giả!'); return; }
    borrowBook(book.id, readerName, 'USER001');
    alert(`Đã mượn "${book.title}" thành công! Thời hạn 14 ngày.`);
    setSelectedBook(null);
  };

  const handleReturn = (book) => {
    returnBook(book.id, readerName, 'USER001');
    alert(`Đã trả "${book.title}" thành công!`);
    setSelectedBook(null);
  };

  const handleRenew = (book) => {
    if (!window.confirm(`Gia hạn "${book.title}" thêm 7 ngày?`)) return;
    renewBook(book.id, 7);
    alert('Đã gia hạn thành công!');
    setSelectedBook(null);
  };

  const handlePlaceHold = (book) => {
    if (!readerName.trim()) { alert('Vui lòng nhập tên!'); return; }
    placeHold(book.id, readerName, 'USER001');
    alert(`Đã đặt trước "${book.title}" thành công!`);
    setSelectedBook(null);
  };

  const showBookDetail = (book) => setSelectedBook(book);

  const isMyBook = (book) => book.borrowedBy === readerName;

  return (
    <div className="dashboard">
      <Navigation role="docgia" tabs={tabs} />

      <div className="dashboard-content">
        <div className="page-header">
          <h1>📖 Mượn & Trả sách</h1>
        </div>

        <div className="form-panel" style={{ marginBottom: 28 }}>
          <h3>👤 Thông tin độc giả</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Họ tên</label>
              <input
                type="text"
                placeholder="Nhập tên của bạn..."
                value={readerName}
                onChange={(e) => setReaderName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Mã độc giả</label>
              <input type="text" value="USER001" disabled />
            </div>
          </div>
        </div>

        {myBooks.length > 0 && (
          <div className="borrowed-section">
            <div className="section-title">
              📚 Sách đang mượn ({myBooks.length})
            </div>

            <div className="books-grid">
              {myBooks.map((book) => (
                <div key={book.id} className="book-card">
                  <div className="card-accent" style={{ background: accentColors[book.category] || '#6366f1' }} />
                  <div className="card-body">
                    <h3>{book.title}</h3>
                    <div className="meta">
                      <span className="tag author">✍️ {book.author}</span>
                      <span className="tag category">{book.category}</span>
                    </div>
                    <div className="info-row">
                      <span style={{
                        fontSize: 13, color: new Date(book.dueDate) < new Date() ? '#ef4444' : '#64748b',
                        fontWeight: new Date(book.dueDate) < new Date() ? 600 : 400
                      }}>
                        {new Date(book.dueDate) < new Date() ? '⚠️ Quá hạn! ' : '📅 Hạn: '}
                        {new Date(book.dueDate).toLocaleDateString('vi-VN')}
                      </span>
                      <span className={`status-badge ${new Date(book.dueDate) < new Date() ? 'unavailable' : 'borrowed'}`}>
                        {new Date(book.dueDate) < new Date() ? 'Quá hạn' : 'Đang mượn'}
                      </span>
                    </div>
                    <div className="card-actions">
                      <button className="btn btn-primary btn-sm" onClick={() => handleReturn(book)}>
                        ✅ Trả sách
                      </button>
                      <button className="btn btn-success btn-sm" onClick={() => handleRenew(book)}>
                        🔄 Gia hạn
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => showBookDetail(book)}>
                        ℹ️ Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {readerName && myBooks.length === 0 && (
          <div className="form-panel" style={{ background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
            <p style={{ textAlign: 'center', color: '#94a3b8', padding: '20px 0' }}>
              Bạn chưa mượn sách nào. Hãy chọn sách bên dưới để mượn!
            </p>
          </div>
        )}

        <div className="page-header" style={{ marginTop: myBooks.length > 0 ? 28 : 0 }}>
          <h2 style={{ fontSize: 18 }}>📚 Sách có sẵn để mượn</h2>
          <span className="badge">{availableBooks.length} cuốn</span>
        </div>

        {availableBooks.length > 0 ? (
          <>
            <div className="books-grid">
              {paginatedAvailable.map((book) => (
                <div key={book.id} className="book-card">
                  <div className="card-accent" style={{ background: accentColors[book.category] || '#6366f1' }} />
                  <div className="card-body">
                    <h3>{book.title}</h3>
                    <div className="meta">
                      <span className="tag author">✍️ {book.author}</span>
                      <span className="tag category">{book.category}</span>
                    </div>
                    <div className="info-row">
                      <span className="location">📍 {book.location}</span>
                      <span className="status-badge available">
                        Còn {book.availableCopies}/{book.totalCopies}
                      </span>
                    </div>
                    <div className="card-actions">
                      <button className="btn btn-primary btn-sm" onClick={() => handleBorrow(book)}>
                        📖 Mượn ngay
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => showBookDetail(book)}>
                        ℹ️ Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={pageAvailable}
              totalPages={totalPagesAvailable}
              onPageChange={setPageAvailable}
            />
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>Hiện không có sách nào có sẵn để mượn</p>
          </div>
        )}

        {heldBooks.length > 0 && (
          <>
            <div className="page-header" style={{ marginTop: 28 }}>
              <h2 style={{ fontSize: 18 }}>⏳ Sách đang được mượn (có thể đặt trước)</h2>
              <span className="badge">{heldBooks.length} cuốn</span>
            </div>

            <div className="books-grid">
              {paginatedHeld.map((book) => (
                <div key={book.id} className="book-card">
                  <div className="card-accent" style={{ background: accentColors[book.category] || '#6366f1' }} />
                  <div className="card-body">
                    <h3>{book.title}</h3>
                    <div className="meta">
                      <span className="tag author">✍️ {book.author}</span>
                      <span className="tag category">{book.category}</span>
                    </div>
                    <div className="info-row">
                      <span className="location">📍 {book.location}</span>
                      <span className="status-badge unavailable">
                        Hết sách
                      </span>
                    </div>
                    <div className="card-actions">
                      <button className="btn btn-secondary btn-sm" onClick={() => handlePlaceHold(book)}>
                        ⏳ Đặt trước
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => showBookDetail(book)}>
                        ℹ️ Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={pageHeld}
              totalPages={totalPagesHeld}
              onPageChange={setPageHeld}
            />
          </>
        )}
      </div>

      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{selectedBook.title}</h3>
            <div className="detail-row">
              <span className="label">Tác giả</span>
              <span className="value">{selectedBook.author}</span>
            </div>
            <div className="detail-row">
              <span className="label">Thể loại</span>
              <span className="value">{selectedBook.category}</span>
            </div>
            <div className="detail-row">
              <span className="label">Năm XB</span>
              <span className="value">{selectedBook.publishedYear}</span>
            </div>
            <div className="detail-row">
              <span className="label">Vị trí</span>
              <span className="value">{selectedBook.location}</span>
            </div>
            <div className="detail-row">
              <span className="label">Trạng thái</span>
              <span className="value">
                {isMyBook(selectedBook) ? (
                  'Đang mượn - Hạn: ' + new Date(selectedBook.dueDate).toLocaleDateString('vi-VN')
                ) : selectedBook.availableCopies > 0 ? (
                  `Còn ${selectedBook.availableCopies}/${selectedBook.totalCopies} bản`
                ) : (
                  'Hết sách'
                )}
              </span>
            </div>

            <div className="modal-actions">
              {isMyBook(selectedBook) ? (
                <>
                  <button className="btn btn-primary" onClick={() => handleReturn(selectedBook)}>
                    ✅ Trả sách
                  </button>
                  <button className="btn btn-success" onClick={() => handleRenew(selectedBook)}>
                    🔄 Gia hạn 7 ngày
                  </button>
                </>
              ) : selectedBook.availableCopies > 0 ? (
                <button className="btn btn-primary" onClick={() => handleBorrow(selectedBook)}>
                  📖 Mượn sách
                </button>
              ) : (
                <button className="btn btn-secondary" onClick={() => handlePlaceHold(selectedBook)}>
                  ⏳ Đặt trước
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocGiaMMuonTra;
