import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

function Home() {
	return (
		<>
			<section className='heading'>
				<h1>Create a new deck</h1>
				<p>Please choose from an option below</p>
			</section>

			<Link
				to='/new-deck'
				className='btn btn-reverse btn-block'>
				<FaQuestionCircle /> Create new deck
			</Link>
			<Link
				to='/my-decks'
				className='btn btn-reverse btn-block'>
				<FaTicketAlt /> View current decks
			</Link>
		</>
	);
}
export default Home;
