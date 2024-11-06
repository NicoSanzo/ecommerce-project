import React, { createContext, useContext, useEffect, useState } from 'react';



const ModProductContext = createContext();

export const ContexModProvider = ({ children }) => {

const [dataPubliMod, setDataPubliMod] = useState(null);
    
    return (
        <ModProductContext.Provider 
            value={{ 
                dataPubliMod, setDataPubliMod
            }}>
            {children}
        </ModProductContext.Provider>
    );
};
export const useModData = () => useContext(ModProductContext); // Hook que retorno 