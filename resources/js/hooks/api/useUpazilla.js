import { fetchUpazillas } from '@/api/allpertialapi';
import useSWR from 'swr';

export const useUpazillas = (id) => {
    return useSWR(id ? id : null, fetchUpazillas, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
    });
};
