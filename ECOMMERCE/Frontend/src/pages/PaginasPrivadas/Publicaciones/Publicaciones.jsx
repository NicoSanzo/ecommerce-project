import { useFetch } from "../../../hooks/PedidoFetchGenerico";
import { PublicacionesCard } from "./components/ProductPubliCard/PublicacionesCard";
import "./PublicacionesStyle.css";
import React, { useEffect, useState } from "react";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";


export const Publicaciones=()=> {


const[triggerfetchPublicacion,setTriggerFetchPublicaciones]=useState(false);

    useEffect(() => {
      setTriggerFetchPublicaciones(true);  
    }, [])

    const {data,loading,error}=useFetch("api/Publicaciones.php","POST",null,triggerfetchPublicacion);
    
      if (error) {
        return <div>Error al cargar las publicaciones.</div>;
      }
    
    
      return (
        <>
         <h2 className="titulo-publicaciones">PUBLICACIONES</h2>
         <div className="publicaciones-general-container">

           {loading? <LoadingComponente/>: 
                 data.data.length > 0 ? (
             data.data.map((publis) => (
               <PublicacionesCard
                 itemKey={publis.id}
                 key={publis.id} 
                 imagen={publis.imagen}
                 titulo={publis.titulo}
                 price={publis.precio }
                 stock={publis.stock}
               />
             ))
           ) : (
             <div>No hay publicaciones disponibles.</div>
           )}
         </div>
        </>
      );
    };