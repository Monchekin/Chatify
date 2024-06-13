import React, { useContext } from 'react';
import { ChatContext } from '../ContextProvider';
import { useNavigate } from 'react-router-dom';

const SideNav = () => {
	const navigate = useNavigate();
	const { logout, isLoggedIn } = useContext(ChatContext);

	return (
		<div className='drawer drawer-start'>
			<input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content'>
				<label htmlFor='my-drawer-4' className='drawer-button btn'>
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
						<button
							onClick={() => {
								navigate('/profile');
							}}>
							Profile
						</button>
					</li>

					<li>
						<button
							onClick={() => {
								logout();
								navigate('/login');
							}}>
							Log Out
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SideNav;
