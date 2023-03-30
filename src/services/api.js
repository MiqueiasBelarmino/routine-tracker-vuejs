import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://192.168.0.104:8000/api/v1",
    headers:{
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;