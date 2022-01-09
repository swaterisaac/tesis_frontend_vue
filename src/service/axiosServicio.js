import axios from 'axios';

const axiosBackend = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL || "http://localhost:5000/",
});

export default axiosBackend;