import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChatContext } from '../ContextProvider';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { login, isLoggedIn } = useContext(ChatContext);
	const [searchParams] = useSearchParams();
	const errorMessage = searchParams.get('error');
	const successMessage = searchParams.get('success');

	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/chat');
		}
	}, [isLoggedIn, navigate]);

	return (
		<div className='flex justify-center items-center h-96 mt-24'>
			<div
				className='p-8 flex flex-col space-y-1 shadow-xl items-center border-4 w-1/3 bg-contain bg-image'
				style={{ backgroundImage: "url('Sun_Flower_background.png')" }}>
				<h1>Login</h1>

				{errorMessage && (
					<div className='alert alert-error'>{errorMessage}</div>
				)}

				{successMessage && (
					<div className='alert alert-success'>{successMessage}</div>
				)}

				<label className='flex items-center gap-2 w-full max-w-lg pt-3'>
					Username:
					<input
						type='text'
						className='input input-bordered flex-grow w-full'
						placeholder='Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>

				<label className='flex items-center gap-2 w-full max-w-lg '>
					{' '}
					Password:
					<input
						type='password'
						className='input input-bordered flex-grow w-full'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<div className='flex space-x-2 pt-3'>
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
			</div>
		</div>
	);
};

export default Login;
