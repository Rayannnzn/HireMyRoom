import { useEffect, useState } from 'react';
import { fetchHomeData } from '../services/homeApi';

/**
 * Custom hook to fetch and manage home page data.
 * Uses the ignore-flag pattern for safe async cleanup.
 *
 * @returns {{ data: Object|null, isLoading: boolean, error: string }}
 */
export function useHomeData() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let ignore = false;

        const loadHomeData = async () => {
            setIsLoading(true);
            setError('');
            try {
                const result = await fetchHomeData();
                if (!ignore) {
                    setData(result);
                }
            } catch (err) {
                if (!ignore) {
                    setError(err.message || 'Something went wrong while loading home data.');
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        };

        loadHomeData();

        return () => {
            ignore = true;
        };
    }, []);

    return { data, isLoading, error };
}
