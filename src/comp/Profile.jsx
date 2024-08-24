import React, { useContext, useState } from 'react';
import { ChatContext } from '../ContextProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Profile = () => {
	const {
		updateProfile,
		userInfo,
		handlePreview,
		avatarUrl,
		deleteUser,
		logout
	} = useContext(ChatContext);

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [newUsername, setNewUsername] = useState(userInfo.user || '');
	const [newEmail, setNewEmail] = useState(userInfo.email || '');

	const warning = searchParams.get('warning');

	// Funktion för att uppdatera användarnamn
	const handleUsernameChange = () => {
		updateProfile({ user: newUsername });
	};

	// Funktion för att uppdatera e-post
	const handleEmailChange = () => {
		updateProfile({ email: newEmail });
	};

	// Funktion för att uppdatera profilbild
	const handleAvatarChange = () => {
		updateProfile({ avatar: avatarUrl });
	};

	// Funktion för att hantera radering av användare, inklusive visning av varning och omdirigering efter radering
	const handleDelete = () => {
		if (!warning) {
			setSearchParams({
				warning: 'Are you sure you want to delete this user?'
			});
		} else {
			deleteUser(userInfo.id);
			const userDeleted = true;
			logout(userDeleted);
			navigate('/');
		}
	};

	return (
		<div className='relative h-[90vh]'>
			<div className='absolute top-10 left-1/2 transform -translate-x-1/2 p-4 flex flex-col space-y-2 shadow-xl items-center border-4 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] bg-orange-300 bg-opacity-20 h-auto pb-5'>
				{userInfo && (
					<>
						<h1 className='text-lg font-bold text-center pt-10'>
							{userInfo.user}, this is your profile page.
						</h1>
						<p className='mt-0 text-center'>
							Here you can change your profile picture, username, and email.
						</p>
						{/* Avatar Section */}
						<img
							src={avatarUrl || userInfo.avatar}
							alt='User Avatar'
							className='w-30 h-30 rounded-full object-cover mt-2 mb-4'
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
							{/* username Section */}
							<p className='mb-2'>
								Your current username: <b>{userInfo.user}</b>
							</p>
							<div className='w-full max-w-lg'>
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

									{/* Delete Username Section */}
									<div className='flex flex-col w-full items-center mt-2'>
										{warning && (
											<div className='alert alert-warning text-center mb-2 mt-2'>
												{warning}
											</div>
										)}
										<div>
											<button
												className='btn btn-xs sm:btn-sm md:btn-md bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded'
												onClick={handleDelete}>
												{warning ? 'Confirm Delete' : 'Delete user forever'}
											</button>
										</div>
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
