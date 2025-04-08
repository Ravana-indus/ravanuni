import crypto from 'crypto';

// Get Payhere merchant secret from environment variables
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET || '';
const PAYHERE_MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID || '';

// Check for development environment safely
const isDevelopment = process.env.NODE_ENV === 'development';

// Check if environment variables are set
if (!PAYHERE_MERCHANT_SECRET || !PAYHERE_MERCHANT_ID) {
  console.error('WARNING: PAYHERE_MERCHANT_SECRET or PAYHERE_MERCHANT_ID not set. API will not function correctly.');
}

// Generate PayHere hash securely on the server
const generatePayhereHash = (orderId, amount, currency) => {
  // Ensure amount is properly formatted as a string with no trailing zeros
  const formattedAmount = parseFloat(amount.toString()).toString();
  
  // Create the string to hash according to PayHere docs
  const stringToHash = `${PAYHERE_MERCHANT_ID}${orderId}${formattedAmount}${currency}${PAYHERE_MERCHANT_SECRET}`;
  
  // Generate MD5 hash
  return crypto.createHash('md5').update(stringToHash).digest('hex');
};

export default async function handler(req, res) {
  // Ensure this endpoint is only accessible in development
  if (!isDevelopment) {
    return res.status(403).json({ message: 'This endpoint is only available in development environment' });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Testing payment with parameters:', req.body);

    // Extract test parameters from request body, or use defaults
    const lead_id = req.body.lead_id || 'TEST-LEAD-123';
    const customer_name = req.body.customer_name || 'John Doe';
    const amount = parseFloat(req.body.amount) || 100;
    const currency = req.body.currency || 'LKR';
    // Create a unique payment reference with timestamp
    const payment_reference = req.body.payment_reference || `TEST-PAYMENT-${Date.now()}`;
    const item_code = req.body.item_code || 'COURSE-001';
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

    // In a real implementation, we would create sales orders and payment entries here
    // For this test endpoint, we'll simulate the process
    
    // Return success response with test data
    return res.status(200).json({
      message: 'Test payment configured successfully',
      order_id,
      hash_generated: true,
      merchant_id: PAYHERE_MERCHANT_ID,
      customer: customer_name,
      amount,
      currency,
      // Don't include the actual hash in the response for security
    });
  } catch (error) {
    console.error('Error in test payment endpoint:', error);
    return res.status(500).json({
      message: 'Error processing test payment',
      error: error.message || 'Unknown error'
    });
  }
} 