import { createContext, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Skapar en kontext med createContext-funktionen
export const ChatContext = createContext();

const ChatContextProvider = (props) => {
	// Tillstånd för att lagra olika data som används i chatten och användarhantering
	const [avatarUrl, setAvatarUrl] = useState('');
	const [csrfToken, setCsrfToken] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [message, setMessage] = useState(null);
	const [chatMsgHistory, setChatMsgHistory] = useState([]);
	const [userInfo, setUserInfo] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	// Hämtar CSRF-token och användarinformation från sessionStorage när komponenten laddas
	useEffect(() => {
		fetch('https://chatify-api.up.railway.app/csrf', {
			method: 'PATCH'
		})
			.then((res) => res.json())
			.then((data) => {
				setCsrfToken(data.csrfToken);
			})
			.catch((error) => {
				console.log('Could not get CSRF token', error);
			});

		// Kollar om JWT-token finns och hämtar användarinformation om den gör det
		const token = sessionStorage.getItem('jwt_token');
		if (token) {
			const decodedJwt = JSON.parse(atob(token.split('.')[1]));
			setUserInfo(decodedJwt);
			setIsLoggedIn(true);
		}
	}, []);

	// Funktion för att registrera en ny användare
	const register = (username, password, email) => {
		let errorMessage = '';

		// Validerar att alla fält är ifyllda
		if (!username) {
			errorMessage = 'Username is required.';
		} else if (!password) {
			errorMessage = 'Password is required.';
		} else if (!email) {
			errorMessage = 'Email is required.';
		}

		// Om något fält är tomt, visas ett felmeddelande
		if (!username && !password && !email) {
			setSearchParams({
				error: 'All fields are required. Please fill in all fields.'
			});
			return;
		}

		if (errorMessage) {
			setSearchParams({ error: errorMessage });
			return;
		}

		// Skickar en registreringsförfrågan till servern
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
				// Om registreringen lyckas, navigerar till inloggningssidan
				if (!data.error) {
					setTimeout(() => {
						navigate('/login?success=Registration successful!');
					}, 3000);
				} else {
					// Om registreringen misslyckas, visas ett felmeddelande
					setSearchParams({
						error: data.error || 'Registration failed. Please try again.'
					});
				}
			})
			.catch((error) => {
				console.error('Fetch error:', error);
				setSearchParams({
					error: 'An unexpected error occurred. Please try again.'
				});
			});
	};

	// Funktion för att generera och förhandsgranska en avatar-URL
	const handlePreview = () => {
		setAvatarUrl(
			`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
		);
	};

	// Funktion för att logga in en användare ----------------------------------------------
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
			.then((res) => {
				console.log('Response received:', res);
				return res.json();
			})
			.then((data) => {
				// Om inloggningen lyckas, sparas JWT-token och navigerar till chatten
				if (data && data.token) {
					sessionStorage.setItem('jwt_token', data.token);

					setIsLoggedIn(true);
					getChatHistory();
					navigate('/chat');
					console.log(userInfo);
				} else {
					// Om inloggningen misslyckas, visas ett felmeddelande
					setSearchParams({ error: 'Invalid username or password' });
				}
			})
			.catch((error) => {
				console.error('Fetch error:', error);
				setSearchParams({
					error: 'An unexpected error occurred. Please try again.'
				});
			});
	};

	// Funktion för att hämta chatthistorik ----------------------------------------------
	const getChatHistory = () => {
		fetch('https://chatify-api.up.railway.app/messages', {
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token')
			}
		})
			.then((res) => res.json())
			.then((data) => {
				setChatMsgHistory(data);
			})
			.catch((error) => console.log(error));
	};

	// Funktion för att skicka ett meddelande
	const sendMessage = (text) => {
		fetch('https://chatify-api.up.railway.app/messages', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				text: text,
				conversationId: null
			})
		})
			.then((response) => response.json())
			.then((data) => {
				setMessage(data.latestMessage);
				console.log('Message sent', data.latestMessage);
			})
			.catch((error) => console.log('Could not send message', error));
	};

	// Funktion för att ta bort ett meddelande
	const removeMessage = (msgId) => {
		fetch('https://chatify-api.up.railway.app/messages/' + msgId, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ` + sessionStorage.getItem('jwt_token')
			}
		});
	};

	// Funktion för att uppdatera användarprofilen ----------------------------------------------
	const updateProfile = () => {
		fetch('https://chatify-api.up.railway.app/user', {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: _userId, // här behövs korrekta värden
				updatedData: {
					username: _username, // _username är bara fejk
					email: _email, // osv..
					avatar: _avatar
				}
			})
		})
			.then((res) => res.json())
			.then((data) => console.log('user updated'));
	};

	// Funktion för att logga ut användaren
	const logout = () => {
		sessionStorage.removeItem('jwt_token');
		setIsLoggedIn(false);
		navigate('/login');
	};

	return (
		// Tillhandahåller alla funktioner och data för andra komponenter via ChatContext
		<ChatContext.Provider
			value={{
				csrfToken,
				register,
				infoMessage: searchParams.get('error'),
				login,
				logout,
				avatarUrl,
				handlePreview,
				isLoggedIn,
				getChatHistory,
				chatMsgHistory,
				sendMessage,
				message,
				updateProfile,
				userInfo,
				removeMessage
			}}>
			{props.children}
		</ChatContext.Provider>
	);
};

export default ChatContextProvider;
