import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/authContext';


export const PrivateRouteAdmin = () => {
    
    const islogged=localStorage.getItem('autenticacion'); 
    const isAdmin=localStorage.getItem('isAdmin');
    const hash=localStorage.getItem('sessionId');

    return (islogged && isAdmin=="true" && hash ? <Outlet /> : <Navigate to="/home" />);
};

