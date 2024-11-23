import "./ResumenCarritoStyle.css";
import React from "react"
import { useResumenCarrito } from "./useResumenCarrito";


export function ResumenCarrito() {

    const {Envio,totalCompra,ContinuarCompra,arrayProductsCarrito,total,MostrarDescuento,cantidadDescuento}=useResumenCarrito();

   
    return (
        <>

            <div className="resumen-container">
                    <h2 className="titulo"> Resumen de compra</h2>
                <div className="container-father-precios">
                    <div className="precios-container"> 
                        <h2 className="resumen">Productos:</h2>
                        <h2 className="resumen">$ {total.toFixed(2)}</h2>     
                    </div>
                   
                   
                    <div className="precios-container"> 
                        <h2 className="resumen">Envio:</h2>
                        <h2 className="resumen">$ {Envio.toFixed(2)}</h2>  
                    </div>

                </div>
                { MostrarDescuento===true && arrayProductsCarrito.length>0? 
                    <div className="precios-container"> 
                        <h2 className="descuento-transfer">10%OFF:</h2>
                        <h2 className="descuento-transfer">$-{cantidadDescuento.toFixed(2)}</h2>     
                    </div>: ""
                }

                <div className="precios-container-total"> 
                    
                        <h2 className="total-compra">TOTAL:</h2>
                        <h2 className="total-compra">$ {totalCompra.toFixed(2)}</h2>  
                </div>
                    <button 
                        className="comprar-button" 
                        onClick={ContinuarCompra}
                        disabled= {arrayProductsCarrito.length === 0}
                    >
                    Continuar Compra
                    </button>        
            </div>
            
        </>
    )
}
