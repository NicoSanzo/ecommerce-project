import React, { useState, forwardRef } from "react";
import "./inputNumberStyle.css";


export const InputNumber = forwardRef(({ label_name, medicion, error, onChange,required }, ref) => {
   
    const [inputNumber, setInputNumber] = useState('');

    const handlerNumberChange = (event) => {
        const value = event.target.value;
        setInputNumber(value);
        onChange && onChange(event); 
    };

    return (
        <div className="input-div-number">
            <label htmlFor="">
                {label_name}
                {required && <span className="requerido"> (requerido)</span>}
            </label>
            <div className="data">
                <input type="number" onChange={handlerNumberChange} value={inputNumber} ref={ref} />
                <h2>{medicion}</h2>
            </div>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
});