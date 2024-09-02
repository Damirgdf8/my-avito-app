const express = require('express');
const { generateAdText } = require('../controllers/chatController'); // Импортируем правильную функцию
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/generate', authenticateToken, generateAdText); // Используем правильную функцию

module.exports = router;
