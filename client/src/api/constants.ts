import axios from 'axios'
const baseURL = 'http://localhost:5000/api';

export const instance = axios.create({
    baseURL,
    timeout:30000
})

