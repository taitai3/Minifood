import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const api = axios.create({ baseURL: BASE_URL });

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const userApi = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
};

export const foodApi = {
  getAll: () => api.get('/foods'),
};

export const orderApi = {
  create: (data) => api.post('/orders', data),
  getByUser: (userId) => api.get(`/orders?userId=${userId}`),
};

export const paymentApi = {
  pay: (data) => api.post('/payments', data),
  getNotifications: (userId) => api.get(`/notifications?userId=${userId}`),
};

export default api;
