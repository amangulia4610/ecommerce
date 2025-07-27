/**
 * Centralized currency utility for CAD (Canadian Dollar) formatting
 */

export const formatPrice = (price) => {
  if (!price || isNaN(price)) return 'CAD $0.00';
  
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

export const formatPriceNumber = (price) => {
  if (!price || isNaN(price)) return 0;
  return parseFloat(price).toFixed(2);
};

export const calculateDiscountedPrice = (price, discount) => {
  if (!price || isNaN(price)) return 0;
  if (!discount || isNaN(discount) || discount === 0) return price;
  return price - (price * discount / 100);
};

export const CURRENCY_SYMBOL = 'CAD $';
export const CURRENCY_CODE = 'CAD';
