import React from "react";
import { Link } from "react-router-dom";
import Stock_icon from "../../assets/Stock_icon.svg";
import shipping_icon from "../../assets/shipping_icon.svg";
import Shield_icon from "../../assets/Shield_icon.svg";

import "./ProductoDetailStyle.css";
import { Carrousel } from "../../components/GenericCarrousel/Carrousel";
import { productos } from "./prueba";
import { FichaTecnica } from "./Components/FichaTecnica/FichaTecnia";
export const ProductoDetail = ()=>{

    

    return(

        <div className="general-product-container">
            <div className="product-container">
                <div className="imagen-container">
                    <Carrousel ImagenesCarrousel={productos} autoslide={false}/>                
                </div>
                <div className="features-container Responsive">
                    <h2 className="categorias Responsive" >Agenda</h2>   
                    <h2 className="titulo Responsive">jostick Playstion 5 me quiero Morir 123 Aoaoaoa</h2>         
                    <h2 className="id-Producto Responsive">ID:16585</h2>
                    <hr />
                    <h2 className="Precio Responsive">$ 41690,68</h2>
                    <hr />
                    <div className="buy-conditions ">
                        <h2 className="Stock"> 
                            <img src={Stock_icon} alt="disponibilidad " /> Stock Disponible: <strong>5</strong>  </h2>
                        <h2 className="Envio "> 
                            <img src={shipping_icon} alt="envios" /> Envios a todo el pais  </h2>
                        <h2 className="garantia "> 
                            <img src={Shield_icon} alt="garantia" /> Compra Protegida <Link to="/InfoCompra">Ver Terminos y Condiciones</Link> </h2>
                    </div>
                </div>
                <div className="Especificaciones">
                   <FichaTecnica/>
                </div>
                <div className="Description">
                    <h2> Descripcion</h2>
                    <p className="texto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum id porro rem blanditiis mollitia debitis beatae, hic itaque velit, nihil doloremque? Esse, voluptate. Labore a exercitationem sapiente! Veniam, ipsam placeat.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam illum laboriosam suscipit qui reprehenderit, labore aperiam consequuntur impedit! Eaque quidem dolorem consequuntur porro veritatis veniam quos eum modi unde adipisci.
                    </p>
                </div>

            

            </div>
        </div>




    )
}