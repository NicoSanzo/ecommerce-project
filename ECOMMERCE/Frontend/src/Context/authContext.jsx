import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/PedidoFetchGenerico';
import {jwtDecode } from 'jwt-decode';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 
    
    const [autenticado, setAutenticado] = useState(false);
    const [checkSessionTrigger, setCheckSessionTrigger] = useState(false); // Activa la peticion del servidor para verificar la sesión
    const [isTokenValid, setIsTokenValid] = useState(true); // Se guarda la verificacion del token de session por si expira para poder actualizar los estados en el front
    const navigate = useNavigate();
    
    /*Verifica la session en PHP*/
    const { data: sessionData ,error} = useFetch('./api/check_start_session.php', 'POST',  null , checkSessionTrigger);

    const token=sessionStorage.getItem('token');

    useEffect(() => {    // Verifica que haya un token de session y activa la verificacion para traer los datos
        if (token) {
            setCheckSessionTrigger(true); // Activa la verificación de sesión
        } else {
            setAutenticado(false);    
            setCheckSessionTrigger(false);
        }
    }, [token]);  

    useEffect(() => { // si llegan los datos se setean en el sessionData y
        if (sessionData) {   
            if (sessionData.data) {    
                sessionStorage.setItem('isadmin',sessionData.data.isAdmin)
                setAutenticado(true);
            } else if (sessionData.error) {
                logout();
                // Si el token ha expirado, se maneja el error
                if (sessionData.error === "Token expirado") {
                    alert("Tu sesión ha expirado.  redirigido al inicio.");
                    logout();
                }
            }
        }
    }, [sessionData, error]);
    
    /*establece la autenticacion cuando se loguea y se verifican los datos ingresados en la pagina de logina(nota: en la pagina de login se realiza un pedido para verificar y establecer la session), esta funcion se llama en "UserLogin.jsx"*/ 
    const login = () => {  
        setCheckSessionTrigger(true);   
    };


   // const tokenA=sessionStorage.getItem('token')
    
    const checkAuthStatus = async () => {   // Verfica el estado de session, controla que la sesesion no haya expirado y actualiza el front en base a ello
        if (token) {
          try {
            const decoded = jwtDecode(token); 
            const currentTime = Date.now() / 1000; 
           
            if (decoded.exp < currentTime) {  // toma el tiempo que se establecio en el "payload " de  "UserLogin.php" y lo compara con el tiempo actual en segundos
              setIsTokenValid(false); 
              alert('sesión expirada. Redirigiendo a la página de inicio.');
              logout(); // si no hay seseion ejecuta el logout
            } else {
              setIsTokenValid(true);
              setAutenticado(true);
            }
          } catch (error) {
            console.error('Error al decodificar el token:', error);
            setIsTokenValid(false);
            logout();
          }
        } else {
          setIsTokenValid(false);
          
        }
      };

   
    const logout = () => { 
            
            setAutenticado(false);     
            sessionStorage.clear();      // limpiar las variables del sessionStorege
            setCheckSessionTrigger(false);
            navigate('/home');   
            location.reload()                   //actualiza la pagina
  
    };
    
    
    return (
        <AuthContext.Provider value={{ autenticado, login, logout,sessionData, isTokenValid, checkAuthStatus,token }}>
            {children}
        </AuthContext.Provider>
    );

    
};

export const useAuth = () => useContext(AuthContext);