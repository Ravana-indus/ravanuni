import crypto from 'crypto';

// Get Payhere merchant secret from environment variables with fallback for development
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET || 'NjY5MTg5ODgyMjQzNjkyMzMyMTExNDA0MjYyMDM0NzA3NDg2Nzc=';

// Verify the PayHere hash to prevent tampering
const verifyPayhereHash = (merchantId, orderId, amount, currency, hash) => {
  // Ensure amount is properly formatted as a string with no trailing zeros
  const formattedAmount = parseFloat(amount).toString();
  
  // Create the string to hash according to PayHere docs
  const stringToHash = `${merchantId}${orderId}${formattedAmount}${currency}${PAYHERE_MERCHANT_SECRET}`;
  
  // Generate MD5 hash
  const calculatedHash = crypto.createHash('md5').update(stringToHash).digest('hex');
  
  // Compare the calculated hash with the received hash
  return calculatedHash.toLowerCase() === hash.toLowerCase();
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Payment notification received:', req.body);

  try {
    // Extract data from request
    const {
      payment_id,
      merchant_id,
      order_id,
      amount,
      currency,
      status_code,
      status_message,
      method,
      card_holder_name,
      card_no,
      card_expiry,
      customer_token,
      custom_1, // lead_id
      custom_2,  // customer_name
      hash // PayHere hash
    } = req.body;

    // Verify the hash if provided
    if (hash) {
      const isValidHash = verifyPayhereHash(merchant_id, order_id, amount, currency, hash);
      if (!isValidHash) {
        console.error('Invalid hash received, potential tampering detected');
        return res.status(400).json({ message: 'Invalid hash, payment verification failed' });
      }
      console.log('Payment hash verified successfully');
    } else {
      console.warn('No hash provided in the payment notification');
    }

    // Extract essential data
    const leadId = custom_1 || '';
    const customerName = custom_2 || 'Individual';
    const paymentAmount = parseFloat(amount) || 0;
    const paymentReference = payment_id || `PAYHERE-${Date.now()}`;
    
    console.log('Extracted payment data:', {
      leadId,
      customerName,
      paymentAmount,
      currency,
      paymentReference
    });

    // Check if payment is successful (status_code == 2)
    if (status_code == 2) {
      // In the Next.js API route, we'd call our backend services to create the sales order
      // and payment entry, but for the sake of this example, we'll just log it
      console.log('Payment successful. Would create sales order and payment entry here.');
      
      // For now, just return success
      return res.status(200).json({
        message: 'Payment notification received successfully',
        status: 'success',
        payment_id: payment_id
      });
    } else {
      console.log('Payment notification received but status code is not success:', status_code);
      return res.status(200).json({
        message: 'Payment notification received but not processed (status not success)',
        status_code,
        status_message
      });
    }
  } catch (error) {
    console.error('Error processing payment notification:', error);
    return res.status(500).json({
      message: 'Error processing payment notification',
      error: error.message || 'Unknown error'
    });
  }
} 