import React from "react";
import "./ProductCardStyle.css";
import {Link} from "react-router-dom";
import { ButtonVer } from "../GenericButtonVer/ButtonVer";


export const ProductCard = ({imagen,description,price}) =>{

 return(
        <>
            <Link>
                <div className="producto">
                    <img src={imagen} loading="lazy" />
                    <h2 className="descriptionStyle">{description}</h2>
                    <h2 className="stylePrice" > {price}</h2>
                    <h2 className="transferStyle">10% off con Transferencia</h2>
                    <ButtonVer/>            
                </div>
            </Link>
        </>

 )

}