const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Deck = require('../models/deckModel');

// @desc    get user decks
// @route   GET    /api/decks
//@access   Private
const getDecks = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'get decks' });
});

// @desc    create new decks
// @route   POST    /api/create
//@access   Private
const createDecks = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'create decks' });
});

module.exports = {
	getDecks,
	createDecks,
};
