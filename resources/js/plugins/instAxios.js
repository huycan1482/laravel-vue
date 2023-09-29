import axios from 'axios';

const instance = axios.create({
    baseURL: "http://laravel-vue.com", 
});

export default instance;