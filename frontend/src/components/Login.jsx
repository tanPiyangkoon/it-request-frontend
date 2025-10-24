import React, { useState } from 'react';

function Login({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onLogin(data.user);
      } else {
        setError(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
      }
    } catch (err) {
      setError('เชื่อมต่อ server ไม่ได้');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      {/* Login Form */}
      <form onSubmit={handleLogin} style={{ background: 'linear-gradient(135deg, #ff9800 60%, #ffb300 100%)', padding: '2.5rem 2rem', borderRadius: 14, boxShadow: '0 2px 16px rgba(255,152,0,0.13)', minWidth: 320, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#fff', marginBottom: 24, textAlign: 'center', textShadow: '0 2px 8px rgba(255,152,0,0.18)' }}>เข้าสู่ระบบ IT Request</h2>
        {/* Error Alert (Bootstrap, custom style) */}
        {error && (
          <div style={{
            background: 'rgba(255,255,255,0.98)',
            border: '1.5px solid #ff9800',
            color: '#d84315',
            borderRadius: 10,
            boxShadow: '0 2px 12px rgba(255,152,0,0.10)',
            padding: '0.85rem 1.2rem 0.85rem 1rem',
            marginBottom: 18,
            width: '100%',
            maxWidth: 340,
            fontSize: '1.04rem',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            minHeight: 48
          }}
            role="alert"
          >
            <span style={{fontSize: 22, color: '#ff9800', marginRight: 10, display: 'flex', alignItems: 'center'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" viewBox="0 0 16 16"><path d="M7.938 2.016a.13.13 0 0 1 .125 0l6.857 11.856c.03.052.03.117 0 .17a.13.13 0 0 1-.125.062H1.205a.13.13 0 0 1-.125-.062.145.145 0 0 1 0-.17L7.938 2.016zm.823-.421a1.13 1.13 0 0 0-1.984 0L.08 13.45C-.36 14.226.2 15.2 1.08 15.2h13.84c.88 0 1.44-.974 1-1.75L8.76 1.595zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
            </span>
            <span style={{flex: 1, textAlign: 'left'}}>{error}</span>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setError('')} style={{position: 'absolute', right: 10, top: 12, filter: 'invert(60%)'}}></button>
          </div>
        )}
        <input
          type="text"
          placeholder="User ID หรือ Admin ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          style={{ width: '100%', maxWidth: 320, padding: '0.8rem 1rem', borderRadius: 8, border: '1px solid #ffe0b2', marginBottom: 14, fontSize: '1rem', background: '#fff8e1', display: 'block', boxSizing: 'border-box' }}
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', maxWidth: 320, padding: '0.8rem 1rem', borderRadius: 8, border: '1px solid #ffe0b2', marginBottom: 18, fontSize: '1rem', background: '#fff8e1', display: 'block', boxSizing: 'border-box' }}
        />
        <button type="submit" disabled={loading} style={{ width: '100%', maxWidth: 320, padding: '0.9rem 0', borderRadius: 8, background: '#fff', color: '#ff9800', border: 'none', fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(255,152,0,0.10)', display: 'block', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </div>
  );
}

export default Login;
