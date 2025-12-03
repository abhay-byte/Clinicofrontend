// Mock the authService - this must be done before the component is imported
const mockLogin = jest.fn();
const mockIsAuthenticated = jest.fn();
const mockGetToken = jest.fn();

jest.mock('../../../services/auth.service', () => ({
  authService: {
    login: mockLogin,
    isAuthenticated: mockIsAuthenticated,
    getToken: mockGetToken,
 },
}));

// Create variables to access the mocks outside the module
const mockedAuthService = {
  login: mockLogin,
  isAuthenticated: mockIsAuthenticated,
  getToken: mockGetToken,
};

// Mock the Dialog component for testing - this must come before the component import
jest.mock('../../../components/ui/dialog', () => ({
  Dialog: ({ children, open, onOpenChange }: { children: React.ReactNode, open: boolean, onOpenChange: (open: boolean) => void }) => (
    open ? <div data-testid="dialog">{children}</div> : null
  ),
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-header">{children}</div>
 ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-title">{children}</div>
 ),
}));

// Mock the sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock the CSS module
jest.mock('../SignInPage.css', () => ({}));

// Mock the image imports
jest.mock('../../assets/logo.png', () => '');
jest.mock('../../assets/signin/mascot_signin.png', () => '');

// The mocks are already set up at the top of the file

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'sonner';
import LogInPage from '../LogInPage';
import { authService } from '../../../services/auth.service';
import { AuthProvider } from '../../../contexts/AuthContext';
import { DoctorProvider } from '../../../contexts/DoctorContext';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('LogInPage', () => {
  // Define the renderWithRouter function
  const renderWithRouter = (initialEntries: string[] = ['/login']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <AuthProvider>
          <DoctorProvider>
            <LogInPage />
          </DoctorProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  test('renders login form correctly', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <DoctorProvider>
            <LogInPage />
          </DoctorProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Log in to Your Clinico Account')).toBeInTheDocument();
    
    // Verify both email and password inputs exist
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    
    expect(screen.getByText('LOG IN')).toBeInTheDocument();
  });

 test('allows user to enter email and password', () => {
   render(
     <MemoryRouter>
       <AuthProvider>
         <DoctorProvider>
           <LogInPage />
         </DoctorProvider>
       </AuthProvider>
     </MemoryRouter>
   );

   const emailInput = screen.getByLabelText('Email');
   const passwordInput = screen.getByLabelText('Password');

   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
   fireEvent.change(passwordInput, { target: { value: 'password123' } });

   expect(emailInput).toHaveValue('test@example.com');
   expect(passwordInput).toHaveValue('password123');
 });

   test('submits login form with correct data', async () => {
      const mockLoginResponse = {
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
 
      mockedAuthService.login.mockResolvedValue(mockLoginResponse);
 
      render(
        <MemoryRouter>
          <AuthProvider>
            <DoctorProvider>
              <LogInPage />
            </DoctorProvider>
          </AuthProvider>
        </MemoryRouter>
      );
 
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /log in$/i }); // Target the "LOG IN" button specifically
 
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      fireEvent.click(submitButton); // Click the submit button
 
      // Wait for the API call to happen
      await waitFor(() => {
        expect(mockedAuthService.login).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
        }, true); // Second parameter is rememberMe flag
      });
    });

  test('shows success toast and redirects on successful login', async () => {
    const mockLoginResponse = {
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

    mockedAuthService.login.mockImplementation(async (credentials, rememberMe = true) => {
      // Simulate the actual behavior of storing the token in localStorage
      if (mockLoginResponse.token && rememberMe) {
        localStorage.setItem('token', mockLoginResponse.token);
      }
      return mockLoginResponse;
    });

    renderWithRouter(['/login']);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /log in$/i }); // Matches "LOG IN" but not "Log In with Google"

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Login successful!');
    });

    // Check if token was stored
    expect(localStorage.getItem('token')).toBe('mock-token');
  });

  test('shows error toast on login failure', async () => {
     const mockError = new Error('Invalid credentials');
     mockedAuthService.login.mockRejectedValue(mockError);

     renderWithRouter(['/login']);

     const emailInput = screen.getByLabelText('Email');
     const passwordInput = screen.getByLabelText('Password');
     const submitButton = screen.getByText('LOG IN');

     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
     fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
     
     fireEvent.click(submitButton);

     await waitFor(() => {
       expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
     });
  });

  test('shows error message in UI on login failure', async () => {
     const mockError = {
       response: {
         data: {
           message: 'Invalid credentials'
         }
       },
       message: 'Login failed'
     };
     mockedAuthService.login.mockRejectedValue(mockError);

     render(
       <MemoryRouter>
         <AuthProvider>
           <DoctorProvider>
             <LogInPage />
           </DoctorProvider>
         </AuthProvider>
       </MemoryRouter>
     );

     const emailInput = screen.getByLabelText('Email');
     const passwordInput = screen.getByLabelText('Password');
     const submitButton = screen.getByText('LOG IN');

     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
     fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
     
     fireEvent.click(submitButton);

     await waitFor(() => {
       expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
     });
  });

  test('shows error dialog on login failure', async () => {
     const mockError = {
       response: {
         data: {
           message: 'Invalid credentials'
         }
       },
       message: 'Login failed'
     };
     mockedAuthService.login.mockRejectedValue(mockError);

     render(
       <MemoryRouter>
         <AuthProvider>
           <DoctorProvider>
             <LogInPage />
           </DoctorProvider>
         </AuthProvider>
       </MemoryRouter>
     );

     const emailInput = screen.getByLabelText('Email');
     const passwordInput = screen.getByLabelText('Password');
     const submitButton = screen.getByText('LOG IN');

     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
     fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
     
     fireEvent.click(submitButton);

     // Wait for the error dialog to appear
     await waitFor(() => {
       expect(screen.getByTestId('dialog')).toBeInTheDocument();
       expect(screen.getByTestId('dialog-title')).toHaveTextContent('Login Failed');
       expect(screen.getByText('Invalid credentials', { selector: 'p' })).toBeInTheDocument();
     });
  });

  test('closes error dialog when OK button is clicked', async () => {
     const mockError = {
       response: {
         data: {
           message: 'Invalid credentials'
         }
       },
       message: 'Login failed'
     };
     mockedAuthService.login.mockRejectedValue(mockError);

     render(
       <MemoryRouter>
         <AuthProvider>
           <DoctorProvider>
             <LogInPage />
           </DoctorProvider>
         </AuthProvider>
       </MemoryRouter>
     );

     const emailInput = screen.getByLabelText('Email');
     const passwordInput = screen.getByLabelText('Password');
     const submitButton = screen.getByText('LOG IN');

     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
     fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
     
     fireEvent.click(submitButton);

     // Wait for the error dialog to appear
     await waitFor(() => {
       expect(screen.getByTestId('dialog')).toBeInTheDocument();
     });

     // Click the OK button to close the dialog
     const okButton = screen.getByText('OK');
     fireEvent.click(okButton);

     // Wait for the dialog to close
     await waitFor(() => {
       expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
     });
  });

  test('shows loading state during login', async () => {
    const mockLoginPromise = new Promise((resolve) =>
      setTimeout(() => resolve({
        success: true,
        message: 'Login successful',
        token: 'mock-token',
        user: {
          user_id: 1,
          email: 'test@example.com',
          full_name: 'Test User',
          role: 'Patient',
        },
      }), 100)
    );
    
    mockedAuthService.login.mockReturnValue(mockLoginPromise);

    render(
      <MemoryRouter>
        <AuthProvider>
          <DoctorProvider>
            <LogInPage />
          </DoctorProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('LOG IN');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Click the submit button
    fireEvent.click(submitButton);

    // Wait for the loading state to be set
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent('Logging in...');
    });

    // Wait for the loading state to end
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent('LOG IN');
    });
  });
});