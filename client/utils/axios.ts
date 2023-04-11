import axios from 'axios';
import { deleteStorageValue, getStorageValue } from './storage';
import { toast } from "react-toastify";


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

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        deleteStorageValue('token'); // or whatever function you use to remove the token from storage
        toast.warning('Session timed out, please sign back in');
        window.location.replace('/signin')
      }
      return Promise.reject(error);
    }
  );
  
  export default customFetch