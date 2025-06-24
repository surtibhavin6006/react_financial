import axios from 'axios';
import {deleteCookie, getCookie} from "../helpers/common.js";

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:8000/api/', // Replace with your backend URL
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
    response => response,
    error => {

        const { response, config } = error;
        const requestUrl = config.url;

        if (!response) {
            // Network error, timeout, or CORS
            console.error("Network error or no response from server.");

        } else {
            switch (response.status) {
                case 401:
                    deleteCookie('isAuthenticated');
                    console.warn("Unauthorized. Redirecting to login.");
                    if (
                        !requestUrl.includes('auth/login') &&
                        !requestUrl.includes('auth/me')
                    ) {
                        window.location.href = '/login'; // or use navigate('/login') in React components
                    }
                    break;
                case 403:
                    console.warn("Forbidden. You don't have access.");
                    break;
                case 404:
                    console.warn("Resource not found.");
                    break;
                case 422:
                    console.warn("Validation error:", response.data.errors);
                    break;
                case 500:
                    console.error("Server error:", response.data.message);
                    break;
                default:
                    console.error("API Error:", response.data.message || response.statusText);
            }
        }

        return Promise.reject(error)
        /*if (error.response && error.response.status === 401) {

            const requestUrl = error.config.url;
            console.log(requestUrl);
            if (
                !requestUrl.includes('auth/login') &&
                !requestUrl.includes('auth/me')
            ) {
                window.location.href = '/login'; // or use navigate('/login') in React components
            }

        }
        return Promise.reject(error);*/



    }
);

export default axiosInstance;