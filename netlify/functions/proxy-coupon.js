const fetch = require('node-fetch');

// Get API credentials from environment variables
const API_KEY = process.env.FRAPPE_API_KEY || 'a9612959b012965';
const API_SECRET = process.env.FRAPPE_API_SECRET || 'a6662956880fba6';
const API_BASE_URL = process.env.FRAPPE_API_URL || 'https://portal.riftuni.com/api';

exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*', // or set to your specific domain like https://riftuni.com
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  try {
    // Get the coupon code from query parameters
    const params = event.queryStringParameters;
    const couponCode = params?.code;

    if (!couponCode) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'Coupon code is required' })
      };
    }

    // Construct the API URL to verify the coupon code
    const apiUrl = `${API_BASE_URL}/resource/Coupon Code?filters=[["coupon_code","=","${couponCode}"]]`;

    // Make the request to the Frappe API
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${API_KEY}:${API_SECRET}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    
    // Return whether the coupon code is valid
    const isValid = data.data && Array.isArray(data.data) && data.data.length > 0;
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        isValid: isValid,
        message: isValid ? 'Coupon code is valid' : 'Coupon code is invalid or expired'
      })
    };
  } catch (error) {
    console.error('Proxy error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Error verifying coupon code',
        message: error.message
      })
    };
  }
}; 