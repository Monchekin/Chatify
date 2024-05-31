import { createContext, useState, useEffect } from 'react';

// Skapar en kontext med createContext-funktionen
export const ChatContext = createContext();

const ChatContextProvider = (props) => {
	const [chat, setChat] = useState([]);
	const [csrfToken, setCsrfToken] = useState('');
	const [avatarUrl, setAvatarUrl] = useState('');

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
			.then((data) => console.log(data))
			.catch((error) => {
				console.error('Fetch error:', error);
			});
		location.href = '/login';
	};

	// Används i Register
	const handlePreview = () => {
		setAvatarUrl(
			`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
		);
	};

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
				sessionStorage.setItem('jwt_token', data.token);
				location.href = '/chat';
			})
			.catch((error) => {
				console.error('Fetch error:', error);
			});
	};

	// useEffect(() => {
	// 	setChat([...chat, { id: 1, text: 'you suck!' }]);
	// }, [chat]);import { createContext, useState, useEffect } from 'react';

	return (
		<ChatContext.Provider
			value={{
				csrfToken,
				register,
				login,
				avatarUrl,
				handlePreview,
				chat,
				setChat
			}}>
			{props.children}
		</ChatContext.Provider>
	);
};

export default ChatContextProvider;
