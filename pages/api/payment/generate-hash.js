import crypto from 'crypto';

// Get Payhere merchant secret from environment variables
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET || '';

// Check if environment variable is set
if (!PAYHERE_MERCHANT_SECRET) {
  console.error('WARNING: PAYHERE_MERCHANT_SECRET environment variable is not set. Hash generation will not work correctly.');
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get data from the request body
    const { merchant_id, order_id, amount, currency } = req.body;

    // Validate required fields
    if (!merchant_id || !order_id || amount === undefined || !currency) {
      console.error('Missing required fields for hash generation:', { merchant_id, order_id, amount, currency });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Ensure amount is properly formatted as a string with no trailing zeros
    const formattedAmount = parseFloat(amount).toString();

    console.log('Generating hash for:', { merchant_id, order_id, amount: formattedAmount, currency });

    // First create MD5 hash of the merchant_secret and convert to uppercase
    const hashedSecret = crypto.createHash('md5').update(PAYHERE_MERCHANT_SECRET).digest('hex').toUpperCase();
    
    // Now create the string to hash according to PayHere docs
    const stringToHash = `${merchant_id}${order_id}${formattedAmount}${currency}${hashedSecret}`;
    
    // Generate final MD5 hash and convert to uppercase
    const hash = crypto.createHash('md5').update(stringToHash).digest('hex').toUpperCase();
    
    console.log('Hash generated successfully');

    // Return the hash (not logging the hash for security)
    return res.status(200).json({ message: hash });
  } catch (error) {
    console.error('Error generating hash:', error);
    return res.status(500).json({ message: 'Error generating hash' });
  }
} 