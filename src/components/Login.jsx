import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-brand">
          <span className="logo-icon">📚</span>
          <h1>Thư viện Số</h1>
          <p>
            Hệ thống quản lý thư viện hiện đại<br />
            Dành cho Độc giả và Thủ thư
          </p>
        </div>

        <div className="login-card">
          <h2>Chào mừng trở lại!</h2>
          <p className="subtitle">Chọn vai trò để tiếp tục</p>

          <button className="role-btn" onClick={() => navigate('/docgia')}>
            <span className="icon blue">👤</span>
            <span className="info">
              <span className="name">Độc giả</span>
              <span className="desc">Tra cứu, mượn, trả sách</span>
            </span>
            <span className="arrow">→</span>
          </button>

          <button className="role-btn" onClick={() => navigate('/thuthu')}>
            <span className="icon pink">🛠️</span>
            <span className="info">
              <span className="name">Thủ thư</span>
              <span className="desc">Quản lý sách, báo cáo, thống kê</span>
            </span>
            <span className="arrow">→</span>
          </button>

          <p className="footer-text">Hệ thống Thư viện Số 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
