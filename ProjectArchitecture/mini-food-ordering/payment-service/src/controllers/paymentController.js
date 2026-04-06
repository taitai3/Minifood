const axios = require('axios');
const Payment = require('../models/Payment');
const Notification = require('../models/Notification');

exports.processPayment = async (req, res) => {
  try {
    const { orderId, userId, method } = req.body;
    if (!orderId || !userId) return res.status(400).json({ message: 'orderId and userId required' });

    // Get order from Order Service
    const orderRes = await axios.get(`${process.env.ORDER_SERVICE_URL}/orders/${orderId}`);
    const order = orderRes.data;

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status === 'paid') return res.status(400).json({ message: 'Order already paid' });

    // Create payment record
    const payment = await Payment.create({
      orderId,
      userId,
      amount: order.total,
      method: method || 'cash',
      status: 'success',
    });

    // Update order status to 'paid' via Order Service
    await axios.patch(`${process.env.ORDER_SERVICE_URL}/orders/${orderId}/status`, { status: 'paid' });

    // Log notification
    const message = `User #${userId} đã thanh toán đơn hàng #${orderId} thành công. Tổng tiền: ${order.total}đ`;
    const notification = await Notification.create({ message, userId, orderId });
    console.log(`[Notification] ${message}`);

    res.status(201).json({ payment, notification });
  } catch (err) {
    console.error('[Payment Service] error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.query;
    const where = userId ? { userId } : {};
    const notifications = await Notification.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({ order: [['createdAt', 'DESC']] });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
