import React, { useContext } from 'react';
import { ChatContext } from '../ContextProvider';

const Profile = () => {
	const { handlePreview, avatarUrl } = useContext(ChatContext);

	return (
		<div>
			<p>Username</p>
			<div className='avatar'>
				<div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
					<img src={avatarUrl} alt='Your Avatar' />
				</div>
			</div>
			<br />
			<button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'>
				Update your username
			</button>
			<label className='input input-bordered flex items-center gap-2'>
				Username:
				<input type='text' className='grow' placeholder='Username' />
			</label>

			<button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'>
				Update your email
			</button>
			<label className='input input-bordered flex items-center gap-2'>
				Email:
				<input type='text' className='grow' placeholder='exempel@exempel.com' />
			</label>

			<button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'>
				Change your profile picture
			</button>
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
		</div>
	);
};

export default Profile;
