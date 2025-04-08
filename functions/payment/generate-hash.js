import crypto from 'crypto';

// Get Payhere merchant secret from environment variables
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;

export async function onRequest(context) {
  // Only allow POST requests
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Get data from the request body
    const body = await context.request.json();
    const { merchant_id, order_id, amount, currency } = body;

    // Validate required fields
    if (!merchant_id || !order_id || amount === undefined || !currency) {
      console.error('Missing required fields for hash generation:', { merchant_id, order_id, amount, currency });
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Ensure amount is properly formatted as a string with no trailing zeros
    const formattedAmount = parseFloat(amount).toString();

    console.log('Generating hash for:', { merchant_id, order_id, amount: formattedAmount, currency });

    // Create the string to hash according to PayHere docs
    const stringToHash = `${merchant_id}${order_id}${formattedAmount}${currency}${PAYHERE_MERCHANT_SECRET}`;
    
    // Generate MD5 hash
    const hash = crypto.createHash('md5').update(stringToHash).digest('hex');
    
    console.log('Hash generated successfully');

    // Set cache headers to prevent caching of hash values
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    // Return the hash
    return new Response(JSON.stringify({ message: hash }), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Error generating hash:', error);
    return new Response(JSON.stringify({ message: 'Error generating hash' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 