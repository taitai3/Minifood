const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Food = sequelize.define('Food', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING, defaultValue: '' },
  category: { type: DataTypes.STRING, defaultValue: 'main' },
}, { tableName: 'foods', timestamps: true });

module.exports = Food;
