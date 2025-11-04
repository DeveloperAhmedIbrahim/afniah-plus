import axios from 'axios';
import { toast } from 'sonner';
import { clearFormErrors, extractFieldName } from './utils';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const handleFormSubmission = async (event, route) => {
    event.preventDefault(); // ✅ Ye page reload ko rokta hai
    clearFormErrors();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await axiosInstance.post(route, data);
        console.log(response.data.status);
        if(response.data.status === true) 
        {
            toast.success('Request Submitted!!', {
                description: response.data.message,
            });
            form.reset();
        }
        else if(response.data.status === false)
        {
            response?.data?.errors?.forEach(error => {
                document.querySelector(`.error-${extractFieldName(error)}`).innerText = error;
            });
            toast.error('Request Failed!', {
                description: response?.data?.message
            });            
        }
        return response.data;
    } catch (error) {
        toast.error('Request Failed!', {
            description: error.message || 'Please try again later.',
        });
        
        throw error;
    }
};

export default axiosInstance;