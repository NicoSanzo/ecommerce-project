import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFetch } from '../hooks/PedidoFetchGenerico';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 
    const [autenticado, setAutenticado] = useState(false);
    const [datauser, setdatauser] = useState(null);
    const [checkSessionTrigger, setCheckSessionTrigger] = useState(false); // Para verificar la sesión
    const navigate = useNavigate();
    
       /*Verifica la session en PHP*/
    const { data: sessionData } = useFetch('/api/check_start_session.php', 'POST', null, checkSessionTrigger);

   //console.log(datauser);
   console.log(autenticado);
    
   /* Verifica que la session tenga datos y que exita un id de session*/

    useEffect(() => {
        if (sessionData && sessionData.session_id) {
            setAutenticado(true);
            setdatauser(sessionData); // Almacena la información del datauser
            localStorage.setItem('autenticacion', autenticado); // guardo en el local storage para que cuando se recarge la pagina no te lleve al home
        } else {
            setAutenticado(false);
            setdatauser(null);
            localStorage.removeItem('autenticacion');
            setCheckSessionTrigger(true);
        }
    }, [sessionData]);


    //console.log(datauser)
      /* Ejecuta el la consulta que verifica la sesion en el servido (PHP)*/
    /*
    useEffect(() => {
        setCheckSessionTrigger(true);
    }, []);*/


    
    /*establece la autenticacion cuando se loguea y se verifican los datos ingresados en la pagina de logina(nota: en la pagina de login se realiza un pedido para verificar y establecer la session)*/ 
    const login = () => {
        setAutenticado(true);
        localStorage.setItem('autenticacion', autenticado);
    };
   
    const logout = async () => {
        try {
            await fetch('/api/logout.php', {
                method: 'POST',
            });
            setAutenticado(false);
            setdatauser(null);
            localStorage.removeItem('autenticado');
            navigate('/home');      
            location.reload();
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