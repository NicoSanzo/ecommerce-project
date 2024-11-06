import { useState, useEffect } from 'react';

export const useFetch = (url, method = 'POST', body = null, triggerFetch = false) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (triggerFetch) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);

                try {
                    const options = {
                        method,
                        body: body instanceof FormData ? body : new URLSearchParams(body).toString(),
                    };

                    // Solo agrega el encabezado 'Content-Type' si el body no es FormData
                    if (!(body instanceof FormData)) {
                        options.headers = {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        };
                    }

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
    }, [triggerFetch]);

    return { data, loading, error };
};



