const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./utils/database');
const userRoutes = require('./routes/user');
const adRoutes = require('./routes/ad');
const chatRoutes = require('./routes/chat');  // Единственное объявление chatRoutes
const User = require('./models/User'); // Импортируем модель User
const Ad = require('./models/Ad'); // Импортируем модель Ad

// Инициализация приложения
const app = express();
dotenv.config();

// Middleware для парсинга JSON
app.use(express.json());

// Роуты
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/chat', chatRoutes);  // Используем правильное объявление chatRoutes

// Запуск сервера
const PORT = process.env.PORT || 5000;

sequelize.sync({ force: true }) // force: true пересоздает все таблицы
  .then(() => {
    console.log('Database synced and connected...');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
