
import { useEffect, useState } from "react";
import { useCompraDetailContent } from "../../../Context/compraDetailContext";
import { useFetch } from "../../../hooks/PedidoFetchGenerico";



export function UseDetalleCompra() {

    

    const {CompraID}=useCompraDetailContent();
    const[triggerdetail, setTriggerDetail]=useState(false);
    

    const [factura,setFactura]=useState(null);

    const opciones = { // Definir las opciones para formatear la fecha
        day: 'numeric', 
        month: 'long',
        year:'numeric'
      };

    if (CompraID){
        sessionStorage.setItem('compraId', CompraID);
    }
    const numero_operacion=  sessionStorage.getItem('compraId', CompraID);

    
    const{data:compraDetail,loading:loading_data_detail,error}=useFetch("./api/fetch_detalle_compra.php","POST",{numero_operacion},triggerdetail)
    
 
    useEffect(() => {
        setTriggerDetail(true);   
    }, []);

    useEffect(() => {
        if(compraDetail){
            if(compraDetail.data){
            
            const facturaPdf=compraDetail.data[0].factura;
           
            if(facturaPdf){
                setFactura(`data:application/pdf;base64,${facturaPdf}`)
            }
          }
        }  
        
    }, [compraDetail]);



 

    const EstadoEntregaStyle={StyleEntregado: {color:'#30d17b'},
                          StylePendiente: {color:'rgba(0, 0, 0, 0.43)'},
                        }    

    return (
        {
            compraDetail, 
            loading_data_detail,     
            EstadoEntregaStyle,      
            opciones,
            factura

        }
            
        
    )
}
