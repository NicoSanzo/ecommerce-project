import React, { useEffect, useRef, useState } from "react";
import "./OrdenMenuStyle.css";
import  {useFetch}  from "../../../../hooks/PedidoFetchGenerico";



export const OrdenMenu = ({productosFiltrados}) =>{    //recibe como argumento una funcion de la pagina PRODUCTOS con el fin de obtener de pasarle los datos de la consulta

    const [abierto, setAbierto] = useState(false); // controla si esta desplagado el MENU//
    const [inputFiltrado, setInputFiltrado] = useState("Todos");  //ESTABLES UN VALOR INICIAL EN EL INPUT
    

    const opciones = [            //OPCIONES DEL MENU DESPLEGABLE DE FILTROS//
        "Todos",
        "Menor Precio",
        "Mayor Precio",
        "Nombre: de A a Z",
        "Nombre: de Z a A"
    ];                                  
   
    const cambiarOpcion = (opcion) => {    //recibe como argumento una de las opciones de la lista del filtro y se la setea a "inputFiltrado" a traves de la funcion con el objetivo de mostrar esa opcion en el input y cambiarle el valor//
        setInputFiltrado(opcion);  
        setAbierto(false);            // al elegir una opcion lo transformo en falso para que se cierra la ventana
    };
    
    const {data, loading, error} = useFetch('api/prueba.php', 'POST',{ inputFiltrado }, inputFiltrado);  // llamado de un hook personalizado que realiza conexion asincronica, le paso la URL,el metodo,el body(en este caso una variable), y un triger que le va a indicar que se ejecuta cada vez que cambia el valor de esa variable//
    
    
    useEffect(()=>{  //en este caso le paso los valores obtenidos de la consulta (data, loading,error) a  traves de la funccion ProductosFiltrados, con el objetivo de obtenerlos con otro componente
        if(loading)
        {productosFiltrados(loading,{data:[]});}       
        else if(data) 
        {productosFiltrados(null,data);}
        else if(error) 
        {productosFiltrados(null,{data:[]},error);}  
    },[data,inputFiltrado,error,loading]); // esto se ejecutara cada vez que cambien algunas de esas variables

    
    return (
        <>      
            <div className="order-container">   
                    <input 
                        className="input-busqueda" 
                        onClick={() => setAbierto(prev => !prev)} // establece el valor de la apertura del menu(verdadero, o falso)
                        type="text"
                        value={inputFiltrado} 
                        readOnly
                    />
                    {abierto && (                    //Si abierto== true (lo manejaba el Set=Abierto ) el componente se renderizara, caso contrario desaparece//
                        <div className="items-container">
                            <ul>
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