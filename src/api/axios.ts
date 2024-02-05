import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import getAuthTokenFromCookie from './getAuthTokenFromCookie';


// Create a new instance of Axios with custom configuration
export const myApiCall: AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/", 
    timeout: 5000, // time before the request times out in milliseconds
    headers: {
        "Content-Type": "application/json", // Set the default content type for requests
        
    },
});

// Add a request interceptor to add the token to the request header
myApiCall.interceptors.request.use(config => {
    const {token, isLoggedIn} = getAuthTokenFromCookie();
    if (isLoggedIn && token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
    }, error => {
    return Promise.reject(error);
    });


