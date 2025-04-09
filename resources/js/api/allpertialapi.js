import { axiosInstanceForExternal } from "./axiosInstance";

// User API কল
export const fetchDistricts = () => axiosInstanceForExternal.get('/district').then((res) => res.data);
export const fetchUpazillas = (district) => axiosInstanceForExternal.get(`/upazilla/${district}`).then((res) => res.data);
