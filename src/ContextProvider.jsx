import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Skapar en kontext med createContext-funktionen
export const ChatContext = createContext();

const ChatContextProvider = (props) => {
	const [chat, setChat] = useState([]);
	const [avatarUrl, setAvatarUrl] = useState('');
	const [csrfToken, setCsrfToken] = useState('');
	const [message, setMessage] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const navigate = useNavigate();

	//Används i Register
	useEffect(() => {
		fetch('https://chatify-api.up.railway.app/csrf', {
			method: 'PATCH'
		})
			.then((res) => res.json())
			.then((data) => setCsrfToken(data.csrfToken))
			.catch((error) => console.log('Could not get CSRF token', error));
	}, []);

	//Används i Register
	const register = (username, password, email) => {
		fetch('https://chatify-api.up.railway.app/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password,
				email: email,
				avatar: avatarUrl,
				csrfToken: csrfToken
			})
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const message = data.error
					? { type: 'error', text: data.error }
					: {
							type: 'success',
							text: 'Registration successful! Redirecting to login...'
					  };

				setMessage(message);

				if (!data.error) {
					setTimeout(() => {
						navigate('/login?success=Registration successful!');
					}, 1000);
				}
			})
			.catch((error) => {
				console.error('Fetch error:', error);
				setMessage({
					type: 'error',
					text: 'An unexpected error occurred. Please try again.'
				});
			});
	};

	// Används i Register
	const handlePreview = () => {
		setAvatarUrl(
			`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
		);
	};

	//Kollar om jwt-token setts i sessionStorage
	useEffect(() => {
		const token = sessionStorage.getItem('jwt_token');
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	//ser till så att man kan uppdatera sidan och komma till samma sida
	// useEffect(() => {
	// 	const isLoggedIn = sessionStorage.getItem('isLoggedIn');

	// 	if (isLoggedIn === 'true') {
	// 		const currentPage = sessionStorage.getItem('currentPage');
	// 		navigate(currentPage);
	// 	}
	// }, []);

	//Används i Login
	const login = (username, password) => {
		fetch('https://chatify-api.up.railway.app/auth/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password,
				csrfToken: csrfToken
			})
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('data is', data);
				if (data.token) {
					sessionStorage.setItem('jwt_token', data.token);

					setIsLoggedIn(true);
					navigate('/chat');
				} else {
					setMessage({
						type: 'error',
						text: 'Your Username or Password is wrong. Please try again.'
					});
				}
			})
			.catch((error) => {
				console.error('Fetch error:', error);
				setMessage({
					type: 'error',
					text: 'An unexpected error occurred. Please try again.'
				});
			});
	};

	// useEffect(() => {
	// 	setChat([...chat, { id: 1, text: 'you suck!' }]);
	// }, [chat]);import { createContext, useState, useEffect } from 'react';

	const logout = () => {
		sessionStorage.removeItem('jwt_token');
		setIsLoggedIn(false);
		navigate('/login');
	};

	return (
		<ChatContext.Provider
			value={{
				csrfToken,
				register,
				message,
				login,
				logout,
				avatarUrl,
				handlePreview,
				isLoggedIn,
				chat,
				setChat
			}}>
			{props.children}
		</ChatContext.Provider>
	);
};

export default ChatContextProvider;
