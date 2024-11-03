import React from 'react';
import { Login } from '../Login';
import { useLoginModal } from '../../../Context/LoginPopContext';
import { useAuth } from '../../../Context/authContext';
import './loginModelStyle.css';


export const LoginModal = () => {
  const { isOpen, closeModal } = useLoginModal(); // Usar el estado del modal

  if (!isOpen) return null;


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>X</button>
        <Login onClose={closeModal} /> {/* Pasar la función para cerrar el modal */}
      </div>
    </div>
  );
};


