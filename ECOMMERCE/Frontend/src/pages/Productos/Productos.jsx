import React, { useEffect, useState } from "react";
import "./ProductosStyle.css";
import { ProductCard } from "../../components/GenericProductCard/ProductCard";
import { OrdenMenu } from "./components/ordenMenu/OrdenMenu";
import { FilterCategorias } from "./components/FilterMenu/FilterCategorias";
import { LoadingComponente } from "../../components/GenericLoadingComponent/LoadingComponent";
import { FilterModelo } from "./components/FilterModelos/FilterModelos";
import { useSearch } from "../../hooks/searchContext";




export const Productos = () =>{
    

    const [listadodeProductos,setListadodeproductos]=useState({data:[]});
    const {FoundData} = useSearch();
    const {loading}= useSearch();
    const {Error}= useSearch();

       useEffect(() => {
        if (FoundData) {
            setListadodeproductos(FoundData);
        }
    }, [FoundData]);

    return (
        <>
            <div className="principal-container">

                <div className="container-menu-order">
                    <h2> ORDENAR POR: </h2>
                    <OrdenMenu />
                </div>
                <div className="filter-menu-container">
                    <FilterCategorias/>
                    <FilterModelo/>  
                </div>
                <div className="products-container">
                    
                {loading ? (
                    <LoadingComponente/>
                ) : listadodeProductos.data.length > 0 ? (
                    listadodeProductos.data.map((producto) => (
                        <ProductCard 
                            key={producto.id} 
                            imagen={producto.imagen} 
                            description={producto.titulo} 
                            price={producto.precio} 
                        />
                    ))
                ) : Error ? (
                    "No se pudo filtrar"
                ) : (
                    "No se encontraron objetos"
                )}
                </div>
            </div>
        </>
    )
}