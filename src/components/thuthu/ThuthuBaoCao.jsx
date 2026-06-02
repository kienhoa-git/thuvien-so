import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Navigation from '../Navigation';

const ThuthuBaoCao = () => {
  const navigate = useNavigate();
  const { books, getReport } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const report = getReport();

  const filteredBooks = selectedCategory === 'all'
    ? books
    : books.filter(b => b.category === selectedCategory);

  const totalCopies = filteredBooks.reduce((s, b) => s + b.totalCopies, 0);
  const availableCopies = filteredBooks.reduce((s, b) => s + b.availableCopies, 0);
  const borrowedCount = filteredBooks.filter(b => b.borrowedBy).length;

  const tabs = [
    { path: '/thuthu', icon: '📚', label: 'Quản lý sách' },
    { path: '/thuthu/xac-nhan-tra', icon: '✅', label: 'Xác nhận trả' },
    { path: '/thuthu/bao-cao', icon: '📊', label: 'Báo cáo' },
  ];

  return (
    <div className="dashboard">
      <Navigation role="thuthu" tabs={tabs} />

      <div className="dashboard-content">
        <div className="page-header">
          <h1>📊 Báo cáo Thống kê</h1>
        </div>

        <div className="search-bar" style={{ maxWidth: 300 }}>
          <span className="search-icon">🏷️</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ width: '100%', padding: '10px 14px 10px 46px', border: '2px solid #e2e8f0', borderRadius: 10, fontSize: 14, background: 'white', color: '#1e293b' }}
          >
            <option value="all">Tất cả thể loại</option>
            {report.categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name} ({cat.count})</option>
            ))}
          </select>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#eef2ff' }}>📚</div>
            <div className="stat-value">{filteredBooks.length}</div>
            <div className="stat-label">Sách trong thể loại</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fdf2f8' }}>📖</div>
            <div className="stat-value">{totalCopies}</div>
            <div className="stat-label">Tổng số bản sách</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#f0fdf4' }}>✅</div>
            <div className="stat-value">{availableCopies}</div>
            <div className="stat-label">Số bản còn lại</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fff7ed' }}>📌</div>
            <div className="stat-value">{borrowedCount}</div>
            <div className="stat-label">Đang mượn</div>
          </div>
        </div>

        <div className="page-header" style={{ marginTop: 8 }}>
          <h2 style={{ fontSize: 18 }}>📈 Chi tiết theo thể loại</h2>
        </div>

        {report.categories.map(category => {
          const catBooks = books.filter(b => b.category === category.name);
          const catTotal = catBooks.reduce((s, b) => s + b.totalCopies, 0);
          const catAvailable = catBooks.reduce((s, b) => s + b.availableCopies, 0);
          const catBorrowed = catBooks.filter(b => b.borrowedBy).length;

          return (
            <div
              key={category.id}
              className={`category-section ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === category.name ? 'all' : category.name)}
            >
              <div className="category-header">
                <h4>{category.name}</h4>
                <span className="count">{catBooks.length} cuốn</span>
              </div>

              <div className="category-stats">
                <div className="category-stat cs-blue">
                  <div className="cs-value">{catTotal}</div>
                  <div className="cs-label">Tổng bản</div>
                </div>
                <div className="category-stat cs-green">
                  <div className="cs-value">{catAvailable}</div>
                  <div className="cs-label">Còn lại</div>
                </div>
                <div className="category-stat cs-red">
                  <div className="cs-value">{catBorrowed}</div>
                  <div className="cs-label">Đang mượn</div>
                </div>
                <div className="category-stat cs-yellow">
                  <div className="cs-value">
                    {catTotal > 0 ? Math.round((catBorrowed / catTotal) * 100) : 0}%
                  </div>
                  <div className="cs-label">Tỷ lệ mượn</div>
                </div>
              </div>

              {selectedCategory === category.name && (
                <ul style={{ marginTop: 14, listStyle: 'none' }}>
                  {catBooks.map(book => (
                    <li key={book.id} style={{
                      display: 'flex', justifyContent: 'space-between', padding: '8px 0',
                      borderBottom: '1px solid #f1f5f9', fontSize: 13
                    }}>
                      <span>{book.title}</span>
                      <span style={{ color: book.availableCopies > 0 ? '#16a34a' : '#ef4444', fontWeight: 500 }}>
                        {book.availableCopies}/{book.totalCopies}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThuthuBaoCao;
