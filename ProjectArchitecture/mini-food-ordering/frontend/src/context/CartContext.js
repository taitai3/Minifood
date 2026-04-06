import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

const loadCart = () => {
  try { return JSON.parse(localStorage.getItem('cart')) || []; }
  catch { return []; }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(loadCart);

  const saveCart = (items) => {
    setCart(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = (food) => {
    const existing = cart.find(i => i.id === food.id);
    if (existing) {
      saveCart(cart.map(i => i.id === food.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      saveCart([...cart, { ...food, quantity: 1 }]);
    }
  };

  const removeFromCart = (foodId) => saveCart(cart.filter(i => i.id !== foodId));

  const updateQty = (foodId, qty) => {
    if (qty <= 0) return removeFromCart(foodId);
    saveCart(cart.map(i => i.id === foodId ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => saveCart([]);

  const total = cart.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
