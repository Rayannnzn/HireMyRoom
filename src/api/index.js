/**
 * API Service Layer - Central Export
 * Import all API functions from here for cleaner imports
 * 
 * Usage:
 * import { loginAPI, getAllPropertiesAPI } from '../api';
 */

// Authentication APIs
export * from './auth';

// Properties APIs
export * from './properties';

// Bookings APIs
export * from './bookings';

// Upload APIs
export * from './uploads';

// Config utilities
export {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getUserData,
  setUserData,
  removeUserData,
  apiConfig,
  isDevelopment,
} from './config';
