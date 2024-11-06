import React, { useState,forwardRef } from "react";
import "./inputTextStyle.css";


export const InputText = forwardRef(({ label_name, error, onChange,required}, ref) => {

    const [datainput, setDatainput] = useState("");

    const guardarDato = (event) => {
        const value = event.target.value;
        setDatainput(value);
        onChange && onChange(event); // Llama a la función onChange pasada como prop
    };

    return (
        <div className="input-div">
            <label htmlFor="">
            {label_name}
            {required && <span className="requerido">(requerido)</span>}
            </label>
            <input type="text" onChange={guardarDato} value={datainput} ref={ref} />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
});