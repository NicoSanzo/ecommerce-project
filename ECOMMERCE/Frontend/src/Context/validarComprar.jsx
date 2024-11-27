import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAddCarrito } from './addCarritoContext';
import { useFetch } from '../hooks/PedidoFetchGenerico';

const validarComprar = createContext();

export const ContextvalidarAndComprar = ({ children }) => {


const  {arrayProductsCarrito,subtotalConDescuento,Envio,porcentajeDescuento,total} = useAddCarrito(); 
const  userid = sessionStorage.getItem("id_user");
   
const [tipoEntrega,setTipoEntrega]=useState(null);
const [terminosCondiciones,setTerminosCondiciones]=useState(false)
const [metodo_pago,setMetodoPago]= useState(null);
const [isSubmitted,setIsSubbmited] = useState(false);
const [datosFacturacion, setDatosFacturacion]=useState(false);
const [publisEnviadas,setPublisEnviadas]=useState({})
const [validacionExitosa,setValidacionExitosa]=useState(false);
const [triggerCompraTransfer,setTriggerCompraTransfer]= useState(false)
const [triggerCompraMercadopago,setTriggerCompraMercadopago]= useState(false)

const [errors, setErrors] = useState({});


    const Validate= ()=>{

        const newErrors= {}
        if(tipoEntrega==null){
            newErrors.entrega="*Seleccione una entrega"
        }
        if(terminosCondiciones==false){
            newErrors.terminos="*Acepte los términos y condiciones"
        }
        if(metodo_pago==null){
            newErrors.metodo_pago="*Elija un metodo de pago"
        }
        if(datosFacturacion==true){
            newErrors.datosFacturacion="*Complete los datos de facturación"
        }

        setErrors(newErrors);
        return newErrors
    }

/************  Se valida todo el carrito cada vez que cambia alguna de las opciones elegidas por los compradores *******************/ 

    useEffect(() => {
        Validate() 
        setValidacionExitosa(false)      
    }, [tipoEntrega,terminosCondiciones,metodo_pago,datosFacturacion]);
    

/************  Armo el Json de productos que le voy a enviar al completarse la compra *******************/ 

    useEffect(() => {
        const productos = arrayProductsCarrito.map(({ data: { data }, stock }) => ({
            id: data.itemKey,
            precio: data.price,
            cantidad: stock
        }));
        
        setPublisEnviadas(JSON.stringify(productos));
    }, [arrayProductsCarrito]);



    const {data:data_transfer,loading:loading_transfer,error:error_transfer} = useFetch("./api/operacion_transferencia.php","POST" ,{publisEnviadas, subtotalConDescuento,Envio, tipoEntrega,porcentajeDescuento, userid ,metodo_pago} , triggerCompraTransfer);
    const {data:data_MP,loading:loading_MP,error:error_MP} = useFetch("./api/mercadopago.php","POST" ,{publisEnviadas,total} , triggerCompraMercadopago); 

    //console.log(data_MP.ID);
    //console.log(error_MP);


    useEffect(() => {

        if (data_transfer){   
            if(data_transfer.incompleto==true)
            {
                setDatosFacturacion(true)
            }
        }
        setTriggerCompraTransfer(false)
        setTriggerCompraMercadopago(false)
    }, [data_transfer,error_transfer,data_MP,error_MP]);



    const handleFinalizarCompra = () => {

        if (Object.keys(errors).length > 0) {
            setIsSubbmited(true);
            setValidacionExitosa(false)
            return;
        }

        if (Object.keys(errors).length === 0)
            {
                setValidacionExitosa(true);
                if(metodo_pago=="Mercadopago"){
                    setTriggerCompraMercadopago(true);
                }
            }
    };


    const handleRealizarCompraTransfer = () => {
         
        if (Object.keys(errors).length > 0) {
            setIsSubbmited(true);
            return;
        }
        else if (Object.keys(errors).length === 0)
        {
            if(metodo_pago=="Transferencia")
            { setTriggerCompraTransfer(true);}
           
        }
            
    };



    return (
        <validarComprar.Provider 
        value={{ 

            setTipoEntrega,
            setTerminosCondiciones,
            setMetodoPago,
            handleRealizarCompraTransfer,
            handleFinalizarCompra,
            isSubmitted,
            errors,
            setErrors,
            Validate,
            setDatosFacturacion,
            metodo_pago,
            validacionExitosa,
            data_MP
           
           }}>

        {children}
        </validarComprar.Provider>
    );
};

export const useValidarCompra = () => useContext(validarComprar); // Hook que retorno 

