import React, { useState } from "react";
import "./ProductosStyle.css";
import { ProductCard } from "../../components/GenericProductCard/ProductCard";
import { productos } from "./prueba";
import { OrdenMenu } from "./components/ordenMenu/OrdenMenu";
import { FilterCategorias } from "./components/FilterMenu/FilterCategorias";
import { FilterModelo } from "./components/FilterModelos/FilterModelos";







export const Productos = () =>{
    

    const [listadodeProductos,setListadodeproductos]=useState({data:[]});
    const [Error,setError]=useState(null);
    const [Loading,setLoading]=useState(false);

    const productosFiltrados =(loading,data,error)=>{
        setListadodeproductos(data);
        setError(error);
        setLoading(loading);
    }
    /*
    const listadeproductos = listadodeProductos.data.map((index, titulo, precio, imagen)=>{
        return(
           <ProductCard 
               key={index} 
               imagen={imagen} 
               description={titulo} 
               price={precio}
            />
          )
       });
    */
    return (
        <>
            <div className="principal-container">

                <div className="container-menu-order">
                    <h2> ORDENAR POR: </h2>
                    <OrdenMenu productosFiltrados={productosFiltrados}/>
                </div>
                <div className="filter-menu-container">
                    <FilterCategorias/>
                    <FilterModelo/>
                   
                </div>
                <div className="products-container">
                    {Loading==true && "loading..."}
                    {listadodeProductos.data.length > 0 && listadodeProductos.data.map((producto) => {
                        return(
                            <ProductCard 
                                key={producto.id} 
                                imagen={producto.imagen} 
                                description={producto.titulo} 
                                price={producto.precio}
                             />
                           )
                    })}
                    {Error && "No se pudo filtrar"} 
                </div>
            </div>
        </>
    )
}