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

    
   /* Verifica que la session tenga datos y que exita un id de session*/

    useEffect(() => {
        if (sessionData && sessionData.session_id) {
            setAutenticado(true);
            setdatauser(sessionData); // Almacena la información del datauser
            sessionStorage.setItem('autenticacion', autenticado); // guardo en el sessionStorage para que cuando se recarge la pagina no te lleve al home
            sessionStorage.setItem('isAdmin',sessionData.admin);
            sessionStorage.setItem('sessionId',sessionData.session_id);
            sessionStorage.setItem('id_user',sessionData.id_user);
        } else {
            setAutenticado(false);
            setdatauser(null);
            sessionStorage.clear();
            setCheckSessionTrigger(true);
        }
    }, [sessionData]);

    
    /*establece la autenticacion cuando se loguea y se verifican los datos ingresados en la pagina de logina(nota: en la pagina de login se realiza un pedido para verificar y establecer la session)*/ 
    const login = () => {
        setAutenticado(true);
        sessionStorage.setItem('autenticacion', autenticado);
    };
   
    const logout = async () => {
        try {
            await fetch('/api/logout.php', {
                method: 'POST',
            });
            setAutenticado(false);
            setdatauser(null);
            sessionStorage.clear();
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