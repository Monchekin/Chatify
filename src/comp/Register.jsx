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
		<div className='flex justify-center items-center h-lvh'>
			<div
				className='p-8 flex flex-col space-y-1 shadow-xl items-center border-4 w-1/3 bg-contain bg-image h-84'
				style={{ backgroundImage: "url('Sun_Flower_Background.png')" }}>
				<h1>Register</h1>

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
						placeholder=' username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>

				<label className='flex items-center gap-2 w-full max-w-lg '>
					Password:
					<input
						type='password'
						className='input input-bordered flex-grow w-full'
						placeholder='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>

				<label className='flex items-center gap-2 w-full max-w-lg'>
					Email:
					<input
						type='text'
						className='input input-bordered flex-grow w-full'
						placeholder=' exempel@exempel.com'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>

				<div className='avatar-container pt-3 pb-3'>
					<div className='border-2 border-solid ms-7 border-black w-20 h-20 '>
						{!avatarUrl}
						{avatarUrl && (
							<img
								src={avatarUrl}
								alt='Avatar Preview'
								className='w-full h-full object-cover'
							/>
						)}
					</div>
					<button className='btn btn-xs sm:btn-sm mt-3' onClick={handlePreview}>
						Välj din profilbild
					</button>
				</div>
				<div className='flex space-x-2 '>
					<button
						className='btn btn-xs sm:btn-sm md:btn-md'
						onClick={() => register(username, password, email, avatarUrl)}>
						Register
					</button>
					<button
						className='btn btn-xs sm:btn-sm md:btn-md'
						onClick={() => (location.href = '/login')}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Register;
