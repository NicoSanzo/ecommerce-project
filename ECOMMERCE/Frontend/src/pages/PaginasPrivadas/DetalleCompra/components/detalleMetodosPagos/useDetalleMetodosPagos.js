import { useEffect, useState } from "react";


export function UseDetalleMetodosPagos(compraDetail) {

    const detalleCompra=compraDetail;
    
    const [subtotalProductos,setSubtotalProductos]=useState(0);
    const [MontodeDescuento,setMontoDescuento]=useState(0);
    const [fecha,Setfecha]=useState(null);
    const [total,setTotal]=useState(0);


    const opciones = { // Definir las opciones para formatear la fecha
        day: 'numeric', 
        month: 'long',
        year:'numeric'
      };

  
    useEffect(() => {
        if(detalleCompra){
            if(detalleCompra.data){
            const fechaISO= detalleCompra.data[0].fecha;
            const Fecha = new Date(fechaISO);      // Crear un objeto Date a partir de la cadena ISO
            const PorcentajeDescuento=detalleCompra.data[0].det_oper[0].descuento_aplicado;
            const subtotal=detalleCompra.data[0].det_oper.reduce((subtotal,item)=>subtotal+ item.precio_unitario * item.cantidad,0)
            const totalCondescuento=detalleCompra.data[0].total;
            const Envio=detalleCompra.data[0].monto_envio;
            setSubtotalProductos(subtotal);
            setMontoDescuento(subtotal*PorcentajeDescuento/100);
            setTotal(Number(Envio) + Number(totalCondescuento));
            Setfecha(Fecha);      
          }
        }  
        
    }, [detalleCompra]);



    const EstadoPagoStyle={StyleAprobado: {backgroundColor:'#DBEAE2 ',color:'green',boxShadow:'0 0 2px black'},
                       StylePendiente: {backgroundColor:'rgba(255, 255, 85, 0.163)',color: 'rgb(176, 176, 71)',boxShadow:'0 0 2px black'},
                       StyleCancelado: {backgroundColor:'rgb(255, 184, 184)',color: 'rgb(255, 2, 2)',boxShadow:'0 0 2px black'}}


    return (
        {
            detalleCompra, 
            EstadoPagoStyle,
            fecha,
            opciones,
            subtotalProductos,
            MontodeDescuento,
            total,      
        }            
    )
}
