const express = require('express');
const router = express.Router();
const { getDecks, createDecks } = require('../controllers/deckController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getDecks).post(protect, createDecks);

module.exports = router;
