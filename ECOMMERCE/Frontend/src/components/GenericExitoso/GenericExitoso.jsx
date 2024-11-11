import React, { useEffect, useState } from 'react';
import './GenericExitosoStyle.css';


export function GenericExitoso({ isSuccess, onClose }) {
  const [visible, setVisible] = useState(false);
  

  useEffect(() => {
    if (isSuccess) {
      setVisible(true);
    }
  }, [isSuccess]);

  const handleClose = () => {
    setVisible(false);
    onClose(); 
  };

  if (!isSuccess) return null;

  return (

<div className={`container-opaco ${visible ? 'visible' : 'hidden'}`}>
    <div className={`success-container ${visible ? 'visible' : ''}`}>
      <div className='success-logo-container'></div>
      <p className='text-success-container'>¡Modificación realizada con éxito!</p>
      <div className='button-container'>
        <button className="close-button-success" onClick={handleClose}>OK</button>
      </div>
    </div>
</div>
  );
}