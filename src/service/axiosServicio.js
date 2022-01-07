import axios from 'axios';

const axiosBackend = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:3632/',
});

export default axiosBackend;