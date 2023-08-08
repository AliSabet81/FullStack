import axios from 'axios'
import Cookies from 'js-cookie';
const baseURL = 'http://localhost:5000/api';

export const instance = axios.create({
    baseURL,
    timeout:30000
})

instance.defaults.headers.common["Authorization"] = Cookies.get("token")

// instance.interceptors.request