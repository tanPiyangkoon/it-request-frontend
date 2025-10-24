import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/requests')
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // นับจำนวนแต่ละสถานะ
  const total = requests.length;
  const pending = requests.filter(r => r.status === 'pending' || !r.status).length;
  const success = requests.filter(r => r.status === 'done').length;
  const cancel = requests.filter(r => r.status === 'rejected').length;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-stats">
        <div className="dashboard-card">
          <div className="dashboard-card-label">คำขอทั้งหมด</div>
          <div className="dashboard-card-value">{total}</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-label">รอดำเนินการ</div>
          <div className="dashboard-card-value dashboard-pending">{pending}</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-label">สำเร็จ</div>
          <div className="dashboard-card-value dashboard-success">{success}</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-label">ยกเลิก/ปฏิเสธ</div>
          <div className="dashboard-card-value dashboard-cancel">{cancel}</div>
        </div>
      </div>
      <div className="dashboard-section">
        <h3>รายการคำขอล่าสุด</h3>
        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ชื่อ</th>
                <th>เลขบัตรพนักงาน</th>
                <th>แผนก</th>
                <th>หมวดหมู่</th>
                <th>รายละเอียด</th>
                <th>สถานะ</th>
                <th>วันที่</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" style={{ textAlign: 'center', color: '#888' }}>กำลังโหลด...</td></tr>
              ) : requests.length === 0 ? (
                <tr><td colSpan="8" style={{ textAlign: 'center', color: '#888' }}>ไม่มีข้อมูล</td></tr>
              ) : requests.map((req, idx) => (
                <tr key={req.id || idx}>
                  <td>{idx + 1}</td>
                  <td>{req.full_name}</td>
                  <td>{req.employee_id}</td>
                  <td>{req.department}</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      background: req.category === 'ฮาร์ดแวร์' ? '#e3f2fd' :
                                 req.category === 'ซอฟต์แวร์' ? '#f3e5f5' :
                                 req.category === 'เครือข่าย' ? '#e8f5e9' : '#fff3e0',
                      color: req.category === 'ฮาร์ดแวร์' ? '#1976d2' :
                             req.category === 'ซอฟต์แวร์' ? '#7b1fa2' :
                             req.category === 'เครือข่าย' ? '#388e3c' : '#f57c00'
                    }}>
                      {req.category || 'อื่นๆ'}
                    </span>
                  </td>
                  <td>{req.description}</td>
                  <td>
                    <span className={`status-badge status-${(req.status || 'pending').toLowerCase()}`}>
                      {req.status || 'รอดำเนินการ'}
                    </span>
                    {/* ปุ่มเปลี่ยนสถานะสำหรับ admin */}
                    <StatusChanger request={req} onStatusChange={newStatus => {
                      // อัพเดทสถานะใน backend
                      fetch(`/api/requests/${req.id}/status`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: newStatus })
                      })
                        .then(res => res.json())
                        .then(updated => {
                          setRequests(requests.map(r => r.id === req.id ? { ...r, status: newStatus } : r));
                        });
                    }} />
                  </td>
                  <td>{req.created_at ? new Date(req.created_at).toLocaleString('th-TH') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Component สำหรับเปลี่ยนสถานะ
function StatusChanger({ request, onStatusChange }) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(request.status || 'pending');
  const [saving, setSaving] = useState(false);
  const statusOptions = [
    { value: 'pending', label: 'รอดำเนินการ' },
    { value: 'done', label: 'สำเร็จ' },
    { value: 'rejected', label: 'ยกเลิก/ปฏิเสธ' }
  ];
  // เฉพาะ admin เท่านั้นที่เห็นปุ่ม (สมมติว่ามี user.role === 'admin')
  // สามารถปรับ logic ให้เช็คจาก props หรือ context ได้
  const handleSave = async () => {
    setSaving(true);
    await onStatusChange(selected);
    setSaving(false);
    setShow(false);
  };
  return (
    <>
      <button type="button" style={{ marginLeft: 8, fontSize: 12, padding: '2px 8px', borderRadius: 6, background: '#ff9800', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => setShow(!show)}>
        เปลี่ยนสถานะ
      </button>
      {show && (
        <span style={{ marginLeft: 6 }}>
          <select value={selected} onChange={e => setSelected(e.target.value)} style={{ fontSize: 12, borderRadius: 6 }}>
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button type="button" onClick={handleSave} disabled={saving || selected === (request.status || 'pending')} style={{ marginLeft: 4, fontSize: 12, borderRadius: 6, background: '#2196f3', color: '#fff', border: 'none', padding: '2px 10px', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'กำลังบันทึก...' : 'Save'}
          </button>
        </span>
      )}
    </>
  );
}

export default Dashboard;
