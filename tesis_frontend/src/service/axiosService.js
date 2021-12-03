import axios from 'axios';

const axiosBackend = axios.create({
    baseURL: 'http://localhost:3632/',
});

export default axiosBackend;