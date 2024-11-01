import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [FoundData, setFoundData] = useState({data:[]});
    const [searchData, setSearchData] = useState("");
    const [loading,setLoading]= useState(false);
    const [inputOrder,setinputOrder]=useState("Todos");
    const [Error,setError]=useState(null);

    return (
        <SearchContext.Provider 
        value={{ 
            FoundData, setFoundData,
            searchData,setSearchData,
            inputOrder,setinputOrder,
            loading,setLoading,
            Error,setError }}>

        {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext); // Hook que retorno 