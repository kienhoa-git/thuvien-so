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

const DocGiaTraCuu = () => {
  const navigate = useNavigate();
  const { books, searchBooks, borrowBook, placeHold } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBooks = searchBooks(searchQuery);
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const tabs = [
    { path: '/docgia', icon: '🔍', label: 'Tra cứu' },
    { path: '/docgia/muon-tra', icon: '📖', label: 'Mượn / Trả' },
  ];

  const handleBorrow = (book) => {
    if (!window.confirm(`Bạn có muốn mượn "${book.title}" không?`)) return;
    borrowBook(book.id, 'Độc giả', 'USER001');
    alert('Đã mượn thành công! Thời hạn: 14 ngày');
    setSelectedBook(null);
  };

  const handlePlaceHold = (book) => {
    if (!window.confirm(`Đặt trước "${book.title}"?`)) return;
    placeHold(book.id, 'Độc giả', 'USER001');
    alert('Đã đặt trước thành công!');
    setSelectedBook(null);
  };

  const closeModal = () => setSelectedBook(null);

  if (books.length === 0) {
    return (
      <div className="dashboard">
        <Navigation role="docgia" tabs={tabs} />
        <div className="dashboard-content">
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>Chưa có sách nào trong thư viện...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navigation role="docgia" tabs={tabs} />

      <div className="dashboard-content">
        <div className="page-header">
          <h1>🔍 Tra cứu sách</h1>
          <span className="badge">{filteredBooks.length} kết quả</span>
        </div>

        <div className="search-bar">
          <span className="search-icon">🔎</span>
          <input
            type="text"
            placeholder="Tìm theo tên sách, tác giả, thể loại..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="books-grid">
          {paginatedBooks.map((book) => (
            <div key={book.id} className="book-card" onClick={() => setSelectedBook(book)}>
              <div
                className="card-accent"
                style={{ background: accentColors[book.category] || '#6366f1' }}
              />
              <div className="card-body">
                <h3>{book.title}</h3>
                <div className="meta">
                  <span className="tag author">✍️ {book.author}</span>
                  <span className="tag category">{book.category}</span>
                  <span className="tag year">{book.publishedYear}</span>
                </div>
                <div className="info-row">
                  <span className="location">📍 {book.location}</span>
                  <span className={`status-badge ${book.availableCopies > 0 ? 'available' : 'unavailable'}`}>
                    {book.availableCopies > 0
                      ? `Còn ${book.availableCopies}/${book.totalCopies}`
                      : 'Hết sách'}
                  </span>
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

        {filteredBooks.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>Không tìm thấy sách nào phù hợp</p>
          </div>
        )}
      </div>

      {selectedBook && (
        <div className="modal-overlay" onClick={closeModal}>
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
                {selectedBook.availableCopies > 0
                  ? `Còn ${selectedBook.availableCopies}/${selectedBook.totalCopies}`
                  : 'Đã hết'}
              </span>
            </div>

            <div className="modal-actions">
              {selectedBook.availableCopies > 0 ? (
                <button className="btn btn-primary" onClick={() => handleBorrow(selectedBook)}>
                  📖 Mượn sách
                </button>
              ) : (
                <button className="btn btn-secondary" disabled style={{ opacity: 0.5 }}>
                  Hết sách để mượn
                </button>
              )}
              <button className="btn btn-secondary" onClick={() => handlePlaceHold(selectedBook)}>
                ⏳ Đặt trước
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocGiaTraCuu;
