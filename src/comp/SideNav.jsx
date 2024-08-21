import React, { useContext, useRef } from 'react';
import { ChatContext } from '../ContextProvider';
import { useNavigate } from 'react-router-dom';

const SideNav = () => {
	const navigate = useNavigate();
	const { logout, isLoggedIn } = useContext(ChatContext);

	const drawerToggleRef = useRef(null);

	const closeMenu = () => {
		if (drawerToggleRef.current) {
			drawerToggleRef.current.checked = false;
		}
	};

	return (
		<div className='drawer drawer-start'>
			<input
				id='my-drawer-4'
				type='checkbox'
				className='drawer-toggle'
				ref={drawerToggleRef}
			/>

			<div className='drawer-content flex items-center'>
				<label htmlFor='my-drawer-4' className='drawer-button btn'>
					Menu
				</label>
			</div>

			<div className='drawer-side z-20'>
				<label
					htmlFor='my-drawer-4'
					aria-label='close sidebar'
					className='drawer-overlay'></label>
				<ul className='menu p-4 w-50 min-h-full sm:w-40 bg-base-200 text-base-content'>
					<li>
						<button
							onClick={() => {
								navigate('/profile');
								closeMenu();
							}}>
							Profile
						</button>
					</li>

					<li>
						<button
							onClick={() => {
								navigate('/chat');
								closeMenu();
							}}>
							Chat
						</button>
					</li>

					<li>
						<button
							onClick={() => {
								logout();
								navigate('/login');
								closeMenu();
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
