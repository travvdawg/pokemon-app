import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<header className='header'>
			<div className='logo'>
				<Link
					to='/'
					className='logo'>
					TCG Deck Builder
				</Link>
			</div>
			<ul className='header-links'>
				{user ? (
					<li>
						<button
							className='logout-btn'
							onClick={onLogout}>
							<FaSignOutAlt /> Logout
						</button>
					</li>
				) : (
					<>
						<li className='link-item'>
							<Link to='/login'>
								<FaSignInAlt /> <p>Login</p>
							</Link>
						</li>
						<li className='link-item'>
							<Link to='/register'>
								<FaUser /> <p>Register</p>
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}
export default Header;
