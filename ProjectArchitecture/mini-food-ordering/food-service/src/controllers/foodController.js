const Food = require('../models/Food');

exports.getFoods = async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};
    const foods = await Food.findAll({ where });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFood = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    if (!name || !price) return res.status(400).json({ message: 'Name and price required' });
    const food = await Food.create({ name, price, description, category, image });
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    await food.update(req.body);
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    await food.destroy();
    res.json({ message: 'Food deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
