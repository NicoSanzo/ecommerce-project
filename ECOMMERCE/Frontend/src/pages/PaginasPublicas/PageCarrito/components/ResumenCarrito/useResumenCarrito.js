

import React, { useEffect, useState } from "react";
import { useAddCarrito } from "../../../../../Context/addCarritoContext";
import { useLoginModal } from "../../../../../Context/LoginPopContext";

export function useResumenCarrito() {

    const {arrayProductsCarrito} = useAddCarrito();
    const {total} = useAddCarrito();
    const [totalCompra,setTotalCompra]=useState(0);
    const [Envio,setPrecioeEnvio]= useState(0);
    const {openModal}=useLoginModal();
    
   
    const ContinuarCompra = () => {
        if(!sessionStorage.getItem('autenticacion') && !sessionStorage.getItem('isAdmin') && !sessionStorage.getItem('sessionId'))
        {
            openModal()
        }
        
    };

    useEffect(() => {
        setPrecioeEnvio(7000);
        setTotalCompra(total+ Envio)

    }, [total,Envio]);


    return {arrayProductsCarrito,
            total,
            totalCompra,
            Envio,
            ContinuarCompra}

       
    
}
