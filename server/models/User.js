const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avitoClientID: {
    type: DataTypes.STRING,
    allowNull: true
  },
  avitoSecretID: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Users' // Указываем имя таблицы явно, чтобы избежать путаницы
});

module.exports = User;
