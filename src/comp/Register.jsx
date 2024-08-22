import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../ContextProvider';
import { useSearchParams } from 'react-router-dom';

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const { register, handlePreview, avatarUrl } = useContext(ChatContext);
	const [searchParams] = useSearchParams();
	const errorMessage = searchParams.get('error');
	const successMessage = searchParams.get('success');

	return (
		<div className='relative min-h-screen'>
			<div
				className='absolute top-16 left-1/2 transform -translate-x-1/2 p-4 sm:p-8 flex flex-col space-y-2 sm:space-y-4 shadow-xl items-center border-4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-contain bg-image h-auto sm:h-auto md:h-84 bg-gray-600 bg-opacity-30'
				style={{ backgroundImage: "url('Sun_Flower_Background.png')" }}>
				<h1 className='text-xl sm:text-2xl'>Register</h1>

				{errorMessage && (
					<div className='alert alert-error'>{errorMessage}</div>
				)}

				{successMessage && (
					<div className='alert alert-success'>{successMessage}</div>
				)}

				<div className='pt-4'>
					<span className='text-sm sm:text-base'>
						Already have an account?{' '}
						<a href='/login' className='text-blue-500 underline'>
							Click here
						</a>
					</span>
				</div>
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

				<label className='flex items-center gap-2 w-full max-w-lg'>
					Password:
					<input
						type='password'
						className='input input-bordered flex-grow w-full'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>

				<label className='flex items-center gap-2 w-full max-w-lg'>
					Email:
					<input
						type='text'
						className='input input-bordered flex-grow w-full'
						placeholder='exempel@exempel.com'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>

				{avatarUrl && (
					<img
						src={avatarUrl}
						alt='Avatar Preview'
						className='w-30 h-30 rounded-full object-cover'
					/>
				)}
				<button className='btn btn-xs sm:btn-sm mt-3' onClick={handlePreview}>
					Choose your profile picture
				</button>

				<button
					className='btn btn-xs sm:btn-sm md:btn-md'
					onClick={() => register(username, password, email, avatarUrl)}>
					Register
				</button>

				{/* Sentry button  */}
				<button
					className='btn btn-xs sm:btn-sm md:btn-md'
					onClick={() => methodDoesNotExist()}>
					Break the world
				</button>
			</div>
		</div>
	);
};

export default Register;
