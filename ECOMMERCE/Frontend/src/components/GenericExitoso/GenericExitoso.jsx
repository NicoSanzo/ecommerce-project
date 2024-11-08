import React, { useEffect, useState } from 'react';
import './GenericExitosoStyle.css';

export function GenericExitoso({ onSuccess }) {
  const [visible, setVisible] = useState(false);

  
  useEffect(() => {
    if (onSuccess) {
   
      setVisible(true);
    }
  }, [onSuccess]); 

  const onClose = () => {
    setVisible(false); 
  };

  if (!onSuccess) return null;


  return (
    <div className={`success-container ${visible ? 'visible' : ''}`}>
      Modificación realizada con éxito!
      <button className="close-button-success" onClick={onClose}>X</button>
    </div>
  );
}