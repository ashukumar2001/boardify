import axios from "axios";

const axiosInstance = axios.create({
    headers: {
        "Content-type": "application/json",
    },
});

export default axiosInstance;