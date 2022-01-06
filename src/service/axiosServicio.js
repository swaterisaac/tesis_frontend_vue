import axios from 'axios';

const axiosBackend = axios.create({
    //baseURL: 'http://localhost:3632/',
    baseURL: 'https://isaacrojas-tesis-backend.herokuapp.com/',
});

export default axiosBackend;