import React, { useEffect, useState } from 'react';
import { orderApi } from '../api/axios';
import { useAuth } from '../context/AuthContext';

const statusColor = { pending: '#faad14', confirmed: '#1890ff', paid: '#52c41a', cancelled: '#ff4d4f' };
const statusLabel = { pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', paid: 'Đã thanh toán', cancelled: 'Đã hủy' };

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderApi.getByUser(user.id)
      .then(res => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user.id]);

  if (loading) return <div style={styles.center}>Đang tải đơn hàng...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📋 Đơn hàng của tôi</h2>
      {orders.length === 0 ? (
        <div style={styles.center}>Bạn chưa có đơn hàng nào</div>
      ) : (
        orders.map(order => (
          <div key={order.id} style={styles.card}>
            <div style={styles.header}>
              <span>Đơn hàng <strong>#{order.id}</strong></span>
              <span style={{ ...styles.status, background: statusColor[order.status] }}>
                {statusLabel[order.status]}
              </span>
            </div>
            <div style={styles.items}>
              {order.items?.map(item => (
                <div key={item.id} style={styles.item}>
                  <span>{item.foodName} × {item.quantity}</span>
                  <span>{(Number(item.price) * item.quantity).toLocaleString('vi-VN')}đ</span>
                </div>
              ))}
            </div>
            <div style={styles.footer}>
              <span style={{ color: '#888', fontSize: 13 }}>
                {new Date(order.createdAt).toLocaleString('vi-VN')}
              </span>
              <strong style={{ color: '#ff6b35' }}>
                Tổng: {Number(order.total).toLocaleString('vi-VN')}đ
              </strong>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: 800, margin: '0 auto', padding: '24px 16px' },
  title: { color: '#ff6b35' },
  card: { background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 16, overflow: 'hidden' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #f0f0f0' },
  status: { color: '#fff', padding: '3px 10px', borderRadius: 12, fontSize: 12 },
  items: { padding: '12px 16px' },
  item: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 14, color: '#555' },
  footer: { display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderTop: '1px solid #f0f0f0', background: '#fafafa' },
  center: { textAlign: 'center', padding: 60, color: '#888' },
};

export default OrdersPage;
