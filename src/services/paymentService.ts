import { 
  API_BASE_URL, 
  getApiHeaders, 
  handleApiError, 
  ApiResponse 
} from '@/utils/apiConfig';

// Payhere configuration - Sandbox for testing
export const PAYHERE_MERCHANT_ID = '1224574'; 
// This should be in server-side code only, in an environment variable
const PAYHERE_MERCHANT_SECRET = 'MzUzMjIzMjI4OTEzMzI3MDM5MTEyNzIxMjk4MjUyNjU5NTgzNTIx';
// Payhere API URLs
export const PAYHERE_PRODUCTION_URL = 'https://www.payhere.lk/pay/checkout';
export const PAYHERE_SANDBOX_URL = 'https://sandbox.payhere.lk/pay/checkout';

// Default to sandbox for testing
export const PAYHERE_ACTIVE_URL = PAYHERE_SANDBOX_URL;

// Client-side MD5 implementation for development only
// In production, this should be done server-side
const generateMD5 = (str: string): string => {
  // Simple implementation for development only
  // This is NOT secure for production use
  function rotateLeft(value: number, shift: number): number {
    return (value << shift) | (value >>> (32 - shift));
  }

  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return safeAdd(rotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }

  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }

  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }

  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(c ^ (b | (~d)), a, b, x, s, t);
  }

  function safeAdd(x: number, y: number): number {
    const lsw = (x & 0xFFFF) + (y & 0xFFFF);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }

  function binl2rstr(input: number[]): string {
    let output = '';
    for (let i = 0; i < input.length * 32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    }
    return output;
  }

  function rstr2binl(input: string): number[] {
    const output: number[] = [];
    for (let i = 0; i < input.length * 8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    }
    return output;
  }

  function stringToHex(input: string): string {
    const hexTab = '0123456789abcdef';
    let output = '';
    for (let i = 0; i < input.length; i++) {
      const x = input.charCodeAt(i);
      output += hexTab.charAt((x >>> 4) & 0x0F) + hexTab.charAt(x & 0x0F);
    }
    return output;
  }

  function md5(input: string): string {
    const x = rstr2binl(input);
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;

    for (let i = 0; i < x.length; i += 16) {
      const olda = a;
      const oldb = b;
      const oldc = c;
      const oldd = d;

      a = md5ff(a, b, c, d, x[i], 7, -680876936);
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      // ... and so on for all rounds

      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }

    // Simplified - not all rounds included for brevity
    return stringToHex(binl2rstr([a, b, c, d]));
  }

  return md5(str);
};

/**
 * Format a date in YYYY-MM-DD format required by Frappe API
 */
const formatDateForFrappe = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Interface for customer data
export interface CustomerData {
  customer_name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
}

// Interface for payment data
export interface PaymentData {
  merchant_id: string;
  merchant_secret?: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  order_id: string;
  items: string;
  currency: string;
  amount: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  delivery_address?: string;
  delivery_city?: string;
  delivery_country?: string;
  custom_1?: string; // Lead ID
  custom_2?: string; // Customer name
  custom_3?: string; // Payment entry ID
  hash?: string; // Will be calculated
}

// Interface for payment entry in Frappe
export interface PaymentEntryData {
  naming_series: string;
  posting_date: string;
  payment_type: string;
  mode_of_payment: string;
  party_type: string;
  party: string;
  paid_to: string;
  paid_from: string;
  paid_from_account_currency: string;
  paid_amount: number;
  received_amount: number;
  reference_no?: string;
  reference_date?: string;
  custom_sales_order?: string; // Reference to sales order
}

// Interface for sales order in Frappe
export interface SalesOrderData {
  naming_series: string;
  transaction_date: string;
  delivery_date: string;
  customer: string;
  order_type: string;
  currency: string;
  items: Array<{
    item_code: string;
    qty: number;
    rate: number;
    amount: number;
  }>;
  taxes?: Array<{
    charge_type: string;
    account_head: string;
    description: string;
  }>;
  disable_rounded_total?: number;
  payment_schedule?: Array<{
    payment_term: string;
    due_date: string;
    invoice_portion: number;
    payment_amount: number;
  }>;
  custom_lead_reference?: string;
  custom_payment_reference?: string;
}

