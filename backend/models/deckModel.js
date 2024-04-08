const mongoose = require('mongoose');

const deckSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true],
			ref: 'User',
		},
		name: {
			type: String,
			required: [true, 'Please add a name'],
			trim: true,
		},
		cards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: [true, 'Decks need to have 60 cards'],
				ref: 'Card',
			},
		],
		isPublic: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Deck', deckSchema);
