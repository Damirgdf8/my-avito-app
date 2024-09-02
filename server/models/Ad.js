const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./User'); // Импортируем модель User

const Ad = sequelize.define('Ad', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Ссылаемся на модель User
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  otherParams: {
    type: DataTypes.JSONB,
    allowNull: true
  }
}, {
  tableName: 'Ads' // Указываем имя таблицы явно
});

module.exports = Ad;
