const fetch = require('node-fetch');

// Get API credentials from environment variables
const API_KEY = process.env.FRAPPE_API_KEY || 'a9612959b012965';
const API_SECRET = process.env.FRAPPE_API_SECRET || 'a6662956880fba6';
const API_BASE_URL = process.env.FRAPPE_API_URL || 'https://portal.riftuni.com/api';

exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': 'https://riftuni.com',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // For local development, allow localhost
  if (event.headers.origin && event.headers.origin.includes('localhost')) {
    headers['Access-Control-Allow-Origin'] = event.headers.origin;
  }

  // Handle OPTIONS request (preflight)
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
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

    console.log(`Processing coupon code request for: ${couponCode}`);

    if (!couponCode) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'Coupon code is required' })
      };
    }

    // Construct the API URL to verify the coupon code
    // Use a more reliable filter format that works with Frappe API
    const apiUrl = `${API_BASE_URL}/resource/Coupon%20Code?filters=[["coupon_code","=","${encodeURIComponent(couponCode)}"]]`;
    
    console.log(`Calling API URL: ${apiUrl}`);

    // Make the request to the Frappe API
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${API_KEY}:${API_SECRET}`,
        'Accept': 'application/json'
      }
    });

    // Log the response status for debugging
    console.log(`API response status: ${response.status}`);
    
    // Get the response text first
    const responseText = await response.text();
    console.log(`API response body: ${responseText.substring(0, 200)}...`);

    // Check if the response is OK
    if (!response.ok) {
      console.error(`API error: ${response.status} ${responseText}`);
      return {
        statusCode: 200, // Return 200 to avoid CORS issues, but indicate failure in the response
        headers,
        body: JSON.stringify({ 
          success: false, 
          isValid: false,
          error: `API error: ${response.status}`,
          message: 'Coupon code verification failed'
        })
      };
    }

    // Parse the JSON response
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing API response:', parseError);
      return {
        statusCode: 200, // Return 200 to avoid CORS issues
        headers,
        body: JSON.stringify({ 
          success: false, 
          isValid: false,
          error: 'Invalid API response format',
          message: 'Coupon code verification failed'
        })
      };
    }
    
    // Check if the data structure is as expected
    if (!data || typeof data !== 'object') {
      console.error('Unexpected API response structure:', data);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: false, 
          isValid: false,
          error: 'Unexpected API response structure',
          message: 'Coupon code verification failed'
        })
      };
    }
    
    // Return whether the coupon code is valid
    const isValid = data.data && Array.isArray(data.data) && data.data.length > 0;
    
    console.log(`Coupon validity result: ${isValid}`);
    
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
    
    // Return 200 status to avoid CORS issues, but indicate failure in the response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: false, 
        isValid: false,
        error: 'Error verifying coupon code',
        message: error.message || 'Unknown error occurred'
      })
    };
  }
}; 