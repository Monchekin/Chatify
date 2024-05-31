import React, { useContext, useState } from 'react';
import { ChatContext } from '../ContextProvider';

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const { register, handlePreview, avatarUrl } = useContext(ChatContext);

	return (
		<div>
			<h1>Register</h1>

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
			<input
				type='email'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<div className='avatar-container'>
				<h3>Välj din Avatar</h3>
				<button type='button' onClick={handlePreview}>
					Välj din profilbild
				</button>

				{avatarUrl && (
					<div className='avatar-preview'>
						<img src={avatarUrl} alt='Avatar Preview' />
					</div>
				)}
			</div>

			<button onClick={() => register(username, password, email)}>
				Register
			</button>
		</div>
	);
};

export default Register;
