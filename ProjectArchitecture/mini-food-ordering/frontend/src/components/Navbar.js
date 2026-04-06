import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = ({ page, setPage }) => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav style={styles.nav}>
      <span style={styles.brand} onClick={() => setPage('foods')}>🍜 MiniFood</span>
      <div style={styles.links}>
        {user ? (
          <>
            <button style={styles.btn} onClick={() => setPage('foods')}>Thực đơn</button>
            <button style={styles.btn} onClick={() => setPage('cart')}>
              Giỏ hàng {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
            </button>
            <button style={styles.btn} onClick={() => setPage('orders')}>Đơn hàng</button>
            <span style={styles.username}>👤 {user.username}</span>
            <button style={{ ...styles.btn, color: '#ff4d4f' }} onClick={logout}>Đăng xuất</button>
          </>
        ) : (
          <>
            <button style={styles.btn} onClick={() => setPage('login')}>Đăng nhập</button>
            <button style={styles.btn} onClick={() => setPage('register')}>Đăng ký</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', background: '#ff6b35', color: '#fff' },
  brand: { fontSize: 22, fontWeight: 'bold', cursor: 'pointer' },
  links: { display: 'flex', gap: 12, alignItems: 'center' },
  btn: { background: 'none', border: '1px solid #fff', color: '#fff', padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 14 },
  badge: { background: '#fff', color: '#ff6b35', borderRadius: '50%', padding: '1px 6px', fontSize: 12, marginLeft: 4 },
  username: { fontSize: 14 },
};

export default Navbar;
