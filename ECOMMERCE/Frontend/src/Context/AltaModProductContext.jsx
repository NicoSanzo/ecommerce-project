import React, { createContext, useContext, useEffect, useState } from 'react';



const AltaModProductContext = createContext();

export const ContextAltaBajaProvider = ({ children }) => {

const [dataPubliNueva, setDataPubliNueva] = useState(null);
    
    return (
        <AltaModProductContext.Provider 
            value={{ 
                dataPubliNueva, setDataPubliNueva
            }}>
            {children}
        </AltaModProductContext.Provider>
    );
};
export const useAltaBajaData = () => useContext(AltaModProductContext); // Hook que retorno 