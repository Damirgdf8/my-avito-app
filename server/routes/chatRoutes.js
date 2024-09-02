const express = require('express');
const { generateAdText } = require('../controllers/chatController');
const router = express.Router();

router.post('/generate-ad-text', generateAdText);

module.exports = router;
