import React, { useEffect, useRef, useState } from "react";
import "./OrdenMenuStyle.css";
import  {useFetch}  from "../../../../hooks/PedidoFetchGenerico";
import { useSearch } from "../../../../Context/searchContext"; //llamo al hook 



export const OrdenMenu = () =>{    //recibe como argumento una funcion de la pagina PRODUCTOS con el fin de obtener de pasarle los datos de la consulta

    const [abierto, setAbierto] = useState(false); // controla si esta desplagado el MENU//
    const {inputOrder}=useSearch(); //estados globales utilizados en un contexto(Componente:searchContext)
    const {setinputOrder} = useSearch(); //estados globales utilizados en un contexto(Componente:searchContext)
    const {setFoundData} = useSearch();//estados globales utilizados en un contexto(Componente:searchContext)
    const { searchData } = useSearch();//estados globales utilizados en un contexto(Componente:searchContext)
    const { setLoading } = useSearch();//estados globales utilizados en un contexto(Componente:searchContext)
    const { setError } = useSearch();//estados globales utilizados en un contexto(Componente:searchContext)
   
   

    const opciones = [    //OPCIONES DEL MENU DESPLEGABLE DE FILTROS//
        "Todos",
        "Menor Precio",
        "Mayor Precio",
        "Nombre: de A a Z",
        "Nombre: de Z a A"
    ];                                  
   

    const cambiarOpcion = (opcion) => {    //recibe como argumento una de las opciones de la lista del filtro y se la setea a "inputFiltrado" a traves de la funcion con el objetivo de mostrar esa opcion en el input y cambiarle el valor//
        setinputOrder(opcion);  
        setAbierto(false);            // al elegir una opcion lo transformo en falso para que se cierra la ventana
    };
    
    const {data, loading, error} = useFetch('api/prueba.php', 'POST',{ inputOrder,searchData}, inputOrder);  // llamado de un hook personalizado que realiza conexion asincronica, le paso la URL,el metodo,el body(en este caso una variable), y un triger que le va a indicar que se ejecuta cada vez que cambia el valor de esa variable//

    useEffect(() => {
        setLoading(loading);
        setFoundData(data);
        if (error) setError(error);
    }, [data, loading, error, setFoundData, setLoading, setError]);

    
    return (
        <>      
            <div className="order-container">   
                    <input 
                        className="input-busqueda" 
                        onClick={() => setAbierto(prev => !prev)} // establece el valor de la apertura del menu(verdadero, o falso)
                        type="text"
                        value={inputOrder} 
                        readOnly
                    />
                    {abierto && (                    
                        <div className="items-container">
                            <ul className="Desplegable">
                                {opciones.map(opcion => (
                                <li key={opcion} onClick={() => cambiarOpcion(opcion)} >
                                    {opcion}
                                </li>
                            ))}                     
                            </ul>
                        </div>
                    )}
            </div>                 
        </>
    )

    
}