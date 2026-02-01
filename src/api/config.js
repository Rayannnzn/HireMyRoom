/**
 * API Configuration
 * Centralized configuration for all API calls
 * Uses environment variables for security
 */

// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// API Configuration Object
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10), // 10 seconds default
  headers: {
    'Content-Type': 'application/json',
  },
};

// Helper function to get auth token from localStorage
export const getAuthToken = () => {
  try {
    return localStorage.getItem('authToken') || null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Helper function to set auth token
export const setAuthToken = (token) => {
  try {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

// Helper function to remove auth token
export const removeAuthToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

// Helper function to get user data from localStorage
export const getUserData = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Helper function to set user data
export const setUserData = (user) => {
  try {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  } catch (error) {
    console.error('Error setting user data:', error);
  }
};

// Helper function to remove user data
export const removeUserData = () => {
  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error removing user data:', error);
  }
};

// Check if we're in development mode
export const isDevelopment = () => {
  return import.meta.env.DEV || import.meta.env.VITE_ENV === 'development';
};

// Log API calls in development mode
export const logApiCall = (method, url, data = null) => {
  if (isDevelopment()) {
    console.log(`[API] ${method} ${url}`, data ? { data } : '');
  }
};
