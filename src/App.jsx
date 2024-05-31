import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './comp/Register';
import Login from './comp/Login';
import Chat from './comp/Chat';
import Profile from './comp/Profile';
import SideNav from './comp/SideNav';
import ChatContextProvider from './ContextProvider';
import './index.css';

const App = () => {
	return (
		<div>
			<Router>
				<ChatContextProvider>
					<SideNav />
					<Routes>
						<Route path='/' element={<Register />} />
						<Route path='/login' element={<Login />} />
						<Route path='/chat' element={<Chat />} />
						<Route path='/profile' element={<Profile />} />
					</Routes>
				</ChatContextProvider>
			</Router>
		</div>
	);
};

export default App;
