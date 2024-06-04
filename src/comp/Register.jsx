import React, { useContext, useState } from 'react';
import { ChatContext } from '../ContextProvider';

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const { register, handlePreview, avatarUrl, message } =
		useContext(ChatContext);

	return (
		<div>
			<h1>Register</h1>
			{message && (
				<div
					className={
						message.type === 'error' ? 'text-red-500' : 'text-green-500'
					}>
					{message.text}
				</div>
			)}
			<br /> <br />
			<label className='input input-bordered flex items-center gap-2'>
				Username:
				<input type='text' className='grow' placeholder='Username' />
			</label>
			<br />
			<label className='input input-bordered flex items-center gap-2'>
				Password:
				<input type='password' className='grow' placeholder='Password' />
			</label>
			<br />
			<label className='input input-bordered flex items-center gap-2'>
				Email:
				<input type='text' className='grow' placeholder='exempel@exempel.com' />
			</label>
			<div className='avatar-container'>
				<button
					className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'
					onClick={handlePreview}>
					Välj din profilbild
				</button>

				{avatarUrl && (
					<div className='avatar-preview'>
						<img src={avatarUrl} alt='Avatar Preview' />
					</div>
				)}
			</div>
			<button
				className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'
				onClick={() => register(username, password, email)}>
				Register
			</button>
			<button
				className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'
				onClick={() => (location.href = '/login')}>
				Login
			</button>
		</div>
	);
};

export default Register;
