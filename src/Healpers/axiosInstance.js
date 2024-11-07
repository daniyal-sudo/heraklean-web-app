// axiosInstance.js
import axios from 'axios';
import { api_url } from '../../CommonFunctions';

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: api_url, // Set your base URL here
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token || ""}`, // Fallback if the token is not available
  },
});

// Function to set the Authorization token dynamically

export default axiosInstance;
