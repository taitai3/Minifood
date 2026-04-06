const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');

const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  foodId: { type: DataTypes.INTEGER, allowNull: false },
  foodName: { type: DataTypes.STRING },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { tableName: 'order_items', timestamps: false });

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = OrderItem;
