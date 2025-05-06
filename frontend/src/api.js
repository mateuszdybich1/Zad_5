import axios from 'axios';
import { API_HOST } from './config';

const api = axios.create({
    baseURL: API_HOST,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;