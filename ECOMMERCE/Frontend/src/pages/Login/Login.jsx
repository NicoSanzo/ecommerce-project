import React, { useEffect, useState } from "react";
import "./LoginStyle.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import { useFetch } from "../../hooks/PedidoFetchGenerico";
import { LoadingComponente } from "../../components/GenericLoadingComponent/LoadingComponent";

export const Login = ({ onClose }) => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Error, setError] = useState("");
    const [enviar, setEnviar] = useState(false);
    const [Loading, setLoading] = useState(false);

    const iniciarSesion = (e) => {
        e.preventDefault();
        setError("");
       
        if (!username || !password) {
            setError("Por favor, completa todos los campos.");
            setTimeout(() => setError(""), 3000);
            return;
        }
        setLoading(true);
        setEnviar(true);
        
    };

    const { data, loading, error } = useFetch('/api/UserLogin.php', 'POST', { username, password }, enviar);
    

    useEffect(() => {
        if (data) {
            if (data.error) {
                setError(data.error);      
            } else if (data.status === "success") {
                login(data.status);
                location.reload(); //recarga la pagina para que se se establezcan los datos del servidor
                onClose();        
           }
        }
        if (error) {
            setError("Error de inicio de sesión. Intenta de nuevo.");
        }
        setEnviar(false);
        setLoading(false);
        const timer = setTimeout(() => setError(null), 3000);
        return () => clearTimeout(timer);
    }, [data]);



    return (
        <>
            <div className="Container-Principal">
                <h2 className="title">Iniciar Sesion</h2>
                <h3 className="registro">
                    ¿Es tu Primera Vez? <Link to="/register">Regístrate</Link>
                </h3>
                <form className="loginform" onSubmit={iniciarSesion}>
                    <input
                        type="text"
                        placeholder="Usuario o Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Link to="/forgot-password">¿Olvidaste tu Contraseña?</Link>
                    <div className="error-msg">
                    {Loading && <LoadingComponente />}
                    {Error && <span>{Error}</span>}
                    </div>                   
                    <button type="submit">Iniciar Sesion</button>              
                </form>
                
            </div>
        </>
    );
};
