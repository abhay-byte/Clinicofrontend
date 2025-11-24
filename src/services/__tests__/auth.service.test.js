const { authService } = require('../auth.service');

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
});

// Mock the api service
jest.mock('../api.service', () => ({
  apiRequest: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

const { apiRequest } = require('../api.service');

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
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

      apiRequest.post.mockResolvedValue({
        data: mockResponse,
      });

      const registerData = {
        email: 'test@example.com',
        password: 'password123',
        full_name: 'Test User',
        role: 'Patient',
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

      apiRequest.post.mockRejectedValue(mockError);

      const registerData = {
        email: 'test@example.com',
        password: 'password123',
        full_name: 'Test User',
        role: 'Patient',
      };

      await expect(authService.register(registerData)).rejects.toThrow('Email already exists');
    });
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
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

      apiRequest.post.mockResolvedValue({
        data: mockResponse,
      });

      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authService.login(loginData);

      expect(apiRequest.post).toHaveBeenCalledWith('/auth/login', loginData);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
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

      apiRequest.post.mockRejectedValue(mockError);

      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      await expect(authService.login(loginData)).rejects.toThrow('Invalid credentials');
    });
  });

 describe('logout', () => {
    it('should logout a user successfully', async () => {
      mockLocalStorage.setItem('token', 'mock-token');

      const result = await authService.logout();

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
      expect(result).toEqual({ message: 'Logged out successfully' });
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if token exists', () => {
      mockLocalStorage.setItem('token', 'mock-token');
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return false if token does not exist', () => {
      mockLocalStorage.removeItem('token');
      expect(authService.isAuthenticated()).toBe(false);
    });
  });
});