import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderApi, paymentApi } from '../api/axios';

const CartPage = ({ setPage }) => {
  const { cart, updateQty, removeFromCart, clearCart, total } = useCart();
  const { user } = useAuth();
  const [method, setMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    if (!cart.length) return;
    setLoading(true);
    setError('');
    try {
      // Create order
      const orderRes = await orderApi.create({
        userId: user.id,
        items: cart.map(i => ({ foodId: i.id, quantity: i.quantity })),
      });
      const order = orderRes.data;

      // Process payment
      const payRes = await paymentApi.pay({ orderId: order.id, userId: user.id, method });
      setResult({ order, payment: payRes.data.payment, notification: payRes.data.notification });
      clearCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Đặt hàng thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div style={styles.container}>
        <div style={styles.success}>
          <div style={{ fontSize: 60 }}>✅</div>
          <h2>Đặt hàng thành công!</h2>
          <p>Mã đơn hàng: <strong>#{result.order.id}</strong></p>
          <p>Tổng tiền: <strong>{Number(result.order.total).toLocaleString('vi-VN')}đ</strong></p>
          <p style={{ color: '#888', fontSize: 13 }}>{result.notification?.message}</p>
          <button style={styles.btn} onClick={() => setPage('orders')}>Xem đơn hàng</button>
          <button style={{ ...styles.btn, background: '#fff', color: '#ff6b35', border: '1px solid #ff6b35', marginLeft: 12 }}
            onClick={() => setPage('foods')}>Tiếp tục mua</button>
        </div>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>
          <div style={{ fontSize: 60 }}>🛒</div>
          <p>Giỏ hàng trống</p>
          <button style={styles.btn} onClick={() => setPage('foods')}>Xem thực đơn</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛒 Giỏ hàng</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.layout}>
        <div style={styles.items}>
          {cart.map(item => (
            <div key={item.id} style={styles.item}>
              <span style={styles.itemName}>{item.name}</span>
              <div style={styles.qtyControl}>
                <button style={styles.qtyBtn} onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                <span style={styles.qty}>{item.quantity}</span>
                <button style={styles.qtyBtn} onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
              </div>
              <span style={styles.itemPrice}>{(Number(item.price) * item.quantity).toLocaleString('vi-VN')}đ</span>
              <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>
        <div style={styles.summary}>
          <h3>Thanh toán</h3>
          <div style={styles.totalRow}>
            <span>Tổng cộng:</span>
            <strong style={{ color: '#ff6b35' }}>{total.toLocaleString('vi-VN')}đ</strong>
          </div>
          <div style={styles.methodGroup}>
            <p style={{ marginBottom: 8 }}>Phương thức:</p>
            {['cash', 'card', 'momo', 'banking'].map(m => (
              <label key={m} style={styles.radio}>
                <input type="radio" value={m} checked={method === m} onChange={() => setMethod(m)} />
                {' '}{m.toUpperCase()}
              </label>
            ))}
          </div>
          <button style={styles.checkoutBtn} onClick={handleCheckout} disabled={loading}>
            {loading ? 'Đang xử lý...' : '🎉 Đặt hàng ngay'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: 900, margin: '0 auto', padding: '24px 16px' },
  title: { color: '#ff6b35' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 },
  items: { display: 'flex', flexDirection: 'column', gap: 12 },
  item: { display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: '12px 16px', borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.07)' },
  itemName: { flex: 1, fontSize: 15 },
  qtyControl: { display: 'flex', alignItems: 'center', gap: 8 },
  qtyBtn: { width: 28, height: 28, border: '1px solid #ddd', borderRadius: 6, cursor: 'pointer', background: '#f5f5f5', fontSize: 16 },
  qty: { minWidth: 24, textAlign: 'center' },
  itemPrice: { color: '#ff6b35', fontWeight: 'bold', minWidth: 80, textAlign: 'right' },
  removeBtn: { background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: 16 },
  summary: { background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', height: 'fit-content' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: 18, margin: '16px 0' },
  methodGroup: { marginBottom: 16 },
  radio: { display: 'block', marginBottom: 6, cursor: 'pointer', fontSize: 14 },
  checkoutBtn: { width: '100%', padding: '12px', background: '#ff6b35', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer' },
  btn: { padding: '10px 20px', background: '#ff6b35', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: 16 },
  error: { color: '#ff4d4f', marginBottom: 12 },
  empty: { textAlign: 'center', padding: 60, color: '#888' },
  success: { textAlign: 'center', padding: 60 },
};

export default CartPage;
