import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFetch } from '../hooks/PedidoFetchGenerico';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 
    const [autenticado, setAutenticado] = useState(false);
    const [datauser, setdatauser] = useState(null);
    const [checkSessionTrigger, setCheckSessionTrigger] = useState(false); // Para verificar la sesión
    
       /*Verifica la session en PHP*/
    const { data: sessionData } = useFetch('/api/check_session.php', 'GET', null, checkSessionTrigger);

   console.log(datauser);
   console.log(autenticado);
    
   /* Verifica que la session tenga datos y que exita un id de session*/

    useEffect(() => {
        if (sessionData && sessionData.session_id) {
            setAutenticado(true);
            setdatauser(sessionData); // Almacena la información del datauser
        } else {
            setAutenticado(false);
            setdatauser(null);
        }
    }, [sessionData]);

      /* Ejecuta el la consulta que verifica la sesion en el servido (PHP)*/
    
    useEffect(() => {
        setCheckSessionTrigger(true);
    }, []);
    
    /*establece la autenticacion cuando se loguea y se verifican los datos ingresados en la pagina de logina(nota: en la pagina de login se realiza un pedido para verificar y establecer la session)*/ 
    const login = () => {
        setAutenticado(true);
    };
   
    const logout = async () => {
        try {
            await fetch('/api/logout.php', {
                method: 'POST',
            });
            setAutenticado(false);
            setdatauser(null);
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    };
    

    return (
        <AuthContext.Provider value={{ autenticado, datauser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

    
};

export const useAuth = () => useContext(AuthContext);