import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

function CardList() {
	const [cards, setCards] = useState([]);
	const [loading, SetLoading] = useState(true);

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
					params: {
						q: `legalities.standard:Legal`,
					},
				});
				setCards(response.data.data);
				SetLoading(false);
			} catch (error) {
				console.error('Error fetching cards:', error);
				SetLoading(false);
			}
		};

		fetchCards();
	}, []);

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<div className='scrollable-card-area'>
					{cards.map((card) => (
						<div
							key={card.id}
							className='card'>
							<img
								src={card.images.small}
								alt={card.name}
							/>
						</div>
					))}
				</div>
			)}
			<div className='deck-rules'>
				<p>General Rules</p>
				<ul>
					<li>You can only have 4 cards with the same name in a deck</li>
					<li>Decks can only have exactly 60 cards to be legal to play</li>
					<li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
					<li>Lorem ipsum, dolor sit amet consectetur adipisicing.</li>
				</ul>
			</div>
		</>
	);
}

export default CardList;
