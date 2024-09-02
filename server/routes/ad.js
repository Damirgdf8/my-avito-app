// server/routes/ad.js
const express = require('express');
const router = express.Router();
const { getAds, createAd, updateAd, deleteAd } = require('../controllers/adController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { generateText } = require('../services/chatgpt');

// Маршруты объявлений
router.get('/', authenticateToken, getAds);
router.post('/', authenticateToken, createAd);
router.put('/:id', authenticateToken, updateAd);
router.delete('/:id', authenticateToken, deleteAd);

// Маршрут для генерации текста объявления
router.post('/generate', authenticateToken, async (req, res) => {
  const { prompt } = req.body;

  try {
    const generatedText = await generateText(prompt);
    res.json({ text: generatedText });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate text' });
  }
});

module.exports = router;
