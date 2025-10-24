import React, { useState } from 'react';
import itWorkerImg from '../assets/it-work.png';
import './RequestForm.css';

function RequestForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    employee_id: '',
    department: '',
    position: '',
    email: '',
    phone: '',
    description: '',
    category: 'อื่นๆ'
  });
  const [file, setFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [missingFields, setMissingFields] = useState([]);

  const validateForm = () => {
    const requiredFields = [
      { key: 'full_name', label: 'ชื่อ-นามสกุล' },
      { key: 'employee_id', label: 'เลขบัตรพนักงาน' },
      { key: 'department', label: 'แผนก' },
      { key: 'position', label: 'ตำแหน่ง' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'เบอร์โทร' },
      { key: 'description', label: 'รายละเอียด' },
      { key: 'category', label: 'หมวดหมู่' }
    ];
    const missing = requiredFields.filter(f => !formData[f.key]).map(f => f.label);
    setMissingFields(missing);
    if (missing.length > 0) {
      setErrorMsg('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setMissingFields([]);
    if (!validateForm()) return;
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (file) data.append('image', file); // รูปภาพไม่บังคับ
      const res = await fetch('http://localhost:3001/api/request', {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        setSuccessMsg('ส่งคำขอเรียบร้อยแล้ว');
        setFormData({
          full_name: '',
          employee_id: '',
          department: '',
          position: '',
          email: '',
          phone: '',
          description: '',
          category: 'อื่นๆ'
        });
        setFile(null);
      } else {
        setErrorMsg('เกิดข้อผิดพลาดในการส่งข้อมูล');
      }
    } catch (err) {
      setErrorMsg('เชื่อมต่อ backend ไม่ได้');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container" encType="multipart/form-data" style={{
      background: 'linear-gradient(135deg, #fffde7 60%, #fff8e1 100%)',
      borderRadius: 24,
      boxShadow: '0 4px 32px rgba(255,152,0,0.10)',
      padding: '2.5rem 1.5rem',
      maxWidth: 520,
      margin: '2.5rem auto',
      width: '100%'
    }}>
      <div className="form-image" style={{display: 'flex', justifyContent: 'center', marginBottom: 12}}>
        <img src={itWorkerImg} alt="IT worker" style={{maxWidth: 120, maxHeight: 120, objectFit: 'contain', borderRadius: '50%', border: '4px solid #ff9800', background: '#fff'}} />
      </div>
      <div className="form-fields" style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2 style={{ color: '#ff9800', fontWeight: 700, marginBottom: 18, textAlign: 'center', letterSpacing: 0.5 }}>IT Request Form</h2>
        <button
          type="button"
          style={{ marginBottom: 16, background: '#ffe0b2', color: '#ff9800', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 500, cursor: 'pointer', boxShadow: '0 2px 8px rgba(255,152,0,0.10)' }}
          onClick={() => setFormData({
            full_name: 'สมชาย ใจดี',
            employee_id: 'EMP1234',
            department: 'IT',
            position: 'Support',
            email: 'somchai@example.com',
            phone: '0812345678',
            description: 'คอมพิวเตอร์เปิดไม่ติด รบกวนช่วยตรวจสอบครับ',
            category: 'ฮาร์ดแวร์'
          })}
        >
          กรอกข้อมูลตัวอย่าง
        </button>
        {successMsg && (
          <div style={{
            background: '#fff',
            border: '1.5px solid #43a047',
            color: '#388e3c',
            borderRadius: 10,
            boxShadow: '0 2px 12px rgba(67,160,71,0.10)',
            padding: '0.85rem 1.2rem',
            marginBottom: 14,
            width: '100%',
            maxWidth: 400,
            fontSize: '1.04rem',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            minHeight: 44
          }}
            role="alert"
          >
            <span style={{fontSize: 22, color: '#43a047', marginRight: 10, display: 'flex', alignItems: 'center'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM7 10.293l5.146-5.147.708.708-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5.708-.708L7 10.293z"/></svg>
            </span>
            <span style={{flex: 1, textAlign: 'left'}}>{successMsg}</span>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setSuccessMsg('')} style={{position: 'absolute', right: 10, top: 12, filter: 'invert(60%)'}}></button>
          </div>
        )}
        {errorMsg && (
          <div style={{
            background: 'rgba(255,255,255,0.98)',
            border: '1.5px solid #ff9800',
            color: '#d84315',
            borderRadius: 10,
            boxShadow: '0 2px 12px rgba(255,152,0,0.10)',
            padding: '0.85rem 1.2rem 0.85rem 1rem',
            marginBottom: 14,
            width: '100%',
            maxWidth: 400,
            fontSize: '1.04rem',
            display: 'flex',
            alignItems: 'flex-start',
            position: 'relative',
            minHeight: 48
          }}
            role="alert"
          >
            <span style={{fontSize: 22, color: '#ff9800', marginRight: 10, display: 'flex', alignItems: 'center', marginTop: 2}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" viewBox="0 0 16 16"><path d="M7.938 2.016a.13.13 0 0 1 .125 0l6.857 11.856c.03.052.03.117 0 .17a.13.13 0 0 1-.125.062H1.205a.13.13 0 0 1-.125-.062.145.145 0 0 1 0-.17L7.938 2.016zm.823-.421a1.13 1.13 0 0 0-1.984 0L.08 13.45C-.36 14.226.2 15.2 1.08 15.2h13.84c.88 0 1.44-.974 1-1.75L8.76 1.595zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
            </span>
            <span style={{flex: 1, textAlign: 'left'}}>
              {errorMsg}
              {missingFields.length > 0 && (
                <ul className="mb-0 mt-2" style={{textAlign: 'left', fontSize: '1rem', paddingLeft: 18, marginBottom: 0}}>
                  {missingFields.map(f => <li key={f}>{f}</li>)}
                </ul>
              )}
            </span>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => {setErrorMsg(''); setMissingFields([]);}} style={{position: 'absolute', right: 10, top: 12, filter: 'invert(60%)'}}></button>
          </div>
        )}
        <input
          placeholder="ชื่อ-นามสกุล"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          style={{width: '100%', maxWidth: 400, padding: '0.8rem 1rem', borderRadius: 8, border: '1.5px solid #ffe0b2', marginBottom: 14, fontSize: '1rem', background: '#fff8e1', boxSizing: 'border-box', boxShadow: '0 1px 4px rgba(255,152,0,0.06)'}}
        />
        <input
          placeholder="เลขบัตรพนักงาน"
          value={formData.employee_id}
          onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
          style={{width: '100%', maxWidth: 400, padding: '0.8rem 1rem', borderRadius: 8, border: '1.5px solid #ffe0b2', marginBottom: 14, fontSize: '1rem', background: '#fff8e1', boxSizing: 'border-box', boxShadow: '0 1px 4px rgba(255,152,0,0.06)'}}
        />
        <input
          placeholder="แผนก"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          style={{width: '100%', maxWidth: 400, padding: '0.8rem 1rem', borderRadius: 8, border: '1.5px solid #ffe0b2', marginBottom: 14, fontSize: '1rem', background: '#fff8e1', boxSizing: 'border-box', boxShadow: '0 1px 4px rgba(255,152,0,0.06)'}}
        />
        <input
          placeholder="ตำแหน่ง"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          style={{width: '100%', maxWidth: 400, padding: '0.8rem 1rem', borderRadius: 8, border: '1.5px solid #ffe0b2', marginBottom: 14, fontSize: '1rem', background: '#fff8e1', boxSizing: 'border-box', boxShadow: '0 1px 4px rgba(255,152,0,0.06)'}}
        />
        <input
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{width: '100%', maxWidth: 400, padding: '0.8rem 1rem', borderRadius: 8, border: '1.5px solid #ffe0b2', marginBottom: 14, fontSize: '1rem', background: '#fff8e1', boxSizing: 'border-box', boxShadow: '0 1px 4px rgba(255,152,0,0.06)'}}
        />
        <input
          placeholder="เบอร์โทร"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          style={{width: '100%', maxWidth: 400, padding: '0.8rem 1rem', borderRadius: 8, border: '1.5px solid #ffe0b2', marginBottom: 14, fontSize: '1rem', background: '#fff8e1', boxSizing: 'border-box', boxShadow: '0 1px 4px rgba(255,152,0,0.06)'}}
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          style={{width: '100%', maxWidth: 400, padding: '0.8rem 1rem', borderRadius: 8, border: '1.5px solid #ffe0b2', marginBottom: 14, fontSize: '1rem', background: '#fff8e1', boxSizing: 'border-box', boxShadow: '0 1px 4px rgba(255,152,0,0.06)', cursor: 'pointer'}}
        >
          <option value="">-- เลือกหมวดหมู่ --</option>
          <option value="ฮาร์ดแวร์">ฮาร์ดแวร์</option>
          <option value="ซอฟต์แวร์">ซอฟต์แวร์</option>
          <option value="เครือข่าย">เครือข่าย</option>
          <option value="อื่นๆ">อื่นๆ</option>
        </select>
        <textarea
          placeholder="รายละเอียด"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          style={{width: '100%', maxWidth: 400, padding: '0.8rem 1rem', borderRadius: 8, border: '1.5px solid #ffe0b2', marginBottom: 14, fontSize: '1rem', background: '#fff8e1', boxSizing: 'border-box', boxShadow: '0 1px 4px rgba(255,152,0,0.06)', minHeight: 80, resize: 'vertical'}}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
          style={{ marginBottom: '1.1rem', maxWidth: 400, width: '100%' }}
        />
        <button type="submit" style={{
          width: '100%',
          maxWidth: 400,
          padding: '0.95rem 0',
          borderRadius: 10,
          background: 'linear-gradient(90deg, #ff9800 60%, #ffb300 100%)',
          color: '#fff',
          border: 'none',
          fontWeight: 700,
          fontSize: '1.13rem',
          boxShadow: '0 2px 8px rgba(255,152,0,0.10)',
          marginTop: 6,
          letterSpacing: 0.5,
          transition: 'background 0.2s',
          cursor: 'pointer'
        }}>ส่งคำขอ</button>
      </div>
    </form>
  );
}

export default RequestForm;
