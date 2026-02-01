import { apiClient } from '../utils/apiClient';

/**
 * Properties API Service
 * Handles all property-related API calls
 */

/**
 * Get all properties (public)
 * @param {object} filters - Filter parameters (city, area, type, priceRange, etc.)
 * @returns {Promise<array>} - Array of properties
 */
export const getAllPropertiesAPI = async (filters = {}) => {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/properties${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiClient.get(endpoint);
    return response.properties || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch properties.');
  }
};

/**
 * Get single property by ID
 * @param {string} id - Property ID
 * @returns {Promise<object>} - Property data
 */
export const getPropertyByIdAPI = async (id) => {
  try {
    const response = await apiClient.get(`/properties/${id}`);
    return response.property || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch property.');
  }
};

/**
 * Get owner's properties
 * @returns {Promise<array>} - Array of owner's properties
 */
export const getOwnerPropertiesAPI = async () => {
  try {
    const response = await apiClient.get('/properties/owner/my-properties');
    return response.properties || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch your properties.');
  }
};

/**
 * Create new property (Owner only)
 * @param {object} propertyData - Property data
 * @returns {Promise<object>} - Created property data
 */
export const createPropertyAPI = async (propertyData) => {
  try {
    const response = await apiClient.post('/properties', propertyData);
    return response.property || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to create property.');
  }
};

/**
 * Update property (Owner only)
 * @param {string} id - Property ID
 * @param {object} propertyData - Updated property data
 * @returns {Promise<object>} - Updated property data
 */
export const updatePropertyAPI = async (id, propertyData) => {
  try {
    const response = await apiClient.put(`/properties/${id}`, propertyData);
    return response.property || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to update property.');
  }
};

/**
 * Delete property (Owner only)
 * @param {string} id - Property ID
 * @returns {Promise<void>}
 */
export const deletePropertyAPI = async (id) => {
  try {
    await apiClient.delete(`/properties/${id}`);
  } catch (error) {
    throw new Error(error.message || 'Failed to delete property.');
  }
};

/**
 * Toggle property status (Active/Inactive)
 * @param {string} id - Property ID
 * @param {string} status - New status ('Active' or 'Inactive')
 * @returns {Promise<object>} - Updated property data
 */
export const togglePropertyStatusAPI = async (id, status) => {
  try {
    const response = await apiClient.put(`/properties/${id}/status`, { status });
    return response.property || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to update property status.');
  }
};

/**
 * Search properties
 * @param {string} query - Search query
 * @param {object} filters - Additional filters
 * @returns {Promise<array>} - Array of matching properties
 */
export const searchPropertiesAPI = async (query, filters = {}) => {
  try {
    const queryParams = new URLSearchParams({ q: query, ...filters });
    const response = await apiClient.get(`/properties/search?${queryParams.toString()}`);
    return response.properties || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Search failed.');
  }
};
