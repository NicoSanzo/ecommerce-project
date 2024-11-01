import "./StyleNavegationBar.css";
import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/PedidoFetchGenerico";
import { useSearch } from "../../hooks/searchContext";
import { useNavigate } from 'react-router-dom';

export const NavegationBar = () => {
    
    const [inputSearchValue, setInputSearchValue] = useState('');
    const [trigger, setTrigger] = useState(false);
    const {setinputOrder}=useSearch();
    const navigate = useNavigate();
    const { setFoundData } = useSearch(); // Accede al contexto
    const {setSearchData} =useSearch();
    const { setLoading } = useSearch();
    const { setError } = useSearch();


    const visualizarContenido = (event) => {
        setInputSearchValue(event.target.value);
    };

    const realizarConsulta = () => {
           
            setTrigger(true); // Dispara la consulta en useFetch 
            setSearchData(inputSearchValue);
            setinputOrder("Todos");
            navigate(`/Productos?search=${inputSearchValue}`);
    };

    const ApretarEnter = (event) => {
        if (event.key === 'Enter') { // Verifica que no esté vacío
            realizarConsulta(); // Ejecuta la consulta al presionar Enter
            
        }
    };

    const { data, loading, error } = useFetch('api/busqueda.php', 'POST', { inputSearchValue }, trigger);

    useEffect(() => {
        if (trigger) {
            setTrigger(false); // Reinicia el trigger solo después de que se haya procesado la consulta
        }
    }, [trigger]); // Dependiendo solo de trigger


    useEffect(() => {
        setLoading(loading);
        if (error) setError(error);
        if (data) setFoundData(data);
    }, [data, loading, error, setFoundData, setLoading, setError]);


    return (
        <>
            <div className="search">
                <div className="input-div">
                    <input 
                        type="text" 
                        value={inputSearchValue} 
                        onChange={visualizarContenido} 
                        onKeyDown={ApretarEnter}
                        name="input-search" 
                        className="input-search" 
                    />
                    <div className="search-icon" onClick={realizarConsulta}></div>
                </div>
            </div>
        </>
    );
};