import React, { useContext, useState } from 'react';
import { ChatContext } from '../ContextProvider';

const Profile = () => {
	// const { handlePreview, avatarUrl } = useContext(ChatContext);

	const {
		handlePreview,
		avatarUrl,
		username,
		email,
		updateUsername,
		updateEmail,
		updateAvatar
	} = useContext(ChatContext);

	const [newUsername, setNewUsername] = useState(username);
	const [newEmail, setNewEmail] = useState(email);

	const handleUsernameChange = () => {
		updateUsername(newUsername);
	};

	const handleEmailChange = () => {
		updateEmail(newEmail);
	};

	const handleAvatarChange = () => {
		handlePreview();
		updateAvatar(avatarUrl);
	};

	return (
		<div>
			<p>
				Hej {username}, det här är din profil sida där du kan ändra din avatar,
				ditt username och din email
			</p>

			<br />
			<div className='avatar'>
				<div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
					<img src={avatarUrl} alt='Your Avatar' />
				</div>
			</div>

			<div className='avatar-container'>
				<button
					className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'
					onClick={handleAvatarChange}>
					Change your profile picture
				</button>
			</div>
			<br />

			<p>Ditt nuvarnade username: {username} </p>
			<label className='input input-bordered flex items-center gap-2'>
				Username:
				<input
					type='text'
					className='grow'
					placeholder='Username'
					value={newUsername}
					onChange={(e) => setNewUsername(e.target.value)}
				/>
			</label>

			<button
				className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'
				onClick={handleUsernameChange}>
				Update your username
			</button>

			<p>Din nuvarande email: {email} </p>
			<label className='input input-bordered flex items-center gap-2'>
				Email:
				<input
					type='text'
					className='grow'
					placeholder='exempel@exempel.com'
					value={newEmail}
					onChange={(e) => setNewEmail(e.target.value)}
				/>
			</label>
			<button
				className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'
				onClick={handleEmailChange}>
				Update your email
			</button>
		</div>
	);
};

export default Profile;
