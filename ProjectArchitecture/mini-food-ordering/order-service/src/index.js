require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const orderRoutes = require('./routes/orderRoutes');
const sequelize = require('./config/database');
require('./models/OrderItem'); // ensure associations are loaded

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', orderRoutes);
app.get('/health', (req, res) => res.json({ service: 'order-service', status: 'ok' }));

sequelize.sync({ alter: true }).then(() => {
  console.log('[Order Service] Database synced');
  app.listen(PORT, () => console.log(`[Order Service] Running on port ${PORT}`));
}).catch(err => console.error('[Order Service] DB error:', err));
