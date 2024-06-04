import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ChatContext } from './ContextProvider';

const ProtectedRoute = () => {
	const { isAuthenticated } = useContext(ChatContext);

	return <div>{isAuthenticated ? <Outlet /> : <Navigate to='/login' />}</div>;
};

export default ProtectedRoute;
