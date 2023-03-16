import axios from 'axios';
import { getStorageValue } from './storage';

const customFetch = axios.create({
    baseURL: 'http://127.0.0.1:8000',
  });

  customFetch.interceptors.request.use((config:any) => {
    const user = getStorageValue("token");
    if (user) {
        config.headers['Authorization'] = `Bearer ${user}`;
      }
    
    return config;
  });
  
  export default customFetch