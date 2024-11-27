import React, { useState } from "react";
import { useValidarCompra } from "../../../../../Context/validarComprar";


export function UseEntrega() {

   const {setTipoEntrega}= useValidarCompra();


   const handleEntrega = (event) => {
    setTipoEntrega (event.target.value)
   };


    return ({
        
        handleEntrega
    
    })
}
