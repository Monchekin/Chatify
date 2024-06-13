import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ChatContext } from './ContextProvider';

const ProtectedRoute = () => {
	const { isAuthenticated, isLoggedIn } = useContext(ChatContext);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return <div>{isLoggedIn ? <Outlet /> : <Navigate to='/login' />}</div>;
};

export default ProtectedRoute;
