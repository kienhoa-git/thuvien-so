import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Login from './components/Login';
import DocGiaTraCuu from './components/docgia/DocGiaTraCuu';
import DocGiaMMuonTra from './components/docgia/DocGiaMMuonTra';
import ThuthuQuanLySach from './components/thuthu/ThuthuQuanLySach';
import ThuthuXacNhanTra from './components/thuthu/ThuthuXacNhanTra';
import ThuthuBaoCao from './components/thuthu/ThuthuBaoCao';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Trang đăng nhập */}
          <Route path="/" element={<Login />} />
          
          {/* Trang Độc giả */}
          <Route path="/docgia" element={<DocGiaTraCuu />} />
          <Route path="/docgia/muon-tra" element={<DocGiaMMuonTra />} />
          
          {/* Trang Thủ thư */}
          <Route path="/thuthu" element={<ThuthuQuanLySach />} />
          <Route path="/thuthu/xac-nhan-tra" element={<ThuthuXacNhanTra />} />
          <Route path="/thuthu/bao-cao" element={<ThuthuBaoCao />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
