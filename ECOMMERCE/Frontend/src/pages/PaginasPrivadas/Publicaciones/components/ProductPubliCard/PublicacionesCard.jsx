import React, { useEffect, useState } from "react";
import "./PublicacionesCardStyle.css"
import { useFetch } from "../../../../../hooks/PedidoFetchGenerico";
import { useProductContent } from "../../../../../Context/productDetailContext";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmaticonModal";
import delete_icon from "../../../../../assets/delete_icon.png"


export const PublicacionesCard = ({imagen,titulo,price,itemKey,stock}) =>{

const {setDataProducto} = useProductContent()
const [triggerFetch,setTriggerFetch]= useState(false);
const [deleteTrigger,setDeleteTrigger]=useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const navigate = useNavigate();

/***************************MOSTRAR PUIBLICACION*************************************/

const mostrarDetalleProducto = () =>{
    setTriggerFetch(true);   
}

const {data:detalle_producto,loading:loading_detalle_producto,error:error_detalle_producto} =useFetch('api/busquedaProductoUnico.php','POST',{itemKey},triggerFetch);


useEffect(() => {
   
  if (detalle_producto) {
    setDataProducto(detalle_producto);
    setTriggerFetch(false);  
    navigate(`/productoDetail?ID=${itemKey}`);
  }
},  [detalle_producto, itemKey, navigate, setDataProducto]);

/************************************BORRAR PRODUCTO*************************************/

const ModalDeEliminacion =(event)=>{
 event.stopPropagation(); //evita que al apretar en el boton eliminar acceda a la publicacion
  setIsModalOpen(true);
}

const ConfirmarEliminacion =()=>{
    setDeleteTrigger(true);
    setIsModalOpen(false);
   
}

const {data:delete_data,loading:delete_loading,error:delete_error} =useFetch('api/baja_publicaciones.php','POST',{itemKey},deleteTrigger);


useEffect(() => {
  setDeleteTrigger(false)
 
}, [delete_data,delete_loading,delete_error])




 return(
        <>
            
                <div className="publicacion-card" onClick={mostrarDetalleProducto} >
                    <img className="product-image" src={imagen} loading="lazy" />
                    <h2 className="tituloStyle">{titulo}</h2>
                    <h2 className="stylePrice" > $ {price}</h2>
                    <h2 className="stockStyle">Stock: {stock}</h2>   
                    <button type="button" >Modificar</button>     
                    <button type="button" className="delete_button" onClick={ModalDeEliminacion}> </button>        
                </div>
                <ConfirmationModal
                    Abierto={isModalOpen}
                    Cerrado={() => setIsModalOpen(false)} 
                    onConfirm={ConfirmarEliminacion} 
                />
            
        </>

 )

}