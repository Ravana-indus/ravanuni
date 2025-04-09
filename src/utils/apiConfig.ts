/**
 * API Configuration for Ravana Institute of Future
 */

/**
 * Base URL for Frappe API
 */
// Check if we're in a browser environment and handle accordingly
const isBrowser = typeof window !== 'undefined';

// Safe way to access window variables with TypeScript
const getWindowVar = (name: string, defaultValue: string): string => {
  if (!isBrowser) return defaultValue;
  return (window as any)[name] || defaultValue;
};

// Determine if we're in development or production
const isDevelopment = isBrowser && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Use environment variables safely with fallbacks
// In production, use our proxy endpoint to avoid CORS issues
export const API_BASE_URL = isBrowser 
  ? isDevelopment 
    ? getWindowVar('FRAPPE_API_URL', 'https://portal.riftuni.com/api')
    : getWindowVar('FRAPPE_API_URL', '/api/proxy') // Use proxy in production
  : (process.env.NEXT_PUBLIC_FRAPPE_API_URL || 'https://portal.riftuni.com/api');

/**
 * API Key for Frappe API
 */
export const API_KEY = isBrowser
  ? getWindowVar('FRAPPE_API_KEY', '')
  : (process.env.FRAPPE_API_KEY || '');

/**
 * API Secret for Frappe API
 */
export const API_SECRET = isBrowser
  ? getWindowVar('FRAPPE_API_SECRET', '')
  : (process.env.FRAPPE_API_SECRET || '');

/**
 * Get headers for Frappe API with authentication
 */
export const getApiHeaders = () => {
  // Make sure we have valid API credentials
  if (!API_KEY || !API_SECRET) {
    console.warn('API credentials not available. Some API calls may fail.');
  }
  
  return {
    'Content-Type': 'application/json',
    'Authorization': API_KEY && API_SECRET ? `token ${API_KEY}:${API_SECRET}` : ''
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