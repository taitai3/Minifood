require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => res.json({ service: 'api-gateway', status: 'ok' }));

// Proxy routes
app.use('/api/users', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/users': '' },
  on: { error: (err, req, res) => res.status(503).json({ message: 'User service unavailable' }) },
}));

app.use('/api/foods', createProxyMiddleware({
  target: process.env.FOOD_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/foods': '/foods' },
  on: { error: (err, req, res) => res.status(503).json({ message: 'Food service unavailable' }) },
}));

app.use('/api/orders', createProxyMiddleware({
  target: process.env.ORDER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/orders': '/orders' },
  on: { error: (err, req, res) => res.status(503).json({ message: 'Order service unavailable' }) },
}));

app.use('/api/payments', createProxyMiddleware({
  target: process.env.PAYMENT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/payments': '/payments' },
  on: { error: (err, req, res) => res.status(503).json({ message: 'Payment service unavailable' }) },
}));

app.use('/api/notifications', createProxyMiddleware({
  target: process.env.PAYMENT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/notifications': '/notifications' },
  on: { error: (err, req, res) => res.status(503).json({ message: 'Payment service unavailable' }) },
}));

app.listen(PORT, () => console.log(`[API Gateway] Running on port ${PORT}`));
