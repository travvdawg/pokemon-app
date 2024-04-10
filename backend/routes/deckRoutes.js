const express = require('express');
const router = express.Router();
const {
	getDecks,
	getDeck,
	createDecks,
	updateDeck,
	deleteDeck,
} = require('../controllers/deckController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getDecks).post(protect, createDecks);

router
	.route('/:id')
	.get(protect, getDeck)
	.delete(protect, deleteDeck)
	.put(protect, updateDeck);

module.exports = router;
