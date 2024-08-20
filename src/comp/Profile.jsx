import React, { useContext, useState } from 'react';
import { ChatContext } from '../ContextProvider';

const Profile = () => {
	const { updateProfile, userInfo } = useContext(ChatContext);

	const [newUsername, setNewUsername] = useState('');
	const [newEmail, setNewEmail] = useState('');
	const [newAvatar, setNewAvatar] = useState('');

	const handleUsernameChange = () => {
		updateProfile({ username: newUsername });
	};

	const handleEmailChange = () => {
		updateProfile({ email: newEmail });
	};

	const handleAvatarChange = () => {
		updateProfile({ avatar: newAvatar });
	};

	return (
		<div className='relative h-lvh'>
			<div className='absolute top-16 left-1/2 transform -translate-x-1/2 p-4 flex flex-col space-y-2 shadow-xl items-center border-4 w-[60%] bg-contain bg-image h-auto'>
				{userInfo && (
					<>
						<h1 className='text-lg font-bold'>
							Hej {userInfo.username}, det här är din profilsida
						</h1>

						<img
							src={userInfo.avatar || 'https://i.pravatar.cc/150?img=10'}
							alt='User Avatar'
							className='w-24 h-24 rounded-full object-cover mt-4 mb-4'
						/>

						<button
							className='btn btn-xs sm:btn-sm md:btn-md'
							onClick={(handleAvatarChange, setNewAvatar)}>
							Uppdatera Profilbild
						</button>

						<div className='w-full max-w-lg mt-4'>
							<p className='mb-2'>
								Ditt nuvarande användarnamn: {userInfo.username}
							</p>
							<label className='flex items-center gap-2'>
								Användarnamn:
								<input
									type='text'
									className='input input-bordered flex-grow w-full'
									placeholder='Nytt användarnamn'
									value={newUsername}
									onChange={(e) => setNewUsername(e.target.value)}
								/>
							</label>
							<div className='w-full max-w-sm place-self-endss'>
								<button
									className='btn btn-xs sm:btn-sm md:btn-md mt-3 '
									onClick={handleUsernameChange}>
									Uppdatera Användarnamn
								</button>
							</div>
						</div>

						<div className='w-full max-w-lg mt-4'>
							<p className='mb-2'>Din nuvarande email: {userInfo.email}</p>
							<label className='flex items-center gap-2'>
								Email:
								<input
									type='text'
									className='input input-bordered flex-grow w-full'
									placeholder='Ny email'
									value={newEmail}
									onChange={(e) => setNewEmail(e.target.value)}
								/>
							</label>
							<button
								className='btn btn-xs sm:btn-sm md:btn-md mt-3'
								onClick={handleEmailChange}>
								Uppdatera Email
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Profile;
