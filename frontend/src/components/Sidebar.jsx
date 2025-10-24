import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar({ onSelect, role, user }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger icon always visible */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="btn btn-warning position-fixed d-flex align-items-center justify-content-center"
          style={{ top: 20, left: 20, zIndex: 1101, borderRadius: 6, fontSize: 24, width: 44, height: 44, boxShadow: '0 2px 8px rgba(255,152,0,0.13)' }}
          aria-label="เปิดเมนู"
        >
          <span className="fw-bold text-dark">☰</span>
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div
          className="position-fixed w-100 h-100"
          style={{ top: 0, left: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1100, transition: 'background 0.2s' }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`bg-warning text-dark position-fixed h-100 p-4 shadow-lg`}
        style={{
          width: 240,
          left: open ? 0 : -260,
          top: 0,
          transition: 'left 0.28s cubic-bezier(.4,1.2,.4,1)',
          zIndex: 1102,
          boxShadow: open ? '2px 0 16px rgba(255,152,0,0.18)' : 'none',
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
          display: 'flex',
          flexDirection: 'column',
        }}
        aria-label="Sidebar navigation"
      >
        <button
          onClick={() => setOpen(false)}
          className="btn btn-link text-dark p-0 ms-2 fs-3 position-absolute"
          aria-label="ปิดเมนู"
          style={{ textDecoration: 'none', top: 18, right: 12 }}
        >
          ⮜
        </button>
        <div className="mb-4" style={{ height: 32 }} />
        <ul className="nav flex-column mt-2" style={{ flex: 1 }}>
          {role === 'admin' ? (
            <>
              <li className="nav-item mb-2">
                <button className="nav-link text-dark bg-transparent border-0 text-start w-100" onClick={() => { onSelect('dashboard'); setOpen(false); }}>Dashboard</button>
              </li>
              <li className="nav-item mb-2">
                <button className="nav-link text-dark bg-transparent border-0 text-start w-100" onClick={() => { onSelect('view'); setOpen(false); }}>รายการคำขอ</button>
              </li>
              <li className="nav-item mb-2">
                <button className="nav-link text-dark bg-transparent border-0 text-start w-100" onClick={() => { onSelect('settings'); setOpen(false); }}>ตั้งค่า</button>
              </li>
            </>
          ) : (
            <li className="nav-item mb-2">
              <button className="nav-link text-dark bg-transparent border-0 text-start w-100" onClick={() => { onSelect('form'); setOpen(false); }}>แบบฟอร์มแจ้งปัญหา</button>
            </li>
          )}
        </ul>
        <div style={{ height: 12 }} />
      </nav>
    </>
  );
}

export default Sidebar;
