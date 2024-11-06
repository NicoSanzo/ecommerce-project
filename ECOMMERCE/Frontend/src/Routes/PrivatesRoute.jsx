import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/authContext';


export const PrivateRoute = () => {
    
    const islogged=localStorage.getItem('autenticacion'); 

    return (islogged? <Outlet /> : <Navigate to="/home" />);
};

