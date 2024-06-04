import React from 'react';
import { useNavigate } from 'react-router-dom';

const SideNav = () => {
	const navigate = useNavigate();

	return (
		<div className='drawer drawer-start'>
			<input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content'>
				{/* Page content here */}
				<label htmlFor='my-drawer-4' className='drawer-button btn btn-primary'>
					Menu
				</label>
			</div>
			<div className='drawer-side'>
				<label
					htmlFor='my-drawer-4'
					aria-label='close sidebar'
					className='drawer-overlay'></label>
				<ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
					<li>
						<a href='/profile'>Profile</a>
					</li>
					<li>
						<a href='/login'>Log In</a>
					</li>
					{/* <li>
						<button onClick={() => navigate('/login')}>Log Out</button>
					</li> */}
				</ul>
			</div>
		</div>
	);
};

export default SideNav;
