import { apiClient } from '../utils/apiClient';

/**
 * Bookings API Service
 * Handles all booking-related API calls
 */

/**
 * Submit booking request (Guest)
 * @param {object} bookingData - Booking data (propertyId, checkIn, checkOut, notes)
 * @returns {Promise<object>} - Created booking request
 */
export const submitBookingRequestAPI = async (bookingData) => {
  try {
    const response = await apiClient.post('/bookings', bookingData);
    return response.booking || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to submit booking request.');
  }
};

/**
 * Get guest's booking requests
 * @returns {Promise<array>} - Array of booking requests
 */
export const getGuestBookingRequestsAPI = async () => {
  try {
    const response = await apiClient.get('/bookings/guest/my-requests');
    return response.bookings || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch booking requests.');
  }
};

/**
 * Get guest's confirmed bookings
 * @returns {Promise<array>} - Array of confirmed bookings
 */
export const getGuestBookingsAPI = async () => {
  try {
    const response = await apiClient.get('/bookings/guest/my-bookings');
    return response.bookings || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch bookings.');
  }
};

/**
 * Get owner's booking requests
 * @param {object} filters - Filter parameters (status, propertyId, etc.)
 * @returns {Promise<array>} - Array of booking requests
 */
export const getOwnerBookingRequestsAPI = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/bookings/owner/requests${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiClient.get(endpoint);
    return response.bookings || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch booking requests.');
  }
};

/**
 * Accept booking request (Owner)
 * @param {string} bookingId - Booking ID
 * @returns {Promise<object>} - Updated booking data
 */
export const acceptBookingAPI = async (bookingId) => {
  try {
    const response = await apiClient.put(`/bookings/${bookingId}/accept`);
    return response.booking || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to accept booking.');
  }
};

/**
 * Reject booking request (Owner)
 * @param {string} bookingId - Booking ID
 * @param {string} reason - Optional rejection reason
 * @returns {Promise<object>} - Updated booking data
 */
export const rejectBookingAPI = async (bookingId, reason = '') => {
  try {
    const response = await apiClient.put(`/bookings/${bookingId}/reject`, { reason });
    return response.booking || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to reject booking.');
  }
};

/**
 * Cancel booking (Guest)
 * @param {string} bookingId - Booking ID
 * @returns {Promise<void>}
 */
export const cancelBookingAPI = async (bookingId) => {
  try {
    await apiClient.put(`/bookings/${bookingId}/cancel`);
  } catch (error) {
    throw new Error(error.message || 'Failed to cancel booking.');
  }
};

/**
 * Get booking by ID
 * @param {string} bookingId - Booking ID
 * @returns {Promise<object>} - Booking data
 */
export const getBookingByIdAPI = async (bookingId) => {
  try {
    const response = await apiClient.get(`/bookings/${bookingId}`);
    return response.booking || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch booking.');
  }
};
