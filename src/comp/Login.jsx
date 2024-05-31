import React, { useState, useContext } from 'react';
import { ChatContext } from '../ContextProvider';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { login } = useContext(ChatContext);

	return (
		<div>
			<h1>Login</h1>

			<input
				type='text'
				placeholder='Username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button
				disabled={!username && !password}
				onClick={() => login(username, password)}>
				Login
			</button>
		</div>
	);
};

export default Login;
