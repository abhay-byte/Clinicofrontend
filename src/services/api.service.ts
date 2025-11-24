import axios from 'axios';

// Create base axios instance
const apiClient = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL || 'https://minor-project-gtbit.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
apiClient.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    // Handle specific error responses here if needed
    return Promise.reject(error);
  }
);

export default apiClient;

// Helper functions for common HTTP methods
export const apiRequest = {
  get: (url: string, config?: any) =>
    apiClient.get(url, config),
  
  post: (url: string, data?: any, config?: any) =>
    apiClient.post(url, data, config),
  
 put: (url: string, data?: any, config?: any) =>
    apiClient.put(url, data, config),
  
 delete: (url: string, config?: any) =>
    apiClient.delete(url, config),
};