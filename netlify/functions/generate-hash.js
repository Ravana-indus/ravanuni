const crypto = require('crypto');

// Get Payhere merchant secret from environment variables
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET || '';

// Verify environment variable is set
if (!PAYHERE_MERCHANT_SECRET) {
  console.error('WARNING: PAYHERE_MERCHANT_SECRET environment variable is not set.');
}

exports.handler = async function(event, context) {
  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    'Pragma': 'no-cache',
    'Expires': '0'
  };

  // Handle OPTIONS requests for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body);
    const { merchant_id, order_id, amount, currency } = body;
    
    // Validate required fields
    if (!merchant_id || !order_id || amount === undefined || !currency) {
      console.error('Missing required fields for hash generation');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }
    
    // Ensure amount is properly formatted
    const formattedAmount = parseFloat(amount).toString();
    
    console.log('Generating hash for:', { 
      merchant_id, 
      order_id, 
      amount: formattedAmount, 
      currency 
    });
    
    // First create MD5 hash of the merchant_secret and convert to uppercase
    const hashedSecret = crypto.createHash('md5').update(PAYHERE_MERCHANT_SECRET).digest('hex').toUpperCase();
    
    // Create the string to hash
    const stringToHash = `${merchant_id}${order_id}${formattedAmount}${currency}${hashedSecret}`;
    
    // Generate final MD5 hash and convert to uppercase
    const hash = crypto.createHash('md5').update(stringToHash).digest('hex').toUpperCase();
    
    console.log('Hash generated successfully');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: hash })
    };
  } catch (error) {
    console.error('Error generating hash:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Error generating hash' })
    };
  }
}; 