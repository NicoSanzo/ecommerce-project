import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Stock_icon from "../../assets/Stock_icon.svg";
import shipping_icon from "../../assets/shipping_icon.svg";
import Shield_icon from "../../assets/Shield_icon.svg";
import "./ProductoDetailStyle.css";
import { useProductContent } from "../../Context/productDetailContext";
import { Carrousel } from "../../components/GenericCarrousel/Carrousel";
import { FichaTecnica } from "./Components/FichaTecnica/FichaTecnia";




export const ProductoDetail = ()=>{

    const {dataProduct}= useProductContent();

    if (dataProduct) {localStorage.setItem('dataProduct', JSON.stringify(dataProduct));}
    const storedDataProduct = JSON.parse(localStorage.getItem('dataProduct'));
    
    const imagenes = [{ id: storedDataProduct.data[0].publicacion_id, src: storedDataProduct.data[0].imagen , description:"foto" }]

    return(

        <div className="general-product-container">
            <div className="product-container">
                <div className="imagen-container">
                    <Carrousel ImagenesCarrousel={imagenes} autoslide={false} />                
                </div>
                <div className="features-container Responsive">
                    <h2 className="categorias Responsive" >Agenda</h2>   
                    <h2 className="titulo Responsive">{storedDataProduct.data[0].titulo}</h2>         
                    <h2 className="id-Producto Responsive">ID: {storedDataProduct.data[0].publicacion_id}</h2>
                    <hr />
                    <h2 className="Precio Responsive">${storedDataProduct.data[0].precio}</h2>
                    <hr />
                    <div className="buy-conditions ">
                        <h2 className="Stock"> 
                            <img src={Stock_icon} alt="disponibilidad " /> Stock Disponible: <strong>{storedDataProduct.data[0].stock}</strong>  </h2>
                        <h2 className="Envio "> 
                            <img src={shipping_icon} alt="envios" /> Envios a todo el pais  </h2>
                        <h2 className="garantia "> 
                            <img src={Shield_icon} alt="garantia" /> Compra Protegida <Link to="/InfoCompra">Ver Terminos y Condiciones</Link> </h2>
                    </div>
                </div>
                <div className="Especificaciones">
                   <FichaTecnica Datos={storedDataProduct}/>
                </div>
                <div className="Description">
                    <h2> Descripcion</h2>
                    <p className="texto">
                        {storedDataProduct.data[0].descripcion}
                    </p>
                </div>

            

            </div>
        </div>




    )
}