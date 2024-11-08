import React, { useEffect, useState } from "react";
import "./PublicacionesCardStyle.css"
import { useFetch } from "../../../../../hooks/PedidoFetchGenerico";
import { useProductContent } from "../../../../../Context/productDetailContext";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmaticonModal";
import { ModificationModal } from "../../../ModificarPublicacion/ModificationModal/ModificationModal";
import { ModificarPublicacion } from "../../../ModificarPublicacion/ModificarPublicacion";
import { GenericExitoso } from "../../../../../components/GenericExitoso/GenericExitoso";



export const PublicacionesCard = ({imagen,titulo,price,itemKey,stock}) =>{

const {setDataProducto} = useProductContent()
const [triggerFetch,setTriggerFetch]= useState(false);
const [deleteTrigger,setDeleteTrigger]=useState(false);
const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
const [isModificationModalOpen, setIsModificationModalOpen] = useState(false);
const [isSuccesOpenModal, setisSuccesOpenModal] = useState(false);



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
  setIsConfirmationModalOpen(true);
}

const ConfirmarEliminacion =()=>{
    setDeleteTrigger(true);
    setIsConfirmationModalOpen(false);
   
}

const {data:delete_data,loading:delete_loading,error:delete_error} =useFetch('api/baja_publicaciones.php','POST',{itemKey},deleteTrigger);

useEffect(() => {
  setDeleteTrigger(false)
}, [delete_data,delete_loading,delete_error])




/******************************MODIFICAR PUBLICACIONES**************************************** */

 const ModalDeModificacion=(event)=>{
  event.stopPropagation();
  setIsModificationModalOpen(true)
 }


 const closeModal =()=>{
  setIsModificationModalOpen(false);
 }


const showSucces=()=>{
  setisSuccesOpenModal(true);
 }

 return(
        <>
            
                <div className="publicacion-card" onClick={mostrarDetalleProducto} >
                    <div className="image-container">
                      <img className="product-image" src={imagen} loading="lazy" />
                    </div>
                    <h2 className="tituloStyle">{titulo}</h2>
                    <h2 className="stylePrice" > $ {price}</h2>
                    <h2 className="stockStyle">Stock: {stock}</h2>   
                    <button type="button" className="modify-button" onClick={ModalDeModificacion}> Modificar</button>     
                    <button type="button" className="delete-button" onClick={ModalDeEliminacion}> </button>        
                </div>
                <ConfirmationModal
                    Abierto={isConfirmationModalOpen}
                    Cerrado={() => setIsConfirmationModalOpen(false)} 
                    onConfirm={ConfirmarEliminacion} 
                />

                <ModificationModal isOpen={isModificationModalOpen} onClose={closeModal} >
                        <ModificarPublicacion itemKey={itemKey} onClose={closeModal} onSuccess={showSucces} />
                 </ModificationModal>
                 <GenericExitoso onSuccess={isSuccesOpenModal}></GenericExitoso>
            
        </>

 )

}