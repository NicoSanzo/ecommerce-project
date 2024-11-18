import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';



export const PrivateRouteClient = () => {
    
    const islogged=sessionStorage.getItem('autenticacion'); 
    const isAdmin=sessionStorage.getItem('isAdmin');
    const hash=sessionStorage.getItem('sessionId');

    return (islogged && isAdmin=="false" && hash ? <Outlet /> : <Navigate to="/home" />);
};

