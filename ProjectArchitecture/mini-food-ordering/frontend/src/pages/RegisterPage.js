import React, { useState } from 'react';
import { userApi } from '../api/axios';

const RegisterPage = ({ setPage }) => {
  const [form, setForm] = useState({ username: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('Mật khẩu không khớp');
    setLoading(true);
    setError('');
    try {
      await userApi.register({ username: form.username, password: form.password });
      setSuccess('Đăng ký thành công! Đang chuyển hướng...');
      setTimeout(() => setPage('login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Đăng ký</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} placeholder="Tên đăng nhập" value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })} required />
          <input style={styles.input} type="password" placeholder="Mật khẩu" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} required />
          <input style={styles.input} type="password" placeholder="Xác nhận mật khẩu" value={form.confirm}
            onChange={e => setForm({ ...form, confirm: e.target.value })} required />
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>
        <p style={styles.link}>Đã có tài khoản? <span onClick={() => setPage('login')} style={styles.linkText}>Đăng nhập</span></p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' },
  card: { background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: 360 },
  title: { textAlign: 'center', marginBottom: 24, color: '#ff6b35' },
  input: { width: '100%', padding: '10px 12px', marginBottom: 14, border: '1px solid #ddd', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', background: '#ff6b35', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer' },
  error: { color: '#ff4d4f', textAlign: 'center', marginBottom: 12 },
  success: { color: '#52c41a', textAlign: 'center', marginBottom: 12 },
  link: { textAlign: 'center', marginTop: 16, fontSize: 14 },
  linkText: { color: '#ff6b35', cursor: 'pointer', fontWeight: 'bold' },
};

export default RegisterPage;
