const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Deck = require('../models/deckModel');

// @desc    get user decks
// @route   GET    /api/decks
//@access   Private
const getDecks = asyncHandler(async (req, res) => {
	// Get user useing id in the JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const decks = await Deck.find({ user: req.user.id });

	res.status(200).json(decks);
});

// @desc    create new decks
// @route   POST    /api/create
//@access   Private
const createDecks = asyncHandler(async (req, res) => {
	const { name, cards } = req.body;
	if (!name || !cards) {
		res.status(400);
		throw new Error('Please add a name and cards');
	}

	// Get user useing id in the JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const cardIds = cards.map((cardId) => new mongoose.Types.ObjectId(cardId));

	const decks = await Deck.create({
		user: req.user.id,
		name,
		cards: cardIds,
	});

	res.status(201).json(decks);
});

module.exports = {
	getDecks,
	createDecks,
};
