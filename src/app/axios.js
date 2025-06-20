import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {

            const requestUrl = error.config.url;
            console.log(requestUrl);
            if (
                !requestUrl.includes('auth/login') &&
                !requestUrl.includes('auth/me')
            ) {
                window.location.href = '/login'; // or use navigate('/login') in React components
            }

        }
        return Promise.reject(error);
    }
);

export default axiosInstance;