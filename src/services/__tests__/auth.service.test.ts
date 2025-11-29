import { authService } from '../auth.service';

// Mock localStorage and sessionStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock the localStorage and sessionStorage
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true,
});

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  (mockLocalStorage.getItem as jest.Mock).mockReturnValue(null);
  (mockSessionStorage.getItem as jest.Mock).mockReturnValue(null);
});

// Mock the api service
jest.mock('../api.service', () => ({
  apiRequest: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

import { apiRequest } from '../api.service';

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (mockLocalStorage.getItem as jest.Mock).mockReturnValue(null);
    (mockSessionStorage.getItem as jest.Mock).mockReturnValue(null);
 });

 describe('register', () => {
    it('should register a user successfully', async () => {
      const mockResponse = {
        success: true,
        message: 'User registered successfully',
        token: 'mock-token',
        user: {
          user_id: 1,
          email: 'test@example.com',
          full_name: 'Test User',
          role: 'Patient',
          created_at: '2023-01-01T00:00Z',
        },
      };

      (apiRequest.post as jest.Mock).mockResolvedValue({
        data: mockResponse,
      });

      const registerData = {
        email: 'test@example.com',
        password: 'password123',
        full_name: 'Test User',
        role: 'Patient' as const,
      };

      const result = await authService.register(registerData);

      expect(apiRequest.post).toHaveBeenCalledWith('/auth/register', registerData);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when registration fails', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Email already exists',
          },
        },
      };

      (apiRequest.post as jest.Mock).mockRejectedValue(mockError);

      const registerData = {
        email: 'test@example.com',
        password: 'password123',
        full_name: 'Test User',
        role: 'Patient' as const,
      };

      await expect(authService.register(registerData)).rejects.toThrow('Email already exists');
    });
  });

  describe('login', () => {
    it('should login a user successfully with rememberMe=true (default)', async () => {
      const mockResponse = {
        success: true,
        message: 'Login successful',
        token: 'mock-token',
        user: {
          user_id: 1,
          email: 'test@example.com',
          full_name: 'Test User',
          role: 'Patient',
        },
      };

      (apiRequest.post as jest.Mock).mockResolvedValue({
        data: mockResponse,
      });

      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(loginData); // Default rememberMe=true

      expect(apiRequest.post).toHaveBeenCalledWith('/auth/login', loginData);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
      expect(mockSessionStorage.setItem).not.toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it('should login a user successfully with rememberMe=true', async () => {
      const mockResponse = {
        success: true,
        message: 'Login successful',
        token: 'mock-token',
        user: {
          user_id: 1,
          email: 'test@example.com',
          full_name: 'Test User',
          role: 'Patient',
        },
      };

      (apiRequest.post as jest.Mock).mockResolvedValue({
        data: mockResponse,
      });

      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(loginData, true);

      expect(apiRequest.post).toHaveBeenCalledWith('/auth/login', loginData);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
      expect(mockSessionStorage.setItem).not.toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it('should login a user successfully with rememberMe=false', async () => {
      const mockResponse = {
        success: true,
        message: 'Login successful',
        token: 'mock-token',
        user: {
          user_id: 1,
          email: 'test@example.com',
          full_name: 'Test User',
          role: 'Patient',
        },
      };

      (apiRequest.post as jest.Mock).mockResolvedValue({
        data: mockResponse,
      });

      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(loginData, false);

      expect(apiRequest.post).toHaveBeenCalledWith('/auth/login', loginData);
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when login fails', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Invalid credentials',
          },
        },
      };

      (apiRequest.post as jest.Mock).mockRejectedValue(mockError);

      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      await expect(authService.login(loginData)).rejects.toThrow('Invalid credentials');
    });
  });

  describe('logout', () => {
    it('should logout a user successfully by clearing both storages', async () => {
      mockLocalStorage.setItem('token', 'mock-token');
      mockSessionStorage.setItem('token', 'mock-session-token');

      const result = await authService.logout();

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('token');
      expect(result).toEqual({ message: 'Logged out successfully' });
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if token exists in localStorage', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValue('mock-token');
      (mockSessionStorage.getItem as jest.Mock).mockReturnValue(null);
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return true if token exists in sessionStorage', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValue(null);
      (mockSessionStorage.getItem as jest.Mock).mockReturnValue('mock-session-token');
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return false if token does not exist in either storage', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValue(null);
      (mockSessionStorage.getItem as jest.Mock).mockReturnValue(null);
      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe('getToken', () => {
    it('should return token from localStorage when available', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValue('mock-token');
      (mockSessionStorage.getItem as jest.Mock).mockReturnValue('mock-session-token');
      expect(authService.getToken()).toBe('mock-token');
    });

    it('should return token from sessionStorage when localStorage is empty', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValue(null);
      (mockSessionStorage.getItem as jest.Mock).mockReturnValue('mock-session-token');
      expect(authService.getToken()).toBe('mock-session-token');
    });

    it('should return null when no token exists in either storage', () => {
      (mockLocalStorage.getItem as jest.Mock).mockReturnValue(null);
      (mockSessionStorage.getItem as jest.Mock).mockReturnValue(null);
      expect(authService.getToken()).toBeNull();
    });
  });
});