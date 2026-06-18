export const CURRENCIES = {
  AED: { symbol: 'AED', name: 'UAE Dirham', rate: 1 },
  USD: { symbol: '$', name: 'US Dollar', rate: 0.2723 },
  EUR: { symbol: '€', name: 'Euro', rate: 0.2499 },
  GBP: { symbol: '£', name: 'British Pound', rate: 0.2144 },
  SAR: { symbol: 'SAR', name: 'Saudi Riyal', rate: 1.0206 },
  PKR: { symbol: '₨', name: 'Pakistani Rupee', rate: 75.8 },
};

export function formatCurrency(valueInAED, currency = 'AED', opts = {}) {
  const cur = CURRENCIES[currency] || CURRENCIES.AED;
  const converted = valueInAED * cur.rate;

  if (opts.compact) {
    if (converted >= 1_000_000) return `${cur.symbol} ${(converted / 1_000_000).toFixed(1)}M`;
    if (converted >= 1_000) return `${cur.symbol} ${(converted / 1_000).toFixed(0)}K`;
  }

  return `${cur.symbol} ${Math.round(converted).toLocaleString()}`;
}

export function formatCompact(valueInAED, currency = 'AED') {
  return formatCurrency(valueInAED, currency, { compact: true });
}
