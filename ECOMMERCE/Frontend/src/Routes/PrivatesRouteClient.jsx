import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

export const PrivateRouteClient = () => {
  const { checkAuthStatus,isTokenValid} = useAuth();
  const dataAdmin=sessionStorage.getItem('isadmin');
  
  useEffect(() => {
    checkAuthStatus(); // Llamamos a una función que verifica el token y el rol de usuario
   
  }, [checkAuthStatus]);

  if (!isTokenValid) {
    return  <Navigate to="/home" replace /> ;
  }

  if (dataAdmin){
        if( isTokenValid && dataAdmin==='false') {
    return  <Outlet />;
  }}

   return  <Navigate to="/home" replace /> ;

  

};

