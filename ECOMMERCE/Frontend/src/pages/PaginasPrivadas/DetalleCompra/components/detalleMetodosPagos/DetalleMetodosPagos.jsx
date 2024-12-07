import { UseDetalleMetodosPagos } from "./useDetalleMetodosPagos"
import "./DetalleMetodosPagosStyle.css";


export function DetalleMetodosPagos({compraDetail}) {

    const {fecha,subtotalProductos,MontodeDescuento,total,detalleCompra,opciones}=UseDetalleMetodosPagos(compraDetail)
    
    return (
        <>
        
        {detalleCompra &&  detalleCompra.data &&
            <div className="detalle-compra">
                    <div className="detalle-general" >
                        <p><strong>Detalle de la compra</strong></p>
                         <div className="fecha-numero">
                            <p>{fecha && fecha.toLocaleDateString('es-ES', opciones)} |</p>
                            <p> ID: # {detalleCompra.data[0].numero}</p>     
                         </div>
                         <hr />
                         <div className="total-productos">
                            <p>Productos</p>
                            <p>$ {subtotalProductos.toFixed(2)}</p>     
                         </div>
                         {detalleCompra.data[0].det_oper[0].descuento_aplicado > 0 && 
                         <div className="descuento">
                            <p>Descuento ({detalleCompra.data[0].det_oper[0].descuento_aplicado}%)</p>
                            <p>$ -{MontodeDescuento.toFixed(2)}</p>     
                         </div>
                         }
                         {detalleCompra.data[0].monto_envio > 0 && 
                         <div className="total-productos">
                            <p>Envio</p>
                            <p>$ {detalleCompra.data[0].monto_envio}</p>     
                         </div>
                         }
                         <hr />
                         <div className="total-final">
                            <p><strong>Total</strong></p>
                            <p><strong>$ {total}</strong></p>     
                         </div>
                         <hr />
                    </div>

                         
                    <div className="detalle-pago-container" >
                        <p><strong>Pago</strong></p>
                        <div className="detalle-pago">
                            <p>metodo:</p>
                        </div>
                            
                         
                         
                    </div>
                </div>
            }
        </>
    )
}
