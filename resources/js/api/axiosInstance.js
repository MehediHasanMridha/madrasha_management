import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://madrasa.test',
    headers: {
        'Content-Type': 'application/json',
    },
});
export const axiosInstanceForExternal = axios.create({
    baseURL: 'https://bdapi.vercel.app/api/v.1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
