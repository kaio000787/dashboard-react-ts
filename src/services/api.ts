import  axios from 'axios';

const api = axios.create({
    baseURL: 'https://site-pessoal-api-kr3w.onrender.com/api'
});

export default api  