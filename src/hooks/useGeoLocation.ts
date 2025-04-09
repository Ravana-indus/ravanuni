import { useState, useEffect } from 'react';
import { GeolocationResponse } from '@/utils/countryPricing';

export function useGeoLocation() {
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGeoLocation() {
      try {
        // Using ipinfo.io as a free geolocation API
        console.log('Fetching geolocation data from ipinfo.io...');
        const response = await fetch('https://ipinfo.io/json?token=16e37cef5507f5');
        
        // Log the response status for debugging
        console.log(`Geolocation API response status: ${response.status}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch geolocation data: ${response.status} ${response.statusText}`);
        }
        
        // Get the response text first
        const responseText = await response.text();
        
        // Try to parse the response as JSON
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Error parsing geolocation response:', parseError);
          throw new Error('Invalid response format from geolocation API');
        }
        
        console.log('Geolocation data received:', data);
        setCountry(data.country);
      } catch (err) {
        console.error('Error fetching geolocation:', err);
        setError('Failed to detect your location. Please select your country manually.');
      } finally {
        setLoading(false);
      }
    }

    fetchGeoLocation();
  }, []);

  return { country, loading, error };
} 