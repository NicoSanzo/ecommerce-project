import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/authContext';


export const PrivateRouteAdmin = () => {
    
    const islogged=sessionStorage.getItem('autenticacion'); 
    const isAdmin=sessionStorage.getItem('isAdmin');
    const hash=sessionStorage.getItem('sessionId');

    return (islogged && isAdmin=="true" && hash ? <Outlet /> : <Navigate to="/home" />);
};

