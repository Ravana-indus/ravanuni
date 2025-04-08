// Simple Express server to handle API requests during development
const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');
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

// Configure CORS options
const corsOptions = {
  origin: '*', // Allow requests from any origin in development
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: [
    'X-CSRF-Token', 
    'X-Requested-With', 
    'Accept', 
    'Accept-Version', 
    'Content-Length', 
    'Content-MD5', 
    'Content-Type', 
    'Date', 
    'X-Api-Version'
  ],
  credentials: true
};

// Enable CORS for all routes with the configured options
app.use(cors(corsOptions));

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
    
    // First create MD5 hash of the merchant_secret and convert to uppercase
    const hashedSecret = crypto.createHash('md5').update(PAYHERE_MERCHANT_SECRET).digest('hex').toUpperCase();
    
    // Now create the string to hash according to PayHere docs
    const stringToHash = `${merchant_id}${order_id}${formattedAmount}${currency}${hashedSecret}`;
    
    // Generate final MD5 hash and convert to uppercase
    const hash = crypto.createHash('md5').update(stringToHash).digest('hex').toUpperCase();
    
    console.log('Hash generated successfully');
    
    // Set no-cache headers to prevent caching of hash values
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
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
  
  // Set no-cache headers for security
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
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
  // First create MD5 hash of the merchant_secret and convert to uppercase
  const hashedSecret = crypto.createHash('md5').update(PAYHERE_MERCHANT_SECRET).digest('hex').toUpperCase();
  
  // Now create the string to hash
  const stringToHash = `${PAYHERE_MERCHANT_ID}${order_id}${amount}${currency}${hashedSecret}`;
  
  // Generate final MD5 hash and convert to uppercase
  const hash = crypto.createHash('md5').update(stringToHash).digest('hex').toUpperCase();
  
  // Set no-cache headers for security
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  return res.status(200).json({
    message: 'Test payment configured successfully',
    order_id,
    hash_generated: true,
    merchant_id: PAYHERE_MERCHANT_ID,
    amount,
    currency
  });
});

// OPTIONS handler for preflight requests
app.options('*', cors(corsOptions));

// Start the server
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /api/payment/generate-hash');
  console.log('  POST /api/payment/notify');
  console.log('  POST /api/payment/test');
}); 