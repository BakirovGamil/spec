import { useState } from "react";

function useFetching(callback) {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    async function fetch() {
        try {
            setIsLoading(true);
            await callback();
            setError("");
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [isLoading, fetch, error];
}

export default useFetching;