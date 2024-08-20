import React, { useContext, useState } from 'react';
import { ChatContext } from '../ContextProvider';

const Profile = () => {
	const { updateProfile, userInfo, handlePreview, avatarUrl } =
		useContext(ChatContext);
	const [newUsername, setNewUsername] = useState(userInfo.user || '');
	const [newEmail, setNewEmail] = useState(userInfo.email || '');

	const handleUsernameChange = () => {
		updateProfile({ username: newUsername });
	};

	const handleEmailChange = () => {
		updateProfile({ email: newEmail });
	};

	const handleAvatarChange = () => {
		updateProfile({ avatar: avatarUrl });
	};

	return (
		<div className='relative h-lvh'>
			<div className='absolute top-16 left-1/2 transform -translate-x-1/2 p-4 flex flex-col space-y-2 shadow-xl items-center border-4 w-[60%] bg-contain bg-image h-auto'>
				{userInfo && (
					<>
						<h1 className='text-lg font-bold'>
							{userInfo.user}, det här är din profilsida.
						</h1>
						<p className='mt-0'>
							Här kan du byta profilbild, användarnamn och email.
						</p>
						{!avatarUrl && (
							<img
								src={userInfo.avatar}
								alt='User Avatar'
								className='w-30 h-30 rounded-full object-cover mt-4 mb-4'
							/>
						)}
						{avatarUrl && (
							<img
								src={avatarUrl}
								alt='User Avatar'
								className='w-30 h-30 rounded-full object-cover mt-4 mb-4'
							/>
						)}
						<button
							className='btn btn-xs sm:btn-sm mt-3'
							onClick={handlePreview}>
							Välj ny Profilbild
						</button>
						<button
							className='btn btn-xs sm:btn-sm md:btn-md mt-3'
							onClick={handleAvatarChange}>
							Uppdatera Profilbild
						</button>
						<div className='w-full max-w-lg mt-4'>
							<p className='mb-2'>
								Ditt nuvarande användarnamn: {userInfo.user}
							</p>
							<label className='flex items-center gap-2'>
								Användarnamn:
								<input
									type='text'
									className='input input-bordered flex-grow w-full'
									placeholder='Nytt användarnamn'
									onChange={(e) => setNewUsername(e.target.value)}
								/>
							</label>

							<div className='flex w-full justify-end'>
								<button
									className='btn btn-xs sm:btn-sm md:btn-md mt-3 ml-auto'
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
									onChange={(e) => setNewEmail(e.target.value)}
								/>
							</label>
							<div className='flex w-full justify-end'>
								<button
									className='btn btn-xs sm:btn-sm md:btn-md mt-3 ml-auto'
									onClick={handleEmailChange}>
									Uppdatera Email
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Profile;
