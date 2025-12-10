// src/lib/axios.js
import axios from 'axios';
import { toast } from 'sonner';
import { clearFormErrors, extractFieldName } from './utils';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    // baseURL: 'https://afniah-plus.techrevivals.net/server/api',
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
        config.headers['Accept-Language'] = localStorage.getItem('selectedLanguage') || 'en';
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
            window.location.href = '/admin/login';
        }
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            Object.entries(errors).forEach(([field, messages]) => {
                const errorEl = document.querySelector(`.error-${field}`);
                if (errorEl) {
                    errorEl.innerText = messages[0];
                }
            });
        }
        return Promise.reject(error);
    }
);

export const handleFormSubmission = async (event, route, method = 'POST') => {
    event.preventDefault();
    clearFormErrors();
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        let config = {
            method: method.toLowerCase(),
            url: route,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        if (method === 'PUT' || method === 'PATCH') {
            formData.append('_method', method);
            config.method = 'post';
        }

        const response = await axiosInstance(config);
        
        if (response.data.status === true) {
            toast.success('Request Submitted!!', {
                description: response.data.message,
            });
            if(response?.data?.resetForm){
                form.reset();
                document.querySelectorAll(".jodit-workplace")?.forEach((jodit) => {
                    jodit.querySelector("div").innerHTML = `<p></p>`;
                });
            }
            if (route.includes('/login') && response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('afniahUser', JSON.stringify(response.data.admin));
                window.location.href = '/admin/dashboard';
            }
            console.log(response.data);
            console.log(response.data.navigateTo);
            
            if(response?.data?.navigateTo){
                window.location.href = response.data.navigateTo;
            }
        } else if (response.data.status === false) {
            response?.data?.errors?.forEach(error => {
                document.querySelector(`.error-${extractFieldName(error)}`).innerText = error;
            });
            if (response?.data?.message) {
                toast.error('Request Failed!', {
                    description: response?.data?.message
                });
            }
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