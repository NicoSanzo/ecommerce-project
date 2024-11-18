import React from "react";
import "./ProductCardStyle.css";
import { ButtonVer } from "../GenericButtonVer/ButtonVer";
import { VentanaModal } from "../GenericModal/VentanaModal";
import { LoadingComponente } from "../GenericLoadingComponent/LoadingComponent";
import { AgregarAlCarrito } from "../BotonAgregarAlCarrito/AgregarAlCarrito";
import { useProductCard } from "./useProductCard";


export const ProductCard = ({ imagen, titulo, price, itemKey,stock }) => {



const { loading,modalAbierto,ClickMostrarDetalle} = useProductCard(itemKey) /*hook que maneja la logica del componente*/ 


  return (
    <>
      {loading && (
        <VentanaModal Abierto={loading}>
          <LoadingComponente height={50} width={50} />
        </VentanaModal>
      )}
      <div className="producto" onClick={ClickMostrarDetalle}>
        <div className="image-container">
          <img src={imagen} alt={titulo} loading="lazy" />
        </div>
        <h2 className="tituloStyle">{titulo}</h2>
        <h2 className="stylePrice">{price}</h2>
        <h2 className="transferStyle">10% off con Transferencia</h2>
        <div className="Botonera">
          <ButtonVer />
          <AgregarAlCarrito data={{imagen,titulo,price,itemKey,stock}}/>
        </div>

      </div>

      <VentanaModal Abierto={modalAbierto}>
        <LoadingComponente width={70} height={70} />
      </VentanaModal>
    </>
  );
};