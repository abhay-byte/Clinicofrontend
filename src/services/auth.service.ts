import { apiRequest } from './api.service';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, LogoutResponse } from '../types/auth.types';

// Auth service methods
export const authService = {
 // Register a new user
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await apiRequest.post('/auth/register', userData);
      const data = response.data as RegisterResponse;
      // Store the token in localStorage if registration is successful
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error: any) {
      // Normalize error response
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      throw new Error(errorMessage);
    }
 },

  // Login user
  login: async (credentials: LoginRequest, rememberMe: boolean = true): Promise<LoginResponse> => {
    try {
      const response = await apiRequest.post('/auth/login', credentials);
      const data = response.data as LoginResponse;
      // Store the token in localStorage or sessionStorage based on rememberMe setting
      if (data.token) {
        if (rememberMe) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
      }
      return data;
    } catch (error: any) {
      // Normalize error response
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(errorMessage);
    }
  },

  // Logout user - clear token from localStorage and sessionStorage
  logout: async (): Promise<{ message: string }> => {
    try {
      // Clear the token from both localStorage and sessionStorage
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      return { message: 'Logged out successfully' };
    } catch (error: any) {
      // In case of error during logout
      const errorMessage = error.message || 'Logout failed';
      throw new Error(errorMessage);
    }
 },

  // Get current user profile (if needed)
  getProfile: async () => {
    try {
      const response = await apiRequest.get('/users/me');
      return response.data as any;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch profile';
      throw new Error(errorMessage);
    }
 },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return !!token;
  },

  // Get token
  getToken: (): string | null => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }
};