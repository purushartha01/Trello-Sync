
import axios from "axios";


const serverAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "/",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
    timeout: 10000,
});

export { serverAxiosInstance };