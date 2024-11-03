import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';


const PrivateRoute = () => {
    const { autenticado } = useAuth();
    return autenticado ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;