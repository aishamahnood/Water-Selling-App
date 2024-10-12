import axios from 'axios';

const apiSauce = axios.create({
    baseURL: 'http://localhost:3000/api', // Set your base URL here
    timeout: 10000, // Optional: Set a timeout for requests
});

// Optional: Add interceptors for request/response handling
apiSauce.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken'); // Retrieve the access token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Set the token in the headers
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Optional: Add interceptors for request/response handling
apiSauce.interceptors.response.use(
    response => response,
    error => {
        // Handle errors globally
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default apiSauce;