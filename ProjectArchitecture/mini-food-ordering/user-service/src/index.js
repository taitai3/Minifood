require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/', userRoutes);

app.get('/health', (req, res) => res.json({ service: 'user-service', status: 'ok' }));

sequelize.sync({ alter: true }).then(() => {
  console.log('[User Service] Database synced');
  app.listen(PORT, () => console.log(`[User Service] Running on port ${PORT}`));
}).catch(err => console.error('[User Service] DB error:', err));
