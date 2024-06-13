import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './comp/Register';
import Login from './comp/Login';
import Chat from './comp/Chat';
import Profile from './comp/Profile';
import SideNav from './comp/SideNav';
import ChatContextProvider, { ChatContext } from './ContextProvider';
import ProtectedRoute from './ProtectedRoute';
import './Background.css';
import './index.css';

const App = () => {
	return (
		<div>
			<Router>
				<ChatContextProvider>
					<Background />
					<SideNav />
					<Routes>
						<Route path='/' element={<Register />} />
						<Route path='/login' element={<Login />} />
						<Route element={<ProtectedRoute />}>
							<Route path='/chat' element={<Chat />} />
							<Route path='/profile' element={<Profile />} />
						</Route>
					</Routes>
				</ChatContextProvider>
			</Router>
		</div>
	);
};

const Background = () => {
	const { isLoggedIn } = useContext(ChatContext);
	return (
		<div
			className={`background ${
				isLoggedIn ? 'background-fargad' : 'background-svartvit'
			}`}></div>
	);
};

export default App;
