import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import RequestForm from './components/RequestForm';
import RequestList from './components/RequestList';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(() => {
    // ดึง user จาก localStorage ถ้ามี
    const saved = localStorage.getItem('itreq_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [page, setPage] = useState('form');

  // บันทึก user ลง localStorage ทุกครั้งที่ login/logout
  useEffect(() => {
    if (user) {
      localStorage.setItem('itreq_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('itreq_user');
    }
  }, [user]);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onSelect={setPage} role={user.role} />
      <div style={{ marginLeft: 220, width: '100%' }}>
        <div style={{ padding: 16, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
          <span className="fw-semibold" style={{ color: '#333', fontFamily: 'Segoe UI, sans-serif', fontSize: 15 }}>
            สวัสดี, {user.name} <span style={{ color: '#1976d2', fontWeight: 500 }}>({user.role})</span>
          </span>
          <button onClick={() => setUser(null)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 500, cursor: 'pointer' }}>ออกจากระบบ</button>
        </div>
        {user.role === 'admin' && page === 'dashboard' && (
          <Dashboard />
        )}
        {user.role === 'user' && page === 'form' && <RequestForm userId={user.id} />}
        {page === 'view' && (
          <RequestList
            role={user.role}
            userId={user.id}
          />
        )}
        {/* เพิ่มหน้าอื่น ๆ ตามต้องการ */}
      </div>
    </div>
  );
}

export default App;