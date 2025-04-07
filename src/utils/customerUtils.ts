/**
 * Utility functions for handling customer data
 */

/**
 * Cleans a customer name by removing any numeric suffix that Frappe might add
 * For example: "John Doe - 12" becomes "John Doe"
 * 
 * @param name The customer name to clean
 * @returns The cleaned customer name
 */
export const cleanCustomerName = (name: string): string => {
  if (!name) return name;
  
  if (name.includes(' - ')) {
    const nameParts = name.split(' - ');
    // If the last part is a number, remove it
    if (nameParts.length > 1 && !isNaN(parseInt(nameParts[nameParts.length - 1]))) {
      return nameParts.slice(0, -1).join(' - ');
    }
  }
  return name;
};

export default {
  cleanCustomerName
}; 