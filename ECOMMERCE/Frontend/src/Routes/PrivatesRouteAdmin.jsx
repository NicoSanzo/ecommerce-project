import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

export const PrivateRouteAdmin = () => {
  const { checkAuthStatus,isTokenValid} = useAuth();
  const dataAdmin=localStorage.getItem('isadmin');

  useEffect(() => {
    checkAuthStatus(); // Llamamos a una función que verifica el token y el rol de usuario
  }, [checkAuthStatus]);


  if (!isTokenValid) {
    return  <Navigate to="/home" replace /> ;
  }

  // Si hay sessionData y el usuario es admin, renderiza las paginas privadas
  if (dataAdmin){
    if( isTokenValid && dataAdmin==='true') {
    return  <Outlet />;
  }}

return  <Navigate to="/home" replace /> ;

};