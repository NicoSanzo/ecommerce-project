import React, { useState } from "react";
import "./ProductosStyle.css";
import { ProductCard } from "../../components/GenericProductCard/ProductCard";
import { productos } from "./prueba";
import { OrdenMenu } from "./components/ordenMenu/OrdenMenu";
import { FilterCategorias } from "./components/FilterMenu/FilterCategorias";
import { FilterModelo } from "./components/FilterModelos/FilterModelos";




const listadeproductos = productos.map((productos,index)=>{
 return(
    <ProductCard 
        key={index} 
        imagen={productos.foto} 
        description={productos.descripcion} 
        price={productos.precio}
     />
   )
});


export const Productos = () =>{

    const [listadodeProductos,setListadodeproductos]=useState([]);
    const [Error,setError]=useState(null);
    const [Loading,setLoading]=useState(false);

    const productosFiltrados =(loading,data,error)=>{
        setListadodeproductos(data);
        setError(error);
        setLoading(loading);
    }


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
                    {listadeproductos.length > 0 && listadodeProductos.data}
                    {Error && "No se pudo filtrar"}
                    {listadeproductos}
                </div>
            </div>
        </>
    )
}