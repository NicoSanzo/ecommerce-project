import React from "react";
import "./VentanaModalStyle.css";

export const VentanaModal = ({ Abierto, children}) => {

    if (!Abierto) return null; 
  
    return (
      <div className="modal-overlay">
        <div className="modal">
            {children}
        </div>
      </div>
    );
  };