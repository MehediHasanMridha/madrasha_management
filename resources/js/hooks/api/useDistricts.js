import { fetchDistricts } from '@/api/allpertialapi';
import useSWR from 'swr';

export const useDistricts = () => {
    return useSWR('/districts', fetchDistricts, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
    });
};
