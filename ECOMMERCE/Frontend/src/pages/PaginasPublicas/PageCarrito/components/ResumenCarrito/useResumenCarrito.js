import React, { useEffect, useState } from "react";
import { useAddCarrito } from "../../../../../Context/addCarritoContext";
import { useLoginModal } from "../../../../../Context/LoginPopContext";

export function useResumenCarrito(OcultarButtonComprar) {
  const {
    arrayProductsCarrito,
    total,
    MostrarDescuento,
    cantidadDescuento,
    setMostrarMetodosDePago,
    subtotal,
    Envio
  } = useAddCarrito();
  

  const { openModal } = useLoginModal();

  // Función para continuar con la compra,   Verifica si el usuario no está autenticado o si falta algún dato en sessionStorage, sino abre el login
  const ContinuarCompra = () => {
    const isUserAuthenticated = sessionStorage.getItem('autenticacion');
    const isUserAdmin = sessionStorage.getItem('isAdmin');
    const hasSessionId = sessionStorage.getItem('sessionId');

    if (!isUserAuthenticated || !isUserAdmin || !hasSessionId) {
      openModal();
    } else if (arrayProductsCarrito.length !== 0) {
      setMostrarMetodosDePago(true);
      OcultarButtonComprar.current.style.display = "none";
    }
  };

   /******************* Efecto que muestra o oculta el botón de comprar dependiendo si el carrito está vacío *******************/
  
  useEffect(() => {
    if (arrayProductsCarrito.length === 0) {
      OcultarButtonComprar.current.style.display = "block";
    }
  }, [arrayProductsCarrito]);

  /******************* Calcula el total de la compra con envio *******************/


  return {
    arrayProductsCarrito,
    total,
    Envio,
    ContinuarCompra,
    MostrarDescuento,
    cantidadDescuento,
    subtotal
  };
}