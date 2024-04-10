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

// @desc    get single user deck
// @route   GET    /api/decks/:id
//@access   Private
const getDeck = asyncHandler(async (req, res) => {
	// Get user useing id in the JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const deck = await Deck.findById(req.params.id);

	if (!deck) {
		res.status(404);
		throw new Error('Deck not found');
	}

	// might not restrict user made decks later in application
	if (deck.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	res.status(200).json(deck);
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

// @desc    Delete single deck
// @route   DELETE    /api/decks/:id
//@access   Private
const deleteDeck = asyncHandler(async (req, res) => {
	// Get user useing id in the JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const deck = await Deck.findById(req.params.id);

	if (!deck) {
		res.status(404);
		throw new Error('Deck not found');
	}

	// might not restrict user made decks later in application
	if (deck.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	await deck.deleteOne();

	res.status(200).json({ success: true });
});

// @desc    Update deck
// @route   PUT    /api/decks/:id
//@access   Private
const updateDeck = asyncHandler(async (req, res) => {
	// Get user useing id in the JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const deck = await Deck.findById(req.params.id);

	if (!deck) {
		res.status(404);
		throw new Error('Deck not found');
	}

	// might not restrict user made decks later in application
	if (deck.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	const updatedDeck = await Deck.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedDeck);
});

module.exports = {
	getDecks,
	getDeck,
	createDecks,
	updateDeck,
	deleteDeck,
};
