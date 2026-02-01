import { apiClient } from '../utils/apiClient';
import { setAuthToken, setUserData, removeAuthToken, removeUserData } from './config';

/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} role - User role ('OWNER' or 'GUEST')
 * @returns {Promise<object>} - User data and token
 */
export const loginAPI = async (email, password, role) => {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
      role, // 'OWNER' or 'GUEST'
    });

    // Store token if provided
    if (response.token) {
      setAuthToken(response.token);
    }

    // Store user data if provided
    if (response.user) {
      setUserData(response.user);
    }

    return response;
  } catch (error) {
    // Re-throw with user-friendly message
    throw new Error(error.message || 'Login failed. Please check your credentials.');
  }
};

/**
 * Register new user
 * @param {object} userData - User registration data
 * @returns {Promise<object>} - User data and token
 */
export const registerAPI = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);

    // Store token if provided
    if (response.token) {
      setAuthToken(response.token);
    }

    // Store user data if provided
    if (response.user) {
      setUserData(response.user);
    }

    return response;
  } catch (error) {
    throw new Error(error.message || 'Registration failed. Please try again.');
  }
};

/**
 * Logout user
 * @returns {Promise<void>}
 */
export const logoutAPI = async () => {
  try {
    // Call logout endpoint if available
    await apiClient.post('/auth/logout');
  } catch (error) {
    // Even if API call fails, clear local storage
    console.error('Logout API error:', error);
  } finally {
    // Always clear local storage
    removeAuthToken();
    removeUserData();
  }
};

/**
 * Get current user profile
 * @returns {Promise<object>} - Current user data
 */
export const getCurrentUserAPI = async () => {
  try {
    const response = await apiClient.get('/auth/me');
    
    // Update stored user data
    if (response.user) {
      setUserData(response.user);
    }

    return response.user || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch user data.');
  }
};

/**
 * Update user profile
 * @param {object} profileData - Profile data to update
 * @returns {Promise<object>} - Updated user data
 */
export const updateProfileAPI = async (profileData) => {
  try {
    const response = await apiClient.put('/auth/profile', profileData);
    
    // Update stored user data
    if (response.user) {
      setUserData(response.user);
    }

    return response.user || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to update profile.');
  }
};

/**
 * Refresh authentication token
 * @returns {Promise<string>} - New token
 */
export const refreshTokenAPI = async () => {
  try {
    const response = await apiClient.post('/auth/refresh');
    
    if (response.token) {
      setAuthToken(response.token);
    }

    return response.token;
  } catch (error) {
    throw new Error(error.message || 'Failed to refresh token.');
  }
};
