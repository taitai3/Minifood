import React, { useEffect, useState } from 'react';
import { foodApi } from '../api/axios';
import { useCart } from '../context/CartContext';

const FoodCard = ({ food, onAdd }) => (
  <div style={styles.card}>
    <div style={styles.emoji}>{getCategoryEmoji(food.category)}</div>
    <div style={styles.info}>
      <h3 style={styles.name}>{food.name}</h3>
      <p style={styles.desc}>{food.description}</p>
      <div style={styles.footer}>
        <span style={styles.price}>{Number(food.price).toLocaleString('vi-VN')}đ</span>
        <button style={styles.btn} onClick={() => onAdd(food)}>+ Thêm</button>
      </div>
    </div>
  </div>
);

const getCategoryEmoji = (cat) => ({ main: '🍜', snack: '🥪', drink: '🧋', dessert: '🍮' }[cat] || '🍽️');

const FoodListPage = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    foodApi.getAll().then(res => setFoods(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleAdd = (food) => {
    addToCart(food);
    setToast(`Đã thêm "${food.name}" vào giỏ`);
    setTimeout(() => setToast(''), 2000);
  };

  const categories = ['all', 'main', 'snack', 'drink', 'dessert'];
  const filtered = filter === 'all' ? foods : foods.filter(f => f.category === filter);

  if (loading) return <div style={styles.center}>Đang tải thực đơn...</div>;

  return (
    <div style={styles.container}>
      {toast && <div style={styles.toast}>{toast}</div>}
      <h2 style={styles.title}>🍽️ Thực đơn hôm nay</h2>
      <div style={styles.filters}>
        {categories.map(c => (
          <button key={c} style={{ ...styles.filterBtn, ...(filter === c ? styles.activeFilter : {}) }}
            onClick={() => setFilter(c)}>
            {c === 'all' ? 'Tất cả' : c}
          </button>
        ))}
      </div>
      <div style={styles.grid}>
        {filtered.map(food => <FoodCard key={food.id} food={food} onAdd={handleAdd} />)}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: 1100, margin: '0 auto', padding: '24px 16px' },
  title: { color: '#ff6b35', marginBottom: 16 },
  filters: { display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' },
  filterBtn: { padding: '6px 16px', border: '1px solid #ddd', borderRadius: 20, cursor: 'pointer', background: '#fff', fontSize: 13 },
  activeFilter: { background: '#ff6b35', color: '#fff', border: '1px solid #ff6b35' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 },
  card: { background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  emoji: { fontSize: 60, textAlign: 'center', padding: '20px 0', background: '#fff8f5' },
  info: { padding: 16, flex: 1, display: 'flex', flexDirection: 'column' },
  name: { margin: '0 0 6px', fontSize: 16 },
  desc: { color: '#888', fontSize: 13, flex: 1, margin: '0 0 12px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { color: '#ff6b35', fontWeight: 'bold', fontSize: 16 },
  btn: { background: '#ff6b35', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 8, cursor: 'pointer' },
  center: { textAlign: 'center', padding: 60, color: '#888' },
  toast: { position: 'fixed', bottom: 24, right: 24, background: '#333', color: '#fff', padding: '10px 20px', borderRadius: 8, zIndex: 999 },
};

export default FoodListPage;
