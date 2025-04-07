import crypto from 'crypto';

// Payhere merchant secret - this should be properly secured in env variables
const PAYHERE_MERCHANT_SECRET = 'NjY5MTg5ODgyMjQzNjkyMzMyMTExNDA0MjYyMDM0NzA3NDg2Nzc=';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get data from the request body
    const { merchant_id, order_id, amount, currency } = req.body;

    // Validate required fields
    if (!merchant_id || !order_id || !amount || !currency) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Generating hash for:', { merchant_id, order_id, amount, currency });

    // Create the string to hash
    const stringToHash = `${merchant_id}${order_id}${amount}${currency}${PAYHERE_MERCHANT_SECRET}`;
    
    // Generate MD5 hash
    const hash = crypto.createHash('md5').update(stringToHash).digest('hex');
    
    console.log('Hash generated:', hash);

    // Return the hash
    return res.status(200).json({ message: hash });
  } catch (error) {
    console.error('Error generating hash:', error);
    return res.status(500).json({ message: 'Error generating hash' });
  }
} 