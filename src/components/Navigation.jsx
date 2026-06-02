import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = ({ role, tabs }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="dashboard-nav">
      <span className="nav-brand">
        {role === 'docgia' ? '📖 Độc giả' : '🛠️ Thủ thư'}
      </span>

      <div className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab.path}
            className={`nav-tab ${location.pathname === tab.path ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="nav-right">
        <button className="nav-logout" onClick={() => navigate('/')}>
          Đăng xuất
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
