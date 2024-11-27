import React from "react"
import { useAddCarrito } from "../../../../../Context/addCarritoContext";
import { useValidarCompra } from "../../../../../Context/validarComprar";

export function UseMetodosDePago() {


    const {setPorcentajeDescuento,setMostrarDescuento} =useAddCarrito()
    const {setMetodoPago,setTerminosCondiciones,handleRealizarCompraTransfer, isSubmitted,errors,metodo_pago,handleFinalizarCompra,validacionExitosa,data_MP}=useValidarCompra()


  /********************ESTABLECE EL DESCUENTO AL ELEGIR UN EVENTO DE LOS METODOS DE PAGO ***********************/
      
  const handleChangeOpcionesPago = (event) => {
    const metodo_pago=event.target.value
    setMetodoPago(metodo_pago);

    if(metodo_pago==="Transferencia")
      {
       setPorcentajeDescuento(10);
       setMostrarDescuento(true);
      }
    else if (metodo_pago==="Mercadopago"){
     setMostrarDescuento(false); 
     setPorcentajeDescuento(0);
    } 
    else if(arrayProductsCarrito.length===0)
    {
     setPorcentajeDescuento(0)
     setMostrarDescuento(false);
     }
}

    return ( {

        handleChangeOpcionesPago,
        setTerminosCondiciones,
        handleRealizarCompraTransfer, 
        isSubmitted,
        errors,
        metodo_pago,
        handleFinalizarCompra,
        validacionExitosa,
        data_MP
    })
    
}
