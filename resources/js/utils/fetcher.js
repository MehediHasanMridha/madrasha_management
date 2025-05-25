import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://madrasa.test',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;
