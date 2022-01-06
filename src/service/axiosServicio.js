import axios from 'axios';

const axiosBackend = axios.create({
    //baseURL: 'http://localhost:3632/',
    baseURL: 'http://isaacrojas-tesis-backend.herokuapp.com/',
});

export default axiosBackend;