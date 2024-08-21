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
		<div className='relative h-[90vh]'>
			<div className='absolute top-10 left-1/2 transform -translate-x-1/2 p-4 flex flex-col space-y-2 shadow-xl items-center border-4 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] bg-orange-300 bg-opacity-20 h-auto'>
				{userInfo && (
					<>
						<h1 className='text-lg font-bold text-center pt-10'>
							{userInfo.user}, this is your profile page.
						</h1>
						<p className='mt-0 text-center'>
							Here you can change your profile picture, username, and email.
						</p>
						<img
							src={avatarUrl || userInfo.avatar}
							alt='User Avatar'
							className='w-30 h-30 rounded-full object-cover mt-4 mb-4'
						/>
						<button
							className='btn btn-xs sm:btn-sm mt-3'
							onClick={handlePreview}>
							Choose New Profile Picture
						</button>
						<button
							className='btn btn-xs sm:btn-sm md:btn-md mt-3'
							onClick={handleAvatarChange}>
							Update Profile Picture
						</button>
						<div className='w-full max-w-lg mt-4'>
							<p className='mb-2'>
								Your current username: <b>{userInfo.user}</b>
							</p>
							<div className='w-full max-w-lg'>
								{/* Username Section */}
								<div className='mb-4'>
									<p className='text-lg font-semibold mb-2'>Username:</p>
									<input
										type='text'
										className='input input-bordered flex-grow w-full'
										placeholder='New username'
										onChange={(e) => setNewUsername(e.target.value)}
									/>
									<div className='flex w-full justify-end mt-2'>
										<button
											className='btn btn-xs sm:btn-sm md:btn-md'
											onClick={handleUsernameChange}>
											Update Username
										</button>
									</div>
								</div>

								{/* Email Section */}
								<div>
									<p className='mb-2'>
										Your current email: <b>{userInfo.email}</b>
									</p>
									<p className='text-lg font-semibold mb-2'>Email:</p>
									<input
										type='text'
										className='input input-bordered flex-grow w-full'
										placeholder='New email'
										onChange={(e) => setNewEmail(e.target.value)}
									/>
									<div className='flex w-full justify-end mt-2'>
										<button
											className='btn btn-xs sm:btn-sm md:btn-md'
											onClick={handleEmailChange}>
											Update Email
										</button>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Profile;
