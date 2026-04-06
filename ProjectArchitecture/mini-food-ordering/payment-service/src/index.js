require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const paymentRoutes = require('./routes/paymentRoutes');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', paymentRoutes);
app.get('/health', (req, res) => res.json({ service: 'payment-service', status: 'ok' }));

sequelize.sync({ alter: true }).then(() => {
  console.log('[Payment Service] Database synced');
  app.listen(PORT, () => console.log(`[Payment Service] Running on port ${PORT}`));
}).catch(err => console.error('[Payment Service] DB error:', err));
