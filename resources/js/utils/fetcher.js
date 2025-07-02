import axios from 'axios';
import { appLink } from './variable';

const axiosInstance = axios.create({
    baseURL: appLink,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;
