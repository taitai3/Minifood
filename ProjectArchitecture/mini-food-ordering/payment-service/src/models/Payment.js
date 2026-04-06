const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  method: { type: DataTypes.ENUM('cash', 'card', 'momo', 'banking'), defaultValue: 'cash' },
  status: { type: DataTypes.ENUM('success', 'failed'), defaultValue: 'success' },
}, { tableName: 'payments', timestamps: true });

module.exports = Payment;
