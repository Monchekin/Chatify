import React, { useContext, useState } from 'react';
import { ChatContext } from '../ContextProvider';

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const { register, handlePreview, avatarUrl, message } =
		useContext(ChatContext);

	return (
		<div
			className='p-8 flex flex-col space-y-1 shadow-xl content-center border-4 w-1/3  bg-contain  bg-image'
			style={{ backgroundImage: "url('Sun_Flower_Background.png')" }}>
			<h1>Register</h1>
			{message && (
				<div
					className={
						message.type === 'error' ? 'text-red-500' : 'text-green-500'
					}>
					{message.text}
				</div>
			)}

			<label className='input input-bordered flex items-center gap-2 '>
				Username:
				<input
					type='text'
					className='grow'
					placeholder='Username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</label>

			<label className='input input-bordered flex items-center gap-2 '>
				Password:
				<input
					type='password'
					className='grow'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>

			<label className='input input-bordered flex items-center gap-2 '>
				Email:
				<input
					type='text'
					className='grow'
					placeholder='exempel@exempel.com'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>

			<div className='avatar-container  '>
				<button
					className=' btn btn-xs sm:btn-sm md:btn-md   '
					onClick={handlePreview}>
					Välj din profilbild
				</button>

				<div className='border-2 border-solid ms-7 border-black w-20 h-20 '>
					{!avatarUrl}
					{avatarUrl && (
						<img
							src={avatarUrl}
							alt='Avatar Preview'
							className='w-full h-full object-cover '
						/>
					)}
				</div>
			</div>
			<button
				className='btn btn-xs sm:btn-sm md:btn-md'
				onClick={() => register(username, password, email, message)}>
				Register
			</button>
			<button
				className='btn btn-xs sm:btn-sm md:btn-md '
				onClick={() => (location.href = '/login')}>
				Login
			</button>
		</div>
	);
};

export default Register;
