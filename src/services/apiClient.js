import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle session expiration
    if (response && response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Handle server errors
    if (response && response.status >= 500) {
      console.error('Server error:', response.data);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;