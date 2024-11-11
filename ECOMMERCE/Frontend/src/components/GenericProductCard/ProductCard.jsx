import React, { useEffect, useState } from "react";
import "./ProductCardStyle.css";
import { ButtonVer } from "../GenericButtonVer/ButtonVer";
import { useFetch } from "../../hooks/PedidoFetchGenerico";
import { useProductContent } from "../../Context/productDetailContext";
import { useNavigate } from "react-router-dom";
import { VentanaModal } from "../GenericModal/VentanaModal";
import { LoadingComponente } from "../GenericLoadingComponent/LoadingComponent";

export const ProductCard = ({ imagen, titulo, price, itemKey }) => {
  const { setDataProducto } = useProductContent();
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [modalAbierto, setModal] = useState(false);
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
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

  const mostrarDetalleProducto = () => {
    setTriggerFetch(true);
    if (loading) {
      setModal(true);
    }
  };

  return (
    <>
      {loading && (
        <VentanaModal Abierto={loading}>
          <LoadingComponente height={50} width={50} />
        </VentanaModal>
      )}
      <div className="producto" onClick={mostrarDetalleProducto}>
        <div className="image-container">
          <img src={imagen} alt={titulo} loading="lazy" />
        </div>
        <h2 className="tituloStyle">{titulo}</h2>
        <h2 className="stylePrice">{price}</h2>
        <h2 className="transferStyle">10% off con Transferencia</h2>
        <ButtonVer />
      </div>

      <VentanaModal Abierto={modalAbierto}>
        <LoadingComponente width={70} height={70} />
      </VentanaModal>
    </>
  );
};