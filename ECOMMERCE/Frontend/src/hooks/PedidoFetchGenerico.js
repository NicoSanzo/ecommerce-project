import { useState, useEffect } from 'react';

export const useFetch = (url, method = 'POST', body = null,triggerFetch ,delay=2000) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(triggerFetch){
        const fetchData = async () => {
            setLoading(true);
             setError(null);
            try {
                await new Promise(resolve => setTimeout(resolve, delay));
                const options = {
                    method,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // Cambia a application/x-www-form-urlencoded para PHP
                    },
                    body: body ? new URLSearchParams(body).toString() : null, // Convierte el objeto a un formato adecuado
                };

                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }
    },  [triggerFetch]);

    return { data, loading, error };
};



