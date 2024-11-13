import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';



export const PrivateRouteClient = () => {
    
    const islogged=localStorage.getItem('autenticacion'); 
    const isAdmin=localStorage.getItem('isAdmin');
    const hash=localStorage.getItem('sessionId');

    return (islogged && isAdmin=="false" && hash ? <Outlet /> : <Navigate to="/home" />);
};

