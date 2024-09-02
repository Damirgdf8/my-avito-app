const express = require('express');
const router = express.Router();
const { register, login, addAvitoCredentials, protectedRoute } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Маршруты пользователя
router.post('/register', register);
router.post('/login', login);
router.post('/add-avito', authenticateToken, addAvitoCredentials);
router.get('/protected', authenticateToken, protectedRoute);

module.exports = router;
