// Remove incorrect import and define our own interface
// import { GeolocationResponse } from '@vercel/edge';

// Define our own geo response interface
export interface GeolocationResponse {
  country?: string;
  city?: string;
  region?: string;
}

export interface PricingOption {
  normalPrice: string;
  discountedPrice: string;
  currency: string;
  currencySymbol: string;
  hasInPerson: boolean;
  inPersonNormalPrice?: string;
  inPersonDiscountedPrice?: string;
}

export interface CountryPricing {
  [key: string]: PricingOption;
}

export const COUNTRY_PRICING: CountryPricing = {
  'LK': {
    normalPrice: '12000',
    discountedPrice: '7999',
    currency: 'LKR',
    currencySymbol: 'Rs.',
    hasInPerson: true,
    inPersonNormalPrice: '15000',
    inPersonDiscountedPrice: '9999'
  },
  'EU': {
    normalPrice: '150',
    discountedPrice: '99',
    currency: 'EUR',
    currencySymbol: '€',
    hasInPerson: false
  },
  'GB': {
    normalPrice: '120',
    discountedPrice: '89',
    currency: 'GBP',
    currencySymbol: '£',
    hasInPerson: false
  },
  'CA': {
    normalPrice: '150',
    discountedPrice: '99',
    currency: 'CAD',
    currencySymbol: 'CA$',
    hasInPerson: false
  },
  'IN': {
    normalPrice: '3500',
    discountedPrice: '2350',
    currency: 'INR',
    currencySymbol: '$',
    hasInPerson: false
  },
  'default': {
    normalPrice: '150',
    discountedPrice: '99',
    currency: 'USD',
    currencySymbol: '$',
    hasInPerson: false
  }
};

// European Union country codes
export const EU_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
];

export function getPricingByCountry(countryCode: string | undefined): PricingOption {
  if (!countryCode) return COUNTRY_PRICING.default;
  
  // Check if it's an EU country
  if (EU_COUNTRIES.includes(countryCode)) {
    return COUNTRY_PRICING.EU;
  }
  
  return COUNTRY_PRICING[countryCode] || COUNTRY_PRICING.default;
}

// Function to format price with currency symbol
export function formatPrice(price: string, currencySymbol: string): string {
  return `${currencySymbol} ${price}`;
} 