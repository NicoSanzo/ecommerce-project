import React, { createContext, useContext, useState } from 'react';



const CompraDetailContext = createContext();

export const ContextCompraProvider = ({ children }) => {

const [dataDetailCompra, setDataDetailCompra] = useState(null);
const [CompraID, setCompraId] = useState(null);    
   // console.log(dataDetailCompra)

    return (
        <CompraDetailContext.Provider 
            value={{ 
                dataDetailCompra, 
                setDataDetailCompra,
                CompraID, 
                setCompraId
                
            }}>
            {children}
        </CompraDetailContext.Provider>
    );
};
export const useCompraDetailContent = () => useContext(CompraDetailContext); // Hook que retorno 