/**
 * Centralized Error Handler
 * Converts API errors to user-friendly messages
 */

/**
 * Handle API errors and return user-friendly messages
 * @param {Error} error - Error object from API call
 * @returns {string} - User-friendly error message
 */
export const handleAPIError = (error) => {
  // If error already has a user-friendly message, return it
  if (error.message && !error.message.includes('HTTP error')) {
    return error.message;
  }

  // Network errors
  if (!error.response && error.message) {
    if (error.message.includes('Network error') || error.message.includes('fetch')) {
      return 'Network error. Please check your internet connection.';
    }
    if (error.message.includes('timeout')) {
      return 'Request timeout. Please try again.';
    }
    return error.message;
  }

  // HTTP status errors (if we have response object)
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.message || error.response.data?.error;

    switch (status) {
      case 400:
        return message || 'Invalid request. Please check your input.';
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return 'Access denied. You don\'t have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 409:
        return message || 'Conflict. This resource already exists.';
      case 422:
        return message || 'Validation error. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 502:
        return 'Bad gateway. Please try again later.';
      case 503:
        return 'Service unavailable. Please try again later.';
      default:
        return message || `An error occurred (${status}). Please try again.`;
    }
  }

  // Default error message
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Format validation errors from API response
 * @param {object} errors - Validation errors object
 * @returns {string} - Formatted error message
 */
export const formatValidationErrors = (errors) => {
  if (typeof errors === 'string') {
    return errors;
  }

  if (Array.isArray(errors)) {
    return errors.join(', ');
  }

  if (typeof errors === 'object') {
    const errorMessages = Object.keys(errors).map((key) => {
      const fieldErrors = Array.isArray(errors[key]) ? errors[key] : [errors[key]];
      return `${key}: ${fieldErrors.join(', ')}`;
    });
    return errorMessages.join('; ');
  }

  return 'Validation error. Please check your input.';
};
