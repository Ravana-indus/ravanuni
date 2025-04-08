// Simple Express server to handle API requests during development
import express from 'express';
import crypto from 'crypto';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8080;

// Use environment variables without exposing secrets in code
// Ensure these are set in your development environment
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET || '';
const PAYHERE_MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID || '';

// Verify that environment variables are set
if (!PAYHERE_MERCHANT_SECRET || !PAYHERE_MERCHANT_ID) {
  console.error('WARNING: Missing Payhere environment variables. Set PAYHERE_MERCHANT_SECRET and PAYHERE_MERCHANT_ID.');
}

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Set environment to development
process.env.NODE_ENV = 'development';

// Generate hash endpoint
app.post('/api/payment/generate-hash', (req, res) => {
  try {
    console.log('Hash generation request received:', req.body);
    
    // Extract data from request body
    const { merchant_id, order_id, amount, currency } = req.body;
    
    // Validate required fields
    if (!merchant_id || !order_id || amount === undefined || !currency) {
      console.error('Missing required fields for hash generation');
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Ensure amount is properly formatted as a string with no trailing zeros
    const formattedAmount = parseFloat(amount).toString();
    
    console.log('Generating hash for:', { 
      merchant_id, 
      order_id, 
      amount: formattedAmount, 
      currency 
    });
    
    // Create the string to hash according to PayHere docs
    const stringToHash = `${merchant_id}${order_id}${formattedAmount}${currency}${PAYHERE_MERCHANT_SECRET}`;
    
    // Generate MD5 hash
    const hash = crypto.createHash('md5').update(stringToHash).digest('hex');
    
    console.log('Hash generated successfully');
    
    // Return the hash
    return res.status(200).json({ message: hash });
  } catch (error) {
    console.error('Error generating hash:', error);
    return res.status(500).json({ message: 'Error generating hash' });
  }
});

// Payment notification endpoint
app.post('/api/payment/notify', (req, res) => {
  console.log('Payment notification received:', req.body);
  
  // Here we would process the payment notification
  // For development, we'll just log the data and return success
  
  return res.status(200).json({
    message: 'Payment notification received successfully',
    status: 'success'
  });
});

// Test payment endpoint
app.post('/api/payment/test', (req, res) => {
  // This endpoint is for development testing only
  console.log('Test payment request received:', req.body);
  
  // Generate a unique order ID
  const order_id = `TEST-ORDER-${Date.now()}`;
  
  // Get or set default values
  const amount = parseFloat(req.body.amount || 100).toString();
  const currency = req.body.currency || 'LKR';
  
  // Generate hash for this test payment
  const stringToHash = `${PAYHERE_MERCHANT_ID}${order_id}${amount}${currency}${PAYHERE_MERCHANT_SECRET}`;
  const hash = crypto.createHash('md5').update(stringToHash).digest('hex');
  
  return res.status(200).json({
    message: 'Test payment configured successfully',
    order_id,
    hash_generated: true,
    merchant_id: PAYHERE_MERCHANT_ID,
    amount,
    currency
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /api/payment/generate-hash');
  console.log('  POST /api/payment/notify');
  console.log('  POST /api/payment/test');
}); 