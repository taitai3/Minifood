const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const { getUser, getFood } = require('../utils/serviceClient');
const sequelize = require('../config/database');

exports.createOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { userId, items, note } = req.body;
    // items: [{ foodId, quantity }]

    if (!userId || !items || !items.length)
      return res.status(400).json({ message: 'userId and items are required' });

    // Validate user via User Service
    const user = await getUser(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Fetch food details and calculate total
    let total = 0;
    const resolvedItems = [];

    for (const item of items) {
      const food = await getFood(item.foodId);
      if (!food) return res.status(404).json({ message: `Food ${item.foodId} not found` });
      const price = parseFloat(food.price);
      total += price * item.quantity;
      resolvedItems.push({ foodId: food.id, foodName: food.name, quantity: item.quantity, price });
    }

    const order = await Order.create({ userId, total, note, status: 'pending' }, { transaction: t });

    const orderItems = resolvedItems.map(i => ({ ...i, orderId: order.id }));
    await OrderItem.bulkCreate(orderItems, { transaction: t });

    await t.commit();

    const fullOrder = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, as: 'items' }],
    });

    res.status(201).json(fullOrder);
  } catch (err) {
    await t.rollback();
    console.error('[Order Service] createOrder error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    const where = userId ? { userId } : {};
    const orders = await Order.findAll({
      where,
      include: [{ model: OrderItem, as: 'items' }],
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, as: 'items' }],
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    await order.update({ status: req.body.status });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
