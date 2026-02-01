import { apiConfig, getAuthToken, removeAuthToken, logApiCall } from '../api/config';

/**
 * API Client - Centralized HTTP client for all API requests
 * Handles authentication, error handling, and response parsing
 * 
 * Features:
 * - Automatic token injection
 * - Error handling
 * - Request/response logging (dev mode)
 * - Timeout handling
 * - JSON parsing
 */
class ApiClient {
  constructor() {
    this.baseURL = apiConfig.baseURL;
    this.timeout = apiConfig.timeout;
  }

  /**
   * Create an AbortController for timeout
   */
  createTimeoutController() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    return { controller, timeoutId };
  }

  /**
   * Make HTTP request
   * @param {string} endpoint - API endpoint (e.g., '/auth/login')
   * @param {object} options - Fetch options
   * @returns {Promise} - Parsed JSON response
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const method = options.method || 'GET';
    const token = getAuthToken();

    // Log API call in development
    logApiCall(method, url, options.body);

    // Default headers
    const headers = {
      ...apiConfig.headers,
      ...options.headers,
    };

    // Add auth token if available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Create timeout controller
    const { controller, timeoutId } = this.createTimeoutController();

    try {
      // Merge options
      const config = {
        ...options,
        headers,
        signal: controller.signal,
      };

      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      // Parse response
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Handle non-JSON responses
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text || 'Unknown error' };
        }
      }

      // Handle 401 Unauthorized (token expired/invalid)
      if (response.status === 401) {
        removeAuthToken();
        // Redirect to login if not already there
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        throw new Error('Session expired. Please login again.');
      }

      // Handle other errors
      if (!response.ok) {
        const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle timeout
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }

      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection.');
      }

      // Re-throw other errors
      throw error;
    }
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {object} options - Additional fetch options
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body data
   * @param {object} options - Additional fetch options
   */
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body data
   * @param {object} options - Additional fetch options
   */
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body data
   * @param {object} options - Additional fetch options
   */
  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {object} options - Additional fetch options
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * POST request with FormData (for file uploads)
   * @param {string} endpoint - API endpoint
   * @param {FormData} formData - FormData object
   * @param {object} options - Additional fetch options
   */
  async postFormData(endpoint, formData, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = getAuthToken();

    logApiCall('POST', url, '[FormData]');

    // Create timeout controller
    const { controller, timeoutId } = this.createTimeoutController();

    try {
      const headers = {};
      
      // Add auth token if available
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      // Don't set Content-Type for FormData (browser will set it with boundary)

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      // Handle 401
      if (response.status === 401) {
        removeAuthToken();
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        throw new Error('Session expired. Please login again.');
      }

      // Parse response
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text || 'Upload failed' };
        }
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Upload failed');
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new Error('Upload timeout. Please try again.');
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection.');
      }

      throw error;
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
