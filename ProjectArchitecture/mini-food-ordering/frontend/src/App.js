import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FoodListPage from './pages/FoodListPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';

const AppContent = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(user ? 'foods' : 'login');

  const renderPage = () => {
    if (!user && !['login', 'register'].includes(page)) {
      return <LoginPage setPage={setPage} />;
    }
    switch (page) {
      case 'login': return <LoginPage setPage={setPage} />;
      case 'register': return <RegisterPage setPage={setPage} />;
      case 'foods': return <FoodListPage />;
      case 'cart': return <CartPage setPage={setPage} />;
      case 'orders': return <OrdersPage />;
      default: return <FoodListPage />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar page={page} setPage={setPage} />
      {renderPage()}
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <CartProvider>
      <AppContent />
    </CartProvider>
  </AuthProvider>
);

export default App;
