import "./RegistrarseStyle.css";
import React, { useState } from "react";

export const Registrarse = ({ Logueate }) => {
  // Initialize state with an object for form fields
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
    celular: "",
    contraseña: "",
    repetirContraseña: "",
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.contraseña !== formData.repetirContraseña) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Handle registration logic here (e.g., API call)
    console.log("Form submitted", formData);
  };


  const backToLogin = () => {
    Logueate();
  };

  return (
    <div className="registro-container">
      <h2 className="title">¡Regístrate!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          placeholder="Nombre"
          onChange={handleChange}
        />
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          placeholder="Apellido"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          className="mail"
          placeholder="Mail"
          onChange={handleChange}
        />
        <input
          type="number"
          name="dni"
          value={formData.dni}
          placeholder="DNI"
          onChange={handleChange}
        />
        <input
          type="number"
          name="celular"
          value={formData.celular}
          placeholder="Celular"
          onChange={handleChange}
        />
        <input
          type="password"
          name="contraseña"
          value={formData.contraseña}
          className="contraseña"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <input
          type="password"
          name="repetirContraseña"
          value={formData.repetirContraseña}
          className="contraseña"
          placeholder="Repetir Contraseña"
          onChange={handleChange}
        />
        <button type="submit">Registrarse</button>
      </form>

      <h3 className="registro">
        ¿Ya tenés cuenta? Inicia sesión{" "}
        <div className="Registrarse" onClick={backToLogin}>
          aquí
        </div>
      </h3>
    </div>
  );
};
