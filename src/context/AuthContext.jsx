import { createContext, useContext, useState, useEffect } from 'react';
import { loginAPI, logoutAPI, getCurrentUserAPI } from '../api/auth';
import { getUserData, setUserData, removeUserData } from '../api/config';

const AuthContext = createContext(null);

// Flag to enable/disable API calls (set to false for mock mode)
const USE_API = import.meta.env.VITE_USE_API === 'true' || false;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const storedUser = getUserData();
        
        if (storedUser) {
          setUser(storedUser);
          
          // If API is enabled, verify token is still valid
          if (USE_API) {
            try {
              const currentUser = await getCurrentUserAPI();
              setUser(currentUser);
              setUserData(currentUser);
            } catch (error) {
              // Token might be invalid, clear it
              console.error('Auth check failed:', error);
              removeUserData();
              setUser(null);
            }
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        removeUserData();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, role) => {
    try {
      if (USE_API) {
        // Real API call
        const response = await loginAPI(email, password, role);
        const userData = response.user || response;
        setUser(userData);
        return response;
      } else {
        // Mock login for development
        const mockUser = {
          id: '1',
          email,
          name: role === 'OWNER' ? 'John Owner' : 'Jane Guest',
          role, // 'OWNER' or 'GUEST'
        };
        setUser(mockUser);
        setUserData(mockUser);
        return { user: mockUser };
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (USE_API) {
        await logoutAPI();
      } else {
        // Mock logout - just clear local storage
        removeUserData();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
