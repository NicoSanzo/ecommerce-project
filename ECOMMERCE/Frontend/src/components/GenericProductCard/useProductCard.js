import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/PedidoFetchGenerico"; 
import { useProductContent } from "../../Context/productDetailContext";



export const useProductCard = (itemKey) => {

  const { setDataProducto } = useProductContent();
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [modalAbierto, setModal] = useState(false);

 


  const navigate = useNavigate();

  const { data, loading, error, } = useFetch(
    "api/busquedaProductoUnico.php",
    "POST",
    { itemKey },
    triggerFetch
  );

  useEffect(() => {
    if (data) {
      setDataProducto(data);
      setTriggerFetch(false);
      navigate(`/productoDetail?ID=${itemKey}`);
    }
  }, [data, itemKey, navigate, setDataProducto]);

  const ClickMostrarDetalle = () => {
    setTriggerFetch(true);
    if (loading) {
      setModal(true);
    }
  };

  return {
    loading,
    modalAbierto,
    ClickMostrarDetalle,
    setModal,
  };

};