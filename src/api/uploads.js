import { apiClient } from '../utils/apiClient';

/**
 * File Upload API Service
 * Handles file uploads (images, documents, etc.)
 */

/**
 * Upload property photos
 * @param {string} propertyId - Property ID
 * @param {File[]} files - Array of File objects
 * @param {object} options - Additional options (onProgress callback, etc.)
 * @returns {Promise<object>} - Upload response with photo URLs
 */
export const uploadPropertyPhotosAPI = async (propertyId, files, options = {}) => {
  try {
    const formData = new FormData();

    // Append each file
    files.forEach((file) => {
      formData.append('photos', file);
    });

    formData.append('propertyId', propertyId);

    // Add any additional form data
    if (options.additionalData) {
      Object.keys(options.additionalData).forEach((key) => {
        formData.append(key, options.additionalData[key]);
      });
    }

    const response = await apiClient.postFormData(
      `/uploads/properties/${propertyId}/photos`,
      formData
    );

    return response.photos || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to upload photos.');
  }
};

/**
 * Delete property photo
 * @param {string} propertyId - Property ID
 * @param {string} photoId - Photo ID
 * @returns {Promise<void>}
 */
export const deletePropertyPhotoAPI = async (propertyId, photoId) => {
  try {
    await apiClient.delete(`/uploads/properties/${propertyId}/photos/${photoId}`);
  } catch (error) {
    throw new Error(error.message || 'Failed to delete photo.');
  }
};

/**
 * Get property photos
 * @param {string} propertyId - Property ID
 * @returns {Promise<array>} - Array of photo objects
 */
export const getPropertyPhotosAPI = async (propertyId) => {
  try {
    const response = await apiClient.get(`/uploads/properties/${propertyId}/photos`);
    return response.photos || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch photos.');
  }
};

/**
 * Upload single file (generic)
 * @param {File} file - File to upload
 * @param {string} endpoint - Upload endpoint
 * @param {object} additionalData - Additional form data
 * @returns {Promise<object>} - Upload response
 */
export const uploadFileAPI = async (file, endpoint, additionalData = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    Object.keys(additionalData).forEach((key) => {
      formData.append(key, additionalData[key]);
    });

    const response = await apiClient.postFormData(endpoint, formData);
    return response.file || response.data || response;
  } catch (error) {
    throw new Error(error.message || 'Failed to upload file.');
  }
};
