import React, { useEffect, useState } from "react";
import "./ProductCardStyle.css";
import { ButtonVer } from "../GenericButtonVer/ButtonVer";
import { useFetch } from "../../hooks/PedidoFetchGenerico";
import { useProductContent } from "../../Context/productDetailContext";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({imagen,titulo,price,itemKey}) =>{

const {setDataProducto} = useProductContent()
const [triggerFetch,setTriggerFetch]= useState(false);
const navigate = useNavigate();


const mostrarDetalleProducto = () =>{
    setTriggerFetch(true);   
}

const {data,loading,error} =useFetch('api/busquedaProductoUnico.php','POST',{itemKey},triggerFetch);


useEffect(() => {
   
    if (data) {
      setDataProducto(data);
      setTriggerFetch(false);  
      navigate(`/productoDetail?ID=${itemKey}`);
    }
  },  [data, itemKey, navigate, setDataProducto]);


 return(
        <>
            
                <div className="producto" onClick={mostrarDetalleProducto} >
                    <img src={imagen} loading="lazy" />
                    <h2 className="tituloStyle">{titulo}</h2>
                    <h2 className="stylePrice" > {price}</h2>
                    <h2 className="transferStyle">10% off con Transferencia</h2>
                    <ButtonVer/>            
                </div>
            
        </>

 )

}