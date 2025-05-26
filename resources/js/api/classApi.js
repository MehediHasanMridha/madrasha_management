import axiosInstance from "@/api/axiosInstance";


export const fetchDepartmentWiseClassApi = (departmentId) => axiosInstance.get(`/department-wise-class/${departmentId}`).then((res) => res.data);
