import crypto from 'crypto';

// Get Payhere merchant secret from environment variables
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET;
const PAYHERE_MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID;

// Generate PayHere hash securely on the server
const generatePayhereHash = (orderId, amount, currency) => {
  // Ensure amount is properly formatted as a string with no trailing zeros
  const formattedAmount = parseFloat(amount.toString()).toString();
  
  // Create the string to hash according to PayHere docs
  const stringToHash = `${PAYHERE_MERCHANT_ID}${orderId}${formattedAmount}${currency}${PAYHERE_MERCHANT_SECRET}`;
  
  // Generate MD5 hash
  return crypto.createHash('md5').update(stringToHash).digest('hex');
};

// Helper function to clean customer name (adapted from customerUtils)
const cleanCustomerName = (customerName) => {
  // If the name is undefined or null, return a default name
  if (!customerName) return 'Customer';
  
  // Remove any numbers or special characters
  const cleaned = customerName.replace(/[^a-zA-Z\s]/g, '').trim();
  
  // Ensure there's at least something left after cleaning
  return cleaned || 'Customer';
};

export async function onRequest(context) {
  // Only allow POST requests
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await context.request.json();
    console.log('Testing payment and sales order creation with parameters:', body);

    // Extract test parameters from request body, or use defaults
    const lead_id = body.lead_id || 'TEST-LEAD-123';
    const customer_name_raw = body.customer_name || 'John Doe';
    // Clean the customer name to prevent any issues with numbers or special characters
    const customer_name = cleanCustomerName(customer_name_raw);
    
    console.log('Original customer name:', customer_name_raw);
    console.log('Cleaned customer name:', customer_name);
    
    const amount = parseFloat(body.amount) || 100;
    const currency = body.currency || 'LKR';
    // Create a unique payment reference with timestamp
    const payment_reference = body.payment_reference || `TEST-PAYMENT-${Date.now()}`;
    const item_code = body.item_code || 'COURSE-001';
    // Create a unique order ID with timestamp
    const order_id = `TEST-ORDER-${Date.now()}`;
    
    console.log('Test parameters:', {
      lead_id,
      customer_name,
      amount,
      currency,
      payment_reference,
      item_code,
      order_id
    });
    
    // Generate hash for this test payment
    const hash = generatePayhereHash(order_id, amount, currency);
    console.log('Generated hash for test payment (hash value not logged for security)');

    // In Cloudflare Function, we would typically make fetch calls to external APIs
    // For this test endpoint, we'll just return a mock successful response
    return new Response(JSON.stringify({
      message: 'Test payment simulation completed successfully',
      order_id,
      customer: customer_name,
      hash_generated: true // Don't include the actual hash in the response
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in test payment endpoint:', error);
    return new Response(JSON.stringify({
      message: 'Error processing test payment',
      error: error.message || 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 