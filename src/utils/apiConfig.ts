/**
 * API Configuration for Ravana Institute of Future
 */

// Base URL for the API
export const API_BASE_URL = 'https://portal.riftuni.com/api';

// API credentials - in a real application, these should be environment variables
export const API_KEY = 'a9612959b012965';
export const API_SECRET = 'a6662956880fba6';

/**
 * Get default headers for API requests
 * @returns Object containing the default headers
 */
export const getApiHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `token ${API_KEY}:${API_SECRET}`,
    'Accept': 'application/json', 
  };
};

/**
 * Error handling helper for API requests
 * @param error The error object
 * @returns Standardized error response
 */
export const handleApiError = (error: any) => {
  console.error('API Error:', error);
  
  return {
    success: false,
    error: error.message || 'An unknown error occurred',
    statusCode: error.statusCode || 500,
  };
};

/**
 * API Response interface
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export default {
  API_BASE_URL,
  API_KEY,
  API_SECRET,
  getApiHeaders,
  handleApiError,
}; 