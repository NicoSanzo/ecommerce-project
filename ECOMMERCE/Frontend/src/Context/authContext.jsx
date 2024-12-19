import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/PedidoFetchGenerico';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [autenticado, setAutenticado] = useState(false);
    const [sessionData, setSessionData] = useState(null);
    const [isTokenValid, setIsTokenValid] = useState(true); // Estado de validez del token
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    
    // Verifica la session en PHP
    const { data, error } = useFetch('/api/check_start_session.php', 'POST', null, token); // el doble signo devuelve el valor segun si existe o no un valor,

    // Efecto para verificar la autenticación basado en el token
    useEffect(() => {
        if (token) {
            checkAuthStatus(); // Verifica el estado del token y si es válido
        } else {
            logout(); // Si no hay token, logout automáticamente
        }
    }, [token]);

    // Función para verificar la validez del token
    const checkAuthStatus = async () => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    setIsTokenValid(false);
                    alert('Tu sesión ha expirado. Redirigiendo al inicio.');
                    logout();
                } else {
                    setIsTokenValid(true);
                    setAutenticado(true);
                }
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                setIsTokenValid(false);
                logout();
            }
        }
    };

    // Manejo de la respuesta del servidor para la sesión
    useEffect(() => {
        if (data) {
            if (data.data) {
                localStorage.setItem('isadmin', data.data.isAdmin);
                setAutenticado(true);
                setSessionData(data);
            } else if (data.error) {
                logout();
                if (data.error === 'Token expirado') {
                    alert('Tu sesión ha expirado. Redirigiendo al inicio.');
                }
            }
        }
    }, [data, error]);

    const login = () => {
        setAutenticado(true);
        setSessionData(data);
        checkAuthStatus();
    };

    const logout = () => {
        setAutenticado(false);
        sessionStorage.clear();
        localStorage.clear();
        setSessionData(null);
        setIsTokenValid(false);
        navigate('/home');
    };

    return (
        <AuthContext.Provider value={{ autenticado, login, logout, sessionData, isTokenValid, checkAuthStatus, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);