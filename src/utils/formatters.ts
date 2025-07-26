import type { Currency } from './types';

export const formatCurrency = (amount: number, currency: Currency): string => {
  if (!currency) {
    // Fallback or error handling
    console.warn('Currency code missing for amount:', amount);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR', // Default to IDR if not provided
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
