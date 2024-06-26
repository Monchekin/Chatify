import React, { useState, useContext } from 'react';
import { ChatContext } from '../ContextProvider';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { login, message } = useContext(ChatContext);

	return (
		<div
			className='p-8 flex flex-col space-y-1 shadow-xl content-center border-4 w-1/3  bg-contain  bg-image'
			style={{ backgroundImage: "url('Sun_Flower_background.png')" }}>
			<h1>Login</h1>
			<div className=''></div>
			{message && (
				<div
					className={
						message.type === 'error' ? 'text-red-500' : 'text-green-500'
					}>
					{message.text}
				</div>
			)}

			<label className='input input-bordered flex items-center gap-2'>
				Username:
				<input
					type='text'
					className='grow'
					placeholder='Username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</label>

			<label className='input input-bordered flex items-center gap-2'>
				Password:
				<input
					type='password'
					className='grow'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>

			<button
				disabled={!username || !password}
				className='btn btn-xs sm:btn-sm md:btn-md '
				onClick={() => login(username, password)}>
				Login
			</button>

			<button
				className='btn btn-xs sm:btn-sm md:btn-md '
				onClick={() => (location.href = '/')}>
				Register
			</button>
		</div>
	);
};

export default Login;
