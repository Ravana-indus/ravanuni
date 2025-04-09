const fetch = require('node-fetch');

// Get API credentials from environment variables
const API_KEY = process.env.API_KEY || '0d596da8ae9f32d';
const API_SECRET = process.env.API_SECRET || 'ce5ef45704aab11';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portal.riftuni.com/api';

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
    const apiUrl = `${API_BASE_URL}/resource/Coupon%20Code?filters=[[%22coupon_code%22,%22=%22,%22${encodeURIComponent(couponCode)}%22]]`;
    
    console.log(`Calling API URL: ${apiUrl}`);

    // Make the request to the Frappe API
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${API_KEY}:${API_SECRET}`,
        'Accept': 'application/json'
      }
    });

    const responseText = await response.text();
    console.log(`API response status: ${response.status}`);
    console.log(`API response body: ${responseText.substring(0, 200)}...`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${responseText}`);
    }

    // Parse the JSON response (we already consumed the body with response.text())
    const data = JSON.parse(responseText);
    
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
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Error verifying coupon code',
        message: error.message,
        stack: error.stack
      })
    };
  }
}; 