import { useState } from 'react';
import { useSelector } from 'react-redux';

function NewDeck() {
	const { user } = useSelector((state) => state.auth);
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [deck, setDeck] = useState('');
	const [description, setDescription] = useState('');

	return (
		<>
			<section className='heading'>
				<h1>Create New Deck</h1>
				<p>Please add cards to the deck</p>
			</section>
			<section className='deck-cards'>
				<h1>Current Deck</h1>
			</section>
			<section className='card-selection'>
				<h1>All Cards</h1>
			</section>
		</>
	);
}
export default NewDeck;