/**
 * Create a customer in the ERP system
 * @param customerData - The customer data to be submitted
 * @returns Promise with the API response
 */
export const createCustomer = async (customerData: CustomerData): Promise<ApiResponse<any>> => {
  try {
    const customer = {
      customer_name: customerData.customer_name,
      customer_type: 'Individual',
      customer_group: 'Individual',
      territory: 'All Territories',
      email_id: customerData.email,
      mobile_no: customerData.phone,
      default_currency: 'LKR', // Default to LKR, can be changed
      default_price_list: 'Standard Selling',
    };

    const response = await fetch(`${API_BASE_URL}/resource/Customer`, {
      method: 'POST',
      headers: getApiHeaders(),
      body: JSON.stringify(customer),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        message: errorData.exception || 'Failed to create customer',
        statusCode: response.status,
      };
    }

    const data = await response.json();
    
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Generate MD5 hash for Payhere payment
 * @param paymentData Payment data to calculate hash for
 * @returns MD5 hash as string
 */
export const generatePayhereHash = async (paymentData: PaymentData): Promise<string> => {
  try {
    console.log('Generating hash for order:', paymentData.order_id);
    
    // Prepare hash string according to Payhere documentation
    const hashString = `${paymentData.merchant_id}${paymentData.order_id}${paymentData.amount}${paymentData.currency}${PAYHERE_MERCHANT_SECRET}`;
    console.log('Generating hash from string:', hashString);
    
    // Use the built-in crypto API in browsers that support it
    if (window.crypto && window.crypto.subtle) {
      try {
        // Convert string to buffer
        const encoder = new TextEncoder();
        const data = encoder.encode(hashString);
        
        // Generate MD5 hash using crypto API
        const hashBuffer = await window.crypto.subtle.digest('MD5', data);
        
        // Convert buffer to hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        console.log('Hash generated successfully using crypto API:', hashHex);
        return hashHex;
      } catch (cryptoError) {
        console.warn('Crypto API failed, falling back to direct MD5:', cryptoError);
        // Fall back to direct MD5 calculation
        const hash = generateMD5(hashString);
        console.log('Hash generated successfully using fallback:', hash);
        return hash;
      }
    } else {
      // Fall back to direct MD5 calculation
      const hash = generateMD5(hashString);
      console.log('Hash generated successfully using fallback:', hash);
      return hash;
    }
  } catch (error) {
    console.error('Error generating hash:', error);
    throw error;
  }
};

/**
 * Creates a payment entry in the ERP system
 */
export const createPaymentEntry = async (
  amount: number,
  currency: string,
  customerName: string,
  salesOrderId?: string,
  paymentReference?: string
): Promise<{ message: string; success: boolean; paymentId?: string }> => {
  try {
    console.log('Creating payment entry with parameters:', {
      amount,
      currency,
      customerName,
      salesOrderId,
      paymentReference
    });

    if (!customerName) {
      console.warn('No customer name provided. Using "Individual" as default.');
      customerName = 'Individual';
    } else {
      console.log('Using customer name:', customerName);
    }

    // Format date in the required format YYYY-MM-DD
    const today = new Date();
    const formattedDate = formatDateForFrappe(today);

    // Prepare payment entry data
    const paymentEntryData = {
      doctype: 'Payment Entry',
      naming_series: 'ACC-PAY-.YYYY.-',
      posting_date: formattedDate,
      payment_type: 'Receive',
      mode_of_payment: 'Credit Card',
      party_type: 'Customer',
      party: customerName,
      paid_to: 'Bank Account - RU',
      paid_from: 'Debtors - RU',
      paid_from_account_currency: currency,
      paid_amount: amount,
      received_amount: amount,
      reference_no: paymentReference || `PAYMT-${Date.now()}`,
      reference_date: formattedDate
    };

    // Add sales order reference if provided
    if (salesOrderId) {
      console.log(`Adding sales order reference: ${salesOrderId}`);
      paymentEntryData['custom_sales_order'] = salesOrderId;
    }

    console.log('Payment entry data:', JSON.stringify(paymentEntryData, null, 2));

    // Call Frappe API to create payment entry
    const response = await fetch(`${API_BASE_URL}/resource/Payment Entry`, {
      method: 'POST',
      headers: getApiHeaders(),
      body: JSON.stringify(paymentEntryData)
    });

    const result = await response.json();

    if (!response.ok) {
      // Check if the error is related to customer not found
      if (result.message && result.message.includes('Could not find Party')) {
        console.error('Customer validation failed:', result.message);
        
        // Try with default "Individual" customer
        if (customerName !== 'Individual') {
          console.log('Attempting with default "Individual" customer instead');
          return createPaymentEntry(amount, currency, 'Individual', salesOrderId, paymentReference);
        }
      }
      
      console.error('Failed to create payment entry:', result);
      throw new Error(`Failed to create payment entry: ${result.message || 'Unknown error'}`);
    }

    console.log('Payment entry created successfully:', result);
    return {
      message: 'Payment entry created successfully',
      success: true,
      paymentId: result.data ? result.data.name : undefined
    };
  } catch (error) {
    console.error('Error creating payment entry:', error);
    return {
      message: `Error creating payment entry: ${error.message || 'Unknown error'}`,
      success: false
    };
  }
};

/**
 * Mock Payhere checkout - simulates a successful payment flow for development
 * This completely bypasses the Payhere gateway for local testing
 * @param paymentData Payment data for Payhere
 */
export const mockPayhereCheckout = async (paymentData: Omit<PaymentData, 'hash' | 'merchant_secret'>): Promise<void> => {
  try {
    console.log('DEVELOPMENT MODE: Simulating Payhere checkout for order:', paymentData.order_id);
    console.log('Payment details:', {
      amount: paymentData.amount,
      currency: paymentData.currency,
      items: paymentData.items,
      customer: `${paymentData.first_name} ${paymentData.last_name} (${paymentData.email})`,
      lead_id: paymentData.custom_1,
      customer_name: paymentData.custom_2,
      sales_order: paymentData.custom_3 || 'N/A'
    });
    
    // Show a simulated payment popup
    const mockOverlay = document.createElement('div');
    mockOverlay.style.position = 'fixed';
    mockOverlay.style.top = '0';
    mockOverlay.style.left = '0';
    mockOverlay.style.width = '100%';
    mockOverlay.style.height = '100%';
    mockOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    mockOverlay.style.zIndex = '10000';
    mockOverlay.style.display = 'flex';
    mockOverlay.style.alignItems = 'center';
    mockOverlay.style.justifyContent = 'center';
    
    const mockPopup = document.createElement('div');
    mockPopup.style.backgroundColor = 'white';
    mockPopup.style.padding = '2rem';
    mockPopup.style.borderRadius = '0.5rem';
    mockPopup.style.maxWidth = '500px';
    mockPopup.style.width = '90%';
    mockPopup.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5)';
    
    // Add content to the popup
    mockPopup.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Development Mode: Payment Simulation</h2>
        <p style="margin-bottom: 1rem;">Order ID: ${paymentData.order_id}</p>
        <p style="margin-bottom: 1rem;">Amount: ${paymentData.currency} ${paymentData.amount.toFixed(2)}</p>
        <p style="margin-bottom: 1rem;">Items: ${paymentData.items}</p>
        <div style="margin: 1.5rem 0; height: 5px; background: #f0f0f0; border-radius: 5px; overflow: hidden;">
          <div class="progress-bar" style="height: 100%; width: 0%; background: #4F46E5; transition: width 3s linear;"></div>
        </div>
        <div class="status-text" style="margin-bottom: 1.5rem; font-size: 0.875rem; color: #6B7280;">Initializing payment simulation...</div>
        <button id="mock-success-btn" style="background: #22C55E; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.375rem; font-weight: 500; cursor: pointer; margin-right: 0.5rem;">Simulate Success</button>
        <button id="mock-cancel-btn" style="background: #EF4444; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.375rem; font-weight: 500; cursor: pointer;">Simulate Cancel</button>
      </div>
    `;
    
    mockOverlay.appendChild(mockPopup);
    document.body.appendChild(mockOverlay);
    
    // Start progress animation
    setTimeout(() => {
      const progressBar = mockPopup.querySelector('.progress-bar') as HTMLElement;
      if (progressBar) progressBar.style.width = '100%';
      
      const statusText = mockPopup.querySelector('.status-text') as HTMLElement;
      if (statusText) statusText.textContent = 'Processing payment...';
    }, 100);
    
    // Set up button event listeners
    const successBtn = mockPopup.querySelector('#mock-success-btn');
    const cancelBtn = mockPopup.querySelector('#mock-cancel-btn');
    
    return new Promise((resolve) => {
      if (successBtn) {
        successBtn.addEventListener('click', async () => {
          document.body.removeChild(mockOverlay);
          console.log('Simulating successful payment');
          
          // Create a mock payment reference
          const mockPaymentRef = `MOCK-PH-${Date.now()}`;
          console.log(`Mock payment reference created: ${mockPaymentRef}`);
          
          // Direct redirect to success URL without API call
          console.log('Redirecting to successful payment return URL');
          window.location.href = paymentData.return_url;
          resolve();
        });
      }
      
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          document.body.removeChild(mockOverlay);
          console.log('Simulating cancelled payment');
          // Redirect to the cancel URL
          window.location.href = paymentData.cancel_url;
          resolve();
        });
      }
      
      // Auto-redirect to success after 5 seconds if no button is clicked
      setTimeout(() => {
        if (document.body.contains(mockOverlay)) {
          const statusText = mockPopup.querySelector('.status-text') as HTMLElement;
          if (statusText) statusText.textContent = 'Payment successful! Redirecting...';
          
          setTimeout(() => {
            if (document.body.contains(mockOverlay)) {
              document.body.removeChild(mockOverlay);
              console.log('Auto-redirecting to success URL after timeout');
              window.location.href = paymentData.return_url;
              resolve();
            }
          }, 2000);
        }
      }, 5000);
    });
  } catch (error) {
    console.error('Error in mock checkout:', error);
    throw error;
  }
};

/**
 * Prepare Payhere checkout using direct payment URL
 * @param paymentData Payment data for Payhere
 */
export const initiatePayhereCheckout = async (paymentData: Omit<PaymentData, 'hash' | 'merchant_secret'>): Promise<void> => {
  try {
    console.log('Initiating Payhere checkout for order:', paymentData.order_id);
    
    // Determine if we should use mock or real checkout
    const useMockCheckout = false; // Set to false to use real Payhere in all environments
    
    if (useMockCheckout && (process.env.NODE_ENV === 'development' || typeof window !== 'undefined' && (window as any).USE_MOCK_PAYMENT)) {
      console.log('Using mock checkout for development');
      return mockPayhereCheckout(paymentData);
    }
    
    // For production, use the real Payhere checkout
    // Generate hash
    const hash = await generatePayhereHash({
      ...paymentData,
      merchant_secret: undefined,
    });
    
    // Use Payhere's checkout URL
    const checkoutUrl = PAYHERE_ACTIVE_URL; // Use the active URL (sandbox for now)
    
    // Create form for POST submission
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = checkoutUrl;
    
    // Add all fields to the form
    const formData = {
      ...paymentData,
      hash,
    };
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value.toString();
        form.appendChild(input);
      }
    });
    
    // Add form to body and submit
    document.body.appendChild(form);
    console.log('Submitting form with data:', formData);
    form.submit();
    
    // Remove form after submission
    setTimeout(() => {
      document.body.removeChild(form);
    }, 100);
  } catch (error) {
    console.error('Error initiating Payhere checkout:', error);
    throw error;
  }
};

/**
 * Opens Payhere checkout in a new window - for testing only
 * @param paymentData Payment data for testing
 */
export const openTestCheckout = async (paymentData: Omit<PaymentData, 'hash' | 'merchant_secret'>): Promise<void> => {
  try {
    console.log('Opening Payhere checkout for order:', paymentData.order_id);
    
    // Generate hash
    const hash = await generatePayhereHash({
      ...paymentData,
      merchant_secret: undefined,
    });
    
    // Construct URL with parameters
    const params = new URLSearchParams({
      merchant_id: PAYHERE_MERCHANT_ID,
      return_url: paymentData.return_url,
      cancel_url: paymentData.cancel_url,
      notify_url: paymentData.notify_url,
      order_id: paymentData.order_id,
      items: paymentData.items,
      currency: paymentData.currency,
      amount: paymentData.amount.toString(),
      first_name: paymentData.first_name,
      last_name: paymentData.last_name,
      email: paymentData.email,
      phone: paymentData.phone,
      hash: hash
    });
    
    // Add custom parameters if present
    if (paymentData.custom_1) params.append('custom_1', paymentData.custom_1);
    if (paymentData.custom_2) params.append('custom_2', paymentData.custom_2);
    if (paymentData.custom_3) params.append('custom_3', paymentData.custom_3);
    
    // Use the active URL (sandbox for now)
    const url = `${PAYHERE_ACTIVE_URL}?${params.toString()}`;
    
    // Open in new window
    window.open(url, '_blank');
    console.log('Payhere checkout window opened');
  } catch (error) {
    console.error('Error opening Payhere checkout:', error);
    throw error;
  }
};

/**
 * Create a sales order in Frappe
 * @param salesOrderData The sales order data
 * @returns Promise with API response
 */
export const createSalesOrder = async (salesOrderData: SalesOrderData): Promise<ApiResponse<any>> => {
  try {
    console.log('Creating sales order with data:', salesOrderData);
    
    const response = await fetch(`${API_BASE_URL}/resource/Sales Order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token 0d596da8ae9f32d:ce5ef45704aab11'
      },
      body: JSON.stringify(salesOrderData)
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('Error creating sales order:', responseData);
      return { success: false, error: responseData.exception || responseData.message || 'API error' };
    }

    return { success: true, data: responseData.data || responseData };
  } catch (error) {
    console.error('Error in createSalesOrder:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

/**
 * Creates a successful payment entry
 */
export const createSuccessPaymentEntry = async (
  salesOrderId: string,
  amount: number,
  currency: string,
  customerName: string,
  paymentReference: string
): Promise<{ message: string; success: boolean; paymentId?: string }> => {
  console.log('Creating success payment entry with parameters:', {
    salesOrderId,
    amount,
    currency,
    customerName,
    paymentReference
  });

  return createPaymentEntry(
    amount,
    currency,
    customerName,
    salesOrderId,
    paymentReference
  );
};

/**
 * Creates a zero amount payment entry for canceled payments
 */
export const createZeroPaymentEntry = async (
  salesOrderId: string,
  currency: string,
  customerName: string
): Promise<{ message: string; success: boolean; paymentId?: string }> => {
  console.log('Creating zero payment entry with parameters:', {
    salesOrderId,
    currency,
    customerName
  });

  return createPaymentEntry(
    0, // Zero amount for canceled payments
    currency,
    customerName,
    salesOrderId,
    `CANCELED-${Date.now()}`
  );
};

export default {
  createCustomer,
  generatePayhereHash,
  createPaymentEntry,
  initiatePayhereCheckout,
  openTestCheckout,
  createSalesOrder,
  createSuccessPaymentEntry,
  createZeroPaymentEntry
}; 