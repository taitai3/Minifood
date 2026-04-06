require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const foodRoutes = require('./routes/foodRoutes');
const sequelize = require('./config/database');
const seedFoods = require('./seeders/foodSeeder');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', foodRoutes);
app.get('/health', (req, res) => res.json({ service: 'food-service', status: 'ok' }));

sequelize.sync({ alter: true }).then(async () => {
  console.log('[Food Service] Database synced');
  await seedFoods();
  app.listen(PORT, () => console.log(`[Food Service] Running on port ${PORT}`));
}).catch(err => console.error('[Food Service] DB error:', err));
