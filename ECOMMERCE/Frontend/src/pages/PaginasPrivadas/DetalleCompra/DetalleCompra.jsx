import WppImage from "../../../assets/whatsApp_logo_colorful.svg"
import FcbookImage from "../../../assets/facebook_logo_colorful.svg"
import InstagramImage from "../../../assets/Instagram_logo_colorful.svg"
import FacturaIcon from "../../../assets/factura_icon.svg"
import downloadIcon from "../../../assets/download_icon_pink.svg"
import showIcon from "../../../assets/show_icon_pink.svg"
import React from "react"
import "./DetalleCompraStyle.css";
import { UseDetalleCompra } from "./useDetalleCompra";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent"
import { DetalleMetodosPagos } from "./components/detalleMetodosPagos/DetalleMetodosPagos"
import { Tooltip } from "../../../components/GenericTooltip/Tooltip"


export function DetalleCompra() {

    const {compraDetail,EstadoEntregaStyle,factura,loading_data_detail}=UseDetalleCompra(); 


   
    
    return (
        <> 
      
        <div className="principal-page">
            { 
            loading_data_detail ?
                 <LoadingComponente width={60} height={60} />
            :      
            compraDetail && compraDetail.data?   
             <div className="principal-detalle-compras-container"> 
                <div className="informacion-compra">   
                    <div className="products-container">
                    <p><strong>Productos</strong></p>
                     {compraDetail && compraDetail.data[0].det_oper.map((detalle,index)=>{
                     return(
                         <div className="compra-product-card" key={index} >
                            <div className="image-container">
                                <img className="product-image" src={detalle.publicacion.imagen} alt="imagen-producto" />
                            </div>
                            <div className="product-description">
                                <h2 className="titulo-publicacion">{detalle.publicacion.titulo}</h2>
                                <h2 className="stock-producto"> {detalle.cantidad} unidades</h2>
                            </div>  
                         </div>
                         )
                     })}
                    </div>
                    {/*Estado de Compra*/}
                   
                    <div className="Estado-container">
                        <strong>Estado de compra</strong>      
                        <div className="estado-card" >
                            <p className="estado-entrega"
                                   style={
                                       compraDetail.data[0].estado_compra === "Pendiente de entrega"
                                           ? EstadoEntregaStyle.StylePendiente
                                           : compraDetail.data[0].estado_compra === "Entregado"
                                           ? EstadoEntregaStyle.StyleEntregado
                                           : ""
                                   }
                               >
                                   {compraDetail.data[0].estado_compra}
                              </p>
     
                         </div>     
                    </div>    

                    <div className="factura-container">
                        <p><strong>Informacion de compras</strong></p>  
                          
                        <div className="factura-card" >
                        {factura ?
                            <div className="data-factura">
                                <div className="img-container">   
                                    <img src={FacturaIcon}></img>
                                </div>
                                <p> Factura disponible</p>  
                               
                                        <a className="button-descargar" href={factura} download="factura.pdf">
                                            <img src={downloadIcon} alt="Descargar factura" />
                                            <Tooltip descripcion="descargar"/>
                                         </a>
                            </div>
                            :
                            <p>No se cargaron Facturas</p> 
                        }
                         </div>     
                    </div>   
                    <div className="contacto-container">
                        <p><strong>Contacto con el vendedor</strong></p>       
                        <div className="contacto-card" >
                            <a className="contacto-wpp" href="https://wa.me/5491138024906"  target="blank">
                                   <h2> Enviar Mensaje</h2>  
                                   <img src={WppImage} alt="" />  
                            </a>  
                            <a className="contacto-instagram" href="https://www.instagram.com/direct/t/17846911391850288"  target="blank">
                                   <h2> Enviar Mensaje</h2>  
                                   <img src={InstagramImage} alt="" />  
                            </a> 
                            <a className="contacto-facebook" href="https://www.facebook.com/messages/t/108744675339595"  target="blank">
                                   <h2> Enviar Mensaje</h2>  
                                   <img src={FcbookImage} alt="" />  
                            </a> 
                        </div>     
                    </div> 
                </div>
                <DetalleMetodosPagos compraDetail={compraDetail}/>
            </div>
            :
            <p>Error, No se pudo mostrar el detalle de su venta</p>
        }
        
            
        </div>
    </>
  )
}
