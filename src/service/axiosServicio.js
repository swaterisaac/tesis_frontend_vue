import axios from 'axios';

const axiosBackend = axios.create({
    baseURL: process.env.BACKEND_URL,
});

export default axiosBackend;