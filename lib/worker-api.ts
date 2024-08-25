import axios from "axios";

const workerAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
});
// workerAPI.interceptors.request.use((config) => {

//     config.headers.Authorization = `Bearer ${window}`
//     return config
// })
export default workerAPI;

