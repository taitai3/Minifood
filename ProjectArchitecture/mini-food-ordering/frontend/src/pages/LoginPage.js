import React, { useState } from 'react';
import { userApi } from '../api/axios';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ setPage }) => {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await userApi.login(form);
      login(res.data.user, res.data.token);
      setPage('foods');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🍜 Đăng nhập</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} placeholder="Tên đăng nhập" value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })} required />
          <input style={styles.input} type="password" placeholder="Mật khẩu" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        <p style={styles.link}>Chưa có tài khoản? <span onClick={() => setPage('register')} style={styles.linkText}>Đăng ký</span></p>
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
  link: { textAlign: 'center', marginTop: 16, fontSize: 14 },
  linkText: { color: '#ff6b35', cursor: 'pointer', fontWeight: 'bold' },
};

export default LoginPage;
