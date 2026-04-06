const Food = require('../models/Food');

const seedFoods = async () => {
  const count = await Food.count();
  if (count > 0) return;

  await Food.bulkCreate([
    { name: 'Phở Bò', price: 45000, description: 'Phở bò truyền thống, nước dùng đậm đà', category: 'main' },
    { name: 'Bún Bò Huế', price: 40000, description: 'Bún bò cay đặc trưng miền Trung', category: 'main' },
    { name: 'Cơm Tấm Sườn', price: 50000, description: 'Cơm tấm sườn nướng, bì, chả', category: 'main' },
    { name: 'Bánh Mì Thịt', price: 25000, description: 'Bánh mì giòn với thịt nguội và rau', category: 'snack' },
    { name: 'Gỏi Cuốn', price: 30000, description: 'Gỏi cuốn tôm thịt tươi mát', category: 'snack' },
    { name: 'Trà Sữa Trân Châu', price: 35000, description: 'Trà sữa thơm ngon với trân châu đen', category: 'drink' },
    { name: 'Nước Ép Cam', price: 20000, description: 'Nước ép cam tươi nguyên chất', category: 'drink' },
    { name: 'Chè Thái', price: 25000, description: 'Chè Thái đầy đủ topping', category: 'dessert' },
  ]);

  console.log('[Food Service] Seeded initial food data');
};

module.exports = seedFoods;
